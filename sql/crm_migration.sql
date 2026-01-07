-- =====================================================
-- CRM PROFESIONAL - MIGRACIÓN (Usando tabla contacts existente)
-- =====================================================

-- 1. MEJORAR TABLA CONTACTS EXISTENTE (añadir columnas nuevas)
-- =====================================================
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS sector TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS company_size TEXT CHECK (company_size IN ('1-5', '6-20', '21-50', '50+'));
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS province TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS lead_score INTEGER CHECK (lead_score BETWEEN 1 AND 10);
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS estimated_budget DECIMAL(10,2);
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS pain_points TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS next_action TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS next_action_date DATE;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS assigned_to TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS tags TEXT[];
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS utm_source TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS utm_campaign TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS last_contact_date TIMESTAMPTZ;

-- Crear índices para la tabla contacts
CREATE INDEX IF NOT EXISTS idx_contacts_sector ON contacts(sector);
CREATE INDEX IF NOT EXISTS idx_contacts_city ON contacts(city);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);

-- 2. MEJORAR CONTACT_MESSAGES (añadir relación si no existe)
-- =====================================================
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE;
CREATE INDEX IF NOT EXISTS idx_messages_contact ON contact_messages(contact_id);

-- 3. CREAR TABLA PROJECTS
-- =====================================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  
  title TEXT NOT NULL,
  description TEXT,
  service_type TEXT CHECK (service_type IN ('agente_virtual', 'web', 'seo_local', 'crm', 'otro')),
  status TEXT CHECK (status IN ('propuesta', 'en_curso', 'completado', 'cancelado', 'pausado')) DEFAULT 'propuesta',
  priority TEXT CHECK (priority IN ('baja', 'media', 'alta', 'urgente')) DEFAULT 'media',
  
  budget DECIMAL(10,2),
  actual_cost DECIMAL(10,2),
  payment_status TEXT CHECK (payment_status IN ('pendiente', 'parcial', 'pagado')) DEFAULT 'pendiente',
  
  start_date DATE,
  end_date DATE,
  delivery_date DATE,
  
  actual_hours DECIMAL(6,2),
  estimated_hours DECIMAL(6,2),
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_contact ON projects(contact_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_service ON projects(service_type);

-- 4. CREAR TABLA PROJECT_ITEMS
-- =====================================================
CREATE TABLE IF NOT EXISTS project_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  
  type TEXT CHECK (type IN ('task', 'milestone', 'expense')) DEFAULT 'task',
  title TEXT NOT NULL,
  description TEXT,
  
  quantity DECIMAL(10,2) DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
  
  status TEXT CHECK (status IN ('pending', 'in_progress', 'completed')) DEFAULT 'pending',
  billable BOOLEAN DEFAULT true,
  billed BOOLEAN DEFAULT false,
  
  order_index INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_items_project ON project_items(project_id);

-- 5. CREAR TABLA BUDGETS
-- =====================================================
CREATE TABLE IF NOT EXISTS budgets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  
  budget_number TEXT UNIQUE NOT NULL,
  version INTEGER DEFAULT 1,
  status TEXT CHECK (status IN ('draft', 'sent', 'accepted', 'rejected', 'expired')) DEFAULT 'draft',
  
  subtotal DECIMAL(10,2) NOT NULL,
  tax_rate DECIMAL(5,2) DEFAULT 21.00,
  tax_amount DECIMAL(10,2),
  discount_percent DECIMAL(5,2) DEFAULT 0,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  
  valid_until DATE,
  notes TEXT,
  terms_conditions TEXT,
  
  sent_date DATE,
  accepted_date DATE,
  rejected_date DATE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_budgets_project ON budgets(project_id);
CREATE INDEX IF NOT EXISTS idx_budgets_number ON budgets(budget_number);
CREATE INDEX IF NOT EXISTS idx_budgets_status ON budgets(status);

-- 6. CREAR TABLA BUDGET_ITEMS
-- =====================================================
CREATE TABLE IF NOT EXISTS budget_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  budget_id UUID REFERENCES budgets(id) ON DELETE CASCADE,
  project_item_id UUID REFERENCES project_items(id),
  
  title TEXT NOT NULL,
  description TEXT,
  quantity DECIMAL(10,2),
  unit_price DECIMAL(10,2),
  total DECIMAL(10,2),
  order_index INTEGER
);

CREATE INDEX IF NOT EXISTS idx_budget_items_budget ON budget_items(budget_id);

-- 7. CREAR TABLA INVOICES
-- =====================================================
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  budget_id UUID REFERENCES budgets(id),
  
  invoice_number TEXT UNIQUE NOT NULL,
  invoice_type TEXT CHECK (invoice_type IN ('completa', 'parcial', 'anticipo')) DEFAULT 'completa',
  status TEXT CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')) DEFAULT 'draft',
  
  subtotal DECIMAL(10,2) NOT NULL,
  tax_rate DECIMAL(5,2) DEFAULT 21.00,
  tax_amount DECIMAL(10,2),
  total DECIMAL(10,2) NOT NULL,
  
  payment_terms TEXT DEFAULT '30 días',
  due_date DATE,
  paid_date DATE,
  payment_method TEXT CHECK (payment_method IN ('transferencia', 'efectivo', 'tarjeta', 'otro')),
  
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_invoices_project ON invoices(project_id);
CREATE INDEX IF NOT EXISTS idx_invoices_number ON invoices(invoice_number);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_due_date ON invoices(due_date);

-- 8. CREAR TABLA INVOICE_ITEMS
-- =====================================================
CREATE TABLE IF NOT EXISTS invoice_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
  project_item_id UUID REFERENCES project_items(id),
  
  title TEXT NOT NULL,
  description TEXT,
  quantity DECIMAL(10,2),
  unit_price DECIMAL(10,2),
  total DECIMAL(10,2),
  order_index INTEGER
);

CREATE INDEX IF NOT EXISTS idx_invoice_items_invoice ON invoice_items(invoice_id);

-- =====================================================
-- TRIGGERS
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_contacts_updated_at ON contacts;
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_budgets_updated_at ON budgets;
CREATE TRIGGER update_budgets_updated_at BEFORE UPDATE ON budgets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_invoices_updated_at ON invoices;
CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- FUNCIONES HELPER
-- =====================================================
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
