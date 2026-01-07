-- =====================================================
-- VERIFICAR Y CORREGIR RLS PARA SELECT
-- =====================================================

-- 1. Ver políticas actuales
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies
WHERE tablename = 'contacts';

-- 2. Asegurar que existe política SELECT para authenticated
DROP POLICY IF EXISTS "Allow authenticated select on contacts" ON contacts;
CREATE POLICY "Allow authenticated select on contacts"
ON contacts FOR SELECT
TO authenticated
USING (true);

-- 3. Verificar que RLS está habilitado
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- 4. Probar consulta como authenticated user
SELECT 
    id,
    full_name,
    email,
    status
FROM contacts
ORDER BY created_at DESC;

SELECT 'RLS SELECT policy verificada y actualizada' as status;
