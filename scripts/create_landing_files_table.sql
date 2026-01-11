-- =====================================================
-- SCRIPT: Crear tabla para gestión de archivos descargables
-- =====================================================

-- Crear tabla landing_files
CREATE TABLE IF NOT EXISTS landing_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  landing_key TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  version TEXT DEFAULT '1.0',
  is_active BOOLEAN DEFAULT true,
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Crear índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_landing_files_key ON landing_files(landing_key);
CREATE INDEX IF NOT EXISTS idx_landing_files_active ON landing_files(is_active);

-- Habilitar RLS (Row Level Security)
ALTER TABLE landing_files ENABLE ROW LEVEL SECURITY;

-- Policy para lectura pública de archivos activos
CREATE POLICY "Public read access for active files"
  ON landing_files
  FOR SELECT
  USING (is_active = true);

-- Policy para administradores (autenticados) - acceso completo
CREATE POLICY "Authenticated users full access"
  ON landing_files
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Insertar registro inicial para "El Caos Operativo Invisible"
INSERT INTO landing_files (
  landing_key,
  title,
  description,
  file_url,
  file_name,
  version,
  is_active
) VALUES (
  'caos-operativo',
  'El Caos Operativo Invisible',
  '7 señales de que tu negocio no escala porque está mal diseñado',
  'https://engorilate.com/pdfs/el-caos-operativo.pdf',
  'el-caos-operativo.pdf',
  '1.0',
  true
) ON CONFLICT (landing_key) DO NOTHING;

-- Crear bucket de storage para PDFs si no existe
INSERT INTO storage.buckets (id, name, public)
VALUES ('pdfs', 'pdfs', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas de storage para el bucket de PDFs
CREATE POLICY "Public read access for PDFs"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'pdfs');

CREATE POLICY "Authenticated users can upload PDFs"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'pdfs' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update PDFs"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'pdfs' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete PDFs"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'pdfs' AND auth.role() = 'authenticated');

-- Confirmación
SELECT 'Tabla landing_files y bucket de storage creados correctamente' as status;
