-- Arreglar permisos RLS para permitir guardar configuración (upsert requiere INSERT)

-- 1. Tabla company_config
DROP POLICY IF EXISTS "Allow authenticated users to insert company config" ON company_config;
CREATE POLICY "Allow authenticated users to insert company config"
  ON company_config
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 2. Tabla site_config
-- Asegurar que RLS esté activado (por si acaso)
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow authenticated users to read site config" ON site_config;
CREATE POLICY "Allow authenticated users to read site config"
  ON site_config
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to insert site config" ON site_config;
CREATE POLICY "Allow authenticated users to insert site config"
  ON site_config
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated users to update site config" ON site_config;
CREATE POLICY "Allow authenticated users to update site config"
  ON site_config
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 3. Tabla sector_location_content (para el toggle de landings)
ALTER TABLE sector_location_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow authenticated users to update landing status" ON sector_location_content;
CREATE POLICY "Allow authenticated users to update landing status"
  ON sector_location_content
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Permitir select también para usuarios autenticados si no existe
DROP POLICY IF EXISTS "Allow authenticated users to read landing status" ON sector_location_content;
CREATE POLICY "Allow authenticated users to read landing status"
  ON sector_location_content
  FOR SELECT
  TO authenticated
  USING (true);
