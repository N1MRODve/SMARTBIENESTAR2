```vue
<template>
  <button
    :class="buttonClasses"
    v-bind="$attrs"
    :aria-label="ariaLabel"
  >
    <span v-if="icon" class="mr-2 flex items-center">
      <component
        :is="icon"
        :class="iconClasses"
        class="w-5 h-5"
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

const buttonClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'glass-button-primary text-white hover:bg-blue-600/90 focus:ring-2 focus:ring-blue-400 px-4 py-2 rounded-xl flex items-center transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none backdrop-blur-sm border border-blue-500/30'
    case 'secondary':
      return 'glass-button-secondary text-gray-800 hover:bg-gray-200/80 focus:ring-2 focus:ring-gray-400 px-4 py-2 rounded-xl flex items-center transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none backdrop-blur-sm border border-gray-300/50'
    case 'outline':
      return 'glass-button-outline text-blue-700 bg-white/60 hover:bg-blue-50/80 focus:ring-2 focus:ring-blue-400 px-4 py-2 rounded-xl flex items-center transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none backdrop-blur-sm border border-blue-300/50'
    default:
      return 'px-4 py-2 rounded-xl flex items-center transition-all duration-300 font-semibold focus:outline-none backdrop-blur-sm'
  }
})

const iconClasses = computed(() => {
  if (props.variant === 'primary') {
    return 'text-white'
  }
  if (props.variant === 'outline') {
    return 'text-blue-700'
  }
  // secondary y otros
  return 'text-gray-800'
})
</script>
```