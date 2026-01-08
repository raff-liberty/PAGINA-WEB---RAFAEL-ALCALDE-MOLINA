-- Añadir columna message a la tabla contacts
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS message TEXT;

-- Refrescar schema
NOTIFY pgrst, 'reload schema';

SELECT 'Columna message añadida correctamente' as status;
