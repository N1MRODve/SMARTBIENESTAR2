<template>
  <div class="bg-white p-6 rounded-2xl shadow-lg">
    <h3 class="text-lg font-semibold mb-4">Tendencia de Bienestar Semanal</h3>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const props = defineProps({
  // Recibirá los datos directamente desde la función de Supabase
  trendData: {
    type: Array,
    required: true
  }
})

// Procesamos los datos para que Chart.js los entienda
const chartData = computed(() => ({
  labels: props.trendData.map(d => `Semana ${d.semana.split('-')[1]}`), // Ej: "Semana 38"
  datasets: [
    {
      label: 'Promedio de Bienestar (1-5)',
      backgroundColor: 'rgba(79, 70, 229, 0.2)',
      borderColor: 'rgba(79, 70, 229, 1)',
      data: props.trendData.map(d => d.promedio_bienestar),
      fill: true,
      tension: 0.4 // Suaviza la línea
    }
  ]
}))

// Opciones de configuración para el gráfico
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      max: 5, // Asumiendo una escala de 1 a 5
      ticks: {
        stepSize: 1
      }
    }
  },
  plugins: {
    legend: {
      display: false // Ocultamos la leyenda para un look más limpio
    }
  }
}
</script>