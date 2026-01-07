-- Verificar si existe columna 'company' en contacts
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'contacts' 
AND column_name = 'company';

-- Si no existe, añadirla
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'contacts' 
        AND column_name = 'company'
    ) THEN
        ALTER TABLE contacts ADD COLUMN company TEXT;
        RAISE NOTICE 'Columna company añadida';
    ELSE
        RAISE NOTICE 'Columna company ya existe';
    END IF;
END $$;

-- Refrescar schema
NOTIFY pgrst, 'reload schema';

SELECT 'Verificación completada' as status;
