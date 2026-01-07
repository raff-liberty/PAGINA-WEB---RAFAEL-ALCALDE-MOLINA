-- Fix RLS for Contact Form (Updated)
-- This script allows public (anonymous) users to INSERT and UPDATE data in the contacts table.
-- UPDATE is required because the form uses 'upsert' (update if email exists).

-- 1. Enable RLS (ensuring it is active)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- 2. CONTACTS TABLE POLICIES
-- Allow INSERT
DROP POLICY IF EXISTS "Allow public insert on contacts" ON contacts;
CREATE POLICY "Allow public insert on contacts"
ON contacts
FOR INSERT
TO public
WITH CHECK (true);

-- Allow UPDATE (Required for upsert if email already exists)
DROP POLICY IF EXISTS "Allow public update on contacts" ON contacts;
CREATE POLICY "Allow public update on contacts"
ON contacts
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Allow SELECT (Optional, but often needed to verify existence during upsert)
DROP POLICY IF EXISTS "Allow public select on contacts" ON contacts;
CREATE POLICY "Allow public select on contacts"
ON contacts
FOR SELECT
TO public
USING (true);

-- 3. CONTACT MESSAGES TABLE POLICIES
-- Allow INSERT
DROP POLICY IF EXISTS "Allow public insert on contact_messages" ON contact_messages;
CREATE POLICY "Allow public insert on contact_messages"
ON contact_messages
FOR INSERT
TO public
WITH CHECK (true);

-- 4. Output confirmation
SELECT 'RLS policies updated (INSERT + UPDATE + SELECT) successfully' as status;
