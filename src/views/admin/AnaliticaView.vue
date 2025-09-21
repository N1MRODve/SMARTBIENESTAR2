<template>
  <div class="p-4 md:p-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Analítica Predictiva</h1>

    <!-- Estado de Carga -->
    <div v-if="isLoading" class="text-center py-20">
      <p class="text-gray-500">Analizando disponibilidad de datos...</p>
    </div>

    <!-- Estado con Datos Suficientes -->
    <div v-else-if="tieneDatosSuficientes" class="space-y-8">
      <!-- CORRECCIÓN: Mostrar el gráfico de tendencia si hay datos para él -->
      <WellnessTrendChart v-if="tendenciaData.length > 0" :trend-data="tendenciaData" />
      <div v-else class="text-center p-8 bg-white rounded-lg shadow">
        <p>¡Felicidades! Tienes suficientes datos para empezar, pero aún no hay tendencias de los últimos 3 meses. ¡Sigue así!</p>
      </div>
      
      <!-- Aquí irán futuros gráficos y predicciones -->
    </div>

    <!-- Estado con Datos Insuficientes -->
    <div v-else>
      <AnaliticaInsuficiente :progreso="progreso" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/services/supabase'
import { useAuthStore } from '@/stores/auth.store'
import AnaliticaInsuficiente from '@/components/admin/AnaliticaInsuficiente.vue'
// CORRECCIÓN: Importar el nuevo componente de gráfico
import WellnessTrendChart from '@/components/admin/WellnessTrendChart.vue'

const authStore = useAuthStore()
const isLoading = ref(true)
const tieneDatosSuficientes = ref(false)
const progreso = ref({})
// CORRECCIÓN: Añadir un ref para los datos de la tendencia
const tendenciaData = ref([])

onMounted(async () => {
  const empresaId = authStore.empresaId
  if (!empresaId) {
    console.error("No se pudo verificar la empresa para la analítica.")
    isLoading.value = false
    return
  }

  try {
    // Llamada a la primera función para verificar la suficiencia
    const { data: suficiencia, error: suficienciaError } = await supabase.rpc('verificar_suficiencia_datos_analitica', {
      p_empresa_id: empresaId
    })
    if (suficienciaError) throw suficienciaError

    tieneDatosSuficientes.value = suficiencia.tiene_datos_suficientes
    progreso.value = suficiencia.progreso

    // Si hay datos suficientes, llamamos a la segunda función para obtener la tendencia
    if (suficiencia.tiene_datos_suficientes) {
      const { data: tendencia, error: tendenciaError } = await supabase.rpc('calcular_tendencia_bienestar_semanal', {
        p_empresa_id: empresaId
      })
      if (tendenciaError) throw tendenciaError
      tendenciaData.value = tendencia
    }

  } catch (err) {
    console.error("Error al cargar los datos de analítica:", err)
  } finally {
    isLoading.value = false
  }
})
</script>