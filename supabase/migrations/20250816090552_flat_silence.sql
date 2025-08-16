/*
  # Create test users for authentication

  1. Test Users
    - Admin user for InnovaTech Solutions
    - Employee users for testing
    - Collaborator users for wellness services

  2. Security
    - Users created with proper roles and company associations
    - Profiles created for each user type
*/

-- Insert test company if not exists
INSERT INTO empresas (id, nombre, dominio_email, telefono, sitio_web, activo, actividad_score)
VALUES (
  '48e8bbc4-67b7-4a27-b03f-d91957d3579a',
  'InnovaTech Solutions',
  'innovatech.com',
  '+34 91 123 4567',
  'https://innovatech.com',
  true,
  85
) ON CONFLICT (id) DO NOTHING;

-- Insert test users
INSERT INTO usuarios (id, email, nombre, apellido, tipo_usuario, empresa_id, activo, telefono, fecha_registro) VALUES
-- Administrador
('admin-test-001', 'admin@innovatech.com', 'Carlos', 'Rodríguez', 'administrador', '48e8bbc4-67b7-4a27-b03f-d91957d3579a', true, '+34 600 111 001', NOW()),

-- Empleados
('empleado-test-001', 'ana.martinez@innovatech.com', 'Ana', 'Martínez', 'empleado', '48e8bbc4-67b7-4a27-b03f-d91957d3579a', true, '+34 600 111 002', NOW()),
('empleado-test-002', 'luis.fernandez@innovatech.com', 'Luis', 'Fernández', 'empleado', '48e8bbc4-67b7-4a27-b03f-d91957d3579a', true, '+34 600 111 003', NOW()),
('empleado-test-003', 'sofia.lopez@innovatech.com', 'Sofía', 'López', 'empleado', '48e8bbc4-67b7-4a27-b03f-d91957d3579a', true, '+34 600 111 004', NOW()),
('empleado-test-004', 'miguel.santos@innovatech.com', 'Miguel', 'Santos', 'empleado', '48e8bbc4-67b7-4a27-b03f-d91957d3579a', true, '+34 600 111 005', NOW()),

-- Colaboradores
('colaborador-test-001', 'elena.vasquez@smartbienestar.com', 'Elena', 'Vásquez', 'colaborador', NULL, true, '+34 600 111 006', NOW()),
('colaborador-test-002', 'miguel.torres@smartbienestar.com', 'Miguel', 'Torres', 'colaborador', NULL, true, '+34 600 111 007', NOW()),

-- Superadmin
('superadmin-test-001', 'superadmin@smartbienestar.com', 'Dieter', 'Lorenzo', 'superadmin', NULL, true, '+34 600 111 000', NOW())

ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  nombre = EXCLUDED.nombre,
  apellido = EXCLUDED.apellido,
  tipo_usuario = EXCLUDED.tipo_usuario,
  empresa_id = EXCLUDED.empresa_id,
  activo = EXCLUDED.activo;

-- Insert employee profiles
INSERT INTO perfil_empleados (usuario_id, cargo, departamento, puntos_bienestar, desafios_completados, nivel_actividad, ultima_participacion) VALUES
('empleado-test-001', 'Desarrolladora Senior', 'Desarrollo', 2840, 8, 'Experto', NOW() - INTERVAL '1 day'),
('empleado-test-002', 'Especialista Marketing', 'Marketing', 2650, 6, 'Avanzado', NOW() - INTERVAL '2 days'),
('empleado-test-003', 'Ejecutiva Ventas', 'Ventas', 2420, 5, 'Intermedio', NOW() - INTERVAL '3 days'),
('empleado-test-004', 'Coordinador RRHH', 'RRHH', 1890, 4, 'Intermedio', NOW() - INTERVAL '1 week')
ON CONFLICT (usuario_id) DO UPDATE SET
  cargo = EXCLUDED.cargo,
  departamento = EXCLUDED.departamento,
  puntos_bienestar = EXCLUDED.puntos_bienestar,
  desafios_completados = EXCLUDED.desafios_completados,
  nivel_actividad = EXCLUDED.nivel_actividad,
  ultima_participacion = EXCLUDED.ultima_participacion;

-- Insert collaborator profiles
INSERT INTO perfil_colaboradores (usuario_id, especialidad, descripcion, experiencia, calificacion, estado) VALUES
('colaborador-test-001', 'Instructora de Yoga', 'Especialista en Hatha y Vinyasa Yoga con certificación internacional', 8, 4.9, 'verificado'),
('colaborador-test-002', 'Coach Personal', 'Coach certificado en desarrollo personal y liderazgo empresarial', 12, 4.8, 'verificado')
ON CONFLICT (usuario_id) DO UPDATE SET
  especialidad = EXCLUDED.especialidad,
  descripcion = EXCLUDED.descripcion,
  experiencia = EXCLUDED.experiencia,
  calificacion = EXCLUDED.calificacion,
  estado = EXCLUDED.estado;

-- Insert employee levels
INSERT INTO niveles_empleado (usuario_id, nivel_actual, puntos_totales, puntos_nivel_actual, puntos_siguiente_nivel, logros_desbloqueados) VALUES
('empleado-test-001', 5, 2840, 340, 3500, ARRAY['primera_sesion', 'yogui_principiante', 'meditador_zen', 'maestro_bienestar']),
('empleado-test-002', 5, 2650, 150, 3500, ARRAY['primera_sesion', 'yogui_principiante', 'meditador_zen']),
('empleado-test-003', 4, 2420, 920, 2500, ARRAY['primera_sesion', 'yogui_principiante']),
('empleado-test-004', 3, 1890, 390, 2000, ARRAY['primera_sesion'])
ON CONFLICT (usuario_id) DO UPDATE SET
  nivel_actual = EXCLUDED.nivel_actual,
  puntos_totales = EXCLUDED.puntos_totales,
  puntos_nivel_actual = EXCLUDED.puntos_nivel_actual,
  puntos_siguiente_nivel = EXCLUDED.puntos_siguiente_nivel,
  logros_desbloqueados = EXCLUDED.logros_desbloqueados;