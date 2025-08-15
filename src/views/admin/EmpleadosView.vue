<template>
  <AdminLayout>
    <section class="p-6 max-w-6xl mx-auto">
      <!-- Encabezado -->
      <header class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Gestión de Empleados</h1>
        <p class="text-gray-600 mb-4">
          Administra, invita y revisa la información de los empleados de tu empresa.
        </p>
        <div class="flex gap-2">
          <Button variant="primary" icon="user-plus" @click="mostrarModalInvitar = true">Invitar Empleado</Button>
          <Button variant="secondary" icon="user-add" @click="mostrarModalAñadir = true">Añadir Nuevo Empleado</Button>
        </div>
      </header>

      <!-- Estadísticas -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Empleados Activos"
          :value="empleadosFiltrados.filter(e => e.activo).length"
          description="Actualmente activos en la empresa"
        />
        <StatsCard
          title="Empleados Inactivos"
          :value="empleadosFiltrados.filter(e => !e.activo).length"
          description="No han participado recientemente"
        />
        <StatsCard
          title="Top Actividad"
          :value="empleadosFiltrados[0]?.nombre || 'N/A'"
          description="Empleado con más reservas"
        />
      </div>

      <!-- Lista de empleados -->
      <div class="glass-container rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/30">
        <div class="mb-4">
          <input
            v-model="busqueda"
            type="text"
            class="w-full border border-white/30 rounded-xl px-4 py-3 bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
            placeholder="Buscar empleado por nombre o correo..."
          />
        </div>
        <PageLoader v-if="isLoading" text="Cargando empleados..." />
        <template v-else>
          <div v-if="empleadosFiltrados.length === 0" class="text-center text-gray-500 py-8">
            No se encontraron empleados.
          </div>
          <div v-else class="glass-card rounded-xl overflow-hidden backdrop-blur-sm border border-white/20">
            <table class="min-w-full">
              <thead class="bg-white/50 backdrop-blur-sm">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nombre</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Correo</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Cargo</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Estado</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/20">
              <tr v-for="empleado in empleadosFiltrados" :key="empleado.id" class="hover:bg-white/30 transition-colors duration-200">
                <td class="px-6 py-4">
                  <router-link
                    :to="{ name: 'EmpleadoDetailView', params: { id: empleado.id } }"
                    class="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors duration-200"
                  >
                    {{ empleado.nombre }} {{ empleado.apellido }}
                  </router-link>
                </td>
                <td class="px-6 py-4 text-gray-700">{{ empleado.correo }}</td>
                <td class="px-6 py-4 text-gray-700">{{ empleado.cargo }}</td>
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
                  <router-link
                    :to="{ name: 'EmpleadoDetailView', params: { id: empleado.id } }"
                  >
                    <Button variant="outline" class="text-xs px-3 py-1">Ver</Button>
                  </router-link>
                  <Button
                    variant="outline"
                    class="text-xs px-3 py-1 text-red-600 border-red-300/50 hover:bg-red-50/80"
                    @click="iniciarEliminacion(empleado)"
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            </tbody>
            </table>
          </div>
        </template>
      </div>
      <AñadirEmpleadoModal 
        v-if="mostrarModalAñadir" 
        @close="mostrarModalAñadir = false" 
      />
      <InvitarEmpleadoModal 
        v-if="mostrarModalInvitar" 
        @close="mostrarModalInvitar = false" 
      />
      <ConfirmacionModal
        v-if="mostrarModalEliminar"
        titulo="Confirmar Eliminación Permanente"
        mensaje="Esta acción no se puede deshacer. Se borrará toda la información del empleado. Para confirmar, escribe ELIMINAR."
        palabraClave="ELIMINAR"
        @close="mostrarModalEliminar = false"
        @confirm="handleEliminacionConfirmada"
      />
    </section>
  </AdminLayout>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useAdminStore } from '@/stores/admin'
import { useAuthStore } from '@/stores/auth.store'
import AdminLayout from '@/layouts/AdminLayout.vue'
import Button from '@/components/common/Button.vue'
import StatsCard from '@/components/ui/StatsCard.vue'
import PageLoader from '@/components/common/PageLoader.vue'
import AñadirEmpleadoModal from '@/components/admin/AñadirEmpleadoModal.vue'
import InvitarEmpleadoModal from '@/components/admin/InvitarEmpleadoModal.vue'
import ConfirmacionModal from '@/components/common/ConfirmacionModal.vue'
import { useToast } from '@/composables/useToast'

const adminStore = useAdminStore()
const authStore = useAuthStore()
const toast = useToast()
const mostrarModalAñadir = ref(false)
const mostrarModalInvitar = ref(false)
const busqueda = ref('')

// Estado para eliminación
const mostrarModalEliminar = ref(false)
const empleadoAEliminar = ref(null)

const empleados = computed(() => adminStore.empleados)
const isLoading = computed(() => adminStore.empleadosLoading)

const empleadosFiltrados = computed(() => {
  const term = busqueda.value.trim().toLowerCase()
  if (!term) return empleados.value
  return empleados.value.filter(e =>
    (e.nombre + ' ' + e.apellido).toLowerCase().includes(term) ||
    e.correo.toLowerCase().includes(term)
  )
})

function iniciarEliminacion(empleado) {
  empleadoAEliminar.value = empleado
  mostrarModalEliminar.value = true
}

async function handleEliminacionConfirmada() {
  try {
    await adminStore.eliminarEmpleado(empleadoAEliminar.value.id)
    toast.success('Empleado eliminado correctamente')
  } catch (err) {
    toast.error('Error al eliminar empleado')
  } finally {
    mostrarModalEliminar.value = false
    empleadoAEliminar.value = null
  }
}

onMounted(() => {
  if (authStore.user?.empresa_id) {
    adminStore.loadEmpleados(authStore.user.empresa_id)
  }
})
</script>