<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
    @click.self="close"
  >
    <div class="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative">
      <button
        class="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        @click="close"
        aria-label="Cerrar"
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <slot />
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['close'])
function close() {
  emit('close')
}
</script>