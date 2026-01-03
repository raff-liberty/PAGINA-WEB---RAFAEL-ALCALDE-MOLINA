-- =====================================================
-- CRM SYSTEM - SUPABASE DATABASE SCHEMA
-- =====================================================
-- Execute this SQL in Supabase SQL Editor
-- =====================================================

-- =====================================================
-- TABLE 1: CONTACTS
-- =====================================================
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Basic Info
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  
  -- Segmentation
  service_interest TEXT, -- 'automation', 'web', 'dashboard', 'other'
  source TEXT, -- 'Contact Page', 'Home CTA', 'Blog Post', etc.
  
  -- Lead Status
  status TEXT DEFAULT 'new', -- 'new', 'contacted', 'qualified', 'converted', 'lost'
  priority TEXT DEFAULT 'medium', -- 'low', 'medium', 'high'
  
  -- Tracking
  first_contact_at TIMESTAMPTZ DEFAULT NOW(),
  last_contact_at TIMESTAMPTZ DEFAULT NOW(),
  conversion_date TIMESTAMPTZ,
  
  -- Marketing
  tags TEXT[], -- ['pyme', 'urgente', 'presupuesto-alto']
  notes TEXT,
  
  -- Metrics
  total_messages INTEGER DEFAULT 1,
  emails_sent INTEGER DEFAULT 0,
  emails_opened INTEGER DEFAULT 0,
  emails_clicked INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast search
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_contacts_source ON contacts(source);
CREATE INDEX idx_contacts_service ON contacts(service_interest);
CREATE INDEX idx_contacts_tags ON contacts USING GIN(tags);
CREATE INDEX idx_contacts_created ON contacts(created_at DESC);

-- =====================================================
-- TABLE 2: CONTACT MESSAGES
-- =====================================================
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  
  -- Content
  message TEXT NOT NULL,
  service_requested TEXT,
  
  -- Metadata
  source TEXT,
  user_agent TEXT,
  ip_address TEXT,
  
  -- Response
  responded BOOLEAN DEFAULT FALSE,
  responded_at TIMESTAMPTZ,
  response_notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_messages_contact ON contact_messages(contact_id);
CREATE INDEX idx_messages_date ON contact_messages(created_at DESC);

-- =====================================================
-- TABLE 3: EMAIL TEMPLATES
-- =====================================================
CREATE TABLE email_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Template Info
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  
  -- Variables
  variables TEXT[], -- ['name', 'email', 'service_interest', 'phone']
  
  -- Categorization
  category TEXT, -- 'bienvenida', 'seguimiento', 'oferta', 'newsletter'
  
  -- Metadata
  created_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_templates_category ON email_templates(category);

-- =====================================================
-- TABLE 4: EMAIL CAMPAIGNS
-- =====================================================
CREATE TABLE email_campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Campaign Info
  name TEXT NOT NULL,
  template_id UUID REFERENCES email_templates(id),
  
  -- Segmentation
  target_type TEXT, -- 'manual', 'filtered', 'n8n'
  target_contacts UUID[], -- Manual selection IDs
  target_filters JSONB, -- {service: 'automation', status: ['new', 'contacted']}
  
  -- Content (if not using template)
  subject TEXT,
  body TEXT,
  
  -- Status
  status TEXT DEFAULT 'draft', -- 'draft', 'scheduled', 'sending', 'sent', 'failed'
  scheduled_for TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  
  -- Metrics
  total_recipients INTEGER DEFAULT 0,
  emails_sent INTEGER DEFAULT 0,
  emails_delivered INTEGER DEFAULT 0,
  emails_opened INTEGER DEFAULT 0,
  emails_clicked INTEGER DEFAULT 0,
  emails_bounced INTEGER DEFAULT 0,
  
  -- Options
  send_copy_to TEXT,
  track_opens BOOLEAN DEFAULT true,
  track_clicks BOOLEAN DEFAULT true,
  
  -- Metadata
  created_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_campaigns_status ON email_campaigns(status);
CREATE INDEX idx_campaigns_created ON email_campaigns(created_at DESC);

-- =====================================================
-- TABLE 5: EMAIL LOGS
-- =====================================================
CREATE TABLE email_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID REFERENCES email_campaigns(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  
  -- Status
  status TEXT DEFAULT 'pending', -- 'pending', 'sent', 'delivered', 'opened', 'clicked', 'bounced', 'failed'
  
  -- Tracking
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  bounced_at TIMESTAMPTZ,
  
  -- Error handling
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_email_logs_campaign ON email_logs(campaign_id);
CREATE INDEX idx_email_logs_contact ON email_logs(contact_id);
CREATE INDEX idx_email_logs_status ON email_logs(status);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- Contacts Policies
CREATE POLICY "Public can insert contacts"
ON contacts FOR INSERT
WITH CHECK (true);

CREATE POLICY "Authenticated can view contacts"
ON contacts FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can update contacts"
ON contacts FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can delete contacts"
ON contacts FOR DELETE
USING (auth.role() = 'authenticated');

-- Contact Messages Policies
CREATE POLICY "Public can insert messages"
ON contact_messages FOR INSERT
WITH CHECK (true);

CREATE POLICY "Authenticated can view messages"
ON contact_messages FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can update messages"
ON contact_messages FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can delete messages"
ON contact_messages FOR DELETE
USING (auth.role() = 'authenticated');

-- Email Templates Policies
CREATE POLICY "Authenticated can manage templates"
ON email_templates FOR ALL
USING (auth.role() = 'authenticated');

-- Email Campaigns Policies
CREATE POLICY "Authenticated can manage campaigns"
ON email_campaigns FOR ALL
USING (auth.role() = 'authenticated');

-- Email Logs Policies
CREATE POLICY "Authenticated can manage email logs"
ON email_logs FOR ALL
USING (auth.role() = 'authenticated');

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function to update contact's updated_at timestamp
CREATE OR REPLACE FUNCTION update_contact_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_contact_timestamp
BEFORE UPDATE ON contacts
FOR EACH ROW
EXECUTE FUNCTION update_contact_timestamp();

-- Function to increment contact message count
CREATE OR REPLACE FUNCTION increment_contact_messages()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE contacts
  SET total_messages = total_messages + 1,
      last_contact_at = NOW()
  WHERE id = NEW.contact_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER increment_contact_messages
AFTER INSERT ON contact_messages
FOR EACH ROW
EXECUTE FUNCTION increment_contact_messages();

-- =====================================================
-- SAMPLE DATA (Optional - for testing)
-- =====================================================

-- Sample Email Template
INSERT INTO email_templates (name, subject, body, variables, category)
VALUES (
  'Bienvenida Automatización',
  'Hola {{name}}, tu solución de automatización está aquí',
  E'Hola {{name}},\n\nGracias por tu interés en {{service_interest}}.\n\nEn Engorilate, automatizamos:\n• Procesos repetitivos\n• Gestión de inventarios\n• Comunicación con clientes\n\n¿Hablamos? Responde a este email o llámame al {{phone}}.\n\nRafael Alcalde\nr.alcalde@engorilate.com',
  ARRAY['name', 'email', 'phone', 'service_interest'],
  'bienvenida'
);

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check tables created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('contacts', 'contact_messages', 'email_templates', 'email_campaigns', 'email_logs');

-- Check RLS enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('contacts', 'contact_messages', 'email_templates', 'email_campaigns', 'email_logs');

-- =====================================================
-- DONE! 
-- Next: Update ContactForm.jsx to save to Supabase
-- =====================================================
