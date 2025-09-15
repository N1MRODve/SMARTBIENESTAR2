<template>
  <div class="space-y-8">
    <!-- Header -->
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Gestión de Empleados</h1>
      <p class="text-gray-600 mb-4">
        Administra, invita y revisa la información de los empleados de tu empresa.
      </p>
      <div class="flex gap-2">
        <button 
          @click="mostrarModalInvitar = true"
          class="glass-button-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-sm border border-blue-500/30 flex items-center"
        >
          <UserPlus class="h-4 w-4 mr-2" />
          Invitar Empleado
        </button>
        <button 
          @click="mostrarModalAñadir = true"
          class="glass-button-secondary text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-200/80 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-sm border border-gray-300/50 flex items-center"
        >
          <UserCheck class="h-4 w-4 mr-2" />
          Añadir Empleado
        </button>
      </div>
    </header>

    <!-- Estadísticas -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <h3 class="text-3xl font-bold text-green-600 mb-2">{{ empleadosActivos.length }}</h3>
        <p class="text-gray-700 font-medium">Empleados Activos</p>
        <p class="text-xs text-gray-500 mt-1">Participación reciente</p>
      </div>
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <h3 class="text-3xl font-bold text-red-600 mb-2">{{ empleadosInactivos.length }}</h3>
        <p class="text-gray-700 font-medium">Empleados Inactivos</p>
        <p class="text-xs text-gray-500 mt-1">Sin actividad reciente</p>
      </div>
      <div class="glass-card p-6 rounded-xl shadow-lg text-center backdrop-blur-sm border border-white/20">
        <h3 class="text-3xl font-bold text-primary mb-2">{{ topEmpleado?.nombre || 'N/A' }}</h3>
        <p class="text-gray-700 font-medium">Top Actividad</p>
        <p class="text-xs text-gray-500 mt-1">Empleado más activo</p>
      </div>
    </div>

    <!-- Filtros y Búsqueda -->
    <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="md:col-span-2">
          <input
            v-model="busqueda"
            type="text"
            class="w-full border border-white/30 rounded-xl px-4 py-3 bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
            placeholder="Buscar empleado por nombre o correo..."
          />
        </div>
        <div>
          <select v-model="filtroEstado" class="w-full px-3 py-3 border border-white/30 rounded-xl bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary">
            <option value="">Todos los estados</option>
            <option value="activo">Activos</option>
            <option value="inactivo">Inactivos</option>
          </select>
        </div>
        <div>
          <button @click="limpiarFiltros" class="w-full glass-button-outline text-gray-700 bg-white/60 hover:bg-gray-50/80 px-4 py-3 rounded-xl transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-gray-300/50">
            Limpiar Filtros
          </button>
        </div>
      </div>
    </div>

    <!-- Lista de Empleados -->
    <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
      <div v-if="isLoading" class="space-y-4">
        <div v-for="i in 5" :key="i" class="glass-card p-6 rounded-xl animate-pulse backdrop-blur-sm border border-white/20">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gray-300 rounded-xl"></div>
            <div class="flex-1">
              <div class="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div class="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
            <div class="h-8 bg-gray-300 rounded w-24"></div>
          </div>
        </div>
      </div>

      <div v-else-if="empleadosFiltrados.length === 0" class="glass-card p-12 rounded-xl shadow-lg text-center text-gray-600 backdrop-blur-sm border border-white/20">
        <Users class="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">Aún no tenemos datos</h3>
        <p class="text-gray-500 mb-4">No se encontraron empleados con los filtros aplicados</p>
        <button 
          @click="mostrarModalInvitar = true"
          class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium"
        >
          Invitar Primer Empleado
        </button>
      </div>

      <div v-else class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20">
        <table class="min-w-full">
          <thead class="bg-white/50 backdrop-blur-sm">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Empleado</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Correo</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Departamento</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Puntos</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Estado</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/20">
            <tr v-for="empleado in empleadosFiltrados" :key="empleado.id" class="hover:bg-white/30 transition-colors duration-200">
              <td class="px-6 py-4">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center">
                    <span class="text-white font-bold text-sm">
                      {{ empleado.nombre?.[0] }}{{ empleado.apellido?.[0] }}
                    </span>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ empleado.nombre }} {{ empleado.apellido }}</p>
                    <p class="text-sm text-gray-600">{{ empleado.cargo || 'Sin cargo' }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-gray-700">{{ empleado.email }}</td>
              <td class="px-6 py-4 text-gray-700">{{ empleado.departamento || 'Sin departamento' }}</td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <Star class="h-4 w-4 text-yellow-500 mr-1" />
                  <span class="font-medium text-gray-900">{{ empleado.puntos_bienestar || 0 }}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <span
                  :class="empleado.activo
                    ? 'bg-green-100/80 text-green-800 border border-green-200/50'
                    : 'bg-gray-100/80 text-gray-800 border border-gray-200/50'"
                  class="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
                >
                  {{ empleado.activo ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td class="px-6 py-4 flex gap-2">
                <button class="glass-button-outline text-blue-700 bg-white/60 hover:bg-blue-50/80 text-xs px-3 py-1 rounded-lg transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm border border-blue-300/50">
                  Ver
                </button>
                <button
                  class="text-xs px-3 py-1 rounded-lg text-red-600 border border-red-300/50 hover:bg-red-50/80 transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 backdrop-blur-sm"
                  @click="iniciarEliminacion(empleado)"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modales -->
    <div v-if="mostrarModalInvitar" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
        <h2 class="text-xl font-bold mb-4">Invitar Nuevo Empleado</h2>
        <form @submit.prevent="handleInvite" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Correos electrónicos</label>
            <textarea
              v-model="correos"
              rows="4"
              placeholder="correo1@empresa.com, correo2@empresa.com"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            ></textarea>
            <p class="text-sm text-gray-500 mt-1">
              Introduce uno o varios correos electrónicos, separados por comas o saltos de línea.
            </p>
          </div>
          <div class="flex justify-end gap-2">
            <button type="button" @click="mostrarModalInvitar = false" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Cancelar
            </button>
            <button type="submit" :disabled="loading" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50">
              {{ loading ? 'Enviando...' : 'Enviar Invitaciones' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="mostrarModalAñadir" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
        <h2 class="text-xl font-bold mb-4">Añadir Nuevo Empleado</h2>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <input v-model="nuevoEmpleado.nombre" type="text" placeholder="Nombre" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
          <input v-model="nuevoEmpleado.apellido" type="text" placeholder="Apellido" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
          <input v-model="nuevoEmpleado.email" type="email" placeholder="Correo Electrónico" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
          <input v-model="nuevoEmpleado.cargo" type="text" placeholder="Cargo" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
          <div class="flex justify-end gap-2">
            <button type="button" @click="mostrarModalAñadir = false" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Cancelar
            </button>
            <button type="submit" :disabled="loading" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50">
              {{ loading ? 'Guardando...' : 'Guardar Empleado' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import { Users, UserPlus, UserCheck, Star } from 'lucide-vue-next'
import { supabase } from '../../services/supabase'
import { useAuthStore } from '../../stores/auth'

const toast = useToast()
const authStore = useAuthStore()

// Estado reactivo
const isLoading = ref(true)
const busqueda = ref('')
const filtroEstado = ref('')
const mostrarModalInvitar = ref(false)
const mostrarModalAñadir = ref(false)
const loading = ref(false)
const correos = ref('')

const nuevoEmpleado = ref({
  nombre: '',
  apellido: '',
  email: '',
  cargo: ''
})

// Datos dummy de empleados
const empleados = ref([
  {
    id: 1,
    nombre: 'Ana',
    apellido: 'García',
    email: 'ana.garcia@innovatech.com',
    cargo: 'Desarrolladora Senior',
    departamento: 'Desarrollo',
    puntos_bienestar: 1250,
    activo: true,
    fecha_registro: '2024-03-15',
    ultima_participacion: '2025-01-20'
  },
  {
    id: 2,
    nombre: 'Luis',
    apellido: 'Martínez',
    email: 'luis.martinez@innovatech.com',
    cargo: 'Diseñador UX',
    departamento: 'Diseño',
    puntos_bienestar: 980,
    activo: true,
    fecha_registro: '2024-05-20',
    ultima_participacion: '2025-01-19'
  },
  {
    id: 3,
    nombre: 'Sofia',
    apellido: 'Rodríguez',
    email: 'sofia.rodriguez@innovatech.com',
    cargo: 'Gerente de Marketing',
    departamento: 'Marketing',
    puntos_bienestar: 875,
    activo: true,
    fecha_registro: '2024-02-10',
    ultima_participacion: '2025-01-18'
  },
  {
    id: 4,
    nombre: 'Carlos',
    apellido: 'Mendoza',
    email: 'carlos.mendoza@innovatech.com',
    cargo: 'Analista de Datos',
    departamento: 'Desarrollo',
    puntos_bienestar: 450,
    activo: false,
    fecha_registro: '2024-08-12',
    ultima_participacion: '2024-12-15'
  },
  {
    id: 5,
    nombre: 'María',
    apellido: 'Fernández',
    email: 'maria.fernandez@innovatech.com',
    cargo: 'Especialista en RRHH',
    departamento: 'RRHH',
    puntos_bienestar: 1100,
    activo: true,
    fecha_registro: '2024-01-08',
    ultima_participacion: '2025-01-20'
  }
])

// Computed
const empleadosFiltrados = computed(() => {
  let resultado = empleados.value
  
  // Filtrar por búsqueda
  if (busqueda.value.trim()) {
    const term = busqueda.value.trim().toLowerCase()
    resultado = resultado.filter(e =>
      (e.nombre + ' ' + e.apellido).toLowerCase().includes(term) ||
      e.email.toLowerCase().includes(term)
    )
  }
  
  // Filtrar por estado
  if (filtroEstado.value) {
    const esActivo = filtroEstado.value === 'activo'
    resultado = resultado.filter(e => e.activo === esActivo)
  }
  
  return resultado
})

const empleadosActivos = computed(() => {
  return empleados.value.filter(e => e.activo)
})

const empleadosInactivos = computed(() => {
  return empleados.value.filter(e => !e.activo)
})

const topEmpleado = computed(() => {
  return empleados.value
    .filter(e => e.activo)
    .sort((a, b) => (b.puntos_bienestar || 0) - (a.puntos_bienestar || 0))[0]
})

// Métodos
const limpiarFiltros = () => {
  busqueda.value = ''
  filtroEstado.value = ''
}

const iniciarEliminacion = async (empleado) => {
  if (confirm(`¿Estás seguro de que quieres desactivar a ${empleado.nombre} ${empleado.apellido}? Esta acción es reversible.`)) {
    try {
      const { error } = await supabase
        .from('usuarios')
        .update({ activo: false })
        .eq('id', empleado.id)

      if (error) throw error

      // Actualizar el estado localmente
      const index = empleados.value.findIndex(e => e.id === empleado.id)
      if (index !== -1) {
        empleados.value[index].activo = false
      }

      toast.add({ severity: 'success', summary: 'Empleado desactivado', detail: 'El empleado ha sido marcado como inactivo.', life: 3000 })
    } catch (error) {
      toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo desactivar al empleado.', life: 3000 })
    }
  }
}

const handleInvite = async () => {
  loading.value = true
  try {
    // Simular envío de invitaciones
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast.add({
      severity: 'success',
      summary: 'Invitaciones enviadas',
      detail: 'Las invitaciones han sido enviadas correctamente',
      life: 3000
    })
    
    mostrarModalInvitar.value = false
    correos.value = ''
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudieron enviar las invitaciones',
      life: 3000
    })
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  loading.value = true
  try {
    // TODO: Implementar llamada a Supabase para crear el empleado.
    // Esto probablemente debería ser una función RPC en Supabase para crear
    // el usuario en `auth.users` y en la tabla `usuarios` y `perfil_empleados`
    // de forma transaccional.
    toast.add({
      severity: 'info',
      summary: 'Empleado creado',
      detail: 'El empleado ha sido creado correctamente',
      life: 3000
    })
    
    mostrarModalAñadir.value = false
    nuevoEmpleado.value = {
      nombre: '',
      apellido: '',
      email: '',
      cargo: ''
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo crear el empleado',
      life: 3000
    })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  cargarEmpleados()
})
</script>