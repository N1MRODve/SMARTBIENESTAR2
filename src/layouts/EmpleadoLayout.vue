```vue
<template>
  <div class="min-h-screen bg-gray-50">
    <TheSidebar v-model:open="sidebarOpen" />
    
    <div class="lg:ml-64 flex flex-col min-h-screen">
      <TheHeader @toggle-sidebar="sidebarOpen = !sidebarOpen" />
      
      <main class="flex-1 p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TheSidebar from '../components/layout/TheSidebar.vue';
import TheHeader from '../components/layout/TheHeader.vue';

const sidebarOpen = ref(false);
</script>

<template>
  <EmpleadoLayout>
    <h1>Próximas Actividades</h1>
    <p>
      Explora y apúntate a las sesiones de bienestar disponibles para ti en los próximos días.
    </p>
    <div>
      <!-- Aquí se mostrarán las actividades disponibles -->
    </div>
  </EmpleadoLayout>
</template>

<script setup>
import EmpleadoLayout from '@/layouts/EmpleadoLayout.vue';
</script>
```