-- Create site_config table
CREATE TABLE IF NOT EXISTS site_config (
  id SERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert initial configuration
INSERT INTO site_config (key, value, description) VALUES
  ('whatsapp_url', 'https://wa.me/34600000000', 'URL de WhatsApp Business'),
  ('instagram_url', 'https://instagram.com/engorilate', 'URL de Instagram'),
  ('linkedin_url', 'https://linkedin.com/company/engorilate', 'URL de LinkedIn'),
  ('contact_email', 'hola@antesdehacer.com', 'Email de contacto'),
  ('n8n_webhook_url', '', 'Webhook de N8N para formulario de contacto')
ON CONFLICT (key) DO NOTHING;
