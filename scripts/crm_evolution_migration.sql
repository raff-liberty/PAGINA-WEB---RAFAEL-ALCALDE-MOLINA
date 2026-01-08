-- =====================================================
-- CRM Evolution Migration
-- Ejecutar en Supabase SQL Editor (en orden)
-- =====================================================

-- 1. NUEVA TABLA: interactions
-- Historial inmutable de interacciones con cada contacto
CREATE TABLE IF NOT EXISTS interactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('form_submission', 'email', 'whatsapp', 'call', 'note', 'system')),
  channel TEXT, -- web_form, whatsapp, email, phone, manual
  content TEXT NOT NULL,
  author TEXT DEFAULT 'system', -- 'system' o nombre de usuario
  created_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB -- datos extra (UTMs, service_interest, etc.)
);

-- 2. MODIFICAR TABLA: contacts
-- Añadir nuevos campos para tipo, estado operativo y origen

-- Tipo de contacto (qué es)
ALTER TABLE contacts
  ADD COLUMN IF NOT EXISTS contact_type TEXT DEFAULT 'lead' 
    CHECK (contact_type IN ('lead', 'cliente', 'partner', 'proveedor'));

-- Estado operativo (en qué punto está)
ALTER TABLE contacts
  ADD COLUMN IF NOT EXISTS operational_status TEXT DEFAULT 'nuevo'
    CHECK (operational_status IN ('nuevo', 'en_seguimiento', 'respondido', 'cerrado', 'descartado'));

-- Origen del contacto (captura automática)
ALTER TABLE contacts
  ADD COLUMN IF NOT EXISTS entry_channel TEXT;

ALTER TABLE contacts
  ADD COLUMN IF NOT EXISTS entry_url TEXT;

ALTER TABLE contacts
  ADD COLUMN IF NOT EXISTS utm_source TEXT;

ALTER TABLE contacts
  ADD COLUMN IF NOT EXISTS utm_medium TEXT;

ALTER TABLE contacts
  ADD COLUMN IF NOT EXISTS utm_campaign TEXT;

-- Timestamps de interacciones
ALTER TABLE contacts
  ADD COLUMN IF NOT EXISTS last_interaction_at TIMESTAMPTZ;

ALTER TABLE contacts
  ADD COLUMN IF NOT EXISTS first_contact_at TIMESTAMPTZ DEFAULT NOW();

-- 3. ÍNDICES para rendimiento
CREATE INDEX IF NOT EXISTS idx_interactions_contact_id ON interactions(contact_id);
CREATE INDEX IF NOT EXISTS idx_interactions_created_at ON interactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_operational_status ON contacts(operational_status);
CREATE INDEX IF NOT EXISTS idx_contacts_contact_type ON contacts(contact_type);

-- 4. TRIGGER: actualizar last_interaction_at automáticamente
CREATE OR REPLACE FUNCTION update_last_interaction()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE contacts 
  SET last_interaction_at = NEW.created_at 
  WHERE id = NEW.contact_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Eliminar trigger si existe para recrearlo
DROP TRIGGER IF EXISTS trigger_update_last_interaction ON interactions;

CREATE TRIGGER trigger_update_last_interaction
AFTER INSERT ON interactions
FOR EACH ROW EXECUTE FUNCTION update_last_interaction();

-- 5. MIGRAR DATOS EXISTENTES
-- Convertir contactos existentes con status antiguo a nuevo modelo

-- Mapear status antiguo a contact_type y operational_status
UPDATE contacts SET 
  contact_type = CASE 
    WHEN status = 'cliente' THEN 'cliente'
    ELSE 'lead'
  END,
  operational_status = CASE 
    WHEN status = 'lead' THEN 'nuevo'
    WHEN status = 'cliente' THEN 'cerrado'
    WHEN status = 'inactivo' THEN 'descartado'
    ELSE 'nuevo'
  END
WHERE contact_type IS NULL OR operational_status IS NULL;

-- Crear interacción inicial para contactos que tienen mensaje
INSERT INTO interactions (contact_id, type, channel, content, author, created_at, metadata)
SELECT 
  id,
  'form_submission',
  'web_form',
  COALESCE(message, 'Contacto inicial'),
  'system',
  created_at,
  jsonb_build_object('source', source, 'service_interest', service_interest)
FROM contacts
WHERE message IS NOT NULL AND message != ''
ON CONFLICT DO NOTHING;

-- Actualizar last_interaction_at para contactos existentes
UPDATE contacts c SET 
  last_interaction_at = (
    SELECT MAX(created_at) FROM interactions i WHERE i.contact_id = c.id
  )
WHERE last_interaction_at IS NULL;

-- Si no hay interacciones, usar created_at
UPDATE contacts SET 
  last_interaction_at = created_at
WHERE last_interaction_at IS NULL;

-- 6. RLS Policies para interactions
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;

-- Política de lectura (todos pueden leer)
CREATE POLICY "Allow read interactions" ON interactions
  FOR SELECT USING (true);

-- Política de inserción (todos pueden insertar)
CREATE POLICY "Allow insert interactions" ON interactions
  FOR INSERT WITH CHECK (true);

-- Las interacciones son inmutables: NO políticas de UPDATE ni DELETE

-- =====================================================
-- FIN DE LA MIGRACIÓN
-- =====================================================
