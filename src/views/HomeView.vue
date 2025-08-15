<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16 px-8 text-center">
      <h1 class="text-4xl font-bold mb-4">Bienestar Corporativo Inteligente</h1>
      <p class="text-lg mb-6">
        Transformamos el entorno laboral con soluciones de bienestar personalizadas para tus empleados.
      </p>
      <Button @click="irALogin" variant="primary" class="px-6 py-3 text-lg">
        Acceder a mi cuenta
      </Button>
    </section>

    <!-- Features Section -->
    <section class="features py-16 px-8">
      <h2 class="text-3xl font-bold text-center mb-8">¿Qué ofrecemos?</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="card bg-white shadow-md rounded-lg p-6 text-center">
          <h3 class="text-xl font-semibold mb-2">Yoga</h3>
          <p class="text-gray-600">Clases de yoga para mejorar la flexibilidad y reducir el estrés.</p>
        </div>
        <div class="card bg-white shadow-md rounded-lg p-6 text-center">
          <h3 class="text-xl font-semibold mb-2">Meditación</h3>
          <p class="text-gray-600">Sesiones guiadas para fomentar la calma y la concentración.</p>
        </div>
        <div class="card bg-white shadow-md rounded-lg p-6 text-center">
          <h3 class="text-xl font-semibold mb-2">Nutrición</h3>
          <p class="text-gray-600">Asesoramiento nutricional para una vida más saludable.</p>
        </div>
        <div class="card bg-white shadow-md rounded-lg p-6 text-center">
          <h3 class="text-xl font-semibold mb-2">Coaching</h3>
          <p class="text-gray-600">Sesiones de coaching para el desarrollo personal y profesional.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Button from '@/components/common/Button.vue'

const router = useRouter()

function irALogin() {
  router.push('/login')
}
</script>

<style scoped>
.hero {
  background: linear-gradient(to right, #3b82f6, #6366f1);
}
.features .card {
  border: 1px solid #e5e7eb;
  transition: transform 0.2s ease-in-out;
}
.features .card:hover {
  transform: translateY(-5px);
}
</style>