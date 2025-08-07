<template>
  <AdminLayout>
    <section class="p-6 max-w-4xl mx-auto">
      <header class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Crear Encuesta desde Plantilla</h1>
        <p class="text-sm text-gray-500">Selecciona una plantilla para crear una encuesta basada en ella.</p>
      </header>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="plantilla in plantillas"
          :key="plantilla.id"
          class="bg-white border rounded-lg shadow p-6 flex flex-col justify-between"
        >
          <div>
            <h2 class="text-lg font-semibold mb-2">{{ plantilla.nombre }}</h2>
            <p class="text-gray-600 mb-4">{{ plantilla.descripcion }}</p>
          </div>
          <Button variant="primary" @click="usarPlantilla(plantilla)">
            Usar esta plantilla
          </Button>
        </div>
      </div>
    </section>
  </AdminLayout>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/admin'
import AdminLayout from '@/layouts/AdminLayout.vue'
import Button from '@/components/common/Button.vue'

const router = useRouter()
const adminStore = useAdminStore()

const plantillas = [
  { id: 1, nombre: 'Clima laboral', descripcion: 'Evalúa el ambiente y la satisfacción de los empleados.', preguntas: [] },
  { id: 2, nombre: 'Satisfacción general', descripcion: 'Mide el nivel de satisfacción global en la empresa.', preguntas: [] },
  { id: 3, nombre: 'Feedback de actividades', descripcion: 'Recoge opiniones sobre eventos y actividades internas.', preguntas: [] }
]

function usarPlantilla(plantilla) {
  adminStore.setPlantillaParaEditar(plantilla)
  router.push({ name: 'CrearEncuestaView' })
}
</script>