<template>
  <button
    type="button"
    class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
// No requiere lógica adicional
</script>

<style scoped>
/* Puedes personalizar aún más si lo necesitas */
</style>