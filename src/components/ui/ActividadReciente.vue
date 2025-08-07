<template>
  <div class="bg-white rounded-lg shadow p-4">
    <h3 class="text-lg font-semibold mb-2">Actividad Reciente</h3>
    <ul>
      <slot>
        <!-- Aquí puedes mostrar la lista de actividad reciente -->
        <li class="text-gray-400 text-sm">[Sin actividad reciente]</li>
      </slot>
    </ul>
  </div>
</template>

<script setup>
// Puedes agregar props si necesitas mostrar datos específicos
</script>