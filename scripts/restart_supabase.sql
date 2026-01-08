-- Forzar recarga completa del schema de Supabase
NOTIFY pgrst, 'reload schema';
NOTIFY pgrst, 'reload config';

SELECT 'Schema recargado - espera 30 segundos y recarga la página' as status;
