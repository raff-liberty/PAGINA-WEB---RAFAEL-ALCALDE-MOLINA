-- =====================================================
-- CRM PROFESIONAL - SCHEMA COMPLETO (LIMPIO)
-- =====================================================
-- IMPORTANTE: Este script eliminará las tablas existentes
-- Asegúrate de hacer backup si tienes datos importantes

-- Eliminar tablas en orden inverso (por dependencias)
DROP TABLE IF EXISTS invoice_items CASCADE;
DROP TABLE IF EXISTS invoices CASCADE;
DROP TABLE IF EXISTS budget_items CASCADE;
DROP TABLE IF EXISTS budgets CASCADE;
DROP TABLE IF EXISTS project_items CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS contacts CASCADE;

-- Eliminar funciones
DROP FUNCTION IF EXISTS generate_budget_number();
DROP FUNCTION IF EXISTS generate_invoice_number();
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- =====================================================
-- CREAR TABLAS NUEVAS
-- =====================================================

-- 1. TABLA CONTACTS
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  
  -- Información de Negocio
  sector TEXT,
  company_size TEXT CHECK (company_size IN ('1-5', '6-20', '21-50', '50+')),
  city TEXT,
  province TEXT,
  
  -- Gestión Comercial
  status TEXT CHECK (status IN ('lead', 'cliente', 'inactivo')) DEFAULT 'lead',
  lead_score INTEGER CHECK (lead_score BETWEEN 1 AND 10),
  estimated_budget DECIMAL(10,2),
  pain_points TEXT,
  
  -- Seguimiento
  next_action TEXT,
  next_action_date DATE,
  assigned_to TEXT,
  
  -- Metadata
  source TEXT,
  tags TEXT[],
  notes TEXT,
  utm_source TEXT,
  utm_campaign TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_contact_date TIMESTAMPTZ
);

CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_contacts_sector ON contacts(sector);
CREATE INDEX idx_contacts_city ON contacts(city);

-- 2. TABLA CONTACT_MESSAGES
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  message TEXT,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_messages_contact ON contact_messages(contact_id);

-- 3. TABLA PROJECTS
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  
  -- Información Básica
  title TEXT NOT NULL,
  description TEXT,
  service_type TEXT CHECK (service_type IN ('agente_virtual', 'web', 'seo_local', 'crm', 'otro')),
  
  -- Estado y Prioridad
  status TEXT CHECK (status IN ('propuesta', 'en_curso', 'completado', 'cancelado', 'pausado')) DEFAULT 'propuesta',
  priority TEXT CHECK (priority IN ('baja', 'media', 'alta', 'urgente')) DEFAULT 'media',
  
  -- Financiero
  budget DECIMAL(10,2),
  actual_cost DECIMAL(10,2),
  payment_status TEXT CHECK (payment_status IN ('pendiente', 'parcial', 'pagado')) DEFAULT 'pendiente',
  
  -- Fechas
  start_date DATE,
  end_date DATE,
  delivery_date DATE,
  
  -- Gestión
  actual_hours DECIMAL(6,2),
  estimated_hours DECIMAL(6,2),
  notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_projects_contact ON projects(contact_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_service ON projects(service_type);

-- 4. TABLA PROJECT_ITEMS (Partidas facturables)
CREATE TABLE project_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  
  -- Información
  type TEXT CHECK (type IN ('task', 'milestone', 'expense')) DEFAULT 'task',
  title TEXT NOT NULL,
  description TEXT,
  
  -- Financiero
  quantity DECIMAL(10,2) DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
  
  -- Estado
  status TEXT CHECK (status IN ('pending', 'in_progress', 'completed')) DEFAULT 'pending',
  billable BOOLEAN DEFAULT true,
  billed BOOLEAN DEFAULT false,
  
  -- Orden
  order_index INTEGER,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_items_project ON project_items(project_id);

-- 5. TABLA BUDGETS (Presupuestos)
CREATE TABLE budgets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  
  -- Numeración
  budget_number TEXT UNIQUE NOT NULL,
  version INTEGER DEFAULT 1,
  
  -- Estado
  status TEXT CHECK (status IN ('draft', 'sent', 'accepted', 'rejected', 'expired')) DEFAULT 'draft',
  
  -- Financiero
  subtotal DECIMAL(10,2) NOT NULL,
  tax_rate DECIMAL(5,2) DEFAULT 21.00,
  tax_amount DECIMAL(10,2),
  discount_percent DECIMAL(5,2) DEFAULT 0,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  
  -- Validez
  valid_until DATE,
  
  -- Notas
  notes TEXT,
  terms_conditions TEXT,
  
  -- Fechas
  sent_date DATE,
  accepted_date DATE,
  rejected_date DATE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_budgets_project ON budgets(project_id);
CREATE INDEX idx_budgets_number ON budgets(budget_number);
CREATE INDEX idx_budgets_status ON budgets(status);

-- 6. TABLA BUDGET_ITEMS
CREATE TABLE budget_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  budget_id UUID REFERENCES budgets(id) ON DELETE CASCADE,
  project_item_id UUID REFERENCES project_items(id),
  
  -- Snapshot de datos
  title TEXT NOT NULL,
  description TEXT,
  quantity DECIMAL(10,2),
  unit_price DECIMAL(10,2),
  total DECIMAL(10,2),
  
  order_index INTEGER
);

