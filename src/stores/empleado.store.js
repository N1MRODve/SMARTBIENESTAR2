import { defineStore } from 'pinia'
import { supabase } from '@/services/supabase'
import { useAuthStore } from './auth.store'

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
        const [statsRes, sesionesRes, encuestasRes] = await Promise.all([
          supabase
            .from('perfil_empleados')
            .select('puntos_bienestar, sesiones_asistidas, desafios_completados')
            .eq('usuario_id', authStore.user.id)
            .single(),
          // CORREGIDO: select simplificado con relaciones válidas
          supabase
            .from('reservas')
            .select(`
              *,
              sesiones (
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
            .order('created_at', { ascending: false })
            .limit(3),
          supabase
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
            .eq('estado', 'pendiente')
        ])

        if (statsRes.error) throw statsRes.error
        if (sesionesRes.error) throw sesionesRes.error
        if (encuestasRes.error) throw encuestasRes.error

        this.dashboardStats = statsRes.data || {}
        this.proximasSesiones = sesionesRes.data || []
        this.encuestasPendientes = encuestasRes.data || []
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
        // CORREGIDO: select simplificado con relaciones válidas
        const { data, error } = await supabase
          .from('reservas')
          .select(`
            *,
            sesiones (
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
          .order('created_at', { ascending: false })

        if (error) throw error
        this.misReservas = data || []
      } catch (err) {
        console.error('Error cargando mis reservas:', err)
        this.error = err.message
      } finally {
        this.loading.reservas = false
      }
    },

    async loadMisEncuestas() {
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
          .from('sesiones')
          .select(`
            *,
            servicios (
              nombre,
              descripcion,
              tipo
            ),
            colaborador:usuarios (
              nombre,
              apellido
            )
          `)
          .eq('empresa_id', authStore.user.empresa_id)
          .gte('fecha_inicio', new Date().toISOString())
          .order('fecha_inicio', { ascending: true })

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