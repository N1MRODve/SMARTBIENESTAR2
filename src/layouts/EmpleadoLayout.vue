<template>
  <div class="flex h-screen bg-background">
    <!-- Sidebar -->
    <div class="w-64 flex-shrink-0">
      <EmpleadoSidebar />
    </div>

    <!-- Contenido Principal -->
    <main class="flex-1 overflow-y-auto">
      <div class="p-4 md:p-8">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import EmpleadoSidebar from './components/EmpleadoSidebar.vue';
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>