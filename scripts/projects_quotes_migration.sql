-- =====================================================
-- Projects & Quotes Migration
-- Ejecutar en Supabase SQL Editor (en orden)
-- =====================================================

-- 1. TABLA: projects
-- Un proyecto representa un trabajo potencial o real
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  responsible TEXT,
  status TEXT DEFAULT 'propuesta' 
    CHECK (status IN ('propuesta','presupuestado','aceptado','en_ejecucion','cerrado','cancelado')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABLA: quotes (presupuestos)
-- Un presupuesto siempre pertenece a un proyecto
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  version INTEGER DEFAULT 1,
  status TEXT DEFAULT 'borrador'
    CHECK (status IN ('borrador','enviado','aceptado','rechazado','caducado')),
  responsible TEXT,
  notes TEXT,
  validity_days INTEGER DEFAULT 30,
  subtotal NUMERIC(10,2) DEFAULT 0,
  tax_rate NUMERIC(5,2) DEFAULT 21,
  tax_amount NUMERIC(10,2) DEFAULT 0,
  total NUMERIC(10,2) DEFAULT 0,
  sent_at TIMESTAMPTZ,
  accepted_at TIMESTAMPTZ,
  rejected_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABLA: quote_lines (líneas de presupuesto)
-- Cada presupuesto tiene N líneas
CREATE TABLE IF NOT EXISTS quote_lines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID REFERENCES quotes(id) ON DELETE CASCADE NOT NULL,
  position INTEGER DEFAULT 0,
  concept TEXT NOT NULL,
  description TEXT,
  quantity NUMERIC(10,2) DEFAULT 1,
  unit_price NUMERIC(10,2) DEFAULT 0,
  line_total NUMERIC(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ÍNDICES para rendimiento
CREATE INDEX IF NOT EXISTS idx_projects_contact_id ON projects(contact_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_quotes_project_id ON quotes(project_id);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_quote_lines_quote_id ON quote_lines(quote_id);

-- 5. TRIGGER: actualizar updated_at en projects
CREATE OR REPLACE FUNCTION update_projects_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_projects_updated_at ON projects;
CREATE TRIGGER trigger_projects_updated_at
BEFORE UPDATE ON projects
FOR EACH ROW EXECUTE FUNCTION update_projects_updated_at();

-- 6. TRIGGER: actualizar updated_at en quotes
DROP TRIGGER IF EXISTS trigger_quotes_updated_at ON quotes;
CREATE TRIGGER trigger_quotes_updated_at
BEFORE UPDATE ON quotes
FOR EACH ROW EXECUTE FUNCTION update_projects_updated_at();

-- 7. TRIGGER: calcular line_total automáticamente
CREATE OR REPLACE FUNCTION calculate_line_total()
RETURNS TRIGGER AS $$
BEGIN
  NEW.line_total = COALESCE(NEW.quantity, 1) * COALESCE(NEW.unit_price, 0);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_calculate_line_total ON quote_lines;
CREATE TRIGGER trigger_calculate_line_total
BEFORE INSERT OR UPDATE ON quote_lines
FOR EACH ROW EXECUTE FUNCTION calculate_line_total();

-- 8. FUNCIÓN: recalcular totales del presupuesto
CREATE OR REPLACE FUNCTION recalculate_quote_totals()
RETURNS TRIGGER AS $$
DECLARE
  v_subtotal NUMERIC(10,2);
  v_tax_rate NUMERIC(5,2);
BEGIN
  -- Obtener subtotal sumando líneas
  SELECT COALESCE(SUM(line_total), 0) INTO v_subtotal
  FROM quote_lines
  WHERE quote_id = COALESCE(NEW.quote_id, OLD.quote_id);

  -- Obtener tax_rate del presupuesto
  SELECT tax_rate INTO v_tax_rate
  FROM quotes
  WHERE id = COALESCE(NEW.quote_id, OLD.quote_id);

  -- Actualizar totales
  UPDATE quotes SET
    subtotal = v_subtotal,
    tax_amount = ROUND(v_subtotal * v_tax_rate / 100, 2),
    total = ROUND(v_subtotal * (1 + v_tax_rate / 100), 2),
    updated_at = NOW()
  WHERE id = COALESCE(NEW.quote_id, OLD.quote_id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_recalculate_quote_totals ON quote_lines;
CREATE TRIGGER trigger_recalculate_quote_totals
AFTER INSERT OR UPDATE OR DELETE ON quote_lines
FOR EACH ROW EXECUTE FUNCTION recalculate_quote_totals();

-- 9. RLS Policies

-- Projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Allow insert projects" ON projects
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update projects" ON projects
  FOR UPDATE USING (true);

CREATE POLICY "Allow delete projects" ON projects
  FOR DELETE USING (true);

-- Quotes
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read quotes" ON quotes
  FOR SELECT USING (true);

CREATE POLICY "Allow insert quotes" ON quotes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update quotes" ON quotes
  FOR UPDATE USING (true);

CREATE POLICY "Allow delete quotes" ON quotes
  FOR DELETE USING (true);

-- Quote Lines
ALTER TABLE quote_lines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read quote_lines" ON quote_lines
  FOR SELECT USING (true);

CREATE POLICY "Allow insert quote_lines" ON quote_lines
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update quote_lines" ON quote_lines
  FOR UPDATE USING (true);

CREATE POLICY "Allow delete quote_lines" ON quote_lines
  FOR DELETE USING (true);

-- =====================================================
-- FIN DE LA MIGRACIÓN
-- =====================================================
