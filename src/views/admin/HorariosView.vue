<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Gestión de Horarios</h1>

    <!-- 1. ESTADO DE CARGA -->
    <div v-if="isLoading" class="text-center py-16">
      <p class="text-gray-500">Cargando horarios...</p>
      <!-- Aquí podrías poner un spinner o un esqueleto de carga -->
    </div>

    <!-- 2. ESTADO VACÍO (NO HAY DATOS) -->
    <div v-else-if="!horarios.length" class="text-center py-16 border-2 border-dashed rounded-lg">
      <div class="flex flex-col items-center">
        <Clock class="h-12 w-12 text-gray-400 mb-4" />
        <h3 class="text-xl font-semibold text-gray-800">Aún no hay horarios definidos</h3>
        <p class="text-gray-500 mt-2 mb-6">
          Crea el primer horario para empezar a gestionar la disponibilidad.
        </p>
        <button @click="abrirModalCrearHorario" class="glass-button-primary flex items-center">
          <Plus class="h-4 w-4 mr-2" />
          Crear Primer Horario
        </button>
      </div>
    </div>

    <!-- 3. ESTADO CON DATOS -->
    <div v-else>
      <div class="flex justify-end mb-4">
        <button @click="abrirModalCrearHorario" class="glass-button-primary flex items-center">
          <Plus class="h-4 w-4 mr-2" />
          Crear Nuevo Horario
        </button>
      </div>
      
      <!-- Aquí va tu tabla o lista para mostrar los 'horarios' -->
      <div class="bg-white rounded-lg shadow">
        <ul class="divide-y divide-gray-200">
          <li v-for="horario in horarios" :key="horario.id" class="p-4">
            <!-- Contenido de la fila del horario -->
            <p>{{ horario.nombre }}</p> 
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/services/supabase'
import { useAuthStore } from '@/stores/auth.store'
import { useToast } from 'primevue/usetoast'
import { 
  Plus, 
  Clock
} from 'lucide-vue-next'

const authStore = useAuthStore()
const toast = useToast()

const horarios = ref([])
const isLoading = ref(true)

const cargarHorarios = async () => {
  isLoading.value = true
  try {
    const empresaId = authStore.empresaId
    if (!empresaId) {
      throw new Error("ID de empresa no encontrado. No se pueden cargar los horarios.")
    }

    const { data, error } = await supabase
      .from('horarios') // Asumiendo que tu tabla se llama 'horarios'
      .select('*')
      .eq('empresa_id', empresaId)

    if (error) throw error

    horarios.value = data

  } catch (error) {
    console.error('Error al cargar horarios:', error)
    toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 })
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  cargarHorarios()
})

const abrirModalCrearHorario = () => {
  console.log('Abriendo modal para crear un nuevo horario...')
  // Aquí iría la lógica para mostrar un modal
}
</script>