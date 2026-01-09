-- =====================================================
-- SCRIPT: Ampliación de Columnas Geográficas
-- =====================================================

-- 1. Añadir columnas de región y provincia
ALTER TABLE public.analytics_sessions 
ADD COLUMN IF NOT EXISTS region TEXT,
ADD COLUMN IF NOT EXISTS region_code TEXT;

-- 2. Refrescar schema cache
NOTIFY pgrst, 'reload schema';
