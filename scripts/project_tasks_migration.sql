-- =====================================================
-- Project Tasks Migration
-- Sistema de tareas/hitos para proyectos
-- =====================================================

-- 1. TABLA: project_tasks
CREATE TABLE IF NOT EXISTS project_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  assigned_to TEXT,
  status TEXT DEFAULT 'pending' 
    CHECK (status IN ('pending','in_progress','completed','blocked','cancelled')),
  priority TEXT DEFAULT 'media'
    CHECK (priority IN ('baja','media','alta','urgente')),
  due_date DATE,
  completed_at TIMESTAMPTZ,
  position INTEGER DEFAULT 0,
  is_milestone BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ÍNDICES
CREATE INDEX IF NOT EXISTS idx_project_tasks_project_id ON project_tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_project_tasks_status ON project_tasks(status);
CREATE INDEX IF NOT EXISTS idx_project_tasks_position ON project_tasks(position);

-- 3. TRIGGER: actualizar updated_at
CREATE OR REPLACE FUNCTION update_project_tasks_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_project_tasks_updated_at ON project_tasks;
CREATE TRIGGER trigger_project_tasks_updated_at
BEFORE UPDATE ON project_tasks
FOR EACH ROW EXECUTE FUNCTION update_project_tasks_updated_at();

-- 4. TRIGGER: marcar completed_at cuando status = completed
CREATE OR REPLACE FUNCTION set_task_completed_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    NEW.completed_at = NOW();
  ELSIF NEW.status != 'completed' THEN
    NEW.completed_at = NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_set_task_completed_at ON project_tasks;
CREATE TRIGGER trigger_set_task_completed_at
BEFORE UPDATE ON project_tasks
FOR EACH ROW EXECUTE FUNCTION set_task_completed_at();

-- 5. RLS Policies
ALTER TABLE project_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read project_tasks" ON project_tasks
  FOR SELECT USING (true);

CREATE POLICY "Allow insert project_tasks" ON project_tasks
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update project_tasks" ON project_tasks
  FOR UPDATE USING (true);

CREATE POLICY "Allow delete project_tasks" ON project_tasks
  FOR DELETE USING (true);

-- =====================================================
-- FIN DE LA MIGRACIÓN
-- =====================================================
