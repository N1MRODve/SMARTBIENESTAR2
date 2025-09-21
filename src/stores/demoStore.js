import { defineStore } from 'pinia';
import { demoData, getDemoHelpers } from '@/data/demoData';

export const useDemoStore = defineStore('demo', {
  state: () => ({
    isDemoMode: true,
    demoData: demoData
  }),

  getters: {
    // Empleados por empresa
    getEmpleadosByEmpresa: (state) => (empresaId) => {
      return getDemoHelpers.getEmpleadosConPerfil(empresaId);
    },

    // Sesiones con detalles
    getSesionesConDetalles: (state) => () => {
      return getDemoHelpers.getSesionesConDetalles();
    },

    // Reservas por usuario
    getReservasByUsuario: (state) => (usuarioId) => {
      return getDemoHelpers.getReservasConDetalles(usuarioId);
    },

    // Colaboradores con perfil
    getColaboradoresConPerfil: (state) => () => {
      return getDemoHelpers.getColaboradoresConPerfil();
    },

    // Encuestas por empresa
    getEncuestasByEmpresa: (state) => (empresaId) => {
      return getDemoHelpers.getEncuestasConEstadisticas(empresaId);
    },

    // Estadísticas de admin
    getAdminStats: (state) => (empresaId) => {
      const empleados = getDemoHelpers.getEmpleadosConPerfil(empresaId);
      const sesiones = state.demoData.sesiones.filter(s => s.empresa_id === empresaId);
      const encuestas = state.demoData.encuestas.filter(e => e.empresa_id === empresaId);
      
      return {
        total_empleados: empleados.length,
        empleados_activos: empleados.filter(e => e.activo).length,
        sesiones_proximas: sesiones.filter(s => new Date(s.fecha_inicio) > new Date()).length,
        encuestas_activas: encuestas.filter(e => e.estado === 'activa').length
      };
    },

    // Estadísticas de empleado
    getEmpleadoStats: (state) => (usuarioId) => {
      const perfil = state.demoData.perfilEmpleados.find(p => p.usuario_id === usuarioId);
      const reservas = state.demoData.reservas.filter(r => r.usuario_id === usuarioId);
      const proximasReservas = reservas.filter(r => {
        const sesion = state.demoData.sesiones.find(s => s.id === r.sesion_id);
        return sesion && new Date(sesion.fecha_inicio) > new Date();
      });
      const sesionesAsistidas = state.demoData.reservas.filter(
        r => r.usuario_id === usuarioId && r.estado === 'completada'
      ).length;
      
      return {
        puntos_bienestar: perfil?.puntos_bienestar || 0,
        desafios_completados: perfil?.desafios_completados || 0,
        proximas_sesiones: proximasReservas.length,
        sesiones_asistidas: sesionesAsistidas
      };
    }
  },

  actions: {
    // Simular login con datos demo
    async loginDemo(email, password) {
      // Credenciales demo
      const demoCredentials = {
        'demo.admin@innovatech-demo.com': { password: 'demo123', userId: 'demo-admin-1' },
        'demo.ana@innovatech-demo.com': { password: 'demo123', userId: 'demo-empleado-1' },
        'demo.luis@innovatech-demo.com': { password: 'demo123', userId: 'demo-empleado-2' },
        'demo.sofia@innovatech-demo.com': { password: 'demo123', userId: 'demo-empleado-3' },
        'demo.elena@smartbienestar-demo.com': { password: 'demo123', userId: 'demo-colaborador-1' },
        'demo.miguel@smartbienestar-demo.com': { password: 'demo123', userId: 'demo-colaborador-2' }
      };

      const credentials = demoCredentials[email];
      if (!credentials || credentials.password !== password) {
        throw new Error('Credenciales incorrectas');
      }

      const user = this.demoData.usuarios.find(u => u.id === credentials.userId);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      return user;
    },

    // Obtener datos de dashboard para admin
    async getAdminDashboardData(empresaId) {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        stats: this.getAdminStats(empresaId),
        empleados: this.getEmpleadosByEmpresa(empresaId),
        actividadReciente: this.demoData.actividadReciente,
        estadisticasPorDepartamento: this.demoData.estadisticasPorDepartamento,
        encuestas: this.getEncuestasByEmpresa(empresaId)
      };
    },

    // Obtener datos de dashboard para empleado
    async getEmpleadoDashboardData(usuarioId) {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const reservas = this.getReservasByUsuario(usuarioId);
      const proximasReservas = reservas.filter(r => {
        return r.sesiones && new Date(r.sesiones.fecha_inicio) > new Date();
      });
      
      const encuestasPendientes = this.demoData.participantesEncuesta
        .filter(p => p.usuario_id === usuarioId && p.estado === 'pendiente')
        .map(p => {
          const encuesta = this.demoData.encuestas.find(e => e.id === p.encuesta_id);
          return {
            ...p,
            encuesta: encuesta
          };
        });

      return {
        stats: this.getEmpleadoStats(usuarioId),
        proximasSesiones: proximasReservas.slice(0, 3),
        encuestasPendientes: encuestasPendientes,
        desafiosActivos: this.demoData.desafiosBienestar.filter(d => d.estado === 'activo'),
        desafiosPasados: this.demoData.desafiosBienestar.filter(d => d.estado === 'completado')
      };
    },

    // Crear nueva reserva
    async crearReserva(reservaData) {
      // Validar datos necesarios
      if (!reservaData.sesion_id || !reservaData.usuario_id) {
        throw new Error('Error: sesion_id y usuario_id son requeridos para crear una reserva');
      }

      // Buscar la sesión para validar disponibilidad
      const sesion = this.demoData.sesiones.find(s => s.id === reservaData.sesion_id);
      if (!sesion) {
        throw new Error(`Error: No se encontró la sesión con ID: ${reservaData.sesion_id}`);
      }

      // Verificar si ya existe una reserva
      const yaReservado = this.demoData.reservas.some(r => r.sesion_id === reservaData.sesion_id && r.usuario_id === reservaData.usuario_id);
      if (yaReservado) {
        throw new Error('Ya tienes una reserva para esta sesión.');
      }

      // Verificar si hay plazas disponibles
      const reservasCount = this.demoData.reservas.filter(r => r.sesion_id === reservaData.sesion_id).length;
      if (reservasCount >= sesion.capacidad_maxima) {
        throw new Error('No hay plazas disponibles para esta sesión');
      }

      // Generar ID único (timestamp + aleatorio para evitar colisiones)
      const nuevoId = `reserva-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      // Crear el objeto de la nueva reserva
      const nuevaReserva = {
        id: nuevoId,
        sesion_id: reservaData.sesion_id,
        usuario_id: reservaData.usuario_id,
        estado: reservaData.estado || 'confirmada',
        fecha_reserva: new Date().toISOString(),
        asistio: null,
        calificacion: null,
        comentario: null
      };

      // Añadir la reserva al array
      this.demoData.reservas.push(nuevaReserva);

      return true;
    },

    // Cancelar reserva existente
    async cancelarReserva(reservaId) {
      // Buscar el índice de la reserva
      const reservaIndex = this.demoData.reservas.findIndex(r => r.id === reservaId);
      
      // Validar que la reserva existe
      if (reservaIndex === -1) {
        throw new Error(`Error: No se encontró la reserva con ID: ${reservaId}`);
      }
      
      // Eliminar la reserva
      this.demoData.reservas.splice(reservaIndex, 1);
      
      return true;
    },

    // Crear nuevo empleado
    async crearEmpleado(empleadoData, empresaId) {
      const nuevoUsuario = {
        id: `demo-empleado-${Date.now()}`,
        email: empleadoData.email,
        nombre: empleadoData.nombre,
        apellido: empleadoData.apellido,
        tipo_usuario: 'empleado',
        empresa_id: empresaId,
        activo: true,
        fecha_registro: new Date().toISOString()
      };

      const nuevoPerfil = {
        usuario_id: nuevoUsuario.id,
        cargo: empleadoData.cargo || 'Sin cargo',
        departamento: 'Nuevo',
        puntos_bienestar: 0,
        desafios_completados: 0,
        nivel_actividad: 'Nuevo',
        ultima_participacion: null
      };

      this.demoData.usuarios.push(nuevoUsuario);
      this.demoData.perfilEmpleados.push(nuevoPerfil);

      return nuevoUsuario;
    },

    // Eliminar empleado
    async eliminarEmpleado(empleadoId) {
      const usuarioIndex = this.demoData.usuarios.findIndex(u => u.id === empleadoId);
      const perfilIndex = this.demoData.perfilEmpleados.findIndex(p => p.usuario_id === empleadoId);
      
      if (usuarioIndex !== -1) {
        this.demoData.usuarios.splice(usuarioIndex, 1);
      }
      if (perfilIndex !== -1) {
        this.demoData.perfilEmpleados.splice(perfilIndex, 1);
      }
      
      // Eliminar reservas del empleado
      this.demoData.reservas = this.demoData.reservas.filter(r => r.usuario_id !== empleadoId);
    },

    // Crear nueva encuesta
    async crearEncuesta(encuestaData, empresaId) {
      const nuevaEncuesta = {
        id: `encuesta-${Date.now()}`,
        empresa_id: empresaId,
        titulo: encuestaData.titulo,
        descripcion: encuestaData.descripcion,
        fecha_inicio: encuestaData.fecha_inicio,
        fecha_fin: encuestaData.fecha_fin,
        estado: 'borrador',
        activo: true,
        fecha_creacion: new Date().toISOString(),
        respuestas_recibidas: 0,
        total_invitados: 0
      };

      this.demoData.encuestas.push(nuevaEncuesta);
      return nuevaEncuesta;
    },

    // Eliminar encuesta
    async eliminarEncuesta(encuestaId) {
      const index = this.demoData.encuestas.findIndex(e => e.id === encuestaId);
      if (index !== -1) {
        this.demoData.encuestas.splice(index, 1);
      }
      
      // Eliminar participantes
      this.demoData.participantesEncuesta = this.demoData.participantesEncuesta.filter(
        p => p.encuesta_id !== encuestaId
      );
    },

    // Completar desafío
    async completarDesafio(desafioId) {
      const desafio = this.demoData.desafios?.find(d => d.id === desafioId);
      if (!desafio) {
        throw new Error(`No se encontró el desafío con ID: ${desafioId}`);
      }
      desafio.estado = 'completado';
      return true;
    },

    // Responder encuesta
    async responderEncuesta(encuestaId, respuestas) {
      const encuesta = this.demoData.encuestas?.find(e => e.id === encuestaId);
      if (!encuesta) {
        throw new Error(`No se encontró la encuesta con ID: ${encuestaId}`);
      }
      encuesta.estado = 'respondida';
      // Opcional: guardar las respuestas en la encuesta
      encuesta.respuestas = respuestas;
      return true;
    }
  }
});