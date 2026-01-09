-- =====================================================
-- SCRIPT: Corrección de Permisos y RLS para Analíticas
-- =====================================================

-- 1. Asegurar que las tablas existen (por si acaso)
-- (Ya deberían existir por el script anterior)

-- 2. Conceder permisos explícitos a los roles de Supabase
-- Esto es crucial si los defaults del schema fueron modificados
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.analytics_sessions TO anon, authenticated;
GRANT ALL ON public.analytics_page_views TO anon, authenticated;
GRANT ALL ON public.analytics_events TO anon, authenticated;
GRANT ALL ON SEQUENCE public.analytics_page_views_id_seq TO anon, authenticated;
GRANT ALL ON SEQUENCE public.analytics_events_id_seq TO anon, authenticated;

-- 3. Actualizar Políticas RLS para ser más robustas
-- Usamos 'FOR ALL' o definimos explícitamente para anon y authenticated

-- Tabla: analytics_sessions
DROP POLICY IF EXISTS "Allow anonymous inserts on sessions" ON public.analytics_sessions;
CREATE POLICY "Allow anyone to insert sessions" ON public.analytics_sessions 
    FOR INSERT TO anon, authenticated 
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anonymous updates on sessions" ON public.analytics_sessions;
CREATE POLICY "Allow anyone to update sessions" ON public.analytics_sessions 
    FOR UPDATE TO anon, authenticated 
    USING (true);

DROP POLICY IF EXISTS "Allow admin to select sessions" ON public.analytics_sessions;
CREATE POLICY "Allow authenticated to select sessions" ON public.analytics_sessions 
    FOR SELECT TO authenticated 
    USING (true);

-- Tabla: analytics_page_views
DROP POLICY IF EXISTS "Allow anonymous inserts on page_views" ON public.analytics_page_views;
CREATE POLICY "Allow anyone to insert page_views" ON public.analytics_page_views 
    FOR INSERT TO anon, authenticated 
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admin to select page_views" ON public.analytics_page_views;
CREATE POLICY "Allow authenticated to select page_views" ON public.analytics_page_views 
    FOR SELECT TO authenticated 
    USING (true);

-- Tabla: analytics_events
DROP POLICY IF EXISTS "Allow anonymous inserts on events" ON public.analytics_events;
CREATE POLICY "Allow anyone to insert events" ON public.analytics_events 
    FOR INSERT TO anon, authenticated 
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admin to select events" ON public.analytics_events;
CREATE POLICY "Allow authenticated to select events" ON public.analytics_events 
    FOR SELECT TO authenticated 
    USING (true);

-- 4. Forzar recarga (importante para que PostgREST vea los cambios de GRANT)
NOTIFY pgrst, 'reload schema';
