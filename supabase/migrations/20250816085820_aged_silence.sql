/*
  # Create employee system tables and functions

  1. New Tables
    - `perfil_empleados` - Employee profiles with wellness data
    - `reservas` - Session reservations
    - `sesiones` - Wellness sessions
    - `servicios` - Available services
    - `encuestas` - Surveys
    - `participantes_encuesta` - Survey participants

  2. Functions
    - Employee dashboard statistics
    - Wellness progress tracking
    - Activity recommendations

  3. Security
    - Enable RLS on all tables
    - Add policies for proper access control
*/

-- Create perfil_empleados table if not exists
CREATE TABLE IF NOT EXISTS perfil_empleados (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id uuid REFERENCES usuarios(id) ON DELETE CASCADE,
  cargo text,
  departamento text,
  puntos_bienestar integer DEFAULT 0,
  desafios_completados integer DEFAULT 0,
  nivel_actividad text DEFAULT 'Nuevo',
  ultima_participacion timestamptz,
  preferencias_bienestar text,
  fecha_creacion timestamptz DEFAULT now(),
  fecha_actualizacion timestamptz DEFAULT now()
);

-- Create servicios table if not exists
CREATE TABLE IF NOT EXISTS servicios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  tipo text NOT NULL,
  descripcion text,
  imagen_url text,
  activo boolean DEFAULT true,
  fecha_creacion timestamptz DEFAULT now()
);

-- Create sesiones table if not exists
CREATE TABLE IF NOT EXISTS sesiones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  descripcion text,
  servicio_id uuid REFERENCES servicios(id),
  colaborador_id uuid REFERENCES usuarios(id),
  empresa_id uuid REFERENCES empresas(id),
  fecha_inicio timestamptz NOT NULL,
  fecha_fin timestamptz NOT NULL,
  modalidad text NOT NULL DEFAULT 'online',
  ubicacion text,
  capacidad_maxima integer DEFAULT 10,
  enlace_reunion text,
  codigo_acceso text,
  puntos_asistencia integer DEFAULT 0,
  estado_sesion text DEFAULT 'programada',
  activo boolean DEFAULT true,
  fecha_creacion timestamptz DEFAULT now(),
  CONSTRAINT modalidad_valida CHECK (modalidad IN ('online', 'presencial')),
  CONSTRAINT estado_sesion_valido CHECK (estado_sesion IN ('programada', 'en_curso', 'completada', 'cancelada'))
);

-- Create reservas table if not exists
CREATE TABLE IF NOT EXISTS reservas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sesion_id uuid REFERENCES sesiones(id) ON DELETE CASCADE,
  usuario_id uuid REFERENCES usuarios(id) ON DELETE CASCADE,
  estado text DEFAULT 'confirmada',
  fecha_reserva timestamptz DEFAULT now(),
  fecha_cancelacion timestamptz,
  asistio boolean,
  calificacion integer,
  comentario text,
  puntos_otorgados integer DEFAULT 0,
  checkin_time timestamptz,
  CONSTRAINT estado_valido CHECK (estado IN ('pendiente', 'confirmada', 'cancelada', 'completada')),
  CONSTRAINT calificacion_valida CHECK (calificacion BETWEEN 1 AND 5)
);

-- Create encuestas table if not exists
CREATE TABLE IF NOT EXISTS encuestas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id uuid REFERENCES empresas(id) ON DELETE CASCADE,
  titulo text NOT NULL,
  descripcion text,
  fecha_inicio timestamptz DEFAULT now(),
  fecha_fin timestamptz,
  estado text DEFAULT 'borrador',
  activo boolean DEFAULT true,
  fecha_creacion timestamptz DEFAULT now(),
  respuestas_recibidas integer DEFAULT 0,
  total_invitados integer DEFAULT 0,
  CONSTRAINT estado_valido CHECK (estado IN ('borrador', 'activa', 'finalizada', 'archivada'))
);

-- Create participantes_encuesta table if not exists
CREATE TABLE IF NOT EXISTS participantes_encuesta (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  encuesta_id uuid REFERENCES encuestas(id) ON DELETE CASCADE,
  usuario_id uuid REFERENCES usuarios(id) ON DELETE CASCADE,
  estado text DEFAULT 'pendiente',
  fecha_invitacion timestamptz DEFAULT now(),
  fecha_completado timestamptz,
  CONSTRAINT estado_valido CHECK (estado IN ('pendiente', 'completada', 'expirada'))
);

