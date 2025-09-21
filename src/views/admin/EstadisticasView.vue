<template>
  <div class="p-6 md:p-8">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Estadísticas de Participación de Empleados</h1>
      <p class="text-gray-600 mt-1">Un resumen del compromiso y bienestar en tu empresa.</p>
    </header>

    <div v-if="loading" class="flex justify-center items-center h-64">
      <PageLoader />
    </div>

    <div v-else-if="estadisticas" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard 
        title="Total de Empleados" 
        :value="estadisticas.total_empleados" 
      />
      <StatsCard 
        title="Total de Reservas" 
        :value="estadisticas.total_reservas" 
      />
      <StatsCard 
        title="Desafíos Completados" 
        :value="estadisticas.total_desafios_completados" 
      />
      <StatsCard 
        title="Tasa de Participación" 
        :value="`${estadisticas.tasa_participacion_general}%`" 
      />
    </div>
    
    <div v-else class="text-center py-16 bg-gray-50 rounded-lg">
      <p class="text-gray-500">No se pudieron cargar las estadísticas.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/services/supabase.js';
import { useAuthStore } from '@/stores/auth.store';

// Componentes de UI simples para la demo
const PageLoader = {
  template: `<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>`
};

const StatsCard = {
  props: ['title', 'value'],
  template: `
    <div class="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h3 class="text-sm font-medium text-gray-500 truncate">{{ title }}</h3>
      <p class="mt-1 text-3xl font-semibold text-gray-900">{{ value }}</p>
    </div>
  `
};

const estadisticas = ref(null);
const loading = ref(true);
const error = ref(null);

const authStore = useAuthStore();
const empresaId = authStore.user?.empresa_id;

onMounted(async () => {
  if (!empresaId) {
    error.value = "No se pudo identificar la empresa del administrador.";
    loading.value = false;
    return;
  }

  try {
    const { data, error: rpcError } = await supabase.rpc('obtener_estadisticas_empresa', {
      id_empresa: empresaId
    });

    if (rpcError) throw rpcError;

    estadisticas.value = data[0]; // RPC devuelve un array, tomamos el primer elemento
  } catch (err) {
    error.value = err.message;
    console.error("Error al obtener estadísticas:", err);
  } finally {
    loading.value = false;
  }
});
</script>