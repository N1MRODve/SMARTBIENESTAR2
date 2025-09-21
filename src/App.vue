<script setup>
// La lógica de inicialización de la sesión y los stores dependientes
// se ha centralizado en el guardián de navegación de Vue Router (`src/router/index.js`).
// Esto asegura que la autenticación se verifica antes de cargar cualquier ruta protegida,
// evitando redundancias y posibles race conditions.
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" v-if="Component" />
      <div v-else class="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
    </transition>
  </router-view>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
