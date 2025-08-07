CREATE OR REPLACE FUNCTION obtener_ranking_usuarios(id_empresa uuid)
RETURNS TABLE (
  id uuid,
  nombre text,
  apellido text,
  conteo_reservas integer
) AS $$
  SELECT
    u.id,
    u.nombre,
    u.apellido,
    COUNT(r.id) AS conteo_reservas
  FROM usuarios u
  LEFT JOIN reservas r ON r.usuario_id = u.id
  WHERE u.empresa_id = id_empresa
  GROUP BY u.id, u.nombre, u.apellido
  ORDER BY conteo_reservas DESC
  LIMIT 10;
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION get_admin_dashboard_stats(empresa_id_param uuid)
RETURNS TABLE (
  total_empleados integer,
  empleados_activos integer,
  sesiones_proximas integer,
  encuestas_activas integer
) AS $$
  SELECT
    (SELECT COUNT(*) FROM usuarios WHERE empresa_id = empresa_id_param AND tipo_usuario = 'empleado') AS total_empleados,
    (SELECT COUNT(*) FROM usuarios WHERE empresa_id = empresa_id_param AND tipo_usuario = 'empleado' AND activo = true) AS empleados_activos,
    (SELECT COUNT(*) FROM sesiones WHERE empresa_id = empresa_id_param AND fecha_inicio >= NOW() AND fecha_inicio < NOW() + INTERVAL '7 days') AS sesiones_proximas,
    (SELECT COUNT(*) FROM encuestas WHERE empresa_id = empresa_id_param AND estado = 'activa') AS encuestas_activas
$$ LANGUAGE sql STABLE;