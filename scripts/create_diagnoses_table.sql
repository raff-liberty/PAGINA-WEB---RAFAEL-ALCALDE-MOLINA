-- =====================================================
-- CREACIÓN DE TABLA DE DIAGNÓSTICOS (Autopsia del Caos)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.diagnoses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
    full_name TEXT,
    email TEXT,
    detected_branch TEXT, -- AGENDA, DIRECTO, PRESUPUESTOS, MIXTO
    chaos_level TEXT,     -- CAOS BAJO, CAOS FUNCIONAL, CAOS CRÍTICO
    urgency TEXT,         -- Baja, Media, Alta
    responses JSONB NOT NULL,
    ai_analysis JSONB,
    source TEXT DEFAULT 'Web',
    status TEXT DEFAULT 'nuevo', -- nuevo, procesado, contactado, descartado
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.diagnoses ENABLE ROW LEVEL SECURITY;

-- Políticas
DROP POLICY IF EXISTS "Permitir inserción pública" ON public.diagnoses;
CREATE POLICY "Permitir inserción pública" ON public.diagnoses 
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Solo autenticados pueden ver diagnósticos" ON public.diagnoses;
CREATE POLICY "Solo autenticados pueden ver diagnósticos" ON public.diagnoses 
    FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Solo autenticados pueden editar diagnósticos" ON public.diagnoses;
CREATE POLICY "Solo autenticados pueden editar diagnósticos" ON public.diagnoses 
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_diagnoses_updated_at
    BEFORE UPDATE ON public.diagnoses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Notificar recarga de schema
NOTIFY pgrst, 'reload schema';
