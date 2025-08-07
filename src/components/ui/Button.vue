<template>
  <button
    :class="buttonClasses"
    v-bind="$attrs"
    :aria-label="ariaLabel"
  >
    <span v-if="icon" class="mr-2 flex items-center">
      <component
        :is="icon"
        class="w-5 h-5"
        :class="iconClasses"
        aria-hidden="true"
      />
    </span>
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'primary' },
  icon: { type: [Object, Function, String], default: null },
  ariaLabel: { type: String, default: '' }
})

// Clases base para todos los botones
const baseClasses = 'px-4 py-2 rounded-lg font-semibold flex items-center transition focus:outline-none focus:ring-2 focus:ring-offset-2'

// Clases por variante
const variantClasses = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400 shadow-md',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 shadow',
  outline: 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-400',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-400 shadow-md'
}

const buttonClasses = computed(() => {
  return `${baseClasses} ${variantClasses[props.variant] || variantClasses.primary}`
})

// El icono hereda el color del texto (currentColor) para accesibilidad
const iconClasses = computed(() => {
  // Si usas SVGs con currentColor, no necesitas clases extra
  // Pero si necesitas forzar el color, puedes hacerlo aquí:
  if (props.variant === 'primary' || props.variant === 'danger') return 'text-white'
  if (props.variant === 'outline') return 'text-blue-600'
  return 'text-gray-800'
})
</script>