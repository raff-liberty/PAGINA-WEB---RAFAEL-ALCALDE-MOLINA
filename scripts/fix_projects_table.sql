-- =====================================================
-- Verificación y Corrección de la tabla projects
-- =====================================================

-- 1. Verificar si la columna 'name' existe
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'projects' 
        AND column_name = 'name'
    ) THEN
        -- Si no existe, añadir la columna
        ALTER TABLE projects ADD COLUMN name TEXT NOT NULL DEFAULT 'Proyecto sin nombre';
        RAISE NOTICE 'Columna "name" añadida a la tabla projects';
    ELSE
        RAISE NOTICE 'La columna "name" ya existe en la tabla projects';
    END IF;
END $$;

-- 2. Verificar estructura completa de la tabla
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'projects'
ORDER BY ordinal_position;

-- 3. Si necesitas recrear la tabla completamente (CUIDADO: esto borra datos)
-- Descomenta solo si estás seguro:

/*
DROP TABLE IF EXISTS quote_lines CASCADE;
DROP TABLE IF EXISTS quotes CASCADE;
DROP TABLE IF EXISTS projects CASCADE;

-- Luego ejecuta el script completo projects_quotes_migration.sql
*/
