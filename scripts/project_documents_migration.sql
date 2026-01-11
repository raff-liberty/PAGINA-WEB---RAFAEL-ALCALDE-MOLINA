-- =====================================================
-- Project and Task Documents System
-- Sistema de gestión de documentos para proyectos y tareas
-- =====================================================

-- 1. TABLA: project_documents
-- Documentos asociados a proyectos
CREATE TABLE IF NOT EXISTS project_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT,
  category TEXT DEFAULT 'general'
    CHECK (category IN ('general','contract','technical','delivery','invoice','other')),
  uploaded_by TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABLA: task_documents
-- Documentos asociados a tareas específicas
CREATE TABLE IF NOT EXISTS task_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID REFERENCES project_tasks(id) ON DELETE CASCADE NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT,
  uploaded_by TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABLA: task_notes
-- Notas expandibles para desarrollo de ideas en tareas
CREATE TABLE IF NOT EXISTS task_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID REFERENCES project_tasks(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  author TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ÍNDICES
CREATE INDEX IF NOT EXISTS idx_project_documents_project_id ON project_documents(project_id);
CREATE INDEX IF NOT EXISTS idx_project_documents_category ON project_documents(category);
CREATE INDEX IF NOT EXISTS idx_task_documents_task_id ON task_documents(task_id);
CREATE INDEX IF NOT EXISTS idx_task_notes_task_id ON task_notes(task_id);

-- 5. TRIGGER: actualizar updated_at en task_notes
CREATE OR REPLACE FUNCTION update_task_notes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_task_notes_updated_at ON task_notes;
CREATE TRIGGER trigger_task_notes_updated_at
BEFORE UPDATE ON task_notes
FOR EACH ROW EXECUTE FUNCTION update_task_notes_updated_at();

-- 6. Crear bucket de storage para documentos (si no existe)
-- Esto se debe ejecutar manualmente en Supabase Storage
-- Bucket name: 'project-documents'

-- 7. RLS Policies

-- project_documents
ALTER TABLE project_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read project_documents" ON project_documents
  FOR SELECT USING (true);

CREATE POLICY "Allow insert project_documents" ON project_documents
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update project_documents" ON project_documents
  FOR UPDATE USING (true);

CREATE POLICY "Allow delete project_documents" ON project_documents
  FOR DELETE USING (true);

-- task_documents
ALTER TABLE task_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read task_documents" ON task_documents
  FOR SELECT USING (true);

CREATE POLICY "Allow insert task_documents" ON task_documents
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update task_documents" ON task_documents
  FOR UPDATE USING (true);

CREATE POLICY "Allow delete task_documents" ON task_documents
  FOR DELETE USING (true);

-- task_notes
ALTER TABLE task_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read task_notes" ON task_notes
  FOR SELECT USING (true);

CREATE POLICY "Allow insert task_notes" ON task_notes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update task_notes" ON task_notes
  FOR UPDATE USING (true);

CREATE POLICY "Allow delete task_notes" ON task_notes
  FOR DELETE USING (true);

-- =====================================================
-- FIN DE LA MIGRACIÓN
-- =====================================================

-- IMPORTANTE: Después de ejecutar este script, debes:
-- 1. Ir a Supabase Storage
-- 2. Crear un bucket llamado 'project-documents'
-- 3. Configurar las políticas de acceso público si es necesario
