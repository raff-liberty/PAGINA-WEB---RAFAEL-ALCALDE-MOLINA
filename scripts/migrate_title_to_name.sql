-- =====================================================
-- Migrar de 'title' a 'name' en la tabla projects
-- =====================================================

-- 1. Copiar datos de 'title' a 'name' (para los registros existentes)
UPDATE projects 
SET name = title 
WHERE title IS NOT NULL AND name = 'Proyecto sin nombre';

-- 2. Eliminar la columna 'title' (ya no la necesitamos)
ALTER TABLE projects DROP COLUMN IF EXISTS title;

-- 3. Verificar que todo está correcto
SELECT id, name, description, status, created_at
FROM projects
ORDER BY created_at DESC
LIMIT 5;
