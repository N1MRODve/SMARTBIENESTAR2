<template>
  <AdminLayout>
    <div class="p-8 max-w-7xl mx-auto space-y-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Gestión de Horarios</h1>
          <p class="text-gray-600 mt-1">Administra sesiones, reservas y ocupación de clases</p>
        </div>
        <Button variant="primary">
          <Plus class="h-4 w-4 mr-2" />
          Nueva Sesión
        </Button>
      </div>

      <!-- Placeholder para contenido de horarios -->
      <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30 text-center">
        <Calendar class="h-16 w-16 text-primary mx-auto mb-4" />
        <h2 class="text-xl font-semibold text-gray-900 mb-2">Gestión de Horarios</h2>
        <p class="text-gray-600">Esta funcionalidad se implementará próximamente con toda la lógica de la demo.</p>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { Plus, Calendar } from 'lucide-vue-next'
import AdminLayout from '@/layouts/AdminLayout.vue'
import Button from '@/components/common/Button.vue'
</script>