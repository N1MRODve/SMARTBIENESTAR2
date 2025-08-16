/*
  # Create gamification and wellness tracking system

  1. New Tables
    - `logros` - Achievement system for employees
    - `niveles_empleado` - Employee levels and progression
    - `puntos_bienestar` - Points tracking and history
    - `desafios_bienestar` - Wellness challenges
    - `participacion_desafios` - Employee participation in challenges
    - `progreso_bienestar_empleado` - Employee wellness progress tracking
    - `alertas_bienestar` - Predictive wellness alerts
    - `metricas_departamento` - Department-level metrics

  2. Security
    - Enable RLS on all tables
    - Add policies for proper access control
*/

-- Create logros (achievements) table
CREATE TABLE IF NOT EXISTS logros (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  descripcion text,
  icono text,
  puntos_recompensa integer DEFAULT 0,
  tipo_logro text NOT NULL DEFAULT 'individual',
  condiciones jsonb DEFAULT '{}',
  activo boolean DEFAULT true,
  fecha_creacion timestamptz DEFAULT now(),
  CONSTRAINT tipo_logro_valido CHECK (tipo_logro IN ('individual', 'equipo', 'empresa'))
);

-- Create niveles_empleado table
CREATE TABLE IF NOT EXISTS niveles_empleado (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id uuid REFERENCES usuarios(id) ON DELETE CASCADE,
  nivel_actual integer DEFAULT 1,
  puntos_totales integer DEFAULT 0,
  puntos_nivel_actual integer DEFAULT 0,
  puntos_siguiente_nivel integer DEFAULT 100,
  logros_desbloqueados text[] DEFAULT '{}',
  fecha_ultimo_nivel timestamptz,
  fecha_actualizacion timestamptz DEFAULT now()
);

-- Create puntos_bienestar table
CREATE TABLE IF NOT EXISTS puntos_bienestar (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id uuid REFERENCES usuarios(id) ON DELETE CASCADE,
  puntos integer NOT NULL,
  motivo text NOT NULL,
  tipo_actividad text,
  referencia_id uuid,
  fecha_otorgado timestamptz DEFAULT now(),
  otorgado_por uuid REFERENCES usuarios(id)
);

-- Create desafios_bienestar table
CREATE TABLE IF NOT EXISTS desafios_bienestar (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  descripcion text,
  descripcion_completa text,
  objetivos text[],
  pasos text[],
  imagen text,
  puntos integer DEFAULT 0,
  duracion text,
  dificultad integer DEFAULT 1,
  categoria text,
  fecha_inicio timestamptz DEFAULT now(),
  fecha_fin timestamptz,
  estado text DEFAULT 'activo',
  participantes integer DEFAULT 0,
  empresa_id uuid REFERENCES empresas(id),
  creado_por uuid REFERENCES usuarios(id),
  fecha_creacion timestamptz DEFAULT now(),
  CONSTRAINT estado_valido CHECK (estado IN ('activo', 'completado', 'cancelado')),
  CONSTRAINT dificultad_valida CHECK (dificultad BETWEEN 1 AND 5)
);

-- Create participacion_desafios table
CREATE TABLE IF NOT EXISTS participacion_desafios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id uuid REFERENCES usuarios(id) ON DELETE CASCADE,
  desafio_id uuid REFERENCES desafios_bienestar(id) ON DELETE CASCADE,
  estado text DEFAULT 'activo',
  progreso jsonb DEFAULT '{}',
  fecha_inicio timestamptz DEFAULT now(),
  fecha_completado timestamptz,
  puntos_ganados integer DEFAULT 0,
  CONSTRAINT estado_participacion_valido CHECK (estado IN ('activo', 'completado', 'abandonado'))
);

