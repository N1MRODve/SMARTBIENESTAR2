<template>
  <div class="stats-card">
    <h3>{{ title }}</h3>
    <p>{{ value }}</p>
    <p v-if="description">{{ description }}</p>
    <Button v-if="link" :to="link" variant="primary" size="sm">Ver detalle</Button>
  </div>
</template>

<script setup>
import Button from '@/components/common/Button.vue'

defineProps({
  title: String,
  value: [String, Number],
  description: String,
  link: [String, Object]
})
</script>

<style scoped>
.stats-card {
  @apply bg-white rounded-lg shadow p-4 flex flex-col items-start transition;
}

.stats-card:hover {
  @apply bg-gray-50;
}

.stats-card h3 {
  @apply text-lg font-semibold text-gray-800;
}

.stats-card p {
  @apply text-sm text-gray-500 mb-3;
}

.stats-card .value {
  @apply text-3xl font-bold text-primary mb-1;
}

.stats-card .btn {
  @apply mt-auto;
}
</style>