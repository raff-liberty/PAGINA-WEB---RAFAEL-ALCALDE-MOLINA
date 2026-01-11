-- =====================================================
-- Añadir campos adicionales a la tabla contacts
-- =====================================================

-- Añadir campos de información fiscal y de contacto
ALTER TABLE contacts 
ADD COLUMN IF NOT EXISTS tax_id TEXT,                    -- NIF/CIF
ADD COLUMN IF NOT EXISTS fiscal_address TEXT,            -- Dirección fiscal
ADD COLUMN IF NOT EXISTS shipping_address TEXT,          -- Dirección de envío
ADD COLUMN IF NOT EXISTS city TEXT,                      -- Ciudad
ADD COLUMN IF NOT EXISTS postal_code TEXT,               -- Código postal
ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'España',  -- País
ADD COLUMN IF NOT EXISTS secondary_phone TEXT,           -- Teléfono secundario
ADD COLUMN IF NOT EXISTS position TEXT,                  -- Cargo/Posición
ADD COLUMN IF NOT EXISTS website TEXT,                   -- Sitio web
ADD COLUMN IF NOT EXISTS linkedin TEXT,                  -- LinkedIn
ADD COLUMN IF NOT EXISTS additional_notes TEXT;          -- Notas adicionales

-- Verificar los cambios
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'contacts'
ORDER BY ordinal_position;

-- =====================================================
-- FIN DE LA MIGRACIÓN
-- =====================================================
