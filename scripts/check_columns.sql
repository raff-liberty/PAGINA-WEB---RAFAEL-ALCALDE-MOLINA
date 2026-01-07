-- =====================================================
-- DIAGNÓSTICO: Ver estructura REAL de la tabla
-- =====================================================

-- Ver TODAS las columnas que realmente existen
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'contacts'
ORDER BY ordinal_position;
