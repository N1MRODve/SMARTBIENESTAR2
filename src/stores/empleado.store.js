import { defineStore } from 'pinia'
import { ref } from 'vue'
import supabase from '@/utils/supabase'
import { useAuthStore } from './auth.store'

export const useEmpleadoStore = defineStore('empleado', () => {
  // Estado
  const actividadesDisponibles = ref([])
  const loading = ref(false) // Simplificado a un solo booleano para el dashboard
  const error = ref(null);
  const stats = ref({
    puntosBienestar: 0,
    puntosSemana: 0,
    sesionesAsistidas: 0,
    desafiosCompletados: 0,
    nivelActual: 1
  });
  const proximasSesiones = ref([]);
  const encuestasPendientes = ref([]);
  const desafiosActivos = ref([]);
  const actividadesRecomendadas = ref([]);

  // --- NUEVA FUNCIÓN ORQUESTADORA ---
  async function fetchDashboardData() {
    loading.value = true;
    error.value = null;
    try {
      // Usamos Promise.all para ejecutar todas las cargas de datos en paralelo
      await Promise.all([
        fetchStats(),
        fetchProximasSesiones(),
        // Aquí puedes añadir las funciones para cargar encuestas, desafíos, etc.
        // Por ahora, las dejamos como arrays vacíos para que la UI se muestre.
      ]);
      
      // Inicializamos los arrays que aún no tienen función de carga
      encuestasPendientes.value = [];
      desafiosActivos.value = [];
      actividadesRecomendadas.value = [];

    } catch (err) {
      console.error("Error al cargar los datos del dashboard:", err);
      error.value = 'No se pudieron cargar los datos del dashboard. Inténtalo de nuevo más tarde.';
    } finally {
      loading.value = false;
    }
  }

  // --- FUNCIONES INDIVIDUALES ---
  async function fetchStats() {
    // Lógica para obtener estadísticas del usuario.
    // Por ahora, lo dejamos con valores por defecto para que la UI funcione.
    stats.value = {
      puntosBienestar: 0,
      puntosSemana: 0,
      sesionesAsistidas: 0,
      desafiosCompletados: 0,
      nivelActual: 1
    };
  }

  async function fetchProximasSesiones() {
    const authStore = useAuthStore();
    const userId = authStore.user?.id;
    if (!userId) return;

    const { data, error: fetchError } = await supabase
      .from('reservas')
      .select(`
        sesion_id,
        estado,
        sesiones (
          id,
          titulo,
          fecha_inicio,
          modalidad,
          ubicacion,
          colaborador:colaborador_id ( nombre, apellido )
        )
      `)
      .eq('usuario_id', userId)
      .in('estado', ['confirmada', 'pendiente'])
      .gt('sesiones.fecha_inicio', new Date().toISOString())
      .order('fecha_inicio', { foreignTable: 'sesiones', ascending: true })
      .limit(3);

    if (fetchError) throw fetchError;

    proximasSesiones.value = data.map(reserva => ({
      id: reserva.sesiones.id,
      titulo: reserva.sesiones.titulo,
      fecha: reserva.sesiones.fecha_inicio,
      modalidad: reserva.sesiones.modalidad,
      ubicacion: reserva.sesiones.ubicacion,
      estado: reserva.estado,
      colaborador: `${reserva.sesiones.colaborador?.nombre || ''} ${reserva.sesiones.colaborador?.apellido || ''}`.trim(),
      tipo: 'yoga' // Placeholder, deberías obtenerlo de la sesión
    }));
  }

  return {
    actividadesDisponibles,
    loading,
    error,
    stats,
    proximasSesiones,
    encuestasPendientes,
    desafiosActivos,
    actividadesRecomendadas,
    fetchDashboardData,
    fetchStats,
    fetchProximasSesiones
  }
})