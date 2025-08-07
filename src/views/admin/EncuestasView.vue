<template>
  <AdminLayout>
    <section class="p-6 max-w-5xl mx-auto">
      <header class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Encuestas</h1>
        <p class="text-sm text-gray-500">Gestiona y analiza las encuestas enviadas a tus empleados.</p>
      </header>
      <div class="mb-6 flex gap-2">
        <Button
          icon="plus"
          variant="primary"
          @click="irCrearEncuesta"
        >
          Crear Nueva Encuesta
        </Button>
        <Button
          icon="template"
          variant="secondary"
          @click="irCrearDesdePlantilla"
        >
          Crear desde Plantilla
        </Button>
      </div>
      <div class="bg-white border rounded-lg shadow-md p-6">
        <table class="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-2 text-left text-xs font-semibold text-gray-600">Título</th>
              <th class="px-4 py-2 text-left text-xs font-semibold text-gray-600">Estado</th>
              <th class="px-4 py-2 text-left text-xs font-semibold text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="encuesta in encuestasFiltradas" :key="encuesta.id" class="hover:bg-gray-50">
              <td class="px-4 py-2 font-medium text-gray-900">{{ encuesta.titulo }}</td>
              <td class="px-4 py-2">
                <span
                  :class="{
                    'bg-yellow-100 text-yellow-800': encuesta.estado === 'borrador',
                    'bg-green-100 text-green-800': encuesta.estado === 'activa',
                    'bg-gray-100 text-gray-800': encuesta.estado === 'finalizada'
                  }"
                  class="px-2 py-1 rounded-full text-xs font-semibold"
                >
                  {{ encuesta.estado }}
                </span>
              </td>
              <td class="px-6 py-4 text-right flex gap-2">
                <button
                  v-if="encuesta.estado === 'borrador'"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
                  @click="abrirModalEnviar(encuesta.id)"
                >
                  Enviar
                </button>
                <button
                  v-if="encuesta.estado === 'borrador'"
                  class="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded flex items-center gap-2"
                  @click="adminStore.setEncuestaParaEditar(encuesta)"
                >
                  <span>Editar</span>
                </button>
                <button
                  class="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded transition flex items-center gap-2"
                  @click="iniciarEliminacion(encuesta.id)"
                >
                  <span>Eliminar</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <EnviarEncuestaModal
        v-if="mostrarModalEnviar"
        :encuestaId="encuestaIdSeleccionada"
        @close="cerrarModalEnviar"
      />
      <ConfirmacionModal
        v-if="mostrarModalEliminar"
        titulo="¿Confirmas la eliminación de esta encuesta?"
        mensaje="Esta acción es permanente y no se puede deshacer. Se borrarán todas las preguntas y respuestas asociadas."
        @close="mostrarModalEliminar = false"
        @confirm="handleEliminacionConfirmada"
      />
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
import Dropdown from '@/components/common/Dropdown.vue'
import DropdownItem from '@/components/common/DropdownItem.vue'
import { useToast } from '@/composables/useToast'
import EnviarEncuestaModal from '@/components/admin/EnviarEncuestaModal.vue'
import ConfirmacionModal from '@/components/common/ConfirmacionModal.vue'

const router = useRouter()
const adminStore = useAdminStore()
const authStore = useAuthStore()
const toast = useToast()

const busqueda = ref('')
const mostrarModalPlantilla = ref(false)
const mostrarModalEnviar = ref(false)
const encuestaIdEnviar = ref(null)
const encuestaIdSeleccionada = ref(null)
const mostrarModalEliminar = ref(false)
const encuestaAEliminarId = ref(null)
const plantillas = ref([
  { id: 1, nombre: 'Clima laboral' },
  { id: 2, nombre: 'Satisfacción general' },
  { id: 3, nombre: 'Feedback de actividades' }
])

const empresaId = computed(() => adminStore.empresaId || authStore.user?.id_empresa)
const encuestasLoading = computed(() => adminStore.encuestasLoading)
const encuestas = computed(() => adminStore.encuestas)
const authLoading = computed(() => !authStore.user)

// Solo carga encuestas cuando empresaId esté disponible
watch(
  empresaId,
  async (id) => {
    // ---- INICIO DEL CAMBIO ----
    console.log('Intentando cargar encuestas para el empresaId:', id); 
    // ---- FIN DEL CAMBIO ----
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

function irCrearDesdePlantilla() {
  router.push({ name: 'PlantillasEncuestaView' }) // Asegúrate que esta ruta exista en tu router
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

function editarEncuesta(encuesta) {
  adminStore.setPlantillaParaEditar(encuesta)
  router.push({ name: 'CrearEncuestaView' })
}

async function archivarEncuesta(id) {
  try {
    await adminStore.archivarEncuesta(id)
    toast.success('Encuesta archivada correctamente')
  } catch (err) {
    toast.error('No se pudo archivar la encuesta')
  }
}

function abrirModalEnviar(id) {
  encuestaIdSeleccionada.value = id
  mostrarModalEnviar.value = true
}

function cerrarModalEnviar() {
  mostrarModalEnviar.value = false
  encuestaIdSeleccionada.value = null
}

// --- ELIMINACIÓN ---
function iniciarEliminacion(encuestaId) {
  encuestaAEliminarId.value = encuestaId
  mostrarModalEliminar.value = true
}

async function handleEliminacionConfirmada() {
  try {
    await adminStore.eliminarEncuesta(encuestaAEliminarId.value)
    toast.success('Encuesta eliminada correctamente')
  } catch (error) {
    toast.error(error.message || 'Error al eliminar la encuesta')
  } finally {
    mostrarModalEliminar.value = false
    encuestaAEliminarId.value = null
  }
}
</script>