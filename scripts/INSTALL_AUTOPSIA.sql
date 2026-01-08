-- =====================================================
-- SCRIPT DE INSTALACIÓN COMPLETA: AUTOPSIA DEL CAOS
-- =====================================================

-- 1. CREACIÓN DE LA TABLA (Si no existe)
CREATE TABLE IF NOT EXISTS public.diagnoses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
    full_name TEXT,
    email TEXT,
    detected_branch TEXT,
    chaos_level TEXT,
    urgency TEXT,
    responses JSONB NOT NULL,
    ai_analysis JSONB,
    source TEXT DEFAULT 'Web',
    status TEXT DEFAULT 'nuevo',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. HABILITAR SEGURIDAD (RLS)
ALTER TABLE public.diagnoses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interactions ENABLE ROW LEVEL SECURITY;

-- 3. POLÍTICAS PARA "DIAGNOSES"
DROP POLICY IF EXISTS "Permitir inserción pública" ON public.diagnoses;
CREATE POLICY "Permitir inserción pública" ON public.diagnoses 
    FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Solo autenticados ven diagnósticos" ON public.diagnoses;
CREATE POLICY "Solo autenticados ven diagnósticos" ON public.diagnoses 
    FOR SELECT TO authenticated USING (true);

-- 4. POLÍTICAS PARA "CONTACTS" (Clave para que el formulario no falle)
DROP POLICY IF EXISTS "public_insert_contacts" ON public.contacts;
CREATE POLICY "public_insert_contacts" ON public.contacts 
    FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "public_select_contacts" ON public.contacts;
CREATE POLICY "public_select_contacts" ON public.contacts 
    FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_update_contacts" ON public.contacts;
CREATE POLICY "public_update_contacts" ON public.contacts 
    FOR UPDATE TO anon, authenticated USING (true);

-- 5. POLÍTICAS PARA "INTERACTIONS"
DROP POLICY IF EXISTS "public_insert_interactions" ON public.interactions;
CREATE POLICY "public_insert_interactions" ON public.interactions 
    FOR INSERT TO anon, authenticated WITH CHECK (true);

-- 6. NOTIFICAR RECARGA
NOTIFY pgrst, 'reload schema';

SELECT 'Tablas y Permisos configurados correctamente' as status;
