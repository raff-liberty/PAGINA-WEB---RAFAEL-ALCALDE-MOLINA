-- =====================================================
-- SIMPLIFICACIÓN COMPLETA DEL SISTEMA DE CONTACTOS
-- =====================================================

-- PASO 1: Eliminar TODAS las políticas RLS existentes
DROP POLICY IF EXISTS "Allow public insert on contacts" ON contacts;
DROP POLICY IF EXISTS "Allow public update on contacts" ON contacts;
DROP POLICY IF EXISTS "Allow public select on contacts" ON contacts;
DROP POLICY IF EXISTS "Allow authenticated all on contacts" ON contacts;
DROP POLICY IF EXISTS "Allow authenticated select on contacts" ON contacts;
DROP POLICY IF EXISTS "Allow public insert on contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow authenticated all on contact_messages" ON contact_messages;

-- PASO 2: Crear políticas ULTRA-SIMPLES

-- Permitir a usuarios públicos INSERTAR contactos (formularios)
CREATE POLICY "public_insert_contacts"
ON contacts FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Permitir a usuarios autenticados VER TODO
CREATE POLICY "authenticated_select_all"
ON contacts FOR SELECT
TO authenticated
USING (true);

-- Permitir a usuarios autenticados ACTUALIZAR TODO
CREATE POLICY "authenticated_update_all"
ON contacts FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Permitir a usuarios autenticados ELIMINAR TODO
CREATE POLICY "authenticated_delete_all"
ON contacts FOR DELETE
TO authenticated
USING (true);

-- PASO 3: Asegurar que RLS está habilitado
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- PASO 4: Verificar políticas
SELECT 
    tablename,
    policyname,
    cmd,
    roles
FROM pg_policies
WHERE tablename = 'contacts';

SELECT 'Sistema simplificado - RLS configurado correctamente' as status;
