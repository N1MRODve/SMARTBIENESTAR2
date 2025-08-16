import { defineStore } from 'pinia'
import { supabase } from '@/services/supabase'
import { useAuthStore } from './auth.store'
import { useDemoStore } from './demoStore'

export const useEmpleadoStore = defineStore('empleado', {
  state: () => ({
    dashboardStats: {},
    proximasSesiones: [],
    encuestasPendientes: [],
    actividadesDisponibles: [],
    misReservas: [],
    misEncuestas: [],
    desafios: [],
    misDesafios: [], // opcional si lo usas en alguna vista
    loading: {
      dashboard: false,
      actividades: false,
      reservas: false,
      encuestas: false,
      desafios: false,
      misDesafios: false
    },
    error: null
  }),

  actions: {
    async loadDashboardData() {

      const authStore = useAuthStore()
      if (!authStore.user) return
      this.loading.dashboard = true
      this.error = null

      try {
        // Cargar estadísticas usando función SQL
        const { data: statsData, error: statsError } = await supabase
          .rpc('get_employee_dashboard_stats', { usuario_id_param: authStore.user.id })
        
        if (statsError) throw statsError
        this.dashboardStats = statsData?.[0] || {}

        // Cargar próximas sesiones
        const { data: sesionesData, error: sesionesError } = await supabase
          .rpc('get_employee_upcoming_sessions', { usuario_id_param: authStore.user.id })
        
        if (sesionesError) throw sesionesError
        this.proximasSesiones = sesionesData || []

        // Cargar encuestas pendientes
        const { data: encuestasData, error: encuestasError } = await supabase
          .rpc('get_employee_pending_surveys', { usuario_id_param: authStore.user.id })
        
        if (encuestasError) throw encuestasError
        this.encuestasPendientes = encuestasData || []
        
      } catch (err) {
        console.error('Error cargando dashboard:', err)
        this.error = err.message
      } finally {
        this.loading.dashboard = false
      }
    },

    async loadMisReservas() {

      const authStore = useAuthStore()
      if (!authStore.user) return
      this.loading.reservas = true
      this.error = null

      try {
        const { data, error } = await supabase
          .from('reservas')
          .select(`
            *,
            sesiones!inner (
              *,
              servicios (
                nombre,
                tipo
              ),
              colaborador:usuarios (
                nombre,
                apellido
              )
            )
          `)
          .eq('usuario_id', authStore.user.id)
          .order('fecha_reserva', { ascending: false })

        if (error) throw error
        
        // Procesar datos para facilitar el acceso
        this.misReservas = (data || []).map(reserva => ({
          ...reserva,
          titulo: reserva.sesiones?.titulo,
          fecha_inicio: reserva.sesiones?.fecha_inicio,
          modalidad: reserva.sesiones?.modalidad,
          ubicacion: reserva.sesiones?.ubicacion,
          colaborador_nombre: reserva.sesiones?.colaborador ? 
            `${reserva.sesiones.colaborador.nombre} ${reserva.sesiones.colaborador.apellido}` : 
            'Sin asignar',
          servicio_tipo: reserva.sesiones?.servicios?.tipo
        }))
        
      } catch (err) {
        console.error('Error cargando mis reservas:', err)
        this.error = err.message
      } finally {
        this.loading.reservas = false
      }
    },

    async loadMisEncuestas() {
      // Usar datos demo si está en modo demo
      const demoStore = useDemoStore();
      if (demoStore.isDemoMode) {
        const authStore = useAuthStore();
        if (!authStore.user) return;
        
        this.loading.encuestas = true;
        this.error = null;
        
        try {
          await new Promise(resolve => setTimeout(resolve, 400)); // Simular delay
          this.misEncuestas = demoStore.demoData.participantesEncuesta
            .filter(p => p.usuario_id === authStore.user.id)
            .map(p => {
              const encuesta = demoStore.demoData.encuestas.find(e => e.id === p.encuesta_id);
              return {
                ...p,
                encuesta: encuesta
              };
            });
          return;
        } catch (error) {
          console.error('Error cargando encuestas demo:', error);
          this.error = error.message;
        } finally {
          this.loading.encuestas = false;
        }
        return;
      }

      const authStore = useAuthStore()
      if (!authStore.user) return
      this.loading.encuestas = true
      this.error = null

      try {
        const { data, error } = await supabase
          .from('participantes_encuesta')
          .select(`
            *,
            encuesta:encuestas (
              id,
              titulo,
              descripcion,
              fecha_fin
            )
          `)
          .eq('usuario_id', authStore.user.id)

        if (error) throw error
        this.misEncuestas = data || []
      } catch (err) {
        console.error('Error cargando mis encuestas:', err)
        this.error = err.message
      } finally {
        this.loading.encuestas = false
      }
    },

    // Si manejas participación de desafíos por usuario
    async loadMisDesafios() {
      const authStore = useAuthStore()
      if (!authStore.user) return
      this.loading.misDesafios = true
      this.error = null

      try {
        // CORREGIDO: usar el nombre correcto de la tabla 'desafios_bienestar'
        const { data, error } = await supabase
          .from('participacion_desafios')
          .select(`
            *,
            desafios_bienestar (
              id,
              titulo,
              descripcion
            )
          `)
          .eq('usuario_id', authStore.user.id)

        if (error) throw error
        this.misDesafios = data || []
      } catch (err) {
        console.error('Error cargando mis desafíos:', err)
        this.error = err.message
      } finally {
        this.loading.misDesafios = false
      }
    },

    async loadDesafios() {

      this.loading.desafios = true
      this.error = null

      try {
        const { data, error } = await supabase
          .from('desafios_bienestar')
          .select('*')
          .eq('activo', true)
          .order('fecha_inicio', { ascending: false })

        if (error) throw error
        this.desafios = data || []
      } catch (err) {
        console.error('Error cargando desafíos:', err)
        this.error = err.message
      } finally {
        this.loading.desafios = false
      }
    },

    async loadActividadesDisponibles() {

      const authStore = useAuthStore()
      if (!authStore.user?.empresa_id) return
      this.loading.actividades = true
      this.error = null

      try {
        const { data, error } = await supabase
          .rpc('get_available_activities', { usuario_id_param: authStore.user.id })

        if (error) throw error
        this.actividadesDisponibles = data || []
      } catch (err) {
        console.error('Error cargando actividades:', err)
        this.error = err.message
      } finally {
        this.loading.actividades = false
      }
    }
  }
})