/*
  # Insert demo data for testing

  1. Demo Data
    - Sample achievements and levels
    - Demo wellness challenges
    - Sample alerts for testing
    - Department metrics
    - Sample progress data

  2. Notes
    - This data is for development and testing
    - Can be removed in production
*/

-- Insert sample achievements
INSERT INTO logros (nombre, descripcion, icono, puntos_recompensa, tipo_logro, condiciones) VALUES
('Primera Sesión', 'Completa tu primera sesión de bienestar', 'Star', 50, 'individual', '{"sesiones_completadas": 1}'),
('Yogui Principiante', 'Completa 5 sesiones de yoga', 'Activity', 100, 'individual', '{"yoga_sesiones": 5}'),
('Meditador Zen', 'Completa 10 sesiones de meditación', 'Brain', 150, 'individual', '{"meditacion_sesiones": 10}'),
('Equipo Unido', 'Tu equipo completa un desafío grupal', 'Users', 200, 'equipo', '{"desafio_equipo": 1}'),
('Maestro del Bienestar', 'Alcanza 2500 puntos totales', 'Trophy', 500, 'individual', '{"puntos_totales": 2500}');

-- Insert sample wellness challenges
INSERT INTO desafios_bienestar (
  titulo, 
  descripcion, 
  descripcion_completa,
  objetivos,
  pasos,
  imagen,
  puntos, 
  duracion, 
  dificultad, 
  categoria,
  fecha_inicio,
  fecha_fin,
  estado,
  participantes
) VALUES
(
  'Batalla de Meditación',
  'Primer depto. en 50 sesiones',
  'Competencia amistosa entre departamentos para ver quién puede completar 50 sesiones de meditación primero.',
  ARRAY['Reducir estrés laboral', 'Mejorar concentración', 'Fomentar trabajo en equipo'],
  ARRAY['Únete al desafío', 'Completa sesiones de meditación', 'Suma puntos para tu equipo', 'Celebra la victoria'],
  'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400',
  300,
  '4 semanas',
  3,
  'mindfulness',
  NOW() - INTERVAL '1 week',
  NOW() + INTERVAL '3 weeks',
  'activo',
  18
),
(
  'Maratón Corporativo',
  '1M pasos como empresa',
  'Desafío colectivo para alcanzar 1 millón de pasos como empresa en un mes.',
  ARRAY['Promover actividad física', 'Crear espíritu de equipo', 'Mejorar salud cardiovascular'],
  ARRAY['Descargar app de pasos', 'Registrar actividad diaria', 'Compartir progreso', 'Alcanzar la meta juntos'],
  'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=400',
  500,
  '1 mes',
  2,
  'actividad_fisica',
  NOW() - INTERVAL '1 week',
  NOW() + INTERVAL '3 weeks',
  'activo',
  25
);

-- Insert sample alerts
INSERT INTO alertas_bienestar (
  empresa_id,
  tipo_alerta,
  nivel_criticidad,
  titulo,
  descripcion,
  departamento_afectado,
  fecha_deteccion,
  estado,
  confianza_porcentaje,
  acciones_recomendadas
) VALUES
(
  (SELECT id FROM empresas WHERE nombre = 'InnovaTech Solutions' LIMIT 1),
  'burnout',
  'critico',
  'Riesgo Alto de Burnout - Equipo Ventas',
  'Equipo de Ventas muestra signos de burnout. Participación bajó 35% en 2 semanas.',
  'Ventas',
  NOW() - INTERVAL '2 days',
  'activa',
  94,
  ARRAY['Reunión urgente con manager del equipo', 'Sesiones de coaching grupal inmediatas', 'Revisar carga de trabajo y redistribuir', 'Implementar días de bienestar mental']
),
(
  (SELECT id FROM empresas WHERE nombre = 'InnovaTech Solutions' LIMIT 1),
  'engagement',
  'medio',
  'Mejora Significativa Detectada',
  'El equipo de Desarrollo muestra una mejora del 45% en bienestar general tras implementar las sesiones de yoga matutino.',
  'Desarrollo',
  NOW() - INTERVAL '1 hour',
  'activa',
  96,
  ARRAY['Documentar mejores prácticas', 'Replicar modelo en otros equipos', 'Reconocer públicamente el logro']
);

-- Insert sample department metrics
INSERT INTO metricas_departamento (
  empresa_id,
  departamento,
  fecha_calculo,
  total_empleados,
  empleados_activos,
  participacion_porcentaje,
  puntos_promedio,
  satisfaccion_promedio,
  tendencia,
  indice_bienestar
) VALUES
(
  (SELECT id FROM empresas WHERE nombre = 'InnovaTech Solutions' LIMIT 1),
  'Desarrollo',
  CURRENT_DATE,
  8,
  8,
  95.0,
  2650.0,
  4.8,
  'positiva',
  8.7
),
(
  (SELECT id FROM empresas WHERE nombre = 'InnovaTech Solutions' LIMIT 1),
  'Marketing',
  CURRENT_DATE,
  6,
  5,
  88.0,
  2200.0,
  4.5,
  'estable',
  7.2
),
(
  (SELECT id FROM empresas WHERE nombre = 'InnovaTech Solutions' LIMIT 1),
  'Ventas',
  CURRENT_DATE,
  10,
  6,
  65.0,
  1800.0,
  3.2,
  'negativa',
  5.8
),
(
  (SELECT id FROM empresas WHERE nombre = 'InnovaTech Solutions' LIMIT 1),
  'RRHH',
  CURRENT_DATE,
  4,
  3,
  82.0,
  2100.0,
  4.6,
  'positiva',
  7.9
);