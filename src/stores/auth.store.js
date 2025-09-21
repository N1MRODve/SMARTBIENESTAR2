import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/services/supabase'

export const useAuthStore = defineStore('auth', () => {
  // --- STATE ---
  const user = ref(null)
  const session = ref(null)
  const loading = ref(false)

  // --- GETTERS ---
  const isAuthenticated = computed(() => !!session.value && !!user.value)
  const userRole = computed(() => user.value?.role || null)
  // CORRECCIÓN: Añadir un getter computado para el ID de la empresa.
  // Esto asegura que siempre obtengamos el valor más reciente y evita errores si `user` es nulo.
  const empresaId = computed(() => user.value?.empresa_id || null)

  // --- ACTIONS ---

  /**
   * Establece los datos del usuario en el store.
   * @param {object} userData - El objeto de usuario de Supabase.
   */
  function setUser(userData) {
    user.value = userData
  }

  /**
   * Establece los datos de la sesión en el store.
   * @param {object} sessionData - El objeto de sesión de Supabase.
   */
  function setSession(sessionData) {
    session.value = sessionData
  }

  /**
   * Obtiene el perfil completo del usuario desde la tabla 'usuarios' y lo guarda en el estado.
   * @param {string} userId - El ID del usuario de Supabase.
   */
  async function fetchUserProfile(userId) {
    if (!userId) return null

    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('id, nombre, apellido, email, tipo_usuario, empresa_id')
        .eq('id', userId)
        .single()

      if (error) throw error

      // Asigna el 'tipo_usuario' de la DB a la propiedad 'role' para consistencia
      const userProfile = {
        ...data,
        role: data.tipo_usuario
      }
      
      setUser(userProfile) // Usamos la acción interna para actualizar el estado
      return userProfile

    } catch (err) {
      console.error('Error obteniendo el perfil del usuario:', err)
      // Limpiar el estado en caso de error para evitar datos inconsistentes
      user.value = null
      session.value = null
      return null
    }
  }

  /**
   * Inicializa el store, comprobando si hay una sesión activa y cargando el perfil del usuario.
   */
  async function initialize() {
    loading.value = true
    try {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        setSession(data.session)
        await fetchUserProfile(data.session.user.id)
      }
    } catch (err) {
      console.error('Error al inicializar el auth store:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Cierra la sesión del usuario, limpia el estado y la sesión de Supabase.
   */
  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      // **Paso Crítico:** Limpiar manualmente el estado de Pinia.
      // supabase.auth.signOut() NO hace esto por ti.
      user.value = null
      session.value = null

    } catch (err) {
      console.error('Error al cerrar sesión:', err)
      // Incluso si hay un error, forzamos la limpieza del estado local
      // para evitar que el usuario quede en un estado inconsistente.
      user.value = null
      session.value = null
    }
  }

  // Exponer el estado, getters y acciones para que puedan ser usados en los componentes
  return {
    user,
    session,
    loading,
    isAuthenticated,
    userRole,
    empresaId, // <--- CORRECCIÓN: Exponiendo el nuevo getter.
    setUser,
    setSession,
    fetchUserProfile,
    initialize,
    signOut // <-- AÑADIR ESTO
  }
})
