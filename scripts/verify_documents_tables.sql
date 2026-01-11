-- =====================================================
-- Script de Verificación - Sistema de Documentos
-- =====================================================

-- 1. Verificar que las tablas existen
SELECT 
    table_name,
    (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_name IN ('project_documents', 'task_documents', 'task_notes')
ORDER BY table_name;

-- 2. Verificar columnas de project_documents
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'project_documents'
ORDER BY ordinal_position;

-- 3. Verificar columnas de task_documents
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'task_documents'
ORDER BY ordinal_position;

-- 4. Verificar columnas de task_notes
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'task_notes'
ORDER BY ordinal_position;

-- 5. Verificar políticas RLS
SELECT 
    schemaname,
    tablename,
    policyname,
    cmd
FROM pg_policies
WHERE tablename IN ('project_documents', 'task_documents', 'task_notes')
ORDER BY tablename, policyname;

-- =====================================================
-- Si todas las consultas devuelven resultados, 
-- las tablas se crearon correctamente.
-- =====================================================
