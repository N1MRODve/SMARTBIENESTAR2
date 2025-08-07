<template>
  <div class="bg-white rounded-lg shadow p-4">
    <h3 class="text-lg font-semibold mb-2">{{ title }}</h3>
    <div>
      <slot name="chart">
        <!-- Aquí puedes renderizar tu gráfico, por ejemplo con Chart.js o ApexCharts -->
        <div class="text-gray-400 text-sm">[Gráfico aquí]</div>
      </slot>
    </div>
    <div class="mt-2 text-sm text-gray-500">{{ description }}</div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' }
})
</script>