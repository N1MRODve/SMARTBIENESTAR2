<template>
  <Modal @close="emit('close')">
    <h2 class="text-xl font-bold mb-4">Enviar Encuesta</h2>
    <div class="mb-6">
      <div class="flex gap-4 mb-4">
        <button class="px-4 py-2 rounded bg-primary text-white" :class="{ 'font-bold': true }">Seleccionar de la Lista</button>
        <button class="px-4 py-2 rounded bg-secondary text-white">Añadir Manualmente</button>
      </div>
      <div>
        <label class="block font-semibold mb-2">Buscar empleado</label>
        <input v-model="search" type="text" class="w-full border rounded px-3 py-2 mb-2" placeholder="Buscar por nombre o email" />
        <div class="max-h-48 overflow-y-auto border rounded p-2 bg-gray-50">
          <div v-for="empleado in empleadosFiltrados" :key="empleado.id" class="flex items-center gap-2 py-1">
            <input type="checkbox" :value="empleado.id" v-model="selectedIds" />
            <span>{{ empleado.nombre }} {{ empleado.apellido }} ({{ empleado.email }})</span>
          </div>
        </div>
      </div>
      <div class="mt-6">
        <label class="block font-semibold mb-2">Correos electrónicos manuales</label>
        <textarea v-model="manualEmails" rows="3" class="w-full border rounded px-3 py-2" placeholder="Pega correos separados por coma o salto de línea"></textarea>
      </div>
    </div>
    <div class="flex justify-end gap-2">
      <button @click="emit('close')" class="px-4 py-2 rounded bg-gray-200 text-gray-700">Cancelar</button>
      <button @click="handleSend" :disabled="loading" class="px-4 py-2 rounded bg-primary text-white">
        {{ loading ? 'Enviando...' : 'Confirmar y Enviar' }}
      </button>
    </div>
  </Modal>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAdminStore } from '@/stores/admin'
import Modal from '@/components/common/Modal.vue'
import { useToast } from '@/composables/useToast'

const props = defineProps({
  encuestaId: { type: [String, Number], required: true }
})
const emit = defineEmits(['close'])

const adminStore = useAdminStore()
const toast = useToast()
const loading = ref(false)
const search = ref('')
const selectedIds = ref([])
const manualEmails = ref('')

const empleadosFiltrados = computed(() =>
  adminStore.empleados.filter(e =>
    `${e.nombre} ${e.apellido} ${e.email}`.toLowerCase().includes(search.value.toLowerCase())
  )
)

function toggleEmpleado(id) {
  if (selectedIds.value.includes(id)) {
    selectedIds.value = selectedIds.value.filter(i => i !== id)
  } else {
    selectedIds.value.push(id)
  }
}

function handleSend() {
  loading.value = true
  // Correos seleccionados de la lista
  const correosLista = empleadosFiltrados.value
    .filter(e => selectedIds.value.includes(e.id))
    .map(e => e.email)
  // Correos manuales
  const correosManual = manualEmails.value
    .split(/[\n,]+/)
    .map(e => e.trim())
    .filter(e => !!e)
  // Unir y limpiar duplicados
  const listaDeCorreos = Array.from(new Set([...correosLista, ...correosManual]))

  adminStore.enviarEncuesta(props.encuestaId, listaDeCorreos)
    .then(() => {
      toast.success('Encuesta enviada correctamente.')
      emit('close')
    })
    .catch(err => {
      toast.error(err.message || 'Error al enviar la encuesta.')
    })
    .finally(() => {
      loading.value = false
    })
}
</script>