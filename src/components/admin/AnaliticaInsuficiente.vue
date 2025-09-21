<template>
  <div class="text-center bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-dashed">
    <div class="max-w-2xl mx-auto">
      
      <!-- CORRECCIÓN: Reemplazar la imagen rota por un icono de Lucide -->
      <BrainCircuit class="mx-auto h-32 w-32 text-gray-300 mb-6" />
      
      <h2 class="text-2xl font-bold text-gray-800">La Analítica Predictiva se está preparando</h2>
      <p class="mt-3 text-gray-600">
        Nuestros modelos de IA necesitan más información para generar predicciones fiables sobre el bienestar de tu equipo. ¡Ya casi lo tienes!
      </p>

      <div class="mt-8 space-y-4 text-left">
        <!-- Progreso de Respuestas -->
        <div>
          <div class="flex justify-between mb-1">
            <span class="text-sm font-medium text-gray-700">Total de Respuestas</span>
            <span class="text-sm font-medium text-gray-500">{{ progreso.respuestas_actuales }} / {{ progreso.respuestas_objetivo }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div class="bg-primary h-2.5 rounded-full" :style="{ width: `${(progreso.respuestas_actuales / progreso.respuestas_objetivo) * 100}%` }"></div>
          </div>
        </div>

        <!-- Progreso de Días -->
        <div>
          <div class="flex justify-between mb-1">
            <span class="text-sm font-medium text-gray-700">Período de Datos</span>
            <span class="text-sm font-medium text-gray-500">{{ progreso.dias_actuales }} / {{ progreso.dias_objetivo }} días</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div class="bg-primary h-2.5 rounded-full" :style="{ width: `${(progreso.dias_actuales / progreso.dias_objetivo) * 100}%` }"></div>
          </div>
        </div>
      </div>

      <div class="mt-10">
        <h3 class="font-semibold text-gray-800">¿Qué puedes hacer ahora?</h3>
        <p class="mt-2 text-gray-600">
          Para acelerar el proceso, asegúrate de que tus empleados participen activamente en las encuestas.
        </p>
        <router-link :to="{ name: 'admin-encuestas' }" class="mt-4 inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary/90 transition-colors">
          Gestionar Encuestas
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { BrainCircuit } from 'lucide-vue-next' // CORRECCIÓN: Importar el icono

defineProps({
  progreso: {
    type: Object,
    required: true
  }
})
</script>