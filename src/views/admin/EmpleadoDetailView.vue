<template>
  <AdminLayout>
    <section v-if="empleado" class="p-6 max-w-5xl mx-auto">
      <Button variant="outline" icon="arrow-left" class="mb-6" @click="volver">Volver a empleados</Button>
      <header class="mb-8 flex items-center gap-4">
        <h1 class="text-2xl font-bold text-gray-900">
          Perfil de {{ empleado.nombre }} {{ empleado.apellido }}
        </h1>
        <span
          :class="empleado.activo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
          class="px-3 py-1 rounded-full text-xs font-semibold"
        >
          {{ empleado.activo ? 'Activo' : 'Inactivo' }}
        </span>
      </header>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Columna Izquierda -->
        <div class="flex flex-col gap-6">
          <div class="bg-white border rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold mb-2">Información de Contacto</h2>
            <div class="mb-2"><span class="font-medium">Correo:</span> {{ empleado.correo }}</div>
            <div><span class="font-medium">Teléfono:</span> {{ empleado.telefono || 'No disponible' }}</div>
          </div>
          <div class="bg-white border rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold mb-2">Información Laboral</h2>
            <div class="mb-2"><span class="font-medium">Cargo:</span> {{ empleado.perfil_empleados?.cargo || 'Sin cargo' }}</div>
            <div><span class="font-medium">Departamento:</span> {{ empleado.perfil_empleados?.departamento || 'No asignado' }}</div>
          </div>
        </div>
        <!-- Columna Derecha -->
        <div class="flex flex-col gap-6">
          <div class="bg-white border rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold mb-2">Estadísticas de Bienestar</h2>
            <div class="mb-2"><span class="font-medium">Puntos de bienestar:</span> {{ empleado.perfil_empleados?.puntos_bienestar || 0 }}</div>
            <div class="mb-2"><span class="font-medium">Nivel de actividad:</span> {{ empleado.perfil_empleados?.nivel_actividad || 'N/A' }}</div>
            <div><span class="font-medium">Última participación:</span> {{ empleado.perfil_empleados?.ultima_participacion || 'N/A' }}</div>
          </div>
          <div class="bg-white border rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold mb-2">Preferencias de Bienestar</h2>
            <div>{{ empleado.perfil_empleados?.preferencias_bienestar || 'Sin preferencias registradas.' }}</div>
          </div>
        </div>
      </div>
    </section>
  </AdminLayout>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useAdminStore } from '@/stores/admin'
import { useRoute, useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import Button from '@/components/common/Button.vue'

const adminStore = useAdminStore()
const route = useRoute()
const router = useRouter()

onMounted(() => {
  if (route.params.id) {
    adminStore.loadEmpleadoById(route.params.id)
  }
})

const empleado = computed(() => adminStore.empleadoActual)

function volver() {
  router.push({ name: 'EmpleadosView' })
}
</script>