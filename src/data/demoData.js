// Demo data for SMART Bienestar platform
export const demoData = {
  // Empresas demo
  empresas: [
    {
      id: 'demo-empresa-1',
      nombre: 'InnovaTech Solutions',
      dominio_email: 'innovatech.com',
      logo_url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100',
      telefono: '+34 91 123 45 67',
      sitio_web: 'https://innovatech.com',
      direccion: 'Calle Serrano 123, Madrid',
      activo: true,
      fecha_registro: '2024-01-15T10:00:00Z',
      actividad_score: 85
    },
    {
      id: 'demo-empresa-2',
      nombre: 'Creative Digital Agency',
      dominio_email: 'creativedigital.com',
      logo_url: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100',
      telefono: '+34 93 987 65 43',
      sitio_web: 'https://creativedigital.com',
      direccion: 'Passeig de Gràcia 456, Barcelona',
      activo: true,
      fecha_registro: '2024-02-20T14:30:00Z',
      actividad_score: 92
    }
  ],

  // Usuarios demo
  usuarios: [
    // Administradores
    {
      id: 'demo-admin-1',
      email: 'admin@innovatech.com',
      nombre: 'María',
      apellido: 'González',
      tipo_usuario: 'administrador',
      empresa_id: 'demo-empresa-1',
      activo: true,
      fecha_registro: '2024-01-15T10:00:00Z'
    },
    {
      id: 'demo-admin-2',
      email: 'admin@creativedigital.com',
      nombre: 'Carlos',
      apellido: 'Rodríguez',
      tipo_usuario: 'administrador',
      empresa_id: 'demo-empresa-2',
      activo: true,
      fecha_registro: '2024-02-20T14:30:00Z'
    },
    // Empleados
    {
      id: 'demo-empleado-1',
      email: 'ana.martinez@innovatech.com',
      nombre: 'Ana',
      apellido: 'Martínez',
      tipo_usuario: 'empleado',
      empresa_id: 'demo-empresa-1',
      activo: true,
      fecha_registro: '2024-01-20T09:00:00Z'
    },
    {
      id: 'demo-empleado-2',
      email: 'luis.fernandez@innovatech.com',
      nombre: 'Luis',
      apellido: 'Fernández',
      tipo_usuario: 'empleado',
      empresa_id: 'demo-empresa-1',
      activo: true,
      fecha_registro: '2024-01-25T11:30:00Z'
    },
    {
      id: 'demo-empleado-3',
      email: 'sofia.lopez@innovatech.com',
      nombre: 'Sofía',
      apellido: 'López',
      tipo_usuario: 'empleado',
      empresa_id: 'demo-empresa-1',
      activo: true,
      fecha_registro: '2024-02-01T16:15:00Z'
    },
    {
      id: 'demo-empleado-4',
      email: 'david.ruiz@creativedigital.com',
      nombre: 'David',
      apellido: 'Ruiz',
      tipo_usuario: 'empleado',
      empresa_id: 'demo-empresa-2',
      activo: true,
      fecha_registro: '2024-02-25T10:45:00Z'
    },
    // Colaboradores
    {
      id: 'demo-colaborador-1',
      email: 'elena.yoga@smartbienestar.com',
      nombre: 'Elena',
      apellido: 'Vásquez',
      tipo_usuario: 'colaborador',
      activo: true,
      fecha_registro: '2024-01-10T08:00:00Z'
    },
    {
      id: 'demo-colaborador-2',
      email: 'miguel.coach@smartbienestar.com',
      nombre: 'Miguel',
      apellido: 'Torres',
      tipo_usuario: 'colaborador',
      activo: true,
      fecha_registro: '2024-01-12T12:00:00Z'
    },
    {
      id: 'demo-colaborador-3',
      email: 'laura.nutricion@smartbienestar.com',
      nombre: 'Laura',
      apellido: 'Sánchez',
      tipo_usuario: 'colaborador',
      activo: true,
      fecha_registro: '2024-01-14T15:30:00Z'
    }
  ],

  // Perfiles de empleados
  perfilEmpleados: [
    {
      usuario_id: 'demo-empleado-1',
      cargo: 'Desarrolladora Frontend',
      departamento: 'Tecnología',
      puntos_bienestar: 1250,
      desafios_completados: 8,
      nivel_actividad: 'Alto',
      ultima_participacion: '2025-01-10T14:30:00Z',
      preferencias_bienestar: 'Yoga, Meditación, Nutrición'
    },
    {
      usuario_id: 'demo-empleado-2',
      cargo: 'Product Manager',
      departamento: 'Producto',
      puntos_bienestar: 980,
      desafios_completados: 6,
      nivel_actividad: 'Medio',
      ultima_participacion: '2025-01-08T16:00:00Z',
      preferencias_bienestar: 'Coaching, Entrenamiento'
    },
    {
      usuario_id: 'demo-empleado-3',
      cargo: 'Diseñadora UX/UI',
      departamento: 'Diseño',
      puntos_bienestar: 1450,
      desafios_completados: 12,
      nivel_actividad: 'Muy Alto',
      ultima_participacion: '2025-01-11T10:15:00Z',
      preferencias_bienestar: 'Yoga, Meditación, Psicoterapia'
    },
    {
      usuario_id: 'demo-empleado-4',
      cargo: 'Creative Director',
      departamento: 'Creatividad',
      puntos_bienestar: 750,
      desafios_completados: 4,
      nivel_actividad: 'Medio',
      ultima_participacion: '2025-01-09T12:45:00Z',
      preferencias_bienestar: 'Coaching, Nutrición'
    }
  ],

  // Perfiles de colaboradores
  perfilColaboradores: [
    {
      usuario_id: 'demo-colaborador-1',
      especialidad: 'Instructora de Yoga',
      descripcion: 'Instructora certificada con 8 años de experiencia en Hatha y Vinyasa Yoga.',
      experiencia: 8,
      calificacion: 4.9,
      estado: 'verificado',
      servicios: ['yoga', 'meditacion'],
      disponibilidad: {
        lunes: ['09:00-12:00', '16:00-19:00'],
        martes: ['09:00-12:00', '16:00-19:00'],
        miercoles: ['09:00-12:00'],
        jueves: ['09:00-12:00', '16:00-19:00'],
        viernes: ['09:00-12:00']
      }
    },
    {
      usuario_id: 'demo-colaborador-2',
      especialidad: 'Coach Personal',
      descripcion: 'Coach certificado especializado en desarrollo personal y liderazgo.',
      experiencia: 6,
      calificacion: 4.8,
      estado: 'verificado',
      servicios: ['coaching'],
      disponibilidad: {
        lunes: ['10:00-18:00'],
        martes: ['10:00-18:00'],
        miercoles: ['10:00-18:00'],
        jueves: ['10:00-18:00'],
        viernes: ['10:00-16:00']
      }
    },
    {
      usuario_id: 'demo-colaborador-3',
      especialidad: 'Nutricionista',
      descripcion: 'Nutricionista clínica especializada en alimentación corporativa saludable.',
      experiencia: 5,
      calificacion: 4.7,
      estado: 'verificado',
      servicios: ['nutricion'],
      disponibilidad: {
        lunes: ['08:00-16:00'],
        martes: ['08:00-16:00'],
        miercoles: ['08:00-16:00'],
        jueves: ['08:00-16:00'],
        viernes: ['08:00-14:00']
      }
    }
  ],

  // Servicios disponibles
  servicios: [
    {
      id: 'servicio-yoga',
      nombre: 'Yoga Corporativo',
      tipo: 'yoga',
      descripcion: 'Clases de yoga adaptadas al entorno corporativo para reducir estrés y mejorar flexibilidad.',
      imagen_url: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800',
      activo: true,
      duracion_promedio: 60
    },
    {
      id: 'servicio-coaching',
      nombre: 'Coaching Personal',
      tipo: 'coaching',
      descripcion: 'Sesiones de coaching para desarrollo personal y profesional.',
      imagen_url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      activo: true,
      duracion_promedio: 45
    },
    {
      id: 'servicio-nutricion',
      nombre: 'Asesoría Nutricional',
      tipo: 'nutricion',
      descripcion: 'Consultas nutricionales personalizadas para una alimentación saludable.',
      imagen_url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      activo: true,
      duracion_promedio: 30
    },
    {
      id: 'servicio-meditacion',
      nombre: 'Meditación Mindfulness',
      tipo: 'meditacion',
      descripcion: 'Sesiones de meditación para reducir estrés y mejorar concentración.',
      imagen_url: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800',
      activo: true,
      duracion_promedio: 30
    },
    {
      id: 'servicio-psicoterapia',
      nombre: 'Apoyo Psicológico',
      tipo: 'psicoterapia',
      descripcion: 'Sesiones de apoyo psicológico para bienestar emocional.',
      imagen_url: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
      activo: true,
      duracion_promedio: 50
    },
    {
      id: 'servicio-entrenamiento',
      nombre: 'Entrenamiento Físico',
      tipo: 'entrenamiento',
      descripcion: 'Rutinas de ejercicio adaptadas para el entorno corporativo.',
      imagen_url: 'https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg?auto=compress&cs=tinysrgb&w=800',
      activo: true,
      duracion_promedio: 45
    }
  ],

  // Sesiones programadas
  sesiones: [
    {
      id: 'sesion-1',
      titulo: 'Yoga Matutino para Principiantes',
      descripcion: 'Sesión de yoga suave para comenzar el día con energía positiva.',
      servicio_id: 'servicio-yoga',
      colaborador_id: 'demo-colaborador-1',
      empresa_id: 'demo-empresa-1',
      fecha_inicio: '2025-01-20T08:00:00Z',
      fecha_fin: '2025-01-20T09:00:00Z',
      modalidad: 'presencial',
      ubicacion: 'Sala de bienestar - Planta 2',
      capacidad_maxima: 15,
      puntos_asistencia: 50,
      estado_sesion: 'programada',
      activo: true
    },
    {
      id: 'sesion-2',
      titulo: 'Coaching: Gestión del Tiempo',
      descripcion: 'Aprende técnicas efectivas para optimizar tu tiempo y productividad.',
      servicio_id: 'servicio-coaching',
      colaborador_id: 'demo-colaborador-2',
      empresa_id: 'demo-empresa-1',
      fecha_inicio: '2025-01-21T17:00:00Z',
      fecha_fin: '2025-01-21T17:45:00Z',
      modalidad: 'online',
      enlace_reunion: 'https://zoom.us/j/123456789',
      capacidad_maxima: 20,
      puntos_asistencia: 40,
      estado_sesion: 'programada',
      activo: true
    },
    {
      id: 'sesion-3',
      titulo: 'Nutrición: Snacks Saludables',
      descripcion: 'Descubre opciones de snacks nutritivos para mantener energía durante el trabajo.',
      servicio_id: 'servicio-nutricion',
      colaborador_id: 'demo-colaborador-3',
      empresa_id: 'demo-empresa-1',
      fecha_inicio: '2025-01-22T12:30:00Z',
      fecha_fin: '2025-01-22T13:00:00Z',
      modalidad: 'online',
      enlace_reunion: 'https://meet.google.com/abc-defg-hij',
      capacidad_maxima: 25,
      puntos_asistencia: 30,
      estado_sesion: 'programada',
      activo: true
    },
    {
      id: 'sesion-4',
      titulo: 'Meditación de Pausa Activa',
      descripcion: 'Sesión corta de meditación para recargar energías a mitad del día.',
      servicio_id: 'servicio-meditacion',
      colaborador_id: 'demo-colaborador-1',
      empresa_id: 'demo-empresa-1',
      fecha_inicio: '2025-01-23T14:00:00Z',
      fecha_fin: '2025-01-23T14:30:00Z',
      modalidad: 'presencial',
      ubicacion: 'Sala de relajación',
      capacidad_maxima: 12,
      puntos_asistencia: 25,
      estado_sesion: 'programada',
      activo: true
    },
    {
      id: 'sesion-5',
      titulo: 'Yoga Avanzado: Posturas de Fuerza',
      descripcion: 'Clase de yoga para practicantes con experiencia, enfocada en posturas de fuerza.',
      servicio_id: 'servicio-yoga',
      colaborador_id: 'demo-colaborador-1',
      empresa_id: 'demo-empresa-1',
      fecha_inicio: '2025-01-24T18:30:00Z',
      fecha_fin: '2025-01-24T19:30:00Z',
      modalidad: 'presencial',
      ubicacion: 'Sala de bienestar - Planta 2',
      capacidad_maxima: 10,
      puntos_asistencia: 60,
      estado_sesion: 'programada',
      activo: true
    }
  ],

  // Reservas
  reservas: [
    {
      id: 'reserva-1',
      sesion_id: 'sesion-1',
      usuario_id: 'demo-empleado-1',
      estado: 'confirmada',
      fecha_reserva: '2025-01-15T10:30:00Z',
      asistio: null,
      calificacion: null,
      comentario: null
    },
    {
      id: 'reserva-2',
      sesion_id: 'sesion-2',
      usuario_id: 'demo-empleado-1',
      estado: 'confirmada',
      fecha_reserva: '2025-01-16T14:20:00Z',
      asistio: null,
      calificacion: null,
      comentario: null
    },
    {
      id: 'reserva-3',
      sesion_id: 'sesion-1',
      usuario_id: 'demo-empleado-2',
      estado: 'confirmada',
      fecha_reserva: '2025-01-15T11:45:00Z',
      asistio: null,
      calificacion: null,
      comentario: null
    },
    {
      id: 'reserva-4',
      sesion_id: 'sesion-3',
      usuario_id: 'demo-empleado-3',
      estado: 'confirmada',
      fecha_reserva: '2025-01-17T09:15:00Z',
      asistio: null,
      calificacion: null,
      comentario: null
    },
    // Reservas históricas
    {
      id: 'reserva-historica-1',
      sesion_id: 'sesion-historica-1',
      usuario_id: 'demo-empleado-1',
      estado: 'completada',
      fecha_reserva: '2025-01-05T10:00:00Z',
      asistio: true,
      calificacion: 5,
      comentario: 'Excelente sesión, muy relajante'
    },
    {
      id: 'reserva-historica-2',
      sesion_id: 'sesion-historica-2',
      usuario_id: 'demo-empleado-1',
      estado: 'completada',
      fecha_reserva: '2025-01-08T15:30:00Z',
      asistio: true,
      calificacion: 4,
      comentario: 'Muy útil para la gestión del estrés'
    }
  ],

  // Sesiones históricas
  sesionesHistoricas: [
    {
      id: 'sesion-historica-1',
      titulo: 'Yoga de Relajación',
      descripcion: 'Sesión de yoga enfocada en relajación y liberación de tensiones.',
      servicio_id: 'servicio-yoga',
      colaborador_id: 'demo-colaborador-1',
      empresa_id: 'demo-empresa-1',
      fecha_inicio: '2025-01-10T17:00:00Z',
      fecha_fin: '2025-01-10T18:00:00Z',
      modalidad: 'presencial',
      ubicacion: 'Sala de bienestar - Planta 2',
      capacidad_maxima: 15,
      estado_sesion: 'completada',
      activo: true
    },
    {
      id: 'sesion-historica-2',
      titulo: 'Meditación Anti-Estrés',
      descripcion: 'Técnicas de meditación para reducir el estrés laboral.',
      servicio_id: 'servicio-meditacion',
      colaborador_id: 'demo-colaborador-1',
      empresa_id: 'demo-empresa-1',
      fecha_inicio: '2025-01-12T13:00:00Z',
      fecha_fin: '2025-01-12T13:30:00Z',
      modalidad: 'online',
      enlace_reunion: 'https://zoom.us/j/987654321',
      capacidad_maxima: 20,
      estado_sesion: 'completada',
      activo: true
    }
  ],

  // Encuestas
  encuestas: [
    {
      id: 'encuesta-1',
      empresa_id: 'demo-empresa-1',
      titulo: 'Evaluación de Clima Laboral Q1 2025',
      descripcion: 'Encuesta trimestral para evaluar el ambiente de trabajo y bienestar de los empleados.',
      fecha_inicio: '2025-01-15T00:00:00Z',
      fecha_fin: '2025-01-30T23:59:59Z',
      estado: 'activa',
      activo: true,
      fecha_creacion: '2025-01-10T10:00:00Z',
      respuestas_recibidas: 12,
      total_invitados: 25
    },
    {
      id: 'encuesta-2',
      empresa_id: 'demo-empresa-1',
      titulo: 'Feedback Actividades de Bienestar',
      descripcion: 'Queremos conocer tu opinión sobre las actividades de bienestar que hemos implementado.',
      fecha_inicio: '2025-01-20T00:00:00Z',
      fecha_fin: '2025-02-05T23:59:59Z',
      estado: 'borrador',
      activo: true,
      fecha_creacion: '2025-01-18T14:30:00Z',
      respuestas_recibidas: 0,
      total_invitados: 0
    },
    {
      id: 'encuesta-3',
      empresa_id: 'demo-empresa-1',
      titulo: 'Satisfacción con Servicios de Coaching',
      descripcion: 'Evaluación específica sobre la calidad y utilidad de las sesiones de coaching.',
      fecha_inicio: '2024-12-01T00:00:00Z',
      fecha_fin: '2024-12-15T23:59:59Z',
      estado: 'finalizada',
      activo: true,
      fecha_creacion: '2024-11-25T09:00:00Z',
      respuestas_recibidas: 18,
      total_invitados: 25
    }
  ],

  // Participantes de encuestas
  participantesEncuesta: [
    {
      id: 'participante-1',
      encuesta_id: 'encuesta-1',
      usuario_id: 'demo-empleado-1',
      estado: 'completada',
      fecha_completado: '2025-01-16T11:30:00Z'
    },
    {
      id: 'participante-2',
      encuesta_id: 'encuesta-1',
      usuario_id: 'demo-empleado-2',
      estado: 'pendiente',
      fecha_completado: null
    },
    {
      id: 'participante-3',
      encuesta_id: 'encuesta-1',
      usuario_id: 'demo-empleado-3',
      estado: 'completada',
      fecha_completado: '2025-01-17T16:45:00Z'
    }
  ],

  // Desafíos de bienestar
  desafiosBienestar: [
    {
      id: 'desafio-1',
      titulo: 'Camina 10,000 pasos diarios',
      descripcion: 'Mantén un estilo de vida activo caminando al menos 10,000 pasos cada día durante una semana completa.',
      descripcion_completa: 'Este desafío te ayudará a incorporar más actividad física en tu rutina diaria. Caminar 10,000 pasos al día es una excelente manera de mejorar tu salud cardiovascular, fortalecer tus músculos y aumentar tu energía.',
      imagen: 'https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg?auto=compress&cs=tinysrgb&w=800',
      puntos: 150,
      fecha_inicio: '2025-01-15T00:00:00Z',
      fecha_fin: '2025-02-15T23:59:59Z',
      estado: 'activo',
      participantes: 45,
      duracion: '1 semana',
      dificultad: 2,
      categoria: 'Actividad Física',
      objetivos: [
        'Caminar al menos 10,000 pasos diarios',
        'Registrar tu progreso cada día',
        'Mantener la constancia durante 7 días consecutivos',
        'Compartir tu experiencia con el equipo'
      ],
      pasos: [
        'Descarga una app de conteo de pasos o usa tu smartwatch',
        'Registra tus pasos diarios en la plataforma',
        'Comparte fotos de tus caminatas (opcional)',
        'Completa el desafío durante 7 días consecutivos'
      ]
    },
    {
      id: 'desafio-2',
      titulo: 'Meditación de 5 minutos',
      descripcion: 'Dedica 5 minutos diarios a la meditación durante 2 semanas para mejorar tu bienestar mental.',
      descripcion_completa: 'La meditación diaria puede reducir significativamente el estrés, mejorar la concentración y promover un mejor equilibrio emocional. Este desafío de 2 semanas te introducirá a la práctica de la meditación mindfulness.',
      imagen: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800',
      puntos: 100,
      fecha_inicio: '2025-01-20T00:00:00Z',
      fecha_fin: '2025-02-20T23:59:59Z',
      estado: 'activo',
      participantes: 32,
      duracion: '2 semanas',
      dificultad: 1,
      categoria: 'Bienestar Mental',
      objetivos: [
        'Meditar 5 minutos cada día',
        'Aprender técnicas básicas de respiración',
        'Desarrollar el hábito de la meditación',
        'Reducir los niveles de estrés diario'
      ],
      pasos: [
        'Encuentra un lugar tranquilo en tu casa u oficina',
        'Usa la app de meditación recomendada o sigue las guías',
        'Registra tu sesión diaria en la plataforma',
        'Reflexiona sobre tu experiencia al final de cada semana'
      ]
    },
    {
      id: 'desafio-3',
      titulo: 'Hidratación saludable',
      descripcion: 'Bebe al menos 8 vasos de agua al día durante 10 días consecutivos para mantener una hidratación óptima.',
      descripcion_completa: 'La hidratación adecuada es fundamental para el funcionamiento óptimo de nuestro cuerpo y mente. Este desafío te ayudará a desarrollar el hábito de beber suficiente agua a lo largo del día.',
      imagen: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=800',
      puntos: 75,
      fecha_inicio: '2025-01-10T00:00:00Z',
      fecha_fin: '2025-01-25T23:59:59Z',
      estado: 'activo',
      participantes: 28,
      duracion: '10 días',
      dificultad: 1,
      categoria: 'Nutrición',
      objetivos: [
        'Beber 8 vasos de agua diarios',
        'Mejorar los hábitos de hidratación',
        'Aumentar los niveles de energía',
        'Desarrollar una rutina saludable'
      ],
      pasos: [
        'Lleva contigo una botella de agua reutilizable',
        'Establece recordatorios para beber agua cada 2 horas',
        'Registra tu consumo diario en la app',
        'Celebra cada día completado con éxito'
      ]
    },
    // Desafíos completados
    {
      id: 'desafio-4',
      titulo: 'Descanso digital',
      descripcion: 'Desconéctate de dispositivos electrónicos 1 hora antes de dormir durante una semana.',
      descripcion_completa: 'El descanso digital antes de dormir mejora significativamente la calidad del sueño y reduce el estrés. Este desafío te ayudará a establecer una rutina nocturna más saludable.',
      imagen: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
      puntos: 120,
      fecha_inicio: '2024-12-15T00:00:00Z',
      fecha_fin: '2024-12-30T23:59:59Z',
      estado: 'completado',
      participantes: 67,
      duracion: '1 semana',
      dificultad: 3,
      categoria: 'Bienestar Digital'
    },
    {
      id: 'desafio-5',
      titulo: 'Alimentación consciente',
      descripcion: 'Practica la alimentación consciente durante las comidas principales por 2 semanas.',
      descripcion_completa: 'La alimentación consciente te ayuda a desarrollar una relación más saludable con la comida, mejorando la digestión y el disfrute de las comidas.',
      imagen: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      puntos: 200,
      fecha_inicio: '2024-12-01T00:00:00Z',
      fecha_fin: '2024-12-20T23:59:59Z',
      estado: 'completado',
      participantes: 41,
      duracion: '2 semanas',
      dificultad: 2,
      categoria: 'Nutrición'
    }
  ],

  // Participación en desafíos
  participacionDesafios: [
    {
      id: 'participacion-1',
      desafio_id: 'desafio-1',
      usuario_id: 'demo-empleado-1',
      fecha_inicio: '2025-01-15T00:00:00Z',
      progreso: 3,
      dias_completados: 3,
      activo: true
    },
    {
      id: 'participacion-2',
      desafio_id: 'desafio-2',
      usuario_id: 'demo-empleado-1',
      fecha_inicio: '2025-01-20T00:00:00Z',
      progreso: 1,
      dias_completados: 1,
      activo: true
    },
    {
      id: 'participacion-3',
      desafio_id: 'desafio-4',
      usuario_id: 'demo-empleado-1',
      fecha_inicio: '2024-12-15T00:00:00Z',
      progreso: 100,
      dias_completados: 7,
      activo: false,
      fecha_completado: '2024-12-22T00:00:00Z'
    }
  ],

  // Actividad reciente
  actividadReciente: [
    {
      descripcion: 'Ana Martínez se apuntó a "Yoga Matutino para Principiantes"',
      fecha_actividad: '2025-01-15T10:30:00Z',
      tipo: 'reserva',
      usuario: 'Ana Martínez'
    },
    {
      descripcion: 'Luis Fernández completó el desafío "Descanso digital"',
      fecha_actividad: '2025-01-14T20:00:00Z',
      tipo: 'desafio',
      usuario: 'Luis Fernández'
    },
    {
      descripcion: 'Sofía López calificó la sesión "Coaching: Gestión del Tiempo" con 5 estrellas',
      fecha_actividad: '2025-01-13T18:30:00Z',
      tipo: 'feedback',
      usuario: 'Sofía López'
    },
    {
      descripción: 'Nueva encuesta "Evaluación de Clima Laboral Q1 2025" creada',
      fecha_actividad: '2025-01-10T10:00:00Z',
      tipo: 'encuesta'
    },
    {
      descripcion: 'David Ruiz se registró en la plataforma',
      fecha_actividad: '2025-01-09T16:20:00Z',
      tipo: 'registro',
      usuario: 'David Ruiz'
    }
  ],

  // Estadísticas del dashboard de admin
  adminDashboardStats: {
    total_empleados: 25,
    empleados_activos: 18,
    sesiones_proximas: 8,
    encuestas_activas: 2,
    participacion_promedio: 72,
    satisfaccion_promedio: 4.3
  },

  // Estadísticas por departamento
  estadisticasPorDepartamento: [
    {
      nombre: 'Tecnología',
      total: 12,
      activos: 10,
      porcentaje_activos: 83,
      puntos_promedio: 1150
    },
    {
      nombre: 'Diseño',
      total: 6,
      activos: 5,
      porcentaje_activos: 83,
      puntos_promedio: 1200
    },
    {
      nombre: 'Producto',
      total: 4,
      activos: 2,
      porcentaje_activos: 50,
      puntos_promedio: 800
    },
    {
      nombre: 'Marketing',
      total: 3,
      activos: 1,
      porcentaje_activos: 33,
      puntos_promedio: 600
    }
  ]
};

