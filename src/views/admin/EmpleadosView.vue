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
      <div class="bg-white border rounded-lg shadow-md p-6">
        <div class="mb-4">
          <input
            v-model="busqueda"
            type="text"
            class="w-full border rounded px-3 py-2"
            placeholder="Buscar empleado por nombre o correo..."
          />
        </div>
        <PageLoader v-if="isLoading" text="Cargando empleados..." />
        <template v-else>
          <div v-if="empleadosFiltrados.length === 0" class="text-center text-gray-500 py-8">
            No se encontraron empleados.
          </div>
          <table v-else class="min-w-full bg-white rounded-lg overflow-hidden">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-2 text-left text-xs font-semibold text-gray-600">Nombre</th>
                <th class="px-4 py-2 text-left text-xs font-semibold text-gray-600">Correo</th>
                <th class="px-4 py-2 text-left text-xs font-semibold text-gray-600">Cargo</th>
                <th class="px-4 py-2 text-left text-xs font-semibold text-gray-600">Estado</th>
                <th class="px-4 py-2 text-left text-xs font-semibold text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="empleado in empleadosFiltrados" :key="empleado.id">
                <td class="px-4 py-2">
                  <router-link
                    :to="{ name: 'EmpleadoDetailView', params: { id: empleado.id } }"
                    class="text-blue-600 hover:underline"
                  >
                    {{ empleado.nombre }} {{ empleado.apellido }}
                  </router-link>
                </td>
                <td class="px-4 py-2">{{ empleado.correo }}</td>
                <td class="px-4 py-2">{{ empleado.cargo }}</td>
                <td class="px-4 py-2">
                  <span
                    :class="empleado.activo
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'"
                    class="px-2 py-1 rounded-full text-xs font-semibold"
                  >
                    {{ empleado.activo ? 'Activo' : 'Inactivo' }}
                  </span>
                </td>
                <td class="px-4 py-2 flex gap-2">
                  <router-link
                    :to="{ name: 'EmpleadoDetailView', params: { id: empleado.id } }"
                  >
                    <Button size="sm" variant="outline" icon="eye">Ver</Button>
                  </router-link>
                  <Button
                    size="sm"
                    variant="danger"
                    icon="trash"
                    @click="iniciarEliminacion(empleado)"
                  >Eliminar</Button>
                </td>
              </tr>
            </tbody>
          </table>
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