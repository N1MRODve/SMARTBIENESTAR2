<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex">
    <!-- Demo Sidebar -->
    <DemoSidebar 
      :open="sidebarOpen" 
      @update:open="sidebarOpen = $event"
      demo-type="admin"
    />
    
    <!-- Main content area -->
    <div class="flex-1 flex flex-col min-h-screen">
      <!-- Demo Header -->
      <DemoHeader 
        @toggle-sidebar="sidebarOpen = !sidebarOpen"
        demo-type="admin"
      />
      
      <!-- Main content -->
      <main class="flex-1 p-6 md:p-8">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DemoSidebar from '@/components/demo/DemoSidebar.vue';
import DemoHeader from '@/components/demo/DemoHeader.vue';

const sidebarOpen = ref(false);
</script>