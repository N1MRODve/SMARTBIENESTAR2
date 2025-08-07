<template>
  <div class="bg-white border rounded-lg shadow p-6">
    <h2 class="text-lg font-semibold mb-4">Actividad Reciente</h2>
    <ul class="divide-y divide-gray-100">
      <li v-for="actividad in actividades" :key="actividad.fecha_actividad" class="py-3">
        <div class="flex justify-between items-center">
          <span class="text-gray-700">{{ actividad.descripcion }}</span>
          <span class="text-xs text-gray-500">{{ new Date(actividad.fecha_actividad).toLocaleString() }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  actividades: { type: Array, required: true }
})
</script>