// Funciones helper para obtener datos relacionados
export const getDemoHelpers = {
  // Obtener sesiones con datos de colaborador y servicio
  getSesionesConDetalles() {
    return demoData.sesiones.map(sesion => {
      const colaborador = demoData.usuarios.find(u => u.id === sesion.colaborador_id);
      const servicio = demoData.servicios.find(s => s.id === sesion.servicio_id);
      const reservas = demoData.reservas.filter(r => r.sesion_id === sesion.id);
      
      return {
        ...sesion,
        colaborador_nombre: colaborador ? `${colaborador.nombre} ${colaborador.apellido}` : 'Sin asignar',
        servicio_nombre: servicio?.nombre || 'Servicio no encontrado',
        tipo_servicio: servicio?.tipo || 'unknown',
        reservas_count: reservas.length,
        servicios: servicio
      };
    });
  },

  // Obtener reservas con datos de sesión
  getReservasConDetalles(usuarioId) {
    return demoData.reservas
      .filter(r => r.usuario_id === usuarioId)
      .map(reserva => {
        const sesion = demoData.sesiones.find(s => s.id === reserva.sesion_id) || 
                     demoData.sesionesHistoricas.find(s => s.id === reserva.sesion_id);
        const servicio = sesion ? demoData.servicios.find(s => s.id === sesion.servicio_id) : null;
        const colaborador = sesion ? demoData.usuarios.find(u => u.id === sesion.colaborador_id) : null;
        
        return {
          ...reserva,
          sesiones: sesion ? {
            ...sesion,
            servicios: servicio,
            colaborador_nombre: colaborador ? `${colaborador.nombre} ${colaborador.apellido}` : 'Sin asignar'
          } : null
        };
      });
  },

  // Obtener empleados con perfil
  getEmpleadosConPerfil(empresaId) {
    return demoData.usuarios
      .filter(u => u.tipo_usuario === 'empleado' && u.empresa_id === empresaId)
      .map(usuario => {
        const perfil = demoData.perfilEmpleados.find(p => p.usuario_id === usuario.id);
        return {
          ...usuario,
          correo: usuario.email,
          cargo: perfil?.cargo || 'Sin cargo',
          departamento: perfil?.departamento || 'Sin departamento',
          puntos_bienestar: perfil?.puntos_bienestar || 0,
          perfil_empleados: perfil
        };
      });
  },

  // Obtener colaboradores con perfil
  getColaboradoresConPerfil() {
    return demoData.usuarios
      .filter(u => u.tipo_usuario === 'colaborador')
      .map(usuario => {
        const perfil = demoData.perfilColaboradores.find(p => p.usuario_id === usuario.id);
        return {
          ...usuario,
          especialidad: perfil?.especialidad || 'Sin especialidad',
          experiencia: perfil?.experiencia || 0,
          calificacion: perfil?.calificacion || 0,
          estado: perfil?.estado || 'pendiente'
        };
      });
  },

  // Obtener encuestas con estadísticas
  getEncuestasConEstadisticas(empresaId) {
    return demoData.encuestas
      .filter(e => e.empresa_id === empresaId)
      .map(encuesta => {
        const participantes = demoData.participantesEncuesta.filter(p => p.encuesta_id === encuesta.id);
        const completadas = participantes.filter(p => p.estado === 'completada').length;
        
        return {
          ...encuesta,
          total_participantes: participantes.length,
          respuestas_completadas: completadas,
          porcentaje_completado: participantes.length > 0 ? Math.round((completadas / participantes.length) * 100) : 0
        };
      });
  }
};