-- Create progreso_bienestar_empleado table
CREATE TABLE IF NOT EXISTS progreso_bienestar_empleado (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id uuid REFERENCES usuarios(id) ON DELETE CASCADE,
  fecha_registro date DEFAULT CURRENT_DATE,
  puntos_dia integer DEFAULT 0,
  actividades_completadas integer DEFAULT 0,
  tiempo_total_minutos integer DEFAULT 0,
  nivel_energia integer DEFAULT 5,
  nivel_estres integer DEFAULT 5,
  nivel_satisfaccion integer DEFAULT 5,
  notas text,
  fecha_actualizacion timestamptz DEFAULT now(),
  CONSTRAINT nivel_energia_valido CHECK (nivel_energia BETWEEN 1 AND 10),
  CONSTRAINT nivel_estres_valido CHECK (nivel_estres BETWEEN 1 AND 10),
  CONSTRAINT nivel_satisfaccion_valido CHECK (nivel_satisfaccion BETWEEN 1 AND 10)
);

-- Create alertas_bienestar table
CREATE TABLE IF NOT EXISTS alertas_bienestar (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id uuid REFERENCES empresas(id) ON DELETE CASCADE,
  tipo_alerta text NOT NULL,
  nivel_criticidad text DEFAULT 'medio',
  titulo text NOT NULL,
  descripcion text,
  datos_contexto jsonb DEFAULT '{}',
  usuario_afectado uuid REFERENCES usuarios(id),
  departamento_afectado text,
  fecha_deteccion timestamptz DEFAULT now(),
  fecha_resolucion timestamptz,
  estado text DEFAULT 'activa',
  confianza_porcentaje integer DEFAULT 50,
  acciones_recomendadas text[],
  resuelta_por uuid REFERENCES usuarios(id),
  CONSTRAINT tipo_alerta_valido CHECK (tipo_alerta IN ('burnout', 'engagement', 'participacion', 'satisfaccion', 'productividad')),
  CONSTRAINT nivel_criticidad_valido CHECK (nivel_criticidad IN ('bajo', 'medio', 'alto', 'critico')),
  CONSTRAINT estado_alerta_valido CHECK (estado IN ('activa', 'en_revision', 'resuelta', 'descartada'))
);

-- Create metricas_departamento table
CREATE TABLE IF NOT EXISTS metricas_departamento (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id uuid REFERENCES empresas(id) ON DELETE CASCADE,
  departamento text NOT NULL,
  fecha_calculo date DEFAULT CURRENT_DATE,
  total_empleados integer DEFAULT 0,
  empleados_activos integer DEFAULT 0,
  participacion_porcentaje decimal(5,2) DEFAULT 0.0,
  puntos_promedio decimal(8,2) DEFAULT 0.0,
  satisfaccion_promedio decimal(3,2) DEFAULT 0.0,
  tendencia text DEFAULT 'estable',
  indice_bienestar decimal(3,2) DEFAULT 0.0,
  fecha_actualizacion timestamptz DEFAULT now(),
  CONSTRAINT tendencia_valida CHECK (tendencia IN ('positiva', 'estable', 'negativa'))
);

-- Enable RLS on all tables
ALTER TABLE logros ENABLE ROW LEVEL SECURITY;
ALTER TABLE niveles_empleado ENABLE ROW LEVEL SECURITY;
ALTER TABLE puntos_bienestar ENABLE ROW LEVEL SECURITY;
ALTER TABLE desafios_bienestar ENABLE ROW LEVEL SECURITY;
ALTER TABLE participacion_desafios ENABLE ROW LEVEL SECURITY;
ALTER TABLE progreso_bienestar_empleado ENABLE ROW LEVEL SECURITY;
ALTER TABLE alertas_bienestar ENABLE ROW LEVEL SECURITY;
ALTER TABLE metricas_departamento ENABLE ROW LEVEL SECURITY;

-- Create policies for logros
CREATE POLICY "Allow read access for authenticated users"
  ON logros FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow insert for authenticated admins"
  ON logros FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM usuarios 
      WHERE id = auth.uid() 
      AND tipo_usuario IN ('administrador', 'superadmin')
    )
  );

-- Create policies for niveles_empleado
CREATE POLICY "Users can read own levels"
  ON niveles_empleado FOR SELECT TO authenticated
  USING (usuario_id = auth.uid());

