<template>
  <AdminLayout>
    <div class="p-8 max-w-7xl mx-auto space-y-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Analítica Predictiva de Bienestar</h1>
          <p class="text-gray-600 mt-1">Anticipa problemas y prevé riesgos de burnout antes de que ocurran</p>
        </div>
        <div class="flex gap-2">
          <Button variant="primary">
            <Settings class="h-4 w-4 mr-2" />
            Configurar Alertas
          </Button>
          <Button variant="secondary">
            <Download class="h-4 w-4 mr-2" />
            Exportar Reporte
          </Button>
        </div>
      </div>

      <!-- Placeholder para contenido de analítica -->
      <div class="glass-container rounded-xl shadow-lg p-8 backdrop-blur-sm border border-white/30 text-center">
        <Brain class="h-16 w-16 text-primary mx-auto mb-4" />
        <h2 class="text-xl font-semibold text-gray-900 mb-2">Analítica Predictiva</h2>
        <p class="text-gray-600">Esta funcionalidad se implementará próximamente con toda la lógica de la demo.</p>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { Settings, Download, Brain } from 'lucide-vue-next'
import AdminLayout from '@/layouts/AdminLayout.vue'
import Button from '@/components/common/Button.vue'
</script>