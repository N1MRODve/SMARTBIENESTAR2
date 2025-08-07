<!-- src/components/admin/ChartCard.vue -->
<template>
  <div class="bg-white border rounded-lg shadow p-6">
    <h2 class="text-lg font-semibold mb-4">Participación por Departamento</h2>
    <BarChart :chart-data="chartData" />
  </div>
</template>

<script setup>
import BarChart from '@/components/common/BarChart.vue' // Wrapper para vue-chartjs
const props = defineProps({
  chartData: { type: Object, required: true }
})
</script>