<template>
  <AdminLayout>
    <div class="p-8 max-w-4xl mx-auto space-y-8">
      <div class="flex items-center mb-8">
        <button 
          @click="$router.back()"
          class="flex items-center text-primary hover:text-primary-dark mr-6 transition-colors"
        >
          <ArrowLeft class="h-4 w-4 mr-2" />
          Volver
        </button>
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Crear Nuevo Desafío</h1>
          <p class="text-gray-600 mt-1">Diseña un desafío para motivar a tus empleados</p>
        </div>
      </div>

      <!-- Placeholder para formulario de desafío -->
      <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30 text-center">
        <Trophy class="h-16 w-16 text-primary mx-auto mb-4" />
        <h2 class="text-xl font-semibold text-gray-900 mb-2">Crear Desafío</h2>
        <p class="text-gray-600">Esta funcionalidad se implementará próximamente con toda la lógica de la demo.</p>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ArrowLeft, Trophy } from 'lucide-vue-next'
import AdminLayout from '@/layouts/AdminLayout.vue'
</script>