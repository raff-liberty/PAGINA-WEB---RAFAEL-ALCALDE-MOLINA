-- =====================================================
-- CRM SYSTEM - DROP AND RECREATE TABLES
-- =====================================================
-- Execute this FIRST to clean up existing tables
-- =====================================================

-- Drop existing tables (in correct order due to foreign keys)
DROP TABLE IF EXISTS email_logs CASCADE;
DROP TABLE IF EXISTS email_campaigns CASCADE;
DROP TABLE IF EXISTS email_templates CASCADE;
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS contacts CASCADE;

-- Drop existing functions and triggers
DROP FUNCTION IF EXISTS update_contact_timestamp() CASCADE;
DROP FUNCTION IF EXISTS increment_contact_messages() CASCADE;

-- =====================================================
-- Now run the full crm_schema.sql
-- =====================================================
