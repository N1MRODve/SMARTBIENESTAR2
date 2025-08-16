// Demo data for SMART Bienestar platform
export const demoData = {
  // Empresas demo
  empresas: [
    {
      id: 'demo-empresa-1',
      nombre: 'InnovaTech Solutions',
      dominio_email: 'innovatech-demo.com',
      logo_url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100',
      telefono: '+34 91 123 45 67',
      sitio_web: 'https://innovatech-demo.com',
      direccion: 'Calle Serrano 123, Madrid',
      activo: true,
      fecha_registro: '2024-01-15T10:00:00Z',
      actividad_score: 85
    },
    {
      id: 'demo-empresa-2',
      nombre: 'Creative Digital Agency',
      dominio_email: 'creativedigital-demo.com',
      logo_url: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100',
      telefono: '+34 93 987 65 43',
      sitio_web: 'https://creativedigital-demo.com',
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
      email: 'demo.admin@innovatech-demo.com',
      nombre: 'María',
      apellido: 'González',
      tipo_usuario: 'administrador',
      empresa_id: 'demo-empresa-1',
      activo: true,
      fecha_registro: '2024-01-15T10:00:00Z'
    },
    {
      id: 'demo-admin-2',
      email: 'demo.admin@creativedigital-demo.com',
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
      email: 'demo.ana@innovatech-demo.com',
      nombre: 'Ana',
      apellido: 'Martínez',
      tipo_usuario: 'empleado',
      empresa_id: 'demo-empresa-1',
      activo: true,
      fecha_registro: '2024-01-20T09:00:00Z'
    },
    {
      id: 'demo-empleado-2',
      email: 'demo.luis@innovatech-demo.com',
      nombre: 'Luis',
      apellido: 'Fernández',
      tipo_usuario: 'empleado',
      empresa_id: 'demo-empresa-1',
      activo: true,
      fecha_registro: '2024-01-25T11:30:00Z'
    },
    {
      id: 'demo-empleado-3',
      email: 'demo.sofia@innovatech-demo.com',
      nombre: 'Sofía',
      apellido: 'López',
      tipo_usuario: 'empleado',
      empresa_id: 'demo-empresa-1',
      activo: true,
      fecha_registro: '2024-02-01T16:15:00Z'
    },
    {
      id: 'demo-empleado-4',
      email: 'demo.david@creativedigital-demo.com',
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
      email: 'demo.elena@smartbienestar-demo.com',
      nombre: 'Elena',
      apellido: 'Vásquez',
      tipo_usuario: 'colaborador',
      activo: true,
      fecha_registro: '2024-01-10T08:00:00Z'
    },
    {
      id: 'demo-colaborador-2',
      email: 'demo.miguel@smartbienestar-demo.com',
      nombre: 'Miguel',
      apellido: 'Torres',
      tipo_usuario: 'colaborador',
      activo: true,
      fecha_registro: '2024-01-12T12:00:00Z'
    },
    {
      id: 'demo-colaborador-3',
      email: 'demo.laura@smartbienestar-demo.com',
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

  // Coaches disponibles para sesiones personalizadas
  coachesPersonalizados: [
    {
      id: 'coach-1',
      nombre: 'Elena',
      apellido: 'Vásquez',
      especialidad: 'Coach de Vida y Bienestar',
      descripcion: 'Especialista en equilibrio vida-trabajo, gestión del estrés y desarrollo personal.',
      experiencia: 8,
      calificacion: 4.9,
      precio_sesion: 75,
      precio_empleado: 0, // Gratuito para empleados
      duracion_sesion: 60,
      modalidades: ['online', 'presencial'],
      imagen: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      especialidades: ['Gestión del estrés', 'Equilibrio vida-trabajo', 'Autoestima', 'Objetivos personales'],
      disponibilidad: {
        lunes: ['09:00', '10:00', '11:00', '16:00', '17:00'],
        martes: ['09:00', '10:00', '11:00', '16:00', '17:00'],
        miercoles: ['09:00', '10:00', '11:00'],
        jueves: ['09:00', '10:00', '11:00', '16:00', '17:00'],
        viernes: ['09:00', '10:00', '11:00']
      },
      activo: true
    },
    {
      id: 'coach-2',
      nombre: 'Miguel',
      apellido: 'Torres',
      especialidad: 'Coach Ejecutivo y Liderazgo',
      descripcion: 'Experto en desarrollo de liderazgo, comunicación efectiva y crecimiento profesional.',
      experiencia: 12,
      calificacion: 4.8,
      precio_sesion: 90,
      precio_empleado: 0,
      duracion_sesion: 60,
      modalidades: ['online', 'presencial'],
      imagen: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
      especialidades: ['Liderazgo', 'Comunicación', 'Productividad', 'Toma de decisiones'],
      disponibilidad: {
        lunes: ['10:00', '14:00', '15:00', '16:00'],
        martes: ['10:00', '14:00', '15:00', '16:00'],
        miercoles: ['10:00', '14:00', '15:00', '16:00'],
        jueves: ['10:00', '14:00', '15:00', '16:00'],
        viernes: ['10:00', '14:00', '15:00']
      },
      activo: true
    },
    {
      id: 'coach-3',
      nombre: 'Laura',
      apellido: 'Sánchez',
      especialidad: 'Coach Nutricional y Wellness',
      descripcion: 'Nutricionista y coach especializada en hábitos saludables y bienestar integral.',
      experiencia: 6,
      calificacion: 4.7,
      precio_sesion: 65,
      precio_empleado: 0,
      duracion_sesion: 45,
      modalidades: ['online', 'presencial'],
      imagen: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400',
      especialidades: ['Nutrición', 'Hábitos saludables', 'Energía y vitalidad', 'Alimentación consciente'],
      disponibilidad: {
        lunes: ['08:00', '09:00', '12:00', '13:00', '17:00'],
        martes: ['08:00', '09:00', '12:00', '13:00', '17:00'],
        miercoles: ['08:00', '09:00', '12:00', '13:00'],
        jueves: ['08:00', '09:00', '12:00', '13:00', '17:00'],
        viernes: ['08:00', '09:00', '12:00', '13:00']
      },
      activo: true
    },
    {
      id: 'coach-4',
      nombre: 'Roberto',
      apellido: 'Mendoza',
      especialidad: 'Coach de Carrera y Desarrollo',
      descripcion: 'Especialista en desarrollo de carrera, transiciones profesionales y planificación estratégica.',
      experiencia: 10,
      calificacion: 4.9,
      precio_sesion: 85,
      precio_empleado: 0,
      duracion_sesion: 60,
      modalidades: ['online', 'presencial'],
      imagen: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      especialidades: ['Desarrollo de carrera', 'Transiciones profesionales', 'Planificación estratégica', 'Networking'],
      disponibilidad: {
        lunes: ['11:00', '15:00', '16:00', '17:00'],
        martes: ['11:00', '15:00', '16:00', '17:00'],
        miercoles: ['11:00', '15:00', '16:00'],
        jueves: ['11:00', '15:00', '16:00', '17:00'],
        viernes: ['11:00', '15:00', '16:00']
      },
      activo: true
    },
    {
      id: 'coach-5',
      nombre: 'Carmen',
      apellido: 'Vega',
      especialidad: 'Coach de Mindfulness y Emocional',
      descripcion: 'Psicóloga y coach especializada en inteligencia emocional y técnicas de mindfulness.',
      experiencia: 7,
      calificacion: 4.8,
      precio_sesion: 70,
      precio_empleado: 0,
      duracion_sesion: 50,
      modalidades: ['online', 'presencial'],
      imagen: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=400',
      especialidades: ['Inteligencia emocional', 'Mindfulness', 'Gestión de emociones', 'Resiliencia'],
      disponibilidad: {
        lunes: ['09:00', '10:00', '14:00', '15:00', '16:00'],
        martes: ['09:00', '10:00', '14:00', '15:00', '16:00'],
        miercoles: ['09:00', '10:00', '14:00', '15:00'],
        jueves: ['09:00', '10:00', '14:00', '15:00', '16:00'],
        viernes: ['09:00', '10:00', '14:00', '15:00']
      },
      activo: true
    },
    {
      id: 'coach-6',
      nombre: 'Andrés',
      apellido: 'Morales',
      especialidad: 'Coach de Productividad y Organización',
      descripcion: 'Experto en optimización del tiempo, organización personal y técnicas de productividad.',
      experiencia: 5,
      calificacion: 4.6,
      precio_sesion: 60,
      precio_empleado: 0,
      duracion_sesion: 45,
      modalidades: ['online', 'presencial'],
      imagen: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400',
      especialidades: ['Gestión del tiempo', 'Organización personal', 'Productividad', 'Eliminación de distracciones'],
      disponibilidad: {
        lunes: ['08:00', '12:00', '13:00', '18:00', '19:00'],
        martes: ['08:00', '12:00', '13:00', '18:00', '19:00'],
        miercoles: ['08:00', '12:00', '13:00', '18:00'],
        jueves: ['08:00', '12:00', '13:00', '18:00', '19:00'],
        viernes: ['08:00', '12:00', '13:00', '18:00']
      },
      activo: true
    }
  ],

  // Sesiones personalizadas reservadas
  sesionesPersonalizadas: [
    {
      id: 'sesion-personal-1',
      coach_id: 'coach-1',
      usuario_id: 'demo-empleado-1',
      titulo: 'Sesión de Gestión del Estrés',
      descripcion: 'Trabajaremos técnicas específicas para manejar el estrés laboral y encontrar equilibrio.',
      fecha_sesion: '2025-01-22T16:00:00Z',
      duracion: 60,
      modalidad: 'online',
      enlace_reunion: 'https://zoom.us/j/coaching-123',
      estado: 'confirmada',
      precio_pagado: 0,
      puntos_ganados: 100,
      fecha_reserva: '2025-01-18T10:30:00Z',
      notas_empleado: 'Me gustaría enfocarme en técnicas para manejar la presión de deadlines',
      preparacion: 'Tener lista una situación específica de estrés que quieras trabajar'
    },
    {
      id: 'sesion-personal-2',
      coach_id: 'coach-2',
      usuario_id: 'demo-empleado-1',
      titulo: 'Desarrollo de Liderazgo Personal',
      descripcion: 'Exploraremos tu potencial de liderazgo y desarrollaremos habilidades clave.',
      fecha_sesion: '2025-01-25T15:00:00Z',
      duracion: 60,
      modalidad: 'presencial',
      ubicacion: 'Oficina SMART Bienestar - Sala de Coaching 2',
      estado: 'confirmada',
      precio_pagado: 0,
      puntos_ganados: 120,
      fecha_reserva: '2025-01-19T14:20:00Z',
      notas_empleado: 'Quiero mejorar mis habilidades de comunicación con el equipo',
      preparacion: 'Reflexiona sobre situaciones donde has liderado o te gustaría liderar'
    },
    // Sesiones completadas
    {
      id: 'sesion-personal-historica-1',
      coach_id: 'coach-3',
      usuario_id: 'demo-empleado-1',
      titulo: 'Consulta Nutricional Personalizada',
      descripcion: 'Evaluación de hábitos alimentarios y plan personalizado de nutrición.',
      fecha_sesion: '2025-01-10T12:00:00Z',
      duracion: 45,
      modalidad: 'online',
      estado: 'completada',
      precio_pagado: 0,
      puntos_ganados: 80,
      fecha_reserva: '2025-01-08T09:15:00Z',
      calificacion: 5,
      comentario: 'Excelente sesión, muy personalizada y útil',
      fecha_completado: '2025-01-10T12:45:00Z'
    },
    {
      id: 'sesion-personal-historica-2',
      coach_id: 'coach-5',
      usuario_id: 'demo-empleado-1',
      titulo: 'Sesión de Mindfulness y Gestión Emocional',
      descripcion: 'Técnicas personalizadas de mindfulness para mejorar el bienestar emocional.',
      fecha_sesion: '2025-01-05T14:00:00Z',
      duracion: 50,
      modalidad: 'presencial',
      ubicacion: 'Oficina SMART Bienestar - Sala de Mindfulness',
      estado: 'completada',
      precio_pagado: 0,
      puntos_ganados: 90,
      fecha_reserva: '2025-01-03T11:45:00Z',
      calificacion: 4,
      comentario: 'Muy relajante, aprendí técnicas que uso diariamente',
      fecha_completado: '2025-01-05T14:50:00Z'
    }
  ],

  // Cursos y talleres disponibles
  cursosYTalleres: [
    {
      id: 'curso-1',
      titulo: 'Liderazgo Digital en la Era Moderna',
      descripcion: 'Desarrolla habilidades de liderazgo adaptadas al entorno digital actual.',
      descripcion_completa: 'Este curso integral te ayudará a desarrollar las competencias necesarias para liderar equipos en un mundo cada vez más digitalizado. Aprenderás sobre comunicación virtual efectiva, gestión de equipos remotos, toma de decisiones basada en datos y cómo inspirar y motivar a tu equipo en entornos híbridos.',
      categoria: 'Habilidades Blandas',
      tipo: 'Curso',
      modalidad: 'online',
      duracion: '6 semanas',
      horas_totales: 24,
      nivel: 'Intermedio',
      instructor: 'Dr. Roberto Mendoza',
      instructor_bio: 'Consultor en transformación digital con 15 años de experiencia en liderazgo corporativo.',
      fecha_inicio: '2025-02-01T09:00:00Z',
      fecha_fin: '2025-03-15T18:00:00Z',
      horario: 'Martes y Jueves, 17:00-19:00',
      precio: 299,
      precio_empleado: 0, // Gratuito para empleados
      plazas_totales: 25,
      plazas_ocupadas: 8,
      imagen: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      estado: 'abierto',
      puntos_completado: 200,
      certificado: true,
      requisitos: ['Experiencia básica en gestión de equipos', 'Acceso a computadora con cámara'],
      objetivos: [
        'Desarrollar habilidades de liderazgo digital',
        'Aprender técnicas de comunicación virtual',
        'Gestionar equipos remotos efectivamente',
        'Implementar herramientas de colaboración digital'
      ],
      temario: [
        'Semana 1: Fundamentos del liderazgo digital',
        'Semana 2: Comunicación efectiva en entornos virtuales',
        'Semana 3: Gestión de equipos remotos',
        'Semana 4: Herramientas de colaboración digital',
        'Semana 5: Toma de decisiones basada en datos',
        'Semana 6: Proyecto final y certificación'
      ]
    },
    {
      id: 'taller-1',
      titulo: 'Taller de Comunicación Asertiva',
      descripcion: 'Mejora tus habilidades de comunicación para relaciones laborales más efectivas.',
      descripcion_completa: 'Un taller práctico e interactivo donde aprenderás técnicas de comunicación asertiva que te permitirán expresar tus ideas con claridad, manejar conflictos de manera constructiva y establecer límites saludables en el trabajo.',
      categoria: 'Habilidades Blandas',
      tipo: 'Taller',
      modalidad: 'presencial',
      duracion: '1 día',
      horas_totales: 8,
      nivel: 'Básico',
      instructor: 'Lic. Carmen Vega',
      instructor_bio: 'Psicóloga organizacional especializada en comunicación interpersonal y resolución de conflictos.',
      fecha_inicio: '2025-01-25T09:00:00Z',
      fecha_fin: '2025-01-25T17:00:00Z',
      horario: 'Sábado, 9:00-17:00 (con descansos)',
      precio: 150,
      precio_empleado: 0,
      plazas_totales: 20,
      plazas_ocupadas: 15,
      imagen: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
      estado: 'abierto',
      puntos_completado: 100,
      certificado: true,
      requisitos: ['Ninguno - Abierto a todos los niveles'],
      objetivos: [
        'Desarrollar técnicas de comunicación asertiva',
        'Aprender a manejar conflictos constructivamente',
        'Mejorar la escucha activa',
        'Establecer límites profesionales saludables'
      ],
      temario: [
        '9:00-10:30: Fundamentos de la comunicación asertiva',
        '11:00-12:30: Técnicas de escucha activa',
        '14:00-15:30: Manejo de conflictos',
        '16:00-17:00: Práctica y role-playing'
      ]
    },
    {
      id: 'curso-2',
      titulo: 'Desarrollo Web con React y Vue.js',
      descripcion: 'Aprende los frameworks más populares para desarrollo frontend moderno.',
      descripcion_completa: 'Curso intensivo que te llevará desde los conceptos básicos hasta el desarrollo de aplicaciones web completas usando React y Vue.js. Incluye proyectos prácticos, mejores prácticas y técnicas avanzadas.',
      categoria: 'Habilidades Técnicas',
      tipo: 'Curso',
      modalidad: 'híbrido',
      duracion: '8 semanas',
      horas_totales: 40,
      nivel: 'Intermedio',
      instructor: 'Ing. Alex Morales',
      instructor_bio: 'Senior Frontend Developer con 10 años de experiencia en React, Vue.js y arquitecturas modernas.',
      fecha_inicio: '2025-02-10T18:00:00Z',
      fecha_fin: '2025-04-05T20:00:00Z',
      horario: 'Lunes y Miércoles, 18:00-20:00',
      precio: 450,
      precio_empleado: 50, // Descuento especial
      plazas_totales: 15,
      plazas_ocupadas: 12,
      imagen: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800',
      estado: 'abierto',
      puntos_completado: 300,
      certificado: true,
      requisitos: ['Conocimientos básicos de HTML, CSS y JavaScript', 'Computadora con Node.js instalado'],
      objetivos: [
        'Dominar React y Vue.js desde cero',
        'Desarrollar aplicaciones web modernas',
        'Implementar mejores prácticas de desarrollo',
        'Crear un portfolio de proyectos'
      ],
      temario: [
        'Semanas 1-2: Fundamentos de React',
        'Semanas 3-4: Estado y ciclo de vida en React',
        'Semanas 5-6: Introducción a Vue.js',
        'Semanas 7-8: Proyecto final integrador'
      ]
    },
    {
      id: 'taller-2',
      titulo: 'Gestión del Tiempo y Productividad',
      descripcion: 'Técnicas probadas para optimizar tu tiempo y aumentar tu productividad diaria.',
      descripcion_completa: 'Taller intensivo donde aprenderás metodologías como GTD, Pomodoro, Time Blocking y otras técnicas avanzadas para gestionar tu tiempo de manera efectiva y aumentar significativamente tu productividad.',
      categoria: 'Habilidades Blandas',
      tipo: 'Taller',
      modalidad: 'online',
      duracion: '2 días',
      horas_totales: 12,
      nivel: 'Básico',
      instructor: 'Coach María Fernández',
      instructor_bio: 'Especialista en productividad personal con certificación en metodologías GTD y Agile.',
      fecha_inicio: '2025-02-15T09:00:00Z',
      fecha_fin: '2025-02-16T15:00:00Z',
      horario: 'Sábado y Domingo, 9:00-15:00',
      precio: 200,
      precio_empleado: 0,
      plazas_totales: 30,
      plazas_ocupadas: 22,
      imagen: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      estado: 'abierto',
      puntos_completado: 150,
      certificado: true,
      requisitos: ['Motivación para cambiar hábitos de trabajo'],
      objetivos: [
        'Implementar sistemas de gestión del tiempo',
        'Eliminar distracciones y procrastinación',
        'Priorizar tareas efectivamente',
        'Crear rutinas productivas sostenibles'
      ],
      temario: [
        'Día 1 Mañana: Análisis de hábitos actuales',
        'Día 1 Tarde: Metodología GTD y Pomodoro',
        'Día 2 Mañana: Time Blocking y priorización',
        'Día 2 Tarde: Implementación y seguimiento'
      ]
    },
    {
      id: 'curso-3',
      titulo: 'Análisis de Datos con Python',
      descripcion: 'Aprende a analizar datos y crear visualizaciones usando Python y sus librerías.',
      descripcion_completa: 'Curso completo de análisis de datos que te llevará desde los fundamentos de Python hasta la creación de dashboards interactivos. Incluye pandas, matplotlib, seaborn y plotly.',
      categoria: 'Habilidades Técnicas',
      tipo: 'Curso',
      modalidad: 'online',
      duracion: '10 semanas',
      horas_totales: 50,
      nivel: 'Intermedio',
      instructor: 'Dr. Patricia Silva',
      instructor_bio: 'Data Scientist con PhD en Estadística y 8 años de experiencia en análisis de datos corporativos.',
      fecha_inicio: '2025-03-01T19:00:00Z',
      fecha_fin: '2025-05-10T21:00:00Z',
      horario: 'Martes y Viernes, 19:00-21:00',
      precio: 550,
      precio_empleado: 75,
      plazas_totales: 20,
      plazas_ocupadas: 5,
      imagen: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
      estado: 'próximamente',
      puntos_completado: 400,
      certificado: true,
      requisitos: ['Conocimientos básicos de programación', 'Python instalado en el sistema'],
      objetivos: [
        'Dominar Python para análisis de datos',
        'Crear visualizaciones impactantes',
        'Implementar modelos predictivos básicos',
        'Desarrollar dashboards interactivos'
      ],
      temario: [
        'Semanas 1-2: Fundamentos de Python',
        'Semanas 3-4: Pandas y manipulación de datos',
        'Semanas 5-6: Visualización con matplotlib/seaborn',
        'Semanas 7-8: Análisis estadístico',
        'Semanas 9-10: Proyecto final y dashboard'
      ]
    },
    {
      id: 'taller-3',
      titulo: 'Presentaciones Impactantes',
      descripcion: 'Crea presentaciones que cautiven a tu audiencia y comuniquen ideas efectivamente.',
      descripcion_completa: 'Taller práctico donde aprenderás a estructurar, diseñar y presentar ideas de manera impactante. Incluye técnicas de storytelling, diseño visual y manejo de nervios.',
      categoria: 'Habilidades Blandas',
      tipo: 'Taller',
      modalidad: 'presencial',
      duracion: '1 día',
      horas_totales: 6,
      nivel: 'Básico',
      instructor: 'Lic. Fernando Castro',
      instructor_bio: 'Especialista en comunicación corporativa y presentaciones ejecutivas con 12 años de experiencia.',
      fecha_inicio: '2025-02-08T10:00:00Z',
      fecha_fin: '2025-02-08T16:00:00Z',
      horario: 'Sábado, 10:00-16:00',
      precio: 120,
      precio_empleado: 0,
      plazas_totales: 18,
      plazas_ocupadas: 11,
      imagen: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      estado: 'abierto',
      puntos_completado: 80,
      certificado: false,
      requisitos: ['Traer laptop personal', 'Tener una presentación actual para trabajar'],
      objetivos: [
        'Estructurar presentaciones efectivas',
        'Aplicar principios de diseño visual',
        'Desarrollar técnicas de storytelling',
        'Manejar nervios y conectar con la audiencia'
      ],
      temario: [
        '10:00-11:30: Estructura y narrativa',
        '12:00-13:30: Diseño visual efectivo',
        '14:30-16:00: Técnicas de presentación y práctica'
      ]
    },
    {
      id: 'curso-4',
      titulo: 'Ciberseguridad para Profesionales',
      descripcion: 'Protege tu información y la de tu empresa con conocimientos esenciales de ciberseguridad.',
      descripcion_completa: 'Curso esencial que cubre los aspectos fundamentales de la ciberseguridad en el entorno corporativo. Aprenderás a identificar amenazas, implementar medidas de protección y crear una cultura de seguridad.',
      categoria: 'Habilidades Técnicas',
      tipo: 'Curso',
      modalidad: 'híbrido',
      duracion: '4 semanas',
      horas_totales: 20,
      nivel: 'Básico',
      instructor: 'Ing. Sandra López',
      instructor_bio: 'Especialista en ciberseguridad certificada CISSP con experiencia en Fortune 500.',
      fecha_inicio: '2025-01-30T18:30:00Z',
      fecha_fin: '2025-02-27T20:30:00Z',
      horario: 'Miércoles y Viernes, 18:30-20:30',
      precio: 350,
      precio_empleado: 25,
      plazas_totales: 25,
      plazas_ocupadas: 18,
      imagen: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
      estado: 'abierto',
      puntos_completado: 250,
      certificado: true,
      requisitos: ['Conocimientos básicos de informática', 'Acceso a computadora personal'],
      objetivos: [
        'Identificar amenazas de ciberseguridad',
        'Implementar medidas de protección personal',
        'Crear contraseñas seguras y gestionar credenciales',
        'Reconocer y prevenir ataques de phishing'
      ],
      temario: [
        'Semana 1: Fundamentos de ciberseguridad',
        'Semana 2: Amenazas comunes y prevención',
        'Semana 3: Seguridad en redes y dispositivos',
        'Semana 4: Mejores prácticas y cultura de seguridad'
      ]
    },
    {
      id: 'taller-4',
      titulo: 'Mindfulness y Gestión del Estrés',
      descripcion: 'Técnicas de mindfulness aplicadas al entorno laboral para reducir estrés y mejorar el bienestar.',
      descripcion_completa: 'Taller experiencial que combina teoría y práctica del mindfulness aplicado al trabajo. Aprenderás técnicas de respiración, meditación breve y estrategias para mantener la calma en situaciones estresantes.',
      categoria: 'Bienestar Personal',
      tipo: 'Taller',
      modalidad: 'presencial',
      duracion: '1 día',
      horas_totales: 5,
      nivel: 'Básico',
      instructor: 'Elena Vásquez',
      instructor_bio: 'Instructora certificada de mindfulness y yoga con especialización en bienestar corporativo.',
      fecha_inicio: '2025-02-12T14:00:00Z',
      fecha_fin: '2025-02-12T19:00:00Z',
      horario: 'Miércoles, 14:00-19:00',
      precio: 100,
      precio_empleado: 0,
      plazas_totales: 16,
      plazas_ocupadas: 9,
      imagen: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800',
      estado: 'abierto',
      puntos_completado: 75,
      certificado: false,
      requisitos: ['Ropa cómoda', 'Mente abierta para nuevas experiencias'],
      objetivos: [
        'Aprender técnicas de mindfulness básicas',
        'Desarrollar estrategias de manejo del estrés',
        'Implementar pausas conscientes en el trabajo',
        'Mejorar la concentración y claridad mental'
      ],
      temario: [
        '14:00-15:30: Introducción al mindfulness',
        '16:00-17:30: Técnicas de respiración y relajación',
        '18:00-19:00: Aplicación práctica en el trabajo'
      ]
    },
    {
      id: 'curso-5',
      titulo: 'Excel Avanzado para Análisis de Datos',
      descripcion: 'Domina Excel para análisis de datos, automatización y creación de dashboards profesionales.',
      descripcion_completa: 'Curso avanzado que te convertirá en un experto de Excel. Aprenderás fórmulas complejas, tablas dinámicas, macros, Power Query y Power BI para análisis de datos profesional.',
      categoria: 'Habilidades Técnicas',
      tipo: 'Curso',
      modalidad: 'online',
      duracion: '5 semanas',
      horas_totales: 25,
      nivel: 'Avanzado',
      instructor: 'Lic. Ricardo Herrera',
      instructor_bio: 'Consultor en Business Intelligence con certificaciones Microsoft y 12 años de experiencia.',
      fecha_inicio: '2025-02-20T19:00:00Z',
      fecha_fin: '2025-03-27T21:00:00Z',
      horario: 'Jueves, 19:00-21:00',
      precio: 280,
      precio_empleado: 30,
      plazas_totales: 22,
      plazas_ocupadas: 6,
      imagen: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800',
      estado: 'abierto',
      puntos_completado: 180,
      certificado: true,
      requisitos: ['Excel 2016 o superior instalado', 'Conocimientos básicos de Excel'],
      objetivos: [
        'Dominar fórmulas y funciones avanzadas',
        'Crear tablas dinámicas complejas',
        'Automatizar tareas con macros',
        'Desarrollar dashboards interactivos'
      ],
      temario: [
        'Semana 1: Fórmulas y funciones avanzadas',
        'Semana 2: Tablas dinámicas y análisis',
        'Semana 3: Power Query y conexiones de datos',
        'Semana 4: Macros y automatización',
        'Semana 5: Dashboards y visualizaciones'
      ]
    },
    {
      id: 'taller-5',
      titulo: 'Trabajo en Equipo y Colaboración',
      descripcion: 'Fortalece tus habilidades de trabajo en equipo y colaboración efectiva.',
      descripcion_completa: 'Taller interactivo que te ayudará a desarrollar habilidades esenciales para trabajar efectivamente en equipo, resolver conflictos y crear un ambiente colaborativo positivo.',
      categoria: 'Habilidades Blandas',
      tipo: 'Taller',
      modalidad: 'presencial',
      duracion: '1 día',
      horas_totales: 7,
      nivel: 'Básico',
      instructor: 'Psic. Andrea Ruiz',
      instructor_bio: 'Psicóloga organizacional especializada en dinámicas de grupo y team building.',
      fecha_inicio: '2025-02-22T09:00:00Z',
      fecha_fin: '2025-02-22T16:00:00Z',
      horario: 'Sábado, 9:00-16:00',
      precio: 130,
      precio_empleado: 0,
      plazas_totales: 24,
      plazas_ocupadas: 16,
      imagen: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
      estado: 'abierto',
      puntos_completado: 90,
      certificado: false,
      requisitos: ['Disposición para actividades grupales'],
      objetivos: [
        'Mejorar la comunicación en equipo',
        'Desarrollar habilidades de colaboración',
        'Aprender a resolver conflictos constructivamente',
        'Fortalecer la confianza grupal'
      ],
      temario: [
        '9:00-10:30: Dinámicas de conocimiento y confianza',
        '11:00-12:30: Comunicación efectiva en equipos',
        '14:00-15:30: Resolución de conflictos',
        '15:30-16:00: Plan de acción personal'
      ]
    }
  ],

  // Inscripciones a cursos
  inscripcionesCursos: [
    {
      id: 'inscripcion-1',
      curso_id: 'taller-1',
      usuario_id: 'demo-empleado-1',
      fecha_inscripcion: '2025-01-18T10:30:00Z',
      estado: 'confirmada',
      progreso: 0,
      fecha_completado: null,
      calificacion: null,
      certificado_obtenido: false
    },
    {
      id: 'inscripcion-2',
      curso_id: 'curso-1',
      usuario_id: 'demo-empleado-1',
      fecha_inscripcion: '2025-01-20T14:15:00Z',
      estado: 'confirmada',
      progreso: 0,
      fecha_completado: null,
      calificacion: null,
      certificado_obtenido: false
    },
    // Cursos completados
    {
      id: 'inscripcion-historica-1',
      curso_id: 'curso-historico-1',
      usuario_id: 'demo-empleado-1',
      fecha_inscripcion: '2024-11-01T09:00:00Z',
      estado: 'completado',
      progreso: 100,
      fecha_completado: '2024-12-15T18:00:00Z',
      calificacion: 4.8,
      certificado_obtenido: true
    },
    {
      id: 'inscripcion-historica-2',
      curso_id: 'taller-historico-1',
      usuario_id: 'demo-empleado-1',
      fecha_inscripcion: '2024-12-01T11:30:00Z',
      estado: 'completado',
      progreso: 100,
      fecha_completado: '2024-12-08T16:00:00Z',
      calificacion: 4.9,
      certificado_obtenido: false
    }
  ],

  // Cursos históricos (completados)
  cursosHistoricos: [
    {
      id: 'curso-historico-1',
      titulo: 'Fundamentos de Project Management',
      descripcion: 'Metodologías ágiles y tradicionales para gestión de proyectos exitosos.',
      categoria: 'Habilidades Blandas',
      tipo: 'Curso',
      modalidad: 'híbrido',
      duracion: '6 semanas',
      horas_totales: 30,
      nivel: 'Intermedio',
      instructor: 'PMP Juan Carlos Vega',
      fecha_inicio: '2024-11-01T18:00:00Z',
      fecha_fin: '2024-12-15T20:00:00Z',
      imagen: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      estado: 'completado',
      puntos_completado: 220,
      certificado: true
    },
    {
      id: 'taller-historico-1',
      titulo: 'Creatividad e Innovación',
      descripcion: 'Técnicas para potenciar la creatividad y generar ideas innovadoras.',
      categoria: 'Habilidades Blandas',
      tipo: 'Taller',
      modalidad: 'presencial',
      duracion: '1 día',
      horas_totales: 8,
      nivel: 'Básico',
      instructor: 'Lic. Mónica Herrera',
      fecha_inicio: '2024-12-08T09:00:00Z',
      fecha_fin: '2024-12-08T17:00:00Z',
      imagen: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
      estado: 'completado',
      puntos_completado: 120,
      certificado: false
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