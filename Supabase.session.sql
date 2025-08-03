CREATE OR REPLACE FUNCTION obtener_usuarios_con_conteo_reservas(id_empresa uuid)
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