CREATE POLICY "Admins can read all levels"
  ON niveles_empleado FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM usuarios 
      WHERE id = auth.uid() 
      AND tipo_usuario IN ('administrador', 'superadmin')
      AND (empresa_id = (SELECT empresa_id FROM usuarios WHERE id = niveles_empleado.usuario_id) OR tipo_usuario = 'superadmin')
    )
  );

CREATE POLICY "System can insert and update levels"
  ON niveles_empleado FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- Create policies for puntos_bienestar
CREATE POLICY "Users can read own points"
  ON puntos_bienestar FOR SELECT TO authenticated
  USING (usuario_id = auth.uid());

CREATE POLICY "Admins can read company points"
  ON puntos_bienestar FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM usuarios u1, usuarios u2
      WHERE u1.id = auth.uid() 
      AND u2.id = puntos_bienestar.usuario_id
      AND u1.tipo_usuario IN ('administrador', 'superadmin')
      AND (u1.empresa_id = u2.empresa_id OR u1.tipo_usuario = 'superadmin')
    )
  );

CREATE POLICY "System can insert points"
  ON puntos_bienestar FOR INSERT TO authenticated
  WITH CHECK (true);

-- Create policies for desafios_bienestar
CREATE POLICY "Users can read active challenges"
  ON desafios_bienestar FOR SELECT TO authenticated
  USING (
    estado = 'activo' AND 
    (empresa_id IS NULL OR empresa_id = (SELECT empresa_id FROM usuarios WHERE id = auth.uid()))
  );

CREATE POLICY "Admins can manage challenges"
  ON desafios_bienestar FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM usuarios 
      WHERE id = auth.uid() 
      AND tipo_usuario IN ('administrador', 'superadmin')
      AND (empresa_id = desafios_bienestar.empresa_id OR tipo_usuario = 'superadmin')
    )
  );

-- Create policies for participacion_desafios
CREATE POLICY "Users can manage own participation"
  ON participacion_desafios FOR ALL TO authenticated
  USING (usuario_id = auth.uid()) WITH CHECK (usuario_id = auth.uid());

CREATE POLICY "Admins can read company participation"
  ON participacion_desafios FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM usuarios u1, usuarios u2
      WHERE u1.id = auth.uid() 
      AND u2.id = participacion_desafios.usuario_id
      AND u1.tipo_usuario IN ('administrador', 'superadmin')
      AND (u1.empresa_id = u2.empresa_id OR u1.tipo_usuario = 'superadmin')
    )
  );

-- Create policies for progreso_bienestar_empleado
CREATE POLICY "Users can manage own progress"
  ON progreso_bienestar_empleado FOR ALL TO authenticated
  USING (usuario_id = auth.uid()) WITH CHECK (usuario_id = auth.uid());

CREATE POLICY "Admins can read company progress"
  ON progreso_bienestar_empleado FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM usuarios u1, usuarios u2
      WHERE u1.id = auth.uid() 
      AND u2.id = progreso_bienestar_empleado.usuario_id
      AND u1.tipo_usuario IN ('administrador', 'superadmin')
      AND (u1.empresa_id = u2.empresa_id OR u1.tipo_usuario = 'superadmin')
    )
  );

-- Create policies for alertas_bienestar
CREATE POLICY "Admins can read company alerts"
  ON alertas_bienestar FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM usuarios 
      WHERE id = auth.uid() 
      AND tipo_usuario IN ('administrador', 'superadmin')
      AND (empresa_id = alertas_bienestar.empresa_id OR tipo_usuario = 'superadmin')
    )
  );

CREATE POLICY "System can manage alerts"
  ON alertas_bienestar FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- Create policies for metricas_departamento
CREATE POLICY "Admins can read company metrics"
  ON metricas_departamento FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM usuarios 
      WHERE id = auth.uid() 
      AND tipo_usuario IN ('administrador', 'superadmin')
      AND (empresa_id = metricas_departamento.empresa_id OR tipo_usuario = 'superadmin')
    )
  );

CREATE POLICY "System can manage metrics"
  ON metricas_departamento FOR ALL TO authenticated
  USING (true) WITH CHECK (true);