-- =====================================================
-- SCRIPT: Verificar y Corregir Schema de Contacts
-- =====================================================

-- Paso 1: Verificar si la columna 'name' existe
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'contacts' 
        AND column_name = 'name'
    ) THEN
        -- Si existe 'name', renombrarla a 'full_name'
        ALTER TABLE contacts RENAME COLUMN name TO full_name;
        RAISE NOTICE 'Columna renombrada: name → full_name';
    ELSE
        RAISE NOTICE 'La columna ya se llama full_name (correcto)';
    END IF;
END $$;

-- Paso 2: Verificar que full_name existe ahora
SELECT 
    column_name, 
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'contacts' 
AND column_name = 'full_name';

-- Paso 3: Forzar recarga del schema cache de PostgREST
NOTIFY pgrst, 'reload schema';

-- Confirmación
SELECT 'Schema actualizado y cache refrescado' as status;
