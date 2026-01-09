-- =====================================================
-- SCRIPT: Datos de Prueba para Analíticas
-- =====================================================

-- 1. Limpiar datos previos (OPCIONAL, descomentar si se quiere empezar de cero)
-- TRUNCATE public.analytics_events, public.analytics_page_views, public.analytics_sessions CASCADE;

DO $$
DECLARE
    v_session_id UUID;
    v_visitor_id UUID := gen_random_uuid();
    v_date TIMESTAMPTZ;
BEGIN
    -- --- USUARIO 1: España, Madrid, Desktop, Chrome (Varios días) ---
    v_visitor_id := gen_random_uuid();
    FOR i IN 0..7 LOOP
        v_date := now() - (i || ' days')::interval;
        
        INSERT INTO public.analytics_sessions (id, visitor_id, created_at, updated_at, browser, os, device, country, region, region_code, city, referrer)
        VALUES (gen_random_uuid(), v_visitor_id, v_date, v_date + '30 minutes'::interval, 'Chrome', 'Windows', 'Desktop', 'Spain', 'Madrid', 'MD', 'Madrid', 'Directo')
        RETURNING id INTO v_session_id;

        -- Vistas de página
        INSERT INTO public.analytics_page_views (session_id, path, title, created_at) VALUES 
        (v_session_id, '/', 'Home', v_date),
        (v_session_id, '/servicios', 'Servicios', v_date + '2 minutes'::interval);
    END LOOP;

    -- --- USUARIO 2: España, Murcia, Desktop, Chrome ---
    v_visitor_id := gen_random_uuid();
    v_date := now() - '5 hours'::interval;
    INSERT INTO public.analytics_sessions (id, visitor_id, created_at, updated_at, browser, os, device, country, region, region_code, city, referrer)
    VALUES (gen_random_uuid(), v_visitor_id, v_date, v_date + '1 hour'::interval, 'Chrome', 'Windows', 'Desktop', 'Spain', 'Murcia', 'MC', 'Murcia', 'Google')
    RETURNING id INTO v_session_id;

    INSERT INTO public.analytics_page_views (session_id, path, title, created_at) VALUES 
    (v_session_id, '/', 'Home', v_date),
    (v_session_id, '/admin', 'Admin', v_date + '10 minutes'::interval);

    -- --- USUARIO 3: España, Valencia, Mobile, Safari ---
    v_visitor_id := gen_random_uuid();
    v_date := now() - '1 day'::interval;
    INSERT INTO public.analytics_sessions (id, visitor_id, created_at, updated_at, browser, os, device, country, region, region_code, city, referrer)
    VALUES (gen_random_uuid(), v_visitor_id, v_date, v_date + '15 minutes'::interval, 'Safari', 'iOS', 'Mobile', 'Spain', 'Valencia', 'VC', 'Valencia', 'Instagram')
    RETURNING id INTO v_session_id;

    -- --- USUARIO 4: México, Mobile, Safari ---
    v_visitor_id := gen_random_uuid();
    v_date := now() - '2 hours'::interval;
    
    INSERT INTO public.analytics_sessions (id, visitor_id, created_at, updated_at, browser, os, device, country, region, region_code, city, referrer)
    VALUES (gen_random_uuid(), v_visitor_id, v_date, v_date + '10 minutes'::interval, 'Safari', 'iOS', 'Mobile', 'Mexico', 'Ciudad de Mexico', 'CM', 'Mexico City', 'Direct')
    RETURNING id INTO v_session_id;

    -- --- USUARIO 5: USA, Desktop, Firefox ---
    v_visitor_id := gen_random_uuid();
    v_date := now() - '3 days'::interval;
    
    INSERT INTO public.analytics_sessions (id, visitor_id, created_at, updated_at, browser, os, device, country, region, region_code, city, referrer)
    VALUES (gen_random_uuid(), v_visitor_id, v_date, v_date + '15 minutes'::interval, 'Firefox', 'MacOS', 'Desktop', 'United States', 'California', 'CA', 'Los Angeles', 'Google')
    RETURNING id INTO v_session_id;

END $$;
