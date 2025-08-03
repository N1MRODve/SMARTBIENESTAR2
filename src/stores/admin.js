// src/stores/admin.js
import { defineStore } from 'pinia'
import { supabase } from '@/services/supabase' // <-- Ruta corregida
import { useAuthStore } from './auth.store'; // Asegúrate de que esta línea esté al principio del archivo

export const useAdminStore = defineStore('admin', {
  state: () => ({
    // Información de la empresa del administrador
    empresa: null,
    
    // Estadísticas del dashboard
    dashboardStats: {
      total_empleados: 0,
      empleados_activos: 0,
      sesiones_proximas: 0,
      participacion_promedio: 0,
      encuestas_activas: 0,
      puntos_promedio: 0
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
    
    // Estados de carga
    loading: false,
    error: null,

    // ID de la empresa del usuario actual
    empresaId: null
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
      try {
        this.loading = true
        this.error = null

        const { data, error } = await supabase
          .rpc('get_admin_dashboard_stats', {
            empresa_id_param: empresaId
          })

        if (error) throw error

        if (data && data.length > 0) {
          this.dashboardStats = data[0]
        }

      } catch (error) {
        console.error('Error cargando estadísticas del dashboard:', error)
        this.error = error.message
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
    async loadEmpleados(empresaId) {
      try {
        this.empleadosLoading = true
        this.error = null

        const { data, error } = await supabase
          .from('usuarios')
          .select(`
            *,
            perfil_empleados (
              fecha_nacimiento,
              genero,
              cargo,
              departamento,
              preferencias_bienestar,
              objetivos_bienestar,
              nivel_actividad,
              alergias,
              restricciones_dieteticas,
              puntos_bienestar,
              fecha_actualizacion
            )
          `)
          .eq('empresa_id', empresaId)
          .eq('tipo_usuario', 'empleado')
          .order('nombre')

        if (error) throw error

        // Procesar datos para incluir información del perfil
        this.empleados = (data || []).map(emp => ({
          ...emp,
          ...emp.perfil_empleados?.[0],
          puntos_bienestar: emp.perfil_empleados?.[0]?.puntos_bienestar || 0
        }))

        // Obtener última participación de cada empleado
        await this.loadUltimaParticipacion(empresaId)

      } catch (error) {
        console.error('Error cargando empleados:', error)
        this.error = error.message
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
      this.encuestasLoading = true
      this.encuestasError = null
      try {
        const { data, error } = await supabase
          .from('encuestas')
          .select('*')
          .eq('empresa_id', empresaId)
          .order('fecha_creacion', { ascending: false })
        if (error) throw error
        this.encuestas = data || []
      } catch (err) {
        this.encuestasError = err.message || 'Error cargando encuestas'
        this.encuestas = []
      } finally {
        this.encuestasLoading = false
      }
    },

    // Cargar actividad reciente
    async loadActividadReciente(empresaId, limit = 10) {
      try {
        const { data, error } = await supabase
          .rpc('get_admin_recent_activity', {
            empresa_id_param: empresaId,
            limit_param: limit
          })

        if (error) throw error

        this.actividadReciente = data || []

      } catch (error) {
        console.error('Error cargando actividad reciente:', error)
        this.error = error.message
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
      const authStore = useAuthStore();
      const idDeLaEmpresa = authStore.user?.empresa_id;

      if (!idDeLaEmpresa) {
        console.error("BLOQUEO: No se encontró empresa_id en el authStore. El usuario podría no estar autenticado correctamente.");
        throw new Error("Error crítico: El ID de la empresa no está disponible.");
      }

      // Corrige el formato de fechas para Supabase (ISO completo)
      function toIsoDatetime(val) {
        // Si ya tiene segundos, no modifica
        if (!val) return null;
        return val.length === 16 ? val + ':00' : val;
      }

      try {
        const encuestaParaInsertar = {
          empresa_id: idDeLaEmpresa,
          titulo: encuestaData.titulo,
          descripcion: encuestaData.descripcion,
          fecha_inicio: toIsoDatetime(encuestaData.fecha_inicio),
          fecha_fin: toIsoDatetime(encuestaData.fecha_fin),
          anonima: encuestaData.anonima ?? false,
          categoria: encuestaData.categoria ?? null,
          estado: 'borrador',
          activo: true
        };

        const { data, error } = await supabase
          .from('encuestas')
          .insert([encuestaParaInsertar])
          .select()
          .single();

        if (error) {
          throw error;
        }

        // Aquí iría la lógica para guardar las preguntas, usando data.id
        
        return data;

      } catch (err) {
        console.error('Error creando encuesta:', err);
        throw err;
      }
    },

    // Actualizar información de empleado
    async actualizarEmpleado(empleadoId, datosEmpleado) {
      try {
        this.loading = true
        this.error = null

        // Actualizar usuario
        const { error: userError } = await supabase
          .from('usuarios')
          .update({
            nombre: datosEmpleado.nombre,
            apellido: datosEmpleado.apellido,
            telefono: datosEmpleado.telefono,
            activo: datosEmpleado.activo
          })
          .eq('id', empleadoId)

        if (userError) throw userError

        // Actualizar perfil si existe
        if (datosEmpleado.perfil) {
          const { error: perfilError } = await supabase
            .from('perfil_empleados')
            .upsert([{
              usuario_id: empleadoId,
              ...datosEmpleado.perfil,
              fecha_actualizacion: new Date().toISOString()
            }])

          if (perfilError) throw perfilError
        }

        // Actualizar el empleado en el state
        const index = this.empleados.findIndex(emp => emp.id === empleadoId)
        if (index !== -1) {
          this.empleados[index] = {
            ...this.empleados[index],
            ...datosEmpleado,
            ...datosEmpleado.perfil
          }
        }

        return true

      } catch (error) {
        console.error('Error actualizando empleado:', error)
        this.error = error.message
        throw error
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
        total_empleados: 0,
        empleados_activos: 0,
        sesiones_proximas: 0,
        participacion_promedio: 0,
        encuestas_activas: 0,
        puntos_promedio: 0
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
      // Espera a que el authStore esté inicializado
      if (!authStore.isInitialized) {
        await authStore.tryInitializeAuth();
      }
      // Asigna el ID de empresa del usuario autenticado al estado local
      this.empresaId = authStore.empresaId;
    },
  }
})