<script setup>
import { onMounted, computed } from 'vue'
import { useEmpleadoStore } from '@/stores/empleado.store'
import EmpleadoLayout from '@/layouts/EmpleadoLayout.vue'
import DesafioCard from '@/components/empleado/DesafioCard.vue'
// 1. Importar el nuevo componente de esqueleto
import SkeletonCard from '@/components/common/SkeletonCard.vue'

const empleadoStore = useEmpleadoStore()

const desafios = computed(() => empleadoStore.desafios)
const isLoading = computed(() => empleadoStore.loading.desafios)

onMounted(() => {
  // Para probar, puedes simular una carga más larga
  // setTimeout(() => {
  //   empleadoStore.loadDesafios()
  // }, 2000)
  empleadoStore.loadDesafios()
})
</script>

<template>
  <EmpleadoLayout>
    <div class="p-6 md:p-8">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Desafíos de Bienestar</h1>
        <p class="text-gray-600 mt-1">Participa en nuestros desafíos, gana puntos y mejora tu bienestar.</p>
      </header>

      <!-- 2. Contenedor para el Skeleton Loading -->
      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Renderiza varias tarjetas de esqueleto para llenar el espacio -->
        <SkeletonCard v-for="n in 3" :key="n" />
      </div>

      <!-- 3. Contenedor para los datos reales, se muestra cuando la carga finaliza -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-if="desafios.length === 0" class="col-span-full text-center py-12">
            <p class="text-gray-500">No hay desafíos disponibles en este momento.</p>
        </div>
        <DesafioCard 
          v-for="desafio in desafios" 
          :key="desafio.id" 
          :desafio="desafio" 
        />
      </div>
    </div>
  </EmpleadoLayout>
</template>