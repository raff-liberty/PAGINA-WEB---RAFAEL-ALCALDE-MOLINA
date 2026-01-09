-- =====================================================
-- SCRIPT: Creación de Tablas de Analíticas
-- =====================================================

-- 1. Tabla de Sesiones
CREATE TABLE IF NOT EXISTS public.analytics_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_id UUID NOT NULL, -- Un UUID persistente en localStorage del cliente
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    browser TEXT,
    os TEXT,
    device TEXT,
    referrer TEXT,
    user_agent TEXT,
    screen_resolution TEXT,
    language TEXT,
    country TEXT,
    city TEXT
);

-- 2. Tabla de Páginas Vistas
CREATE TABLE IF NOT EXISTS public.analytics_page_views (
    id BIGSERIAL PRIMARY KEY,
    session_id UUID REFERENCES public.analytics_sessions(id) ON DELETE CASCADE,
    path TEXT NOT NULL,
    title TEXT,
    referrer TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Tabla de Eventos
CREATE TABLE IF NOT EXISTS public.analytics_events (
    id BIGSERIAL PRIMARY KEY,
    session_id UUID REFERENCES public.analytics_sessions(id) ON DELETE CASCADE,
    event_name TEXT NOT NULL,
    event_data JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Índices para mejorar el performance de las consultas
CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON public.analytics_page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON public.analytics_page_views(created_at);
CREATE INDEX IF NOT EXISTS idx_events_session_id ON public.analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_events_name ON public.analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_sessions_visitor_id ON public.analytics_sessions(visitor_id);
CREATE INDEX IF NOT EXISTS idx_sessions_created_at ON public.analytics_sessions(created_at);

-- Configuración de RLS (Row Level Security)
ALTER TABLE public.analytics_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- 1. Políticas de Inserción Anónima (Tracking)
DROP POLICY IF EXISTS "Allow anonymous inserts on sessions" ON public.analytics_sessions;
CREATE POLICY "Allow anonymous inserts on sessions" ON public.analytics_sessions FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anonymous inserts on page_views" ON public.analytics_page_views;
CREATE POLICY "Allow anonymous inserts on page_views" ON public.analytics_page_views FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anonymous inserts on events" ON public.analytics_events;
CREATE POLICY "Allow anonymous inserts on events" ON public.analytics_events FOR INSERT WITH CHECK (true);

-- 2. Políticas de Seleccion para Administradores
DROP POLICY IF EXISTS "Allow admin to select sessions" ON public.analytics_sessions;
CREATE POLICY "Allow admin to select sessions" ON public.analytics_sessions FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow admin to select page_views" ON public.analytics_page_views;
CREATE POLICY "Allow admin to select page_views" ON public.analytics_page_views FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow admin to select events" ON public.analytics_events;
CREATE POLICY "Allow admin to select events" ON public.analytics_events FOR SELECT USING (auth.role() = 'authenticated');

-- 3. Permitir actualización de la sesión por el cliente (para el updated_at)
DROP POLICY IF EXISTS "Allow anonymous updates on sessions" ON public.analytics_sessions;
CREATE POLICY "Allow anonymous updates on sessions" ON public.analytics_sessions FOR UPDATE USING (true);

-- Forzar recarga del schema cache
NOTIFY pgrst, 'reload schema';
