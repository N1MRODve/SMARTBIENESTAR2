<template>
  <AdminLayout>
    <section class="p-6">
      <header class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Encuestas</h1>
          <p class="text-sm text-gray-500">Gestiona y analiza las encuestas enviadas a tus empleados.</p>
        </div>
        <div class="flex gap-2">
          <Button @click="irCrearEncuesta" icon="plus" aria-label="Crear encuesta desde cero">
            Crear Nueva Encuesta
          </Button>
          <Button @click="mostrarModalPlantilla = true" icon="template" aria-label="Crear desde plantilla">
            Crear desde Plantilla
          </Button>
        </div>
      </header>

      <div class="mb-4 max-w-md">
        <label for="busqueda" class="block text-sm font-medium text-gray-700">Buscar encuesta</label>
        <input
          id="busqueda"
          v-model="busqueda"
          type="text"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="Buscar por título..."
          autocomplete="off"
        />
      </div>

      <PageLoader v-if="authLoading || encuestasLoading" text="Cargando encuestas..." />

      <div v-else>
        <div v-if="encuestasFiltradas.length === 0" class="flex flex-col items-center justify-center py-16">
          <svg class="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6"/>
          </svg>
          <p class="text-lg text-gray-500 mb-2">Aún no has creado ninguna encuesta.</p>
          <Button @click="irCrearEncuesta" icon="plus">
            Crear la primera encuesta
          </Button>
        </div>
        <div v-else>
          <table class="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-2 text-left text-xs font-semibold text-gray-600">Título</th>
                <th class="px-4 py-2 text-left text-xs font-semibold text-gray-600">Estado</th>
                <th class="px-4 py-2 text-left text-xs font-semibold text-gray-600">Participación</th>
                <th class="px-4 py-2 text-left text-xs font-semibold text-gray-600">Fecha de Creación</th>
                <th class="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="encuesta in encuestasFiltradas" :key="encuesta.id" class="hover:bg-gray-50">
                <td class="px-4 py-2 font-medium text-gray-900">{{ encuesta.titulo }}</td>
                <td class="px-4 py-2">
                  <span
                    :class="{
                      'bg-yellow-100 text-yellow-800': encuesta.estado === 'Borrador',
                      'bg-green-100 text-green-800': encuesta.estado === 'Activa',
                      'bg-gray-100 text-gray-800': encuesta.estado === 'Finalizada'
                    }"
                    class="px-2 py-1 rounded-full text-xs font-semibold"
                  >
                    {{ encuesta.estado }}
                  </span>
                </td>
                <td class="px-4 py-2 text-sm text-gray-700">
                  {{ encuesta.respuestas_recibidas }}/{{ encuesta.total_destinatarios }}
                </td>
                <td class="px-4 py-2 text-sm text-gray-700">
                  {{ formatFecha(encuesta.fecha_creacion) }}
                </td>
                <td class="px-4 py-2 text-right">
                  <Button size="sm" @click="verResultados(encuesta.id)" icon="chart-bar" aria-label="Ver resultados">
                    Ver Resultados
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Modal para seleccionar plantilla -->
      <Modal v-if="mostrarModalPlantilla" @close="mostrarModalPlantilla = false">
        <div class="p-4">
          <h2 class="text-lg font-bold mb-4">Selecciona una plantilla</h2>
          <ul>
            <li
              v-for="plantilla in plantillas"
              :key="plantilla.id"
              class="mb-2 flex items-center justify-between"
            >
              <span>{{ plantilla.nombre }}</span>
              <Button size="sm" @click="usarPlantilla(plantilla)" icon="arrow-right">
                Usar
              </Button>
            </li>
          </ul>
        </div>
      </Modal>
    </section>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/admin'
import { useAuthStore } from '@/stores/auth.store'
import AdminLayout from '@/layouts/AdminLayout.vue'
import Button from '@/components/common/Button.vue'
import PageLoader from '@/components/common/PageLoader.vue'
import Modal from '@/components/common/Modal.vue'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const adminStore = useAdminStore()
const authStore = useAuthStore()
const toast = useToast()

const busqueda = ref('')
const mostrarModalPlantilla = ref(false)
const plantillas = ref([
  { id: 1, nombre: 'Clima laboral' },
  { id: 2, nombre: 'Satisfacción general' },
  { id: 3, nombre: 'Feedback de actividades' }
])

const empresaId = computed(() => adminStore.empresaId || authStore.user?.id_empresa)
const encuestasLoading = computed(() => adminStore.encuestasLoading)
const encuestas = computed(() => adminStore.encuestas)
const authLoading = computed(() => !authStore.user) // loader mientras no hay usuario

// Solo carga encuestas cuando empresaId esté disponible
watch(
  empresaId,
  async (id) => {
    if (id) {
      await adminStore.loadEncuestas(id)
    }
  },
  { immediate: true }
)

const encuestasFiltradas = computed(() => {
  if (!encuestas.value) return []
  if (!busqueda.value) return encuestas.value
  return encuestas.value.filter(e =>
    e.titulo?.toLowerCase().includes(busqueda.value.toLowerCase())
  )
})

function irCrearEncuesta() {
  router.push({ name: 'CrearEncuestaView' })
}

function verResultados(id) {
  router.push({ name: 'ResultadosEncuestaView', params: { id } })
}

function usarPlantilla(plantilla) {
  adminStore.setPlantillaParaEditar(plantilla)
  mostrarModalPlantilla.value = false
  router.push({ name: 'CrearEncuestaView' })
}

function formatFecha(fecha) {
  if (!fecha) return ''
  return new Date(fecha).toLocaleDateString()
}
</script>