-- =====================================================
-- Mejoras en Presupuestos: Secciones y Comentarios
-- =====================================================

-- 1. Añadir campos a quote_lines para secciones y comentarios
ALTER TABLE quote_lines 
ADD COLUMN IF NOT EXISTS section TEXT,
ADD COLUMN IF NOT EXISTS comment TEXT,
ADD COLUMN IF NOT EXISTS section_order INTEGER DEFAULT 0;

-- 2. Crear índice para ordenar por sección
CREATE INDEX IF NOT EXISTS idx_quote_lines_section ON quote_lines(quote_id, section_order, position);

-- 3. Verificar los cambios
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'quote_lines'
ORDER BY ordinal_position;

-- =====================================================
-- FIN DE LA MIGRACIÓN
-- =====================================================
