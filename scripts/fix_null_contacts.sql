-- =====================================================
-- ACTUALIZAR CONTACTOS CON VALORES NULL
-- =====================================================

-- 1. Actualizar contactos con status NULL a 'lead'
UPDATE contacts
SET status = 'lead'
WHERE status IS NULL;

-- 2. Actualizar contactos con full_name NULL
UPDATE contacts
SET full_name = 'Sin nombre'
WHERE full_name IS NULL OR full_name = '';

-- 3. Verificar resultado
SELECT 
    id,
    full_name,
    email,
    status,
    created_at
FROM contacts
ORDER BY created_at DESC;

SELECT 'Contactos actualizados correctamente' as status;