CREATE INDEX idx_budget_items_budget ON budget_items(budget_id);

-- 7. TABLA INVOICES (Facturas)
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  budget_id UUID REFERENCES budgets(id),
  
  -- Numeración
  invoice_number TEXT UNIQUE NOT NULL,
  invoice_type TEXT CHECK (invoice_type IN ('completa', 'parcial', 'anticipo')) DEFAULT 'completa',
  
  -- Estado
  status TEXT CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')) DEFAULT 'draft',
  
  -- Financiero
  subtotal DECIMAL(10,2) NOT NULL,
  tax_rate DECIMAL(5,2) DEFAULT 21.00,
  tax_amount DECIMAL(10,2),
  total DECIMAL(10,2) NOT NULL,
  
  -- Pago
  payment_terms TEXT DEFAULT '30 días',
  due_date DATE,
  paid_date DATE,
  payment_method TEXT CHECK (payment_method IN ('transferencia', 'efectivo', 'tarjeta', 'otro')),
  
  -- Notas
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_invoices_project ON invoices(project_id);
CREATE INDEX idx_invoices_number ON invoices(invoice_number);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_due_date ON invoices(due_date);

-- 8. TABLA INVOICE_ITEMS
CREATE TABLE invoice_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
  project_item_id UUID REFERENCES project_items(id),
  
  -- Snapshot
  title TEXT NOT NULL,
  description TEXT,
  quantity DECIMAL(10,2),
  unit_price DECIMAL(10,2),
  total DECIMAL(10,2),
  
  order_index INTEGER
);

CREATE INDEX idx_invoice_items_invoice ON invoice_items(invoice_id);

-- =====================================================
-- TRIGGERS PARA UPDATED_AT
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_budgets_updated_at BEFORE UPDATE ON budgets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- FUNCIONES HELPER
-- =====================================================

-- Función para generar número de presupuesto
CREATE OR REPLACE FUNCTION generate_budget_number()
RETURNS TEXT AS $$
DECLARE
    year TEXT;
    seq INTEGER;
BEGIN
    year := TO_CHAR(NOW(), 'YYYY');
    SELECT COALESCE(MAX(CAST(SUBSTRING(budget_number FROM 'PRES-' || year || '-(\d+)') AS INTEGER)), 0) + 1
    INTO seq
    FROM budgets
    WHERE budget_number LIKE 'PRES-' || year || '-%';
    
    RETURN 'PRES-' || year || '-' || LPAD(seq::TEXT, 3, '0');
END;
$$ LANGUAGE plpgsql;

-- Función para generar número de factura
CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TEXT AS $$
DECLARE
    year TEXT;
    seq INTEGER;
BEGIN
    year := TO_CHAR(NOW(), 'YYYY');
    SELECT COALESCE(MAX(CAST(SUBSTRING(invoice_number FROM 'FACT-' || year || '-(\d+)') AS INTEGER)), 0) + 1
    INTO seq
    FROM invoices
    WHERE invoice_number LIKE 'FACT-' || year || '-%';
    
    RETURN 'FACT-' || year || '-' || LPAD(seq::TEXT, 3, '0');
END;
$$ LANGUAGE plpgsql;
