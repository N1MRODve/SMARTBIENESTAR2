<script setup>
import { onMounted, computed } from 'vue'
import { useEmpleadoStore } from '@/stores/empleado.store'
import EmpleadoLayout from '@/layouts/EmpleadoLayout.vue'
import ReservasList from '@/components/empleado/ReservasList.vue'
import SkeletonListItem from '@/components/common/SkeletonListItem.vue'

const empleadoStore = useEmpleadoStore()

// ✅ Ahora esto funciona de inmediato, porque `empleadoStore.loading.reservas` es `true` desde el principio.
const isLoading = computed(() => empleadoStore.loading.reservas)
const misReservas = computed(() => empleadoStore.misReservas)

onMounted(() => {
  empleadoStore.loadMisReservas() // Esta acción pondrá isLoading a `false` cuando termine.
})
</script>

<template>
  <EmpleadoLayout>
    <div class="p-6 md:p-8">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Mis Reservas</h1>
        <p class="text-gray-600 mt-1">Aquí puedes ver el historial de todas tus actividades.</p>
      </header>

      <!-- ✅ Este v-if ahora evalúa a `true` en la carga inicial, mostrando el skeleton -->
      <div v-if="isLoading" class="space-y-4">
        <SkeletonListItem v-for="n in 4" :key="n" />
      </div>
      
      <ReservasList v-else :reservas="misReservas" />
    </div>
  </EmpleadoLayout>
</template>