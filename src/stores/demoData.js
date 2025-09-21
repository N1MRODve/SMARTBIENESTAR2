export const demoData = {
  // ...existing properties...

  desafios: [
    {
      id: 'desafio-1',
      titulo: 'Desafío de pasos diarios',
      descripcion: 'Completa al menos 10,000 pasos cada día durante una semana.',
      puntos: 100,
      estado: 'pendiente'
    },
    {
      id: 'desafio-2',
      titulo: 'Desafío de hidratación',
      descripcion: 'Bebe al menos 2 litros de agua al día durante 5 días.',
      puntos: 80,
      estado: 'completado'
    },
    {
      id: 'desafio-3',
      titulo: 'Desafío de lectura',
      descripcion: 'Lee un libro sobre bienestar mental este mes.',
      puntos: 120,
      estado: 'pendiente'
    }
  ],

  encuestas: [
    {
      id: 'encuesta-1',
      titulo: 'Encuesta de satisfacción laboral',
      descripcion: 'Ayúdanos a mejorar el ambiente de trabajo respondiendo esta encuesta.',
      estado: 'pendiente',
      preguntas: [
        { id: 'preg-1', texto: '¿Cómo calificarías tu satisfacción general?', tipo: 'opcion_multiple' },
        { id: 'preg-2', texto: '¿Qué mejorarías en la empresa?', tipo: 'texto' }
      ]
    },
    {
      id: 'encuesta-2',
      titulo: 'Encuesta de hábitos saludables',
      descripcion: 'Queremos conocer tus hábitos para ofrecerte mejores actividades.',
      estado: 'respondida',
      preguntas: [
        { id: 'preg-3', texto: '¿Cuántas veces haces ejercicio a la semana?', tipo: 'opcion_multiple' },
        { id: 'preg-4', texto: '¿Qué actividad física prefieres?', tipo: 'texto' }
      ]
    }
  ],

  talleres: [
    {
      id: 'taller-1',
      nombre: 'Taller de Mindfulness',
      descripcion: 'Aprende técnicas de atención plena para reducir el estrés.',
      ponente: 'Dra. Ana Torres',
      fecha: '2025-09-20',
      hora: '10:00',
      plazas_disponibles: 8,
      plazas_totales: 20,
      tipo: 'Taller'
    },
    {
      id: 'taller-2',
      nombre: 'Taller de Alimentación Saludable',
      descripcion: 'Consejos prácticos para mejorar tu dieta diaria.',
      ponente: 'Lic. Carlos Méndez',
      fecha: '2025-09-22',
      hora: '16:00',
      plazas_disponibles: 15,
      plazas_totales: 25,
      tipo: 'Taller'
    },
    {
      id: 'taller-3',
      nombre: 'Taller de Gestión del Tiempo',
      descripcion: 'Herramientas para organizar mejor tus tareas y reducir el estrés.',
      ponente: 'Mtra. Laura Gómez',
      fecha: '2025-09-25',
      hora: '14:00',
      plazas_disponibles: 5,
      plazas_totales: 15,
      tipo: 'Taller'
    }
  ],

  sesionesCoaching: [
    {
      id: 'coaching-1',
      nombre: 'Sesión de Coaching: Liderazgo',
      descripcion: 'Desarrolla habilidades de liderazgo con un coach profesional.',
      ponente: 'Coach Mario Ruiz',
      fecha: '2025-09-18',
      hora: '09:00',
      plazas_disponibles: 2,
      plazas_totales: 5,
      tipo: 'Coaching'
    },
    {
      id: 'coaching-2',
      nombre: 'Sesión de Coaching: Comunicación',
      descripcion: 'Mejora tu comunicación interpersonal en el trabajo.',
      ponente: 'Coach Sandra Pérez',
      fecha: '2025-09-21',
      hora: '11:00',
      plazas_disponibles: 3,
      plazas_totales: 5,
      tipo: 'Coaching'
    }
  ],

  sesionesPsicoterapia: [
    {
      id: 'psico-1',
      nombre: 'Sesión de Psicoterapia: Manejo de Ansiedad',
      descripcion: 'Aprende técnicas para gestionar la ansiedad en el entorno laboral.',
      ponente: 'Psic. Karla Jiménez',
      fecha: '2025-09-19',
      hora: '15:00',
      plazas_disponibles: 1,
      plazas_totales: 4,
      tipo: 'Psicoterapia'
    },
    {
      id: 'psico-2',
      nombre: 'Sesión de Psicoterapia: Autoestima',
      descripcion: 'Fortalece tu autoestima con apoyo profesional.',
      ponente: 'Psic. Luis Herrera',
      fecha: '2025-09-23',
      hora: '13:00',
      plazas_disponibles: 2,
      plazas_totales: 4,
      tipo: 'Psicoterapia'
    }
  ]
  // ...existing properties...
}