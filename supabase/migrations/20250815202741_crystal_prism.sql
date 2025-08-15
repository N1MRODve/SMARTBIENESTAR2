/*
  # Create admin dashboard functions

  1. New Functions
    - `get_admin_dashboard_stats` - Returns dashboard statistics for admin
    - `get_admin_recent_activity` - Returns recent activity for admin dashboard

  2. Security
    - Functions are security definer to allow proper data access
*/

-- Function to get admin dashboard statistics
CREATE OR REPLACE FUNCTION get_admin_dashboard_stats(empresa_id_param uuid)
RETURNS TABLE (
  total_empleados integer,
  empleados_activos integer,
  sesiones_proximas integer,
  encuestas_activas integer
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    (SELECT COUNT(*)::integer FROM usuarios WHERE empresa_id = empresa_id_param AND tipo_usuario = 'empleado') AS total_empleados,
    (SELECT COUNT(*)::integer FROM usuarios WHERE empresa_id = empresa_id_param AND tipo_usuario = 'empleado' AND activo = true) AS empleados_activos,
    (SELECT COUNT(*)::integer FROM sesiones WHERE empresa_id = empresa_id_param AND fecha_inicio >= NOW() AND fecha_inicio < NOW() + INTERVAL '7 days') AS sesiones_proximas,
    (SELECT COUNT(*)::integer FROM encuestas WHERE empresa_id = empresa_id_param AND estado = 'activa') AS encuestas_activas;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get recent activity for admin dashboard
CREATE OR REPLACE FUNCTION get_admin_recent_activity(
  empresa_id_param uuid,
  limit_param integer DEFAULT 10
)
RETURNS TABLE (
  descripcion text,
  fecha_actividad timestamptz,
  tipo_actividad text
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    CASE 
      WHEN r.id IS NOT NULL THEN 
        'Nueva reserva de ' || u.nombre || ' ' || u.apellido || ' para ' || s.titulo
      WHEN e.id IS NOT NULL THEN
        'Nueva encuesta creada: ' || e.titulo
      ELSE 'Actividad desconocida'
    END as descripcion,
    COALESCE(r.fecha_reserva, e.fecha_creacion, NOW()) as fecha_actividad,
    CASE 
      WHEN r.id IS NOT NULL THEN 'reserva'
      WHEN e.id IS NOT NULL THEN 'encuesta'
      ELSE 'otro'
    END as tipo_actividad
  FROM (
    SELECT fecha_reserva as fecha, 'reserva' as tipo, id as reserva_id, NULL::uuid as encuesta_id
    FROM reservas 
    WHERE EXISTS (
      SELECT 1 FROM sesiones 
      WHERE sesiones.id = reservas.sesion_id 
      AND sesiones.empresa_id = empresa_id_param
    )
    UNION ALL
    SELECT fecha_creacion as fecha, 'encuesta' as tipo, NULL::uuid as reserva_id, id as encuesta_id
    FROM encuestas 
    WHERE empresa_id = empresa_id_param
  ) actividades
  LEFT JOIN reservas r ON r.id = actividades.reserva_id
  LEFT JOIN sesiones s ON s.id = r.sesion_id
  LEFT JOIN usuarios u ON u.id = r.usuario_id
  LEFT JOIN encuestas e ON e.id = actividades.encuesta_id
  ORDER BY fecha_actividad DESC
  LIMIT limit_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;