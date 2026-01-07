-- =====================================================
-- DIAGNÓSTICO COMPLETO: Schema de Contacts
-- =====================================================

-- 1. Ver estructura actual de la tabla contacts
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'contacts'
ORDER BY ordinal_position;

-- 2. Ver todas las políticas RLS actuales
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename IN ('contacts', 'contact_messages')
ORDER BY tablename, policyname;

-- 3. Verificar relaciones (foreign keys)
SELECT
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' 
  AND tc.table_name IN ('contacts', 'contact_messages', 'projects');

-- 4. Forzar recarga del schema
NOTIFY pgrst, 'reload schema';

SELECT 'Diagnóstico completo ejecutado' as status;
