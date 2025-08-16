<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    <!-- Sidebar -->
    <TheSidebar 
      :open="sidebarOpen" 
      @update:open="sidebarOpen = $event" 
    />
    
    <!-- Main content area -->
    <div class="lg:ml-64 flex flex-col min-h-screen">
      <!-- Header -->
      <AppHeader @toggle-sidebar="sidebarOpen = !sidebarOpen" />
      
      <!-- Main content -->
      <main class="flex-1 overflow-y-auto">
        <div class="p-6 md:p-8">
          <router-view />
        </div>
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