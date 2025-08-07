<template>
  <section class="max-w-3xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">{{ encuesta?.titulo || 'Resultados de la Encuesta' }}</h1>
    <p class="mb-6 text-gray-600">{{ encuesta?.descripcion }}</p>
    <div v-if="loading" class="text-center py-8 text-gray-500">Cargando resultados...</div>
    <div v-else-if="!respuestas?.length">
      <div class="flex flex-col items-center justify-center py-16">
        <svg class="w-16 h-16 text-blue-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16h6a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2v7a2 2 0 002 2z" />
        </svg>
        <p class="text-lg text-gray-500 mb-2">Esta encuesta aún no ha recibido respuestas.</p>
      </div>
    </div>
    <div v-else>
      <div v-for="pregunta in encuesta.preguntas" :key="pregunta.id" class="mb-8">
        <h2 class="text-lg font-semibold mb-2">{{ pregunta.texto }}</h2>
        <div v-if="pregunta.tipo === 'escala'">
          <p class="text-gray-700">
            Promedio: {{
              calcularPromedio(pregunta.id)
            }}
          </p>
        </div>
        <div v-else-if="pregunta.tipo === 'abierta'">
          <ul class="list-disc pl-6">
            <li v-for="r in respuestasAbiertas(pregunta.id)" :key="r.id" class="mb-1 text-gray-700">
              {{ r.respuesta }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAdminStore } from '@/stores/admin'

const route = useRoute()
const adminStore = useAdminStore()
const loading = ref(true)
const encuesta = ref(null)
const respuestas = ref([])

onMounted(async () => {
  loading.value = true
  await adminStore.loadResultadosEncuesta(route.params.id)
  encuesta.value = adminStore.encuestaActual
  respuestas.value = adminStore.respuestasActuales
  loading.value = false
})

function calcularPromedio(preguntaId) {
  const filtradas = respuestas.value.filter(r => r.pregunta_id === preguntaId && typeof r.respuesta === 'number')
  if (!filtradas.length) return 'Sin datos'
  const suma = filtradas.reduce((acc, r) => acc + r.respuesta, 0)
  return (suma / filtradas.length).toFixed(2)
}

function respuestasAbiertas(preguntaId) {
  return respuestas.value.filter(r => r.pregunta_id === preguntaId && typeof r.respuesta === 'string')
}
</script>