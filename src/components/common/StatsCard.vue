```vue
<template>
  <div class="glass-card rounded-xl shadow-lg p-6 border border-white/20 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <h3 class="text-sm font-medium text-gray-600">{{ title }}</h3>
        <div class="mt-2 flex items-baseline">
          <p class="text-3xl font-bold text-gray-900">{{ value }}</p>
          <p v-if="trend" :class="[
            'ml-2 text-sm',
            trend === 'up' ? 'text-green-600' : 
            trend === 'down' ? 'text-red-600' : 
            'text-gray-500'
          ]">
            {{ getTrendText }}
          </p>
        </div>
        <p v-if="description" class="mt-2 text-sm text-gray-600">{{ description }}</p>
      </div>
      
      <div v-if="icon" class="p-3 bg-primary/10 rounded-full">
        <component 
          :is="icon" 
          class="h-7 w-7 text-primary"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import * as LucideIcons from 'lucide-vue-next';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [Number, String],
    required: true
  },
  trend: {
    type: String,
    default: null,
    validator: (value) => ['up', 'down', 'neutral', null].includes(value)
  },
  description: {
    type: String,
    default: null
  },
  icon: {
    type: [String, Object],
    default: null,
    validator: (value) => {
      if (typeof value === 'string') {
        return value in LucideIcons;
      }
      return true;
    }
  }
});

const getTrendText = computed(() => {
  switch (props.trend) {
    case 'up':
      return '+10%';
    case 'down':
      return '-10%';
    case 'neutral':
      return '0%';
    default:
      return '';
  }
});
</script>
```