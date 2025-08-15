<script setup>
import { ref } from 'vue'

// Datos de ejemplo para vincular al formulario
const perfil = ref({
  nombre: 'Ana',
  apellido: 'García',
  cargo: 'Diseñadora UX/UI',
  direccion: 'Calle Ficticia 123, Ciudad Ejemplo',
  bio: 'Apasionada por crear experiencias de usuario intuitivas y el bienestar en el trabajo. En mi tiempo libre, practico yoga y senderismo.',
  avatarUrl: 'https://via.placeholder.com/150' // URL de un avatar de placeholder
})

// Ref para el input de archivo oculto
const fileInput = ref(null)

// Función para disparar el click del input de archivo
function triggerFileInput() {
  fileInput.value.click()
}

// Función placeholder para manejar la selección de archivo
function onFileSelected(event) {
  const file = event.target.files[0]
  if (file) {
    // Lógica para previsualizar y subir la imagen (se implementará más adelante)
    console.log('Archivo seleccionado:', file.name)
    perfil.value.avatarUrl = URL.createObjectURL(file)
  }
}
</script>

<template>
  <!-- 1. Contenedor Principal (Card) -->
  <div class="bg-white rounded-lg shadow-md p-6 md:p-8">
    <form @submit.prevent>
      <!-- 2. Sección de Foto de Perfil -->
      <div class="flex flex-col items-center mb-8">
        <img :src="perfil.avatarUrl" alt="Foto de perfil" class="w-24 h-24 rounded-full object-cover mb-4">
        <input 
          type="file" 
          ref="fileInput" 
          @change="onFileSelected" 
          class="hidden" 
          accept="image/*"
        >
        <button 
          @click="triggerFileInput"
          type="button"
          class="text-sm font-medium text-primary hover:text-primary-dark"
        >
          Cambiar foto
        </button>
      </div>

      <!-- 3. Campos del Formulario -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Nombre -->
        <div>
          <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre</label>
          <input 
            v-model="perfil.nombre"
            type="text" 
            id="nombre" 
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          >
        </div>
        <!-- Apellido -->
        <div>
          <label for="apellido" class="block text-sm font-medium text-gray-700">Apellido</label>
          <input 
            v-model="perfil.apellido"
            type="text" 
            id="apellido" 
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          >
        </div>
        <!-- Cargo -->
        <div class="md:col-span-2">
          <label for="cargo" class="block text-sm font-medium text-gray-700">Cargo</label>
          <input 
            v-model="perfil.cargo"
            type="text" 
            id="cargo" 
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          >
        </div>
        <!-- Dirección -->
        <div class="md:col-span-2">
          <label for="direccion" class="block text-sm font-medium text-gray-700">Dirección</label>
          <input 
            v-model="perfil.direccion"
            type="text" 
            id="direccion" 
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          >
        </div>
        <!-- Biografía -->
        <div class="md:col-span-2">
          <label for="bio" class="block text-sm font-medium text-gray-700">Biografía</label>
          <textarea 
            v-model="perfil.bio"
            id="bio" 
            rows="4"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          ></textarea>
        </div>
      </div>

      <!-- 4. Botón de Acción -->
      <div class="mt-8 text-right">
        <button 
          type="submit"
          class="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary-dark transition-colors"
        >
          Guardar Cambios
        </button>
      </div>
    </form>
  </div>
</template>