-- Enable RLS on all tables
ALTER TABLE perfil_empleados ENABLE ROW LEVEL SECURITY;
ALTER TABLE servicios ENABLE ROW LEVEL SECURITY;
ALTER TABLE sesiones ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservas ENABLE ROW LEVEL SECURITY;
ALTER TABLE encuestas ENABLE ROW LEVEL SECURITY;
ALTER TABLE participantes_encuesta ENABLE ROW LEVEL SECURITY;

-- Create policies for perfil_empleados
CREATE POLICY "Users can read own profile"
  ON perfil_empleados FOR SELECT TO authenticated
  USING (usuario_id = auth.uid());

CREATE POLICY "Admins can read company profiles"
  ON perfil_empleados FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM usuarios u1, usuarios u2
      WHERE u1.id = auth.uid() 
      AND u2.id = perfil_empleados.usuario_id
      AND u1.tipo_usuario IN ('administrador', 'superadmin')
      AND (u1.empresa_id = u2.empresa_id OR u1.tipo_usuario = 'superadmin')
    )
  );

CREATE POLICY "Users can update own profile"
  ON perfil_empleados FOR UPDATE TO authenticated
  USING (usuario_id = auth.uid());

-- Create policies for servicios
CREATE POLICY "Allow read access for authenticated users"
  ON servicios FOR SELECT TO authenticated
  USING (activo = true);

-- Create policies for sesiones
CREATE POLICY "Users can read company sessions"
  ON sesiones FOR SELECT TO authenticated
  USING (
    empresa_id = (SELECT empresa_id FROM usuarios WHERE id = auth.uid())
    OR empresa_id IS NULL
  );

CREATE POLICY "Collaborators can manage own sessions"
  ON sesiones FOR ALL TO authenticated
  USING (colaborador_id = auth.uid())
  WITH CHECK (colaborador_id = auth.uid());

-- Create policies for reservas
CREATE POLICY "Users can manage own reservations"
  ON reservas FOR ALL TO authenticated
  USING (usuario_id = auth.uid())
  WITH CHECK (usuario_id = auth.uid());

CREATE POLICY "Admins can read company reservations"
  ON reservas FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM usuarios u1, usuarios u2
      WHERE u1.id = auth.uid() 
      AND u2.id = reservas.usuario_id
      AND u1.tipo_usuario IN ('administrador', 'superadmin')
      AND (u1.empresa_id = u2.empresa_id OR u1.tipo_usuario = 'superadmin')
    )
  );

-- Create policies for encuestas
CREATE POLICY "Users can read company surveys"
  ON encuestas FOR SELECT TO authenticated
  USING (
    empresa_id = (SELECT empresa_id FROM usuarios WHERE id = auth.uid())
  );

CREATE POLICY "Admins can manage company surveys"
  ON encuestas FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM usuarios 
      WHERE id = auth.uid() 
      AND tipo_usuario IN ('administrador', 'superadmin')
      AND (empresa_id = encuestas.empresa_id OR tipo_usuario = 'superadmin')
    )
  );

-- Create policies for participantes_encuesta
CREATE POLICY "Users can read own survey participation"
  ON participantes_encuesta FOR SELECT TO authenticated
  USING (usuario_id = auth.uid());

CREATE POLICY "Admins can manage company survey participation"
  ON participantes_encuesta FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM usuarios u1, usuarios u2
      WHERE u1.id = auth.uid() 
      AND u2.id = participantes_encuesta.usuario_id
      AND u1.tipo_usuario IN ('administrador', 'superadmin')
      AND (u1.empresa_id = u2.empresa_id OR u1.tipo_usuario = 'superadmin')
    )
  );

-- Function to get employee dashboard stats
CREATE OR REPLACE FUNCTION get_employee_dashboard_stats(usuario_id_param uuid)
RETURNS TABLE (
  puntos_bienestar integer,
  desafios_completados integer,
  proximas_sesiones integer,
  encuestas_pendientes integer,
  nivel_actual integer,
  racha_dias integer
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COALESCE(pe.puntos_bienestar, 0) as puntos_bienestar,
    COALESCE(pe.desafios_completados, 0) as desafios_completados,
    (
      SELECT COUNT(*)::integer 
      FROM reservas r
      JOIN sesiones s ON s.id = r.sesion_id
      WHERE r.usuario_id = usuario_id_param 
      AND r.estado = 'confirmada'
      AND s.fecha_inicio > NOW()
    ) as proximas_sesiones,
    (
      SELECT COUNT(*)::integer 
      FROM participantes_encuesta pe_enc
      WHERE pe_enc.usuario_id = usuario_id_param 
      AND pe_enc.estado = 'pendiente'
    ) as encuestas_pendientes,
    COALESCE(ne.nivel_actual, 1) as nivel_actual,
    COALESCE(
      CASE 
        WHEN pe.ultima_participacion IS NOT NULL THEN
          EXTRACT(DAY FROM (NOW() - pe.ultima_participacion))::integer
        ELSE 0
      END, 0
    ) as racha_dias
  FROM usuarios u
  LEFT JOIN perfil_empleados pe ON pe.usuario_id = u.id
  LEFT JOIN niveles_empleado ne ON ne.usuario_id = u.id
  WHERE u.id = usuario_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get employee upcoming sessions
CREATE OR REPLACE FUNCTION get_employee_upcoming_sessions(usuario_id_param uuid)
RETURNS TABLE (
  reserva_id uuid,
  sesion_id uuid,
  titulo text,
  fecha_inicio timestamptz,
  modalidad text,
  ubicacion text,
  colaborador_nombre text,
  servicio_tipo text,
  estado text
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    r.id as reserva_id,
    s.id as sesion_id,
    s.titulo,
    s.fecha_inicio,
    s.modalidad,
    s.ubicacion,
    uc.nombre || ' ' || uc.apellido as colaborador_nombre,
    srv.tipo as servicio_tipo,
    r.estado
  FROM reservas r
  JOIN sesiones s ON s.id = r.sesion_id
  LEFT JOIN usuarios uc ON uc.id = s.colaborador_id
  LEFT JOIN servicios srv ON srv.id = s.servicio_id
  WHERE r.usuario_id = usuario_id_param
  AND r.estado = 'confirmada'
  AND s.fecha_inicio > NOW()
  ORDER BY s.fecha_inicio ASC
  LIMIT 5;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get employee pending surveys
CREATE OR REPLACE FUNCTION get_employee_pending_surveys(usuario_id_param uuid)
RETURNS TABLE (
  participacion_id uuid,
  encuesta_id uuid,
  titulo text,
  descripcion text,
  fecha_fin timestamptz,
  dias_restantes integer
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    pe.id as participacion_id,
    e.id as encuesta_id,
    e.titulo,
    e.descripcion,
    e.fecha_fin,
    CASE 
      WHEN e.fecha_fin IS NOT NULL THEN
        GREATEST(0, EXTRACT(DAY FROM (e.fecha_fin - NOW()))::integer)
      ELSE NULL
    END as dias_restantes
  FROM participantes_encuesta pe
  JOIN encuestas e ON e.id = pe.encuesta_id
  WHERE pe.usuario_id = usuario_id_param
  AND pe.estado = 'pendiente'
  AND e.estado = 'activa'
  ORDER BY e.fecha_fin ASC NULLS LAST;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get available activities for employee
CREATE OR REPLACE FUNCTION get_available_activities(usuario_id_param uuid)
RETURNS TABLE (
  sesion_id uuid,
  titulo text,
  descripcion text,
  fecha_inicio timestamptz,
  fecha_fin timestamptz,
  modalidad text,
  ubicacion text,
  capacidad_maxima integer,
  reservas_actuales integer,
  colaborador_nombre text,
  servicio_tipo text,
  servicio_nombre text,
  puntos_asistencia integer
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    s.id as sesion_id,
    s.titulo,
    s.descripcion,
    s.fecha_inicio,
    s.fecha_fin,
    s.modalidad,
    s.ubicacion,
    s.capacidad_maxima,
    COUNT(r.id)::integer as reservas_actuales,
    uc.nombre || ' ' || uc.apellido as colaborador_nombre,
    srv.tipo as servicio_tipo,
    srv.nombre as servicio_nombre,
    s.puntos_asistencia
  FROM sesiones s
  LEFT JOIN reservas r ON r.sesion_id = s.id AND r.estado = 'confirmada'
  LEFT JOIN usuarios uc ON uc.id = s.colaborador_id
  LEFT JOIN servicios srv ON srv.id = s.servicio_id
  WHERE s.empresa_id = (SELECT empresa_id FROM usuarios WHERE id = usuario_id_param)
  AND s.fecha_inicio > NOW()
  AND s.activo = true
  AND NOT EXISTS (
    SELECT 1 FROM reservas existing_r 
    WHERE existing_r.sesion_id = s.id 
    AND existing_r.usuario_id = usuario_id_param
    AND existing_r.estado IN ('confirmada', 'pendiente')
  )
  GROUP BY s.id, s.titulo, s.descripcion, s.fecha_inicio, s.fecha_fin, s.modalidad, s.ubicacion, s.capacidad_maxima, uc.nombre, uc.apellido, srv.tipo, srv.nombre, s.puntos_asistencia
  HAVING COUNT(r.id) < s.capacidad_maxima
  ORDER BY s.fecha_inicio ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;