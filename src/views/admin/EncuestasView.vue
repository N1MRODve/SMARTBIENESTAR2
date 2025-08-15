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
      <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
        <div class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20">
          <table class="min-w-full">
            <thead class="bg-white/50 backdrop-blur-sm">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Título</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Estado</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/20">
            <tr v-for="encuesta in encuestasFiltradas" :key="encuesta.id" class="hover:bg-white/30 transition-colors duration-200">
              <td class="px-6 py-4 font-medium text-gray-900">{{ encuesta.titulo }}</td>
              <td class="px-6 py-4">
                <span
                  :class="{
                    'bg-yellow-100/80 text-yellow-800 border border-yellow-200/50': encuesta.estado === 'borrador',
                    'bg-green-100/80 text-green-800 border border-green-200/50': encuesta.estado === 'activa',
                    'bg-gray-100/80 text-gray-800 border border-gray-200/50': encuesta.estado === 'finalizada'
                  }"
                  class="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
                >
                  {{ encuesta.estado }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex gap-2 justify-end">
                <button
                  v-if="encuesta.estado === 'borrador'"
                  class="glass-button-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600/90 transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30"
                  @click="abrirModalEnviar(encuesta.id)"
                >
                  Enviar
                </button>
                <button
                  v-if="encuesta.estado === 'borrador'"
                  class="glass-button-outline text-green-700 bg-white/60 hover:bg-green-50/80 px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-green-300/50"
                  @click="adminStore.setEncuestaParaEditar(encuesta)"
                >
                  <span>Editar</span>
                </button>
                <button
                  class="glass-button-outline text-red-700 bg-white/60 hover:bg-red-50/80 px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-red-300/50"
                  @click="iniciarEliminacion(encuesta.id)"
                >
                  <span>Eliminar</span>
                </button>
                </div>
              </td>
            </tr>
          </tbody>
          </table>
        </div>
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