-- Add is_active column to sector_location_content table
-- This allows administrators to activate/deactivate landing pages

ALTER TABLE sector_location_content 
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Set all existing landings as active by default
UPDATE sector_location_content 
SET is_active = true 
WHERE is_active IS NULL;

-- Add comment to document the column
COMMENT ON COLUMN sector_location_content.is_active IS 'Determines if the landing page is publicly accessible. Inactive landings redirect to 404';
