import { ref, computed, onMounted } from 'vue'
import { useAdminStore } from '@/stores/admin'
import { useAuthStore } from '@/stores/auth.store'

export function useAdminStats() {
  const adminStore = useAdminStore()
  const authStore = useAuthStore()
  const loading = ref(false)

  const totalEncuestas = computed(() => adminStore.encuestas?.length || 0)
  const totalUsuarios = computed(() => adminStore.empleados?.length || 0)
  // Simulación: suma de respuestas recibidas en encuestas
  const totalRespuestas = computed(() =>
    (adminStore.encuestas || []).reduce((acc, encuesta) => acc + (encuesta.respuestas_recibidas || 0), 0)
  )

  async function fetchStats() {
    loading.value = true
    const empresaId = authStore.user?.empresa_id || adminStore.empresaId
    if (!empresaId) {
      loading.value = false
      return
    }
    // Carga encuestas y empleados (usuarios)
    await Promise.all([
      adminStore.loadEncuestas(empresaId),
      adminStore.loadEmpleados(empresaId)
    ])
    loading.value = false
  }

  onMounted(fetchStats)

  return {
    loading,
    totalEncuestas,
    totalUsuarios,
    totalRespuestas,
    fetchStats
  }
}