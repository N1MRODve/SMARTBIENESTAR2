<template>
  <div class="min-h-screen bg-gray-50 flex">
    <TheSidebar 
      :collapsed="!sidebarOpen" 
      @toggle="sidebarOpen = !sidebarOpen"
    />
    
    <div 
      class="flex-1 flex flex-col min-h-screen transition-all duration-300"
      :class="sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'"
    >
      <TheHeader />
      
      <main class="flex-1 p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TheSidebar from '@/layouts/TheSidebar.vue';
import TheHeader from '@/layouts/TheHeader.vue';

const sidebarOpen = ref(true);
</script>