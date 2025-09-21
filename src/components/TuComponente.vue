<template>
  <div>
    <!-- Skeleton o loader mientras se cargan las estadísticas -->
    <div v-if="!estadisticas">
      <SkeletonEstadisticas />
    </div>
    <!-- Estadísticas renderizadas solo si existen -->
    <div v-else>
      <p>Total empleados: {{ estadisticas?.total_empleados }}</p>
      <p>Participación en actividades: {{ estadisticas?.participacion_actividades }}</p>
      <p>Satisfacción general: {{ estadisticas?.satisfaccion_general }}</p>
      <!-- ...otras estadísticas usando encadenamiento opcional... -->
    </div>
  </div>
</template>

<script setup>
import { useDemoStore } from '@/stores/demoStore'
import { computed } from 'vue'
import SkeletonEstadisticas from './SkeletonEstadisticas.vue'

const demoStore = useDemoStore()
const estadisticas = computed(() => demoStore.estadisticas)
</script>