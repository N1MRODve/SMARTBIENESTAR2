<template>
  <section class="p-6 max-w-4xl mx-auto">
    <header class="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">{{ encuesta?.titulo || 'Resultados de la encuesta' }}</h1>
        <p class="text-sm text-gray-500">
          {{ encuesta?.descripcion }}
        </p>
        <div v-if="encuesta" class="mt-2 text-sm text-gray-700">
          <span>Creada: {{ formatFecha(encuesta.fecha_creacion) }}</span>
          <span v-if="encuesta.fecha_finalizacion"> | Finalizada: {{ formatFecha(encuesta.fecha_finalizacion) }}</span>
          <span v-if="encuesta.total_destinatarios">
            <br>
            <strong>{{ tasaParticipacion }}% de participación</strong>
            <span> - {{ encuesta.respuestas_recibidas }} de {{ encuesta.total_destinatarios }} respondieron</span>
          </span>
        </div>
      </div>
      <Button @click="exportarResultados" icon="download">
        Exportar Resultados
      </Button>
    </header>

    <PageLoader v-if="loading" />

    <div v-else>
      <div v-if="!encuesta || !encuesta.preguntas?.length" class="text-gray-500 py-16 text-center">
        No hay resultados disponibles para esta encuesta.
      </div>
      <div v-else>
        <section v-for="(pregunta, idx) in encuesta.preguntas" :key="idx" class="mb-8">
          <h2 class="font-semibold mb-2 text-gray-900">{{ pregunta.texto }}</h2>
          <!-- Escala -->
          <div v-if="pregunta.tipo_pregunta === 'escala'">
            <div class="flex flex-col gap-2">
              <div
                v-for="(valor, vIdx) in pregunta.resultados"
                :key="vIdx"
                class="flex items-center gap-2"
              >
                <span class="w-12 text-sm font-medium text-gray-700">{{ valor.valor }}</span>
                <div class="flex-1 h-4 bg-gray-100 rounded">
                  <div
                    class="h-4 bg-primary rounded"
                    :style="{ width: valor.porcentaje + '%' }"
                  ></div>
                </div>
                <span class="text-xs text-gray-600">{{ valor.cantidad }} respuestas ({{ valor.porcentaje }}%)</span>
              </div>
            </div>
          </div>
          <!-- Selección única -->
          <div v-else-if="pregunta.tipo_pregunta === 'seleccion_unica'">
            <div class="flex flex-col gap-2">
              <div
                v-for="(opcion, oIdx) in pregunta.resultados"
                :key="oIdx"
                class="flex items-center gap-2"
              >
                <span class="w-32 text-sm font-medium text-gray-700">{{ opcion.texto }}</span>
                <div class="flex-1 h-4 bg-gray-100 rounded">
                  <div
                    class="h-4 bg-secondary rounded"
                    :style="{ width: opcion.porcentaje + '%' }"
                  ></div>
                </div>
                <span class="text-xs text-gray-600">{{ opcion.cantidad }} respuestas ({{ opcion.porcentaje }}%)</span>
              </div>
            </div>
          </div>
          <!-- Texto abierto -->
          <div v-else-if="pregunta.tipo_pregunta === 'texto_abierto'">
            <ul class="list-disc pl-6">
              <li v-for="(respuesta, rIdx) in pregunta.respuestas" :key="rIdx" class="text-gray-700 mb-1">
                "{{ respuesta }}"
              </li>
            </ul>
          </div>
          <div v-else>
            <span class="text-gray-400">Tipo de pregunta no soportado.</span>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAdminStore } from '@/stores/admin'
import Button from '@/components/common/Button.vue'
import PageLoader from '@/components/common/PageLoader.vue'
import { useToast } from '@/composables/useToast'

const route = useRoute()
const adminStore = useAdminStore()
const toast = useToast()

const loading = ref(true)
const encuesta = ref(null)

onMounted(async () => {
  try {
    loading.value = true
    encuesta.value = await adminStore.loadResultadosEncuesta(route.params.id)
  } catch (e) {
    toast.error('No se pudieron cargar los resultados.')
  } finally {
    loading.value = false
  }
})

const tasaParticipacion = computed(() => {
  if (!encuesta.value || !encuesta.value.total_destinatarios) return 0
  return Math.round(
    (encuesta.value.respuestas_recibidas / encuesta.value.total_destinatarios) * 100
  )
})

function formatFecha(fecha) {
  return new Date(fecha).toLocaleDateString()
}

function exportarResultados() {
  toast.success('Exportación simulada. (Funcionalidad pendiente)')
}
</script>