-- =====================================================
-- VERIFICAR CONTACTOS EXISTENTES
-- =====================================================

-- 1. Ver TODOS los contactos sin filtros
SELECT 
    id,
    full_name,
    email,
    created_at
FROM contacts
ORDER BY created_at DESC;

-- 2. Contar contactos totales
SELECT COUNT(*) as total_contacts FROM contacts;

-- 3. Ver estructura completa de UN contacto
SELECT * FROM contacts LIMIT 1;

-- 4. Verificar si hay contactos con full_name NULL
SELECT 
    id,
    full_name,
    email,
    created_at
FROM contacts
WHERE full_name IS NULL OR full_name = '';
