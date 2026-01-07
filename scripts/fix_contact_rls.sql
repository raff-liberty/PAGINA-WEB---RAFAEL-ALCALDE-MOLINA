-- =====================================================
-- FIX: Contact RLS Policies - Complete Version
-- =====================================================

-- 1. Enable RLS on both tables
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow public insert on contacts" ON contacts;
DROP POLICY IF EXISTS "Allow public update on contacts" ON contacts;
DROP POLICY IF EXISTS "Allow public select on contacts" ON contacts;
DROP POLICY IF EXISTS "Allow public insert on contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow authenticated all on contacts" ON contacts;
DROP POLICY IF EXISTS "Allow authenticated all on contact_messages" ON contact_messages;

-- =====================================================
-- CONTACTS TABLE POLICIES
-- =====================================================

-- Allow public users to INSERT (for contact form)
CREATE POLICY "Allow public insert on contacts"
ON contacts FOR INSERT
TO public
WITH CHECK (true);

-- Allow public users to UPDATE (for upsert in contact form)
CREATE POLICY "Allow public update on contacts"
ON contacts FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Allow public users to SELECT (needed for upsert to work)
CREATE POLICY "Allow public select on contacts"
ON contacts FOR SELECT
TO public
USING (true);

-- Allow authenticated users (admin) FULL ACCESS
CREATE POLICY "Allow authenticated all on contacts"
ON contacts FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- =====================================================
-- CONTACT_MESSAGES TABLE POLICIES
-- =====================================================

-- Allow public users to INSERT messages
CREATE POLICY "Allow public insert on contact_messages"
ON contact_messages FOR INSERT
TO public
WITH CHECK (true);

-- Allow authenticated users (admin) FULL ACCESS to messages
CREATE POLICY "Allow authenticated all on contact_messages"
ON contact_messages FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Verification
SELECT 'RLS policies updated successfully for contacts and contact_messages' as status;
