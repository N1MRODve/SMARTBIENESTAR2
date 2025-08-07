<template>
  <div class="relative inline-block">
    <div @click="toggleDropdown" class="cursor-pointer select-none" ref="buttonRef">
      <slot name="button">
        <!-- Icono kebab por defecto -->
        <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="5" cy="12" r="2"/>
          <circle cx="12" cy="12" r="2"/>
          <circle cx="19" cy="12" r="2"/>
        </svg>
      </slot>
    </div>
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50"
      ref="menuRef"
    >
      <slot name="menu">
        <slot />
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
const isOpen = ref(false)
const buttonRef = ref(null)
const menuRef = ref(null)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function handleClickOutside(event) {
  if (
    isOpen.value &&
    menuRef.value &&
    !menuRef.value.contains(event.target) &&
    buttonRef.value &&
    !buttonRef.value.contains(event.target)
  ) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<style scoped>
/* Puedes ajustar el ancho y sombra si lo necesitas */
</style>