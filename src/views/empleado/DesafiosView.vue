<template>
  <div class="p-6 md:p-8">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Desafíos de Bienestar</h1>
      <p class="text-gray-600 mt-1">Participa en nuestros desafíos, gana puntos y mejora tu bienestar.</p>
    </header>

    <div v-if="loading" class="text-center py-8">
      <span class="text-gray-500">Cargando desafíos...</span>
    </div>

    <div v-else>
      <div v-if="desafios.length === 0" class="text-center py-8">
        <span class="text-gray-500">No hay desafíos disponibles.</span>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DesafioCard
          v-for="desafio in desafios"
          :key="desafio.id"
          :desafio="desafio"
          @completar="completarDesafio"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDemoStore } from '@/stores/demoStore'
import { useToast } from 'primevue/usetoast'

// Componente de tarjeta de desafío
const DesafioCard = {
  props: ['desafio'],
  emits: ['completar'],
  template: `
    <div class="glass-card rounded-xl shadow-lg p-6 text-center border border-white/20">
      <h3 class="text-xl font-bold text-gray-900 mb-2">{{ desafio.titulo }}</h3>
      <p class="text-gray-700 mb-4">{{ desafio.descripcion }}</p>
      <div class="mb-4 font-semibold text-yellow-600">Puntos: {{ desafio.puntos }}</div>
      <button
        v-if="desafio.estado === 'pendiente'"
        @click="$emit('completar', desafio.id)"
        class="w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
      >
        Completar
      </button>
      <button
        v-else
        disabled
        class="w-full bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded-lg cursor-not-allowed"
      >
        Completado ✔️
      </button>
    </div>
  `
}

const demoStore = useDemoStore()
const toast = useToast()
const loading = ref(true)
const desafios = ref([])

onMounted(async () => {
  // Simula carga
  setTimeout(() => {
    desafios.value = demoStore.demoData.desafios || []
    loading.value = false
  }, 500)
})

async function completarDesafio(desafioId) {
  try {
    const ok = await demoStore.completarDesafio(desafioId)
    if (ok) {
      toast.add({
        severity: 'success',
        summary: '¡Desafío completado!',
        detail: 'Has completado el desafío y ganado puntos.',
        life: 2500
      })
    }
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: err.message,
      life: 2500
    })
  }
}
</script>