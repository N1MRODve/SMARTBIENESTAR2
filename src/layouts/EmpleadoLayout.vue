<script setup>
import { ref } from 'vue'
import TheSidebar from './TheSidebar.vue'
// Asumo que tienes un componente TheHeader, si no, puedes quitarlo.
import TheHeader from './TheHeader.vue' 

const collapsed = ref(false)

function toggleSidebar() {
  collapsed.value = !collapsed.value
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- El Sidebar ahora tiene una posición fija -->
    <TheSidebar 
      :collapsed="collapsed" 
      @toggle="toggleSidebar" 
    />
    
    <!-- El contenido principal tiene un margen que coincide con el ancho del sidebar -->
    <div 
      class="flex flex-col flex-1 transition-all duration-300"
      :class="{ 'ml-64': !collapsed, 'ml-20': collapsed }"
    >
      <TheHeader />
      <main class="flex-1 p-6 md:p-8">
        <slot />
      </main>
    </div>
  </div>
</template>