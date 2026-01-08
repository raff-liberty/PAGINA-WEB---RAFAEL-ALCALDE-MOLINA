-- =====================================================
-- CORRECCIÓN RLS PARA DIAGNÓSTICOS Y FORMULARIOS
-- =====================================================

-- 1. Permitir SELECT público en contacts (necesario para buscar si ya existe)
DROP POLICY IF EXISTS "public_select_contacts" ON contacts;
CREATE POLICY "public_select_contacts"
ON contacts FOR SELECT
TO anon
USING (true); -- En un entorno real se filtraría más, pero aquí permitimos búsqueda para evitar duplicados en el flujo PASS

-- 2. Permitir UPDATE público en contacts (necesario para actualizar leads existentes)
DROP POLICY IF EXISTS "public_update_contacts" ON contacts;
CREATE POLICY "public_update_contacts"
ON contacts FOR UPDATE
TO anon
USING (true)
WITH CHECK (true);

-- 3. Asegurar que interacciones también permite inserción pública
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_insert_interactions" ON interactions;
CREATE POLICY "public_insert_interactions"
ON interactions FOR INSERT
TO anon
WITH CHECK (true);

-- 4. Asegurar que diagnósticos permite inserción pública (ya estaba, pero reforzamos)
ALTER TABLE diagnoses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_insert_diagnoses" ON diagnoses;
CREATE POLICY "public_insert_diagnoses"
ON diagnoses FOR INSERT
TO anon
WITH CHECK (true);

SELECT 'RLS actualizado para permitir flujo de Autopsia' as status;
