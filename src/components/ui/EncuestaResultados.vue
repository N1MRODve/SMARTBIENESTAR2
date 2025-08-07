<template>
  <div class="bg-white rounded-lg shadow p-4">
    <h3 class="text-lg font-semibold mb-2">Resultados de la Encuesta</h3>
    <div>
      <slot>
        <!-- Aquí puedes mostrar los resultados de la encuesta -->
        <div class="text-gray-400 text-sm">[Resultados aquí]</div>
      </slot>
    </div>
  </div>
</template>

<script setup>
// Puedes agregar props si necesitas mostrar datos específicos
</script>