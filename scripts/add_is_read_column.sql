-- Add is_read column to contact_messages
-- This allows tracking read/unread status for notifications.

-- 1. Add column if it doesn't exist
ALTER TABLE contact_messages 
ADD COLUMN IF NOT EXISTS is_read BOOLEAN DEFAULT FALSE;

-- 2. Update existing messages to read (optional, so user doesn't see 100 notifications at once)
-- UPDATE contact_messages SET is_read = TRUE; -- Uncomment if you want to start clean

-- 3. Output confirmation
SELECT 'Column is_read added successfully' as status;
