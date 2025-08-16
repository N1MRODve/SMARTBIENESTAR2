<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    <!-- Mobile overlay -->
    <div
      v-show="sidebarOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
      @click="sidebarOpen = false"
    />
    
    <!-- Sidebar -->
    <TheSidebar 
      :open="sidebarOpen" 
      @update:open="sidebarOpen = $event" 
    />
    
    <!-- Main content area with proper margin for sidebar -->
    <div class="lg:ml-64 flex flex-col min-h-screen">
      <!-- Header -->
      <AppHeader @toggle-sidebar="sidebarOpen = !sidebarOpen" />
      
      <!-- Main content -->
      <main class="flex-1 p-6 md:p-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TheSidebar from '@/components/layout/TheSidebar.vue';
import AppHeader from '@/components/layout/AppHeader.vue';

const sidebarOpen = ref(false);
</script>