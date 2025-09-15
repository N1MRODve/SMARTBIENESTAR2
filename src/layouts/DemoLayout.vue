<script setup>
import DemoSidebar from '@/components/demo/DemoSidebar.vue'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    <DemoSidebar />
    <!-- Deja espacio para el sidebar fijo -->
    <main class="ml-64 min-h-screen p-6 md:p-8 transition-all duration-300">
      <slot />
    </main>
  </div>
</template>