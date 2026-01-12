-- Crear tabla de configuración de empresa para datos fiscales y legales
-- Esta tabla almacena la información necesaria para generar facturas y presupuestos
-- conforme a la normativa fiscal española

CREATE TABLE IF NOT EXISTS company_config (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Datos de la empresa (obligatorios para facturas)
  company_name TEXT NOT NULL DEFAULT 'Engorilate - Rafael Alcalde Molina',
  tax_id TEXT NOT NULL DEFAULT 'PENDIENTE', -- NIF/CIF
  fiscal_address TEXT DEFAULT 'PENDIENTE',
  city TEXT DEFAULT 'Murcia',
  postal_code TEXT DEFAULT '30000',
  country TEXT DEFAULT 'España',
  
  -- Información bancaria
  bank_account_iban TEXT DEFAULT 'ES00 0000 0000 0000 0000 0000',
  bank_name TEXT,
  
  -- Información legal y condiciones
  legal_text TEXT DEFAULT 'Información legal pendiente de configurar',
  payment_terms TEXT DEFAULT 'Pago a 30 días',
  
  -- Contadores de numeración para presupuestos
  -- Formato: P-YYYY-NNNN (ej: P-2026-0001)
  quote_counter INTEGER DEFAULT 0,
  quote_year INTEGER DEFAULT EXTRACT(YEAR FROM CURRENT_DATE)::INTEGER,
  
  -- Contadores de numeración para facturas (OBLIGATORIO correlativo)
  -- Formato: YYYY/NNNN (ej: 2026/0001)
  invoice_counter INTEGER DEFAULT 0,
  invoice_year INTEGER DEFAULT EXTRACT(YEAR FROM CURRENT_DATE)::INTEGER,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insertar configuración inicial (solo si no existe)
INSERT INTO company_config (
  company_name,
  tax_id,
  fiscal_address,
  city,
  postal_code,
  bank_account_iban,
  legal_text,
  payment_terms
) 
SELECT 
  'Engorilate - Rafael Alcalde Molina',
  'PENDIENTE',
  'PENDIENTE',
  'Murcia',
  '30000',
  'ES00 0000 0000 0000 0000 0000',
  'Información legal pendiente de configurar. Por favor, actualiza estos datos en el Panel de Administración.',
  'Pago a 30 días'
WHERE NOT EXISTS (SELECT 1 FROM company_config LIMIT 1);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_company_config_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER company_config_updated_at
  BEFORE UPDATE ON company_config
  FOR EACH ROW
  EXECUTE FUNCTION update_company_config_updated_at();

-- Habilitar RLS (Row Level Security)
ALTER TABLE company_config ENABLE ROW LEVEL SECURITY;

-- Política: Solo usuarios autenticados pueden leer
CREATE POLICY "Allow authenticated users to read company config"
  ON company_config
  FOR SELECT
  TO authenticated
  USING (true);

-- Política: Solo usuarios autenticados pueden actualizar
CREATE POLICY "Allow authenticated users to update company config"
  ON company_config
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Añadir columna quote_number a la tabla quotes si no existe
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='quotes' AND COLUMN_NAME='quote_number') THEN
        ALTER TABLE quotes ADD COLUMN quote_number TEXT;
    END IF;
END $$;

-- Comentarios para documentación
COMMENT ON TABLE company_config IS 'Configuración de la empresa para generación de documentos fiscales (facturas y presupuestos)';
COMMENT ON COLUMN company_config.tax_id IS 'NIF o CIF de la empresa (obligatorio para facturas)';
COMMENT ON COLUMN company_config.quote_counter IS 'Contador secuencial de presupuestos (reinicia cada año)';
COMMENT ON COLUMN company_config.invoice_counter IS 'Contador secuencial de facturas (OBLIGATORIO correlativo sin saltos)';
