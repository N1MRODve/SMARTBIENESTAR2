/*
  # Insert sample data for testing the employee dashboard

  1. Sample Data
    - Services (yoga, meditation, coaching, nutrition)
    - Sessions with different collaborators
    - Sample reservations for testing
    - Employee profiles with wellness data
    - Active challenges

  2. Notes
    - This data is for development and testing
    - Uses existing user structure
*/

-- Insert sample services
INSERT INTO servicios (nombre, tipo, descripcion, imagen_url) VALUES
('Yoga Matutino', 'yoga', 'Sesiones de yoga para comenzar el día con energía y equilibrio', 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Meditación Mindfulness', 'meditacion', 'Práctica de meditación para reducir el estrés y mejorar la concentración', 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Coaching Personal', 'coaching', 'Sesiones individuales de coaching para desarrollo personal y profesional', 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Consulta Nutricional', 'nutricion', 'Asesoramiento nutricional personalizado para una vida más saludable', 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Terapia de Bienestar', 'psicoterapia', 'Apoyo psicológico para el bienestar emocional y mental', 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400');

-- Insert sample sessions (only if we have collaborators)
DO $$
DECLARE
    empresa_demo_id uuid;
    colaborador_yoga_id uuid;
    colaborador_coaching_id uuid;
    servicio_yoga_id uuid;
    servicio_meditacion_id uuid;
    servicio_coaching_id uuid;
    servicio_nutricion_id uuid;
BEGIN
    -- Get demo company ID
    SELECT id INTO empresa_demo_id FROM empresas WHERE nombre = 'InnovaTech Solutions' LIMIT 1;
    
    -- Get service IDs
    SELECT id INTO servicio_yoga_id FROM servicios WHERE tipo = 'yoga' LIMIT 1;
    SELECT id INTO servicio_meditacion_id FROM servicios WHERE tipo = 'meditacion' LIMIT 1;
    SELECT id INTO servicio_coaching_id FROM servicios WHERE tipo = 'coaching' LIMIT 1;
    SELECT id INTO servicio_nutricion_id FROM servicios WHERE tipo = 'nutricion' LIMIT 1;
    
    -- Get collaborator IDs (if they exist)
    SELECT id INTO colaborador_yoga_id FROM usuarios WHERE tipo_usuario = 'colaborador' AND email LIKE '%elena%' LIMIT 1;
    SELECT id INTO colaborador_coaching_id FROM usuarios WHERE tipo_usuario = 'colaborador' AND email LIKE '%miguel%' LIMIT 1;
    
    -- Only insert sessions if we have the required data
    IF empresa_demo_id IS NOT NULL AND servicio_yoga_id IS NOT NULL THEN
        -- Insert upcoming sessions
        INSERT INTO sesiones (titulo, descripcion, servicio_id, colaborador_id, empresa_id, fecha_inicio, fecha_fin, modalidad, ubicacion, capacidad_maxima, puntos_asistencia) VALUES
        ('Yoga Matutino', 'Sesión de yoga para comenzar el día con energía', servicio_yoga_id, colaborador_yoga_id, empresa_demo_id, NOW() + INTERVAL '1 day' + INTERVAL '8 hours', NOW() + INTERVAL '1 day' + INTERVAL '9 hours', 'presencial', 'Sala Yoga', 15, 50),
        ('Meditación Mindfulness', 'Práctica de meditación guiada para reducir el estrés', servicio_meditacion_id, colaborador_yoga_id, empresa_demo_id, NOW() + INTERVAL '2 days' + INTERVAL '12 hours', NOW() + INTERVAL '2 days' + INTERVAL '13 hours', 'online', NULL, 20, 40),
        ('Coaching Grupal', 'Sesión de coaching para desarrollo personal', servicio_coaching_id, colaborador_coaching_id, empresa_demo_id, NOW() + INTERVAL '3 days' + INTERVAL '17 hours', NOW() + INTERVAL '3 days' + INTERVAL '18 hours', 'online', NULL, 8, 75),
        ('Taller Mindfulness', 'Taller intensivo de mindfulness y bienestar', servicio_meditacion_id, colaborador_yoga_id, empresa_demo_id, NOW() + INTERVAL '5 days' + INTERVAL '14 hours', NOW() + INTERVAL '5 days' + INTERVAL '16 hours', 'presencial', 'Sala Principal', 20, 100),
        ('Consulta Nutricional', 'Consulta individual con nutricionista', servicio_nutricion_id, colaborador_coaching_id, empresa_demo_id, NOW() + INTERVAL '7 days' + INTERVAL '11 hours', NOW() + INTERVAL '7 days' + INTERVAL '12 hours', 'presencial', 'Consultorio', 1, 60);
        
        -- Insert past sessions for history
        INSERT INTO sesiones (titulo, descripcion, servicio_id, colaborador_id, empresa_id, fecha_inicio, fecha_fin, modalidad, ubicacion, capacidad_maxima, puntos_asistencia, estado_sesion) VALUES
        ('Yoga Relajante', 'Sesión de yoga para relajación y estiramiento', servicio_yoga_id, colaborador_yoga_id, empresa_demo_id, NOW() - INTERVAL '3 days' + INTERVAL '8 hours', NOW() - INTERVAL '3 days' + INTERVAL '9 hours', 'presencial', 'Sala Yoga', 15, 50, 'completada'),
        ('Coaching de Productividad', 'Sesión de coaching enfocada en productividad', servicio_coaching_id, colaborador_coaching_id, empresa_demo_id, NOW() - INTERVAL '1 week' + INTERVAL '17 hours', NOW() - INTERVAL '1 week' + INTERVAL '18 hours', 'online', NULL, 6, 75, 'completada'),
        ('Meditación Nocturna', 'Práctica de meditación para mejor descanso', servicio_meditacion_id, colaborador_yoga_id, empresa_demo_id, NOW() - INTERVAL '5 days' + INTERVAL '19 hours', NOW() - INTERVAL '5 days' + INTERVAL '20 hours', 'online', NULL, 25, 40, 'completada');
    END IF;
END $$;

-- Insert sample employee profiles (only for existing employees)
DO $$
DECLARE
    empleado_record RECORD;
BEGIN
    FOR empleado_record IN 
        SELECT id FROM usuarios WHERE tipo_usuario = 'empleado' AND empresa_id = (SELECT id FROM empresas WHERE nombre = 'InnovaTech Solutions' LIMIT 1)
    LOOP
        INSERT INTO perfil_empleados (usuario_id, cargo, departamento, puntos_bienestar, desafios_completados, nivel_actividad, ultima_participacion)
        VALUES (
            empleado_record.id,
            CASE 
                WHEN random() < 0.3 THEN 'Desarrollador Senior'
                WHEN random() < 0.6 THEN 'Especialista Marketing'
                WHEN random() < 0.8 THEN 'Ejecutivo Ventas'
                ELSE 'Coordinador RRHH'
            END,
            CASE 
                WHEN random() < 0.3 THEN 'Desarrollo'
                WHEN random() < 0.6 THEN 'Marketing'
                WHEN random() < 0.8 THEN 'Ventas'
                ELSE 'RRHH'
            END,
            floor(random() * 2000 + 500)::integer,
            floor(random() * 5)::integer,
            CASE 
                WHEN random() < 0.8 THEN 'Activo'
                ELSE 'Nuevo'
            END,
            CASE 
                WHEN random() < 0.7 THEN NOW() - INTERVAL '1 day' * floor(random() * 7)
                ELSE NULL
            END
        )
        ON CONFLICT (usuario_id) DO NOTHING;
    END LOOP;
END $$;

-- Insert sample levels for employees
DO $$
DECLARE
    empleado_record RECORD;
BEGIN
    FOR empleado_record IN 
        SELECT pe.usuario_id, pe.puntos_bienestar 
        FROM perfil_empleados pe
        JOIN usuarios u ON u.id = pe.usuario_id
        WHERE u.tipo_usuario = 'empleado'
    LOOP
        INSERT INTO niveles_empleado (usuario_id, nivel_actual, puntos_totales, puntos_nivel_actual, puntos_siguiente_nivel)
        VALUES (
            empleado_record.usuario_id,
            CASE 
                WHEN empleado_record.puntos_bienestar >= 2500 THEN 5
                WHEN empleado_record.puntos_bienestar >= 1500 THEN 4
                WHEN empleado_record.puntos_bienestar >= 800 THEN 3
                WHEN empleado_record.puntos_bienestar >= 300 THEN 2
                ELSE 1
            END,
            empleado_record.puntos_bienestar,
            empleado_record.puntos_bienestar % 500,
            CASE 
                WHEN empleado_record.puntos_bienestar >= 2500 THEN 5000
                WHEN empleado_record.puntos_bienestar >= 1500 THEN 2500
                WHEN empleado_record.puntos_bienestar >= 800 THEN 1500
                WHEN empleado_record.puntos_bienestar >= 300 THEN 800
                ELSE 300
            END
        )
        ON CONFLICT (usuario_id) DO NOTHING;
    END LOOP;
END $$;