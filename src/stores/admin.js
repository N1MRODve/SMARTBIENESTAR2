// src/stores/admin.js
import { defineStore } from 'pinia'
import { supabase } from '@/services/supabase' // <-- Ruta corregida
import { useAuthStore } from './auth.store'; // Asegúrate de que esta línea esté al principio del archivo
import { useDemoStore } from './demoStore';

export const useAdminStore = defineStore('admin', {
  state: () => ({
    // Información de la empresa del administrador
    empresa: null,
    
    // Estadísticas del dashboard
    dashboardStats: {
      usuariosConectados: 0,
      clasesReservadas: 0,
      encuestasEnviadas: 0,
      empleadosActivos: 0
    },
    
    // Empleados de la empresa
    empleados: [],
    empleadosLoading: false,
    
    // Sesiones de la empresa
    sesiones: [],
    sesionesLoading: false,
    
    // Encuestas de la empresa
    encuestas: [],
    encuestasLoading: false,
    encuestasError: null,
    
    // Actividad reciente
    actividadReciente: [],
    estadisticasPorDepartamento: [],
    
    // Estados de carga
    loading: false,
    error: null,

    // ID de la empresa del usuario actual
    empresaId: null,

    // Encuesta para editar
    encuestaParaEditar: null,

    // Encuesta actual y respuestas actuales
    encuestaActual: null,
    respuestasActuales: [],

    // Plantilla para editar
    plantillaParaEditar: null,

    // Empleado actual
    empleadoActual: null,

    // Nueva propiedad para el estado de carga del dashboard
    dashboardLoading: false
  }),

  getters: {
    // Empleados activos (que han participado recientemente)
    empleadosActivos: (state) => {
      return state.empleados.filter(emp => emp.activo && emp.ultima_participacion)
    },
    
    // Sesiones de la próxima semana
    proximasSesiones: (state) => {
      const now = new Date()
      const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
      
      return state.sesiones.filter(sesion => {
        const fechaSesion = new Date(sesion.fecha_inicio)
        return fechaSesion >= now && fechaSesion <= nextWeek && sesion.activo
      }).sort((a, b) => new Date(a.fecha_inicio) - new Date(b.fecha_inicio))
    },
    
    // Encuestas activas
    encuestasActivas: (state) => {
      const now = new Date()
      return state.encuestas.filter(encuesta => 
        encuesta.estado === 'activa' && 
        new Date(encuesta.fecha_fin) >= now
      )
    },
    
    // Estadísticas por departamento
    estatisticasPorDepartamento: (state) => {
      const departamentos = {}
      
      state.empleados.forEach(empleado => {
        const depto = empleado.departamento || 'Sin departamento'
        if (!departamentos[depto]) {
          departamentos[depto] = {
            nombre: depto,
            total: 0,
            activos: 0,
            puntos_promedio: 0
          }
        }
        
        departamentos[depto].total++
        if (empleado.activo && empleado.ultima_participacion) {
          departamentos[depto].activos++
        }
        departamentos[depto].puntos_promedio += empleado.puntos_bienestar || 0
      })
      
      // Calcular promedios
      Object.values(departamentos).forEach(depto => {
        depto.puntos_promedio = depto.total > 0 ? depto.puntos_promedio / depto.total : 0
        depto.porcentaje_activos = depto.total > 0 ? (depto.activos / depto.total) * 100 : 0
      })
      
      return Object.values(departamentos)
    }
  },

  actions: {
    // Establecer empresa del administrador
    setEmpresa(empresa) {
      this.empresa = empresa
    },

    // Cargar estadísticas del dashboard
    async loadDashboardStats(empresaId) {
      // Usar datos demo si está en modo demo
      const demoStore = useDemoStore();
      if (demoStore.isDemoMode) {
        this.loading = true;
        try {
          await new Promise(resolve => setTimeout(resolve, 800)); // Simular delay
          this.dashboardStats = demoStore.getAdminStats(empresaId);
          return;
        } catch (error) {
          console.error('Error en modo demo:', error);
        } finally {
          this.loading = false;
        }
        return;
      }

      if (!empresaId) {
        console.error('No se puede cargar estadísticas: empresaId no proporcionado')
        return
      }
      
      this.loading = true
      try {
        console.log('Cargando estadísticas para empresa:', empresaId)
        const { data, error } = await supabase
          .rpc('get_admin_dashboard_stats', { empresa_id_param: empresaId })
        
        console.log('Respuesta de get_admin_dashboard_stats:', { data, error })
        
        if (error) throw error
        if (data && data.length > 0) {
          this.dashboardStats = data[0]
        } else {
          console.warn('No se recibieron datos de estadísticas')
          this.dashboardStats = {
            total_empleados: 0,
            empleados_activos: 0,
            sesiones_proximas: 0,
            encuestas_activas: 0
          }
        }
      } catch (err) {
        console.error('Error cargando estadísticas del dashboard:', err)
        this.dashboardStats = {
          total_empleados: 0,
          empleados_activos: 0,
          sesiones_proximas: 0,
          encuestas_activas: 0
        }
        this.error = err.message || 'Error al cargar estadísticas'
      } finally {
        this.loading = false
      }
    },

    // Cargar información de la empresa
    async loadEmpresa(empresaId) {
      try {
        const { data, error } = await supabase
          .from('empresas')
          .select('*')
          .eq('id', empresaId)
          .single()

        if (error) throw error

        this.empresa = data
        return data

      } catch (error) {
        console.error('Error cargando empresa:', error)
        this.error = error.message
        throw error
      }
    },

    // Cargar empleados de la empresa
    async loadEmpleados() {
      // Usar datos demo si está en modo demo
      const demoStore = useDemoStore();
      if (demoStore.isDemoMode) {
        const authStore = useAuthStore();
        const empresaId = authStore.user?.empresa_id;
        
        this.empleadosLoading = true;
        try {
          await new Promise(resolve => setTimeout(resolve, 600)); // Simular delay
          this.empleados = demoStore.getEmpleadosByEmpresa(empresaId);
          return;
        } catch (error) {
          console.error('Error cargando empleados demo:', error);
        } finally {
          this.empleadosLoading = false;
        }
        return;
      }

      const authStore = useAuthStore()
      const currentEmpresaId = authStore.user?.empresa_id

      if (!currentEmpresaId) {
        console.error("No se pudo cargar empleados: empresaId no disponible.");
        return;
      }

      this.empleadosLoading = true
      try {
        const { data, error } = await supabase
          .from('usuarios')
          .select(`*, perfil_empleados(*)`)
          .eq('empresa_id', currentEmpresaId)
          .eq('tipo_usuario', 'empleado')
        
        if (error) throw error
        this.empleados = data
      } catch (error) {
        console.error("Error al cargar empleados:", error)
      } finally {
        this.empleadosLoading = false
      }
    },

    // Cargar última participación de empleados
    async loadUltimaParticipacion(empresaId) {
      try {
        const { data, error } = await supabase
          .from('reservas')
          .select(`
            usuario_id,
            fecha_reserva,
            sesiones!inner (empresa_id)
          `)
          .eq('sesiones.empresa_id', empresaId)
          .eq('estado', 'confirmada')
          .order('fecha_reserva', { ascending: false })

        if (error) throw error

        // Crear mapa de última participación por usuario
        const ultimaParticipacion = {}
        data?.forEach(reserva => {
          if (!ultimaParticipacion[reserva.usuario_id]) {
            ultimaParticipacion[reserva.usuario_id] = reserva.fecha_reserva
          }
        })

        // Actualizar empleados con última participación
        this.empleados = this.empleados.map(emp => ({
          ...emp,
          ultima_participacion: ultimaParticipacion[emp.id] || null
        }))

      } catch (error) {
        console.error('Error cargando última participación:', error)
      }
    },

    // Cargar sesiones de la empresa
    async loadSesiones(empresaId) {
      try {
        this.sesionesLoading = true
        this.error = null

        const { data, error } = await supabase
          .from('sesiones')
          .select(`
            *,
            servicios (tipo, nombre),
            usuarios (nombre, apellido),
            reservas (count)
          `)
          .eq('empresa_id', empresaId)
          .eq('activo', true)
          .order('fecha_inicio', { ascending: false })

        if (error) throw error

        // Procesar sesiones para incluir conteo de reservas
        const sesionesConReservas = await Promise.all(
          (data || []).map(async (sesion) => {
            const { count } = await supabase
              .from('reservas')
              .select('*', { count: 'exact', head: true })
              .eq('sesion_id', sesion.id)
              .eq('estado', 'confirmada')

            return {
              ...sesion,
              tipo_servicio: sesion.servicios?.tipo,
              nombre_servicio: sesion.servicios?.nombre,
              colaborador_nombre: `${sesion.usuarios?.nombre} ${sesion.usuarios?.apellido}`,
              reservas_count: count || 0
            }
          })
        )

        this.sesiones = sesionesConReservas

      } catch (error) {
        console.error('Error cargando sesiones:', error)
        this.error = error.message
      } finally {
        this.sesionesLoading = false
      }
    },

    // Cargar encuestas de la empresa
    async loadEncuestas(empresaId) {
      // Usar datos demo si está en modo demo
      const demoStore = useDemoStore();
      if (demoStore.isDemoMode) {
        this.encuestasLoading = true;
        this.encuestasError = null;
        try {
          await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay
          this.encuestas = demoStore.getEncuestasByEmpresa(empresaId);
          console.log('Encuestas demo cargadas:', this.encuestas);
          return;
        } catch (error) {
          console.error('Error cargando encuestas demo:', error);
          this.encuestasError = error.message;
        } finally {
          this.encuestasLoading = false;
        }
        return;
      }

      this.encuestasLoading = true;
      this.encuestasError = null;
      try {
        const { data, error } = await supabase
          .from('encuestas')
          .select('*')
          .eq('empresa_id', empresaId)
          .order('fecha_creacion', { ascending: false });

        if (error) {
          throw error;
        }

        // ---- INICIO DEL CAMBIO ----
        console.log('Encuestas recibidas desde Supabase:', data);
        // ---- FIN DEL CAMBIO ----

        this.encuestas = data;

      } catch (err) {
        this.encuestasError = err.message || 'Error cargando encuestas';
        this.encuestas = [];
        throw err;
      } finally {
        this.encuestasLoading = false;
      }
    },

    // Cargar actividad reciente
    async loadActividadReciente(empresaId, limit = 10) {
      // Usar datos demo si está en modo demo
      const demoStore = useDemoStore();
      if (demoStore.isDemoMode) {
        this.loading = true;
        try {
          await new Promise(resolve => setTimeout(resolve, 400)); // Simular delay
          this.actividadReciente = demoStore.demoData.actividadReciente.slice(0, limit);
          this.estadisticasPorDepartamento = demoStore.demoData.estadisticasPorDepartamento;
          return;
        } catch (error) {
          console.error('Error cargando actividad demo:', error);
        } finally {
          this.loading = false;
        }
        return;
      }

      if (!empresaId) {
        console.error('No se puede cargar actividad reciente: empresaId no proporcionado')
        return
      }
      
      this.loading = true
      try {
        console.log('Cargando actividad reciente para empresa:', empresaId)
        const { data, error } = await supabase
          .rpc('get_admin_recent_activity', {
            empresa_id_param: empresaId,
            limit_param: limit
          })
        
        console.log('Respuesta de get_admin_recent_activity:', { data, error })
        
        if (error) throw error
        this.actividadReciente = data || []
      } catch (err) {
        console.error('Error cargando actividad reciente:', err)
        this.actividadReciente = []
        this.error = err.message || 'Error al cargar actividad reciente'
      } finally {
        this.loading = false
      }
    },

    // Crear nueva sesión
    async crearSesion(empresaId, sesionData) {
      try {
        this.loading = true
        this.error = null

        const { data, error } = await supabase
          .from('sesiones')
          .insert([{
            ...sesionData,
            empresa_id: empresaId,
            activo: true
          }])
          .select()
          .single()

        if (error) throw error

        // Recargar sesiones
        await this.loadSesiones(empresaId)

        return data

      } catch (error) {
        console.error('Error creando sesión:', error)
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    // Crear nueva encuesta
    async crearEncuesta(encuestaData) {
      // Usar datos demo si está en modo demo
      const demoStore = useDemoStore();
      if (demoStore.isDemoMode) {
        const authStore = useAuthStore();
        const empresaId = authStore.user?.empresa_id;
        
        this.loading = true;
        try {
          await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay
          const nuevaEncuesta = await demoStore.crearEncuesta(encuestaData, empresaId);
          this.encuestas.unshift(nuevaEncuesta);
          return nuevaEncuesta;
        } catch (error) {
          console.error('Error creando encuesta demo:', error);
          throw error;
        } finally {
          this.loading = false;
        }
      }

      const authStore = useAuthStore();
      const empresaId = authStore.user?.empresa_id;

      if (!empresaId) {
        if (typeof this.toast === 'function') {
          this.toast('No se encontró el ID de la empresa.', { type: 'error' });
        }
        throw new Error('No se encontró el ID de la empresa.');
      }

      this.loading = true;
      try {
        // Paso 1: Insertar la encuesta principal
        const encuestaObj = {
          empresa_id: empresaId,
          titulo: encuestaData.titulo,
          descripcion: encuestaData.descripcion,
          fecha_inicio: encuestaData.fecha_inicio,
          fecha_fin: encuestaData.fecha_fin,
          estado: 'borrador',
          activo: true
        };

        const { data: encuestaCreada, error: errorEncuesta } = await supabase
          .from('encuestas')
          .insert([encuestaObj])
          .select()
          .single();

        if (errorEncuesta) throw errorEncuesta;

        // Paso 2: Insertar las preguntas
        if (Array.isArray(encuestaData.preguntas) && encuestaData.preguntas.length > 0) {
          const preguntasParaInsertar = encuestaData.preguntas.map((pregunta, idx) => ({
            encuesta_id: encuestaCreada.id,
            texto: pregunta.texto,
            tipo: pregunta.tipo,
            opciones: pregunta.opciones && pregunta.tipo === 'Selección Única' ? pregunta.opciones : null,
            orden: idx + 1
          }));

          const { error: errorPreguntas } = await supabase
            .from('preguntas_encuesta')
            .insert(preguntasParaInsertar);

          if (errorPreguntas) throw errorPreguntas;
        }

        if (typeof this.toast === 'function') {
          this.toast('Encuesta creada correctamente', { type: 'success' });
        }

        return encuestaCreada;
      } catch (error) {
        if (typeof this.toast === 'function') {
          this.toast(error.message || 'Error al crear la encuesta', { type: 'error' });
        }
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async eliminarEmpleado(empleadoId) {
      // Usar datos demo si está en modo demo
      const demoStore = useDemoStore();
      if (demoStore.isDemoMode) {
        this.loading = true;
        try {
          await new Promise(resolve => setTimeout(resolve, 800)); // Simular delay
          await demoStore.eliminarEmpleado(empleadoId);
          // Recargar empleados
          const authStore = useAuthStore();
          this.empleados = demoStore.getEmpleadosByEmpresa(authStore.user?.empresa_id);
          return;
        } catch (error) {
          console.error('Error eliminando empleado demo:', error);
          throw error;
        } finally {
          this.loading = false;
        }
      }

      this.loading = true
      try {
        // Borrado permanente del usuario (ON DELETE CASCADE elimina perfil_empleados)
        const { error } = await supabase
          .from('usuarios')
          .delete()
          .eq('id', empleadoId)
        if (error) throw error

        await this.loadEmpleados(this.empresaId)
        if (typeof this.toast === 'function') {
          this.toast('Empleado eliminado permanentemente.', { type: 'success' })
        }
      } catch (err) {
        if (typeof this.toast === 'function') {
          this.toast(err.message || 'Error al eliminar empleado', { type: 'error' })
        }
        throw err
      } finally {
        this.loading = false
      }
    },

    // Invitar empleados por email
    async invitarEmpleados(empresaId, emails) {
      try {
        this.loading = true
        this.error = null

        const resultados = []

        for (const email of emails) {
          try {
            // Verificar si el usuario ya existe
            const { data: existingUser } = await supabase
              .from('usuarios')
              .select('id, email')
              .eq('email', email)
              .single()

            if (existingUser) {
              resultados.push({
                email,
                estado: 'existente',
                mensaje: 'El usuario ya está registrado'
              })
              continue
            }

            // Crear invitación (esto se podría implementar con una tabla separada)
            // Por ahora solo validamos el dominio
            const dominio = email.split('@')[1]
            const { data: empresa } = await supabase
              .from('empresas')
              .select('dominio_email')
              .eq('id', empresaId)
              .single()

            if (empresa && empresa.dominio_email === dominio) {
              resultados.push({
                email,
                estado: 'invitado',
                mensaje: 'Invitación enviada correctamente'
              })
            } else {
              resultados.push({
                email,
                estado: 'error',
                mensaje: 'El dominio del email no coincide con la empresa'
              })
            }

          } catch (error) {
            resultados.push({
              email,
              estado: 'error',
              mensaje: error.message
            })
          }
        }

        return resultados

      } catch (error) {
        console.error('Error invitando empleados:', error)
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    // Limpiar estado
    clearState() {
      this.empresa = null
      this.empleados = []
      this.sesiones = []
      this.encuestas = []
      this.actividadReciente = []
      this.dashboardStats = {
        usuariosConectados: 0,
        clasesReservadas: 0,
        encuestasEnviadas: 0,
        empleadosActivos: 0
      }
      this.error = null
    },

    // Cargar usuario actual y establecer empresaId
    async cargarUsuarioActual() {
      // Supón que obtienes el usuario desde Supabase
      const { data: usuario } = await supabase.auth.getUser()
      if (usuario && usuario.empresa_id) {
        this.empresaId = usuario.empresa_id
      } else {
        this.empresaId = null
      }
    },

    // Acción para inicializar el adminStore con el ID de empresa del usuario autenticado
    async init() {
      const authStore = useAuthStore();
      // Obtén el empresa_id correctamente desde el usuario autenticado
      const empresaId = authStore.user?.empresa_id;
      this.empresaId = empresaId;
      console.log('AdminStore: empresaId inicializado con', empresaId);
    },

    // Acción para inicializar el store de admin de forma segura
    async initializeAdminStore() {
      const authStore = useAuthStore()
      // Espera a que el authStore esté inicializado
      if (!authStore.isInitialized) {
        await new Promise(resolve => {
          const unwatch = watch(() => authStore.isInitialized, (isInitialized) => {
            if (isInitialized) {
              unwatch()
              resolve()
            }
          })
        })
      }
      this.empresaId = authStore.user?.empresa_id
      console.log('AdminStore: empresaId inicializado con', this.empresaId);
    },

    // Editar encuesta
    setEncuestaParaEditar(encuesta) {
      this.encuestaParaEditar = encuesta
    },
    clearEncuestaParaEditar() {
      this.encuestaParaEditar = null
    },
    async actualizarEncuesta(encuestaData) {
      this.loading = true
      try {
        // Actualiza la encuesta principal
        const { id, titulo, descripcion, fecha_inicio, fecha_fin } = encuestaData
        const { error: errorEncuesta } = await supabase
          .from('encuestas')
          .update({
            titulo,
            descripcion,
            fecha_inicio,
            fecha_fin
          })
          .eq('id', id)

        if (errorEncuesta) throw errorEncuesta

        // Elimina preguntas existentes y vuelve a insertar
        await supabase
          .from('preguntas_encuesta')
          .delete()
          .eq('encuesta_id', id)

        if (Array.isArray(encuestaData.preguntas) && encuestaData.preguntas.length > 0) {
          const preguntasParaInsertar = encuestaData.preguntas.map((pregunta, idx) => ({
            encuesta_id: id,
            texto: pregunta.texto,
            tipo: pregunta.tipo,
            opciones: pregunta.opciones && pregunta.tipo === 'Selección Única' ? pregunta.opciones : null,
            orden: idx + 1
          }))
          const { error: errorPreguntas } = await supabase
            .from('preguntas_encuesta')
            .insert(preguntasParaInsertar)
          if (errorPreguntas) throw errorPreguntas
        }

        if (typeof this.toast === 'function') {
          this.toast('Encuesta actualizada correctamente', { type: 'success' })
        }
      } catch (error) {
        if (typeof this.toast === 'function') {
          this.toast(error.message || 'Error al actualizar la encuesta', { type: 'error' })
        }
        throw error
      } finally {
        this.loading = false
      }
    },

    // Archivar encuesta
    async archivarEncuesta(encuestaId) {
      this.loading = true
      try {
        const { error } = await supabase
          .from('encuestas')
          .update({ activo: false })
          .eq('id', encuestaId)
        if (error) throw error
        await this.loadEncuestas(this.empresaId)
        toast.success('Encuesta archivada correctamente')
      } catch (err) {
        toast.error('No se pudo archivar la encuesta')
      } finally {
        this.loading = false
      }
    },

    // Enviar encuesta
    async enviarEncuesta(encuestaId, listaDeCorreos) {
      this.loading = true
      try {
        // Buscar usuarios por email y empresa
        const { data: usuarios, error: errorUsuarios } = await supabase
          .from('usuarios')
          .select('id,email')
          .in('email', listaDeCorreos)
          .eq('empresa_id', this.empresaId)

        if (errorUsuarios) throw errorUsuarios
        if (!usuarios || usuarios.length === 0) throw new Error('No se encontraron usuarios válidos.')

        // Insertar participantes
        const participantes = usuarios.map(u => ({
          encuesta_id: encuestaId,
          usuario_id: u.id
        }))
        const { error: errorParticipantes } = await supabase
          .from('participantes_encuesta')
          .insert(participantes)
        if (errorParticipantes) throw errorParticipantes

        // Actualizar estado de la encuesta
        const { error: errorUpdate } = await supabase
          .from('encuestas')
          .update({ estado: 'activa' })
          .eq('id', encuestaId)
        if (errorUpdate) throw errorUpdate

        await this.loadEncuestas()
        if (typeof this.toast === 'function') {
          this.toast('Encuesta enviada correctamente', { type: 'success' })
        }
      } catch (error) {
        if (typeof this.toast === 'function') {
          this.toast(error.message || 'Error al enviar la encuesta', { type: 'error' })
        }
        throw error
      } finally {
        this.loading = false
      }
    },

    // Cargar resultados de encuesta
    async loadResultadosEncuesta(encuestaId) {
      this.loading = true
      try {
        const { data: encuesta, error: errorEncuesta } = await supabase
          .from('encuestas')
          .select('*, preguntas:preguntas_encuesta(*)')
          .eq('id', encuestaId)
          .single()
        if (errorEncuesta) throw errorEncuesta
        this.encuestaActual = encuesta

        const { data: respuestas, error: errorRespuestas } = await supabase
          .from('respuestas_encuesta')
          .select('*')
          .eq('encuesta_id', encuestaId)
        if (errorRespuestas) throw errorRespuestas
        this.respuestasActuales = respuestas || []
      } catch (err) {
        this.encuestaActual = null
        this.respuestasActuales = []
      } finally {
        this.loading = false
      }
    },

    // Establecer plantilla para editar
    setPlantillaParaEditar(plantilla) {
      this.plantillaParaEditar = plantilla
    },

    // Limpiar plantilla para editar
    clearPlantillaParaEditar() {
      this.plantillaParaEditar = null
    },

    // Nueva acción para ranking de usuarios usando la función RPC
    async obtenerRankingUsuarios(empresaId) {
      this.loading = true
      try {
        const { data, error } = await supabase
          .rpc('obtener_ranking_usuarios', { id_empresa: empresaId })
        if (error) throw error
        return data // [{ id, nombre, apellido, conteo_reservas }, ...]
      } catch (err) {
        this.error = err.message || 'Error obteniendo ranking de usuarios'
        throw err
      } finally {
        this.loading = false
      }
    },

    async crearEmpleado(empleadoData) {
      // Usar datos demo si está en modo demo
      const demoStore = useDemoStore();
      if (demoStore.isDemoMode) {
        const authStore = useAuthStore();
        const empresaId = authStore.user?.empresa_id;
        
        this.loading = true;
        try {
          await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay
          const nuevoEmpleado = await demoStore.crearEmpleado(empleadoData, empresaId);
          // Recargar empleados
          this.empleados = demoStore.getEmpleadosByEmpresa(empresaId);
          return nuevoEmpleado;
        } catch (error) {
          console.error('Error creando empleado demo:', error);
          throw error;
        } finally {
          this.loading = false;
        }
      }

      this.loading = true
      try {
        // 1. Verificar duplicados por email
        const { data: usuariosExistentes, error: errorSelect } = await supabase
          .from('usuarios')
          .select('id')
          .eq('email', empleadoData.email)

        if (errorSelect) throw errorSelect
        if (usuariosExistentes && usuariosExistentes.length > 0) {
          throw new Error('Este correo electrónico ya está registrado.')
        }

        // 2. Insertar en usuarios
        const usuarioObj = {
          nombre: empleadoData.nombre,
          apellido: empleadoData.apellido,
          email: empleadoData.email,
          empresa_id: this.empresaId,
          tipo_usuario: 'empleado'
        }

        const { data: nuevoUsuario, error: errorInsertUsuario } = await supabase
          .from('usuarios')
          .insert([usuarioObj])
          .select()
          .single()

        if (errorInsertUsuario) throw errorInsertUsuario

        // 3. Insertar en perfil_empleados
        const perfilObj = {
          usuario_id: nuevoUsuario.id,
          cargo: empleadoData.cargo || ''
        }

        const { error: errorInsertPerfil } = await supabase
          .from('perfil_empleados')
          .insert([perfilObj])

        if (errorInsertPerfil) throw errorInsertPerfil

        // 4. Actualizar UI y notificar
        await this.loadEmpleados(this.empresaId)
        if (typeof this.toast === 'function') {
          this.toast('Empleado creado correctamente.', { type: 'success' })
        }

        return nuevoUsuario
      } catch (error) {
        if (typeof this.toast === 'function') {
          this.toast(error.message || 'Error al crear empleado.', { type: 'error' })
        }
        throw error
      } finally {
        this.loading = false
      }
    },

    // Cargar empleado por ID
    async loadEmpleadoById(empleadoId) {
      this.loading = true
      try {
        const { data, error } = await supabase
          .from('usuarios')
          .select('*, perfil_empleados(*)')
          .eq('id', empleadoId)
          .single()
        if (error) throw error
        this.empleadoActual = data
      } catch (err) {
        this.empleadoActual = null
        this.error = err.message || 'Error al cargar empleado'
      } finally {
        this.loading = false
      }
    },

    // Nueva acción para cargar datos del dashboard (simplificada)
    async loadAdminDashboardData(empresaId) {
      this.dashboardLoading = true
      try {
        const { data, error } = await supabase.rpc('get_admin_dashboard_stats', { empresa_id_param: empresaId })
        if (error) throw error
        this.dashboardStats = {
          usuariosConectados: data?.usuariosConectados ?? 0,
          clasesReservadas: data?.clasesReservadas ?? 0,
          encuestasEnviadas: data?.encuestasEnviadas ?? 0,
          empleadosActivos: data?.empleadosActivos ?? 0
        }
      } catch (err) {
        this.dashboardStats = {
          usuariosConectados: 0,
          clasesReservadas: 0,
          encuestasEnviadas: 0,
          empleadosActivos: 0
        }
      } finally {
        this.dashboardLoading = false
      }
    },

    async eliminarEncuesta(encuestaId) {
      // Usar datos demo si está en modo demo
      const demoStore = useDemoStore();
      if (demoStore.isDemoMode) {
        this.loading = true;
        try {
          await new Promise(resolve => setTimeout(resolve, 600)); // Simular delay
          await demoStore.eliminarEncuesta(encuestaId);
          // Recargar encuestas
          const authStore = useAuthStore();
          this.encuestas = demoStore.getEncuestasByEmpresa(authStore.user?.empresa_id);
          return;
        } catch (error) {
          console.error('Error eliminando encuesta demo:', error);
          throw error;
        } finally {
          this.loading = false;
        }
      }

      this.loading = true
      try {
        // Elimina la encuesta principal (ON DELETE CASCADE se encarga del resto)
        const { error } = await supabase
          .from('encuestas')
          .delete()
          .eq('id', encuestaId)
        if (error) throw error

        await this.loadEncuestas(this.empresaId) // <-- Corrección aquí
        if (typeof this.toast === 'function') {
          this.toast('Encuesta eliminada correctamente', { type: 'success' })
        }
      } catch (error) {
        if (typeof this.toast === 'function') {
          this.toast(error.message || 'Error al eliminar la encuesta', { type: 'error' })
        }
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})