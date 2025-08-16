/*
  # Crear usuarios de prueba para el sistema

  1. Nuevos usuarios
    - Administrador: admin@innovatech.com
    - Empleado: ana.martinez@innovatech.com  
    - Colaborador: elena.vasquez@smartbienestar.com
  2. Empresa de prueba
    - InnovaTech Solutions
  3. Perfiles completos
    - Todos los usuarios activos
    - Roles asignados correctamente
*/

-- Crear empresa de prueba
INSERT INTO empresas (id, nombre, dominio_email, telefono, direccion, sitio_web, activo)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'InnovaTech Solutions',
  'innovatech.com',
  '+1-555-0123',
  '123 Tech Street, Innovation City, IC 12345',
  'https://innovatech.com',
  true
) ON CONFLICT (dominio_email) DO NOTHING;

-- Crear usuarios de prueba
INSERT INTO usuarios (
  id,
  email,
  nombre,
  apellido,
  tipo_usuario,
  empresa_id,
  telefono,
  email_verificado,
  activo
) VALUES 
(
  'admin-uuid-1234-5678-9012-345678901234',
  'admin@innovatech.com',
  'Carlos',
  'Administrador',
  'administrador',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '+1-555-0124',
  true,
  true
),
(
  'empleado-uuid-1234-5678-9012-345678901234',
  'ana.martinez@innovatech.com',
  'Ana',
  'Martínez',
  'empleado',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '+1-555-0125',
  true,
  true
),
(
  'colaborador-uuid-1234-5678-9012-345678901234',
  'elena.vasquez@smartbienestar.com',
  'Elena',
  'Vásquez',
  'colaborador',
  null,
  '+1-555-0126',
  true,
  true
)
ON CONFLICT (email) DO UPDATE SET
  activo = true,
  email_verificado = true;

-- Crear perfil de empleado para Ana
INSERT INTO perfil_empleados (
  usuario_id,
  cargo,
  departamento,
  nivel_actividad,
  puntos_bienestar,
  objetivos_bienestar
) VALUES (
  'empleado-uuid-1234-5678-9012-345678901234',
  'Desarrolladora Senior',
  'Tecnología',
  3,
  150,
  'Mejorar balance vida-trabajo y reducir estrés'
) ON CONFLICT (usuario_id) DO UPDATE SET
  puntos_bienestar = 150,
  nivel_actividad = 3;

-- Crear perfil de colaborador para Elena
INSERT INTO perfil_colaboradores (
  usuario_id,
  especialidad,
  descripcion,
  experiencia,
  calificacion,
  verificado,
  estado
) VALUES (
  'colaborador-uuid-1234-5678-9012-345678901234',
  'Psicóloga Clínica',
  'Especialista en bienestar mental y manejo del estrés laboral',
  8,
  4.8,
  true,
  'verificado'
) ON CONFLICT (usuario_id) DO UPDATE SET
  verificado = true,
  estado = 'verificado';