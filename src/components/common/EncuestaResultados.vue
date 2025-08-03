<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h3 class="text-xl font-bold mb-4">Resultados</h3>
    <div v-if="!encuesta || !encuesta.preguntas?.length" class="text-gray-500">
      No hay resultados disponibles para esta encuesta.
    </div>
    <div v-else>
      <div v-for="pregunta in encuesta.preguntas" :key="pregunta.id" class="mb-8">
        <h4 class="font-semibold mb-2">{{ pregunta.texto }}</h4>
        <div v-if="pregunta.tipo === 'opcion_multiple'">
          <div v-for="opcion in pregunta.opciones" :key="opcion.id" class="mb-2 flex items-center">
            <span class="w-32">{{ opcion.texto }}</span>
            <div class="flex-1 h-4 bg-gray-100 rounded mx-2">
              <div
                class="h-4 bg-primary rounded"
                :style="{ width: opcion.porcentaje + '%' }"
              ></div>
            </div>
            <span class="text-sm text-gray-600">{{ opcion.respuestas }} respuestas ({{ opcion.porcentaje }}%)</span>
          </div>
        </div>
        <div v-else-if="pregunta.tipo === 'escala'">
          <div class="flex gap-4">
            <div v-for="valor in pregunta.resultados" :key="valor.valor" class="flex flex-col items-center">
              <span class="font-bold">{{ valor.valor }}</span>
              <span class="text-xs text-gray-500">{{ valor.cantidad }} respuestas</span>
            </div>
          </div>
        </div>
        <div v-else-if="pregunta.tipo === 'abierta'">
          <ul class="list-disc pl-6">
            <li v-for="(respuesta, idx) in pregunta.respuestas" :key="idx" class="text-gray-700 mb-1">
              "{{ respuesta }}"
            </li>
          </ul>
        </div>
        <div v-else>
          <span class="text-gray-400">Tipo de pregunta no soportado.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  encuesta: {
    type: Object,
    required: true
  }
})
</script>