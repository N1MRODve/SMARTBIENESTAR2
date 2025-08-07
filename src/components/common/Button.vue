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
      return 'bg-blue-700 text-white hover:bg-blue-800 focus:ring-2 focus:ring-blue-400 px-4 py-2 rounded-lg flex items-center transition font-semibold shadow-md focus:outline-none'
    case 'secondary':
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-2 focus:ring-gray-400 px-4 py-2 rounded-lg flex items-center transition font-semibold shadow-md focus:outline-none'
    case 'outline':
      return 'border border-blue-700 text-blue-700 bg-white hover:bg-blue-50 focus:ring-2 focus:ring-blue-400 px-4 py-2 rounded-lg flex items-center transition font-semibold shadow-md focus:outline-none'
    default:
      return 'px-4 py-2 rounded-lg flex items-center transition font-semibold focus:outline-none'
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