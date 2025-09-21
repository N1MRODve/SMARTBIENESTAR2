<template>
  <div class="p-4 md:p-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Perfil de la Empresa</h1>

    <!-- Estado de Carga -->
    <div v-if="isLoading" class="text-center py-20">
      <p class="text-gray-500">Cargando perfil de la empresa...</p>
    </div>

    <!-- Formulario Principal -->
    <form v-else @submit.prevent="handleSaveChanges" class="space-y-10">
      
      <!-- Sección de Información General -->
      <div class="bg-white p-8 rounded-2xl shadow-lg">
        <h2 class="text-xl font-semibold mb-6">Información General</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Nombre de la Empresa -->
          <div>
            <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre de la Empresa</label>
            <input type="text" id="nombre" v-model="empresa.nombre" disabled class="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 cursor-not-allowed focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
          </div>

          <!-- Sitio Web -->
          <div>
            <label for="sitio_web" class="block text-sm font-medium text-gray-700">Sitio Web</label>
            <input type="url" id="sitio_web" v-model="empresa.sitio_web" placeholder="https://www.ejemplo.com" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
          </div>

          <!-- Descripción -->
          <div class="md:col-span-2">
            <label for="descripcion" class="block text-sm font-medium text-gray-700">Descripción de la Empresa</label>
            <textarea id="descripcion" v-model="empresa.descripcion" rows="3" placeholder="Una breve descripción de lo que hace su empresa." class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
          </div>
        </div>
      </div>

      <!-- Sección de Detalles y Contacto -->
      <div class="bg-white p-8 rounded-2xl shadow-lg">
        <h2 class="text-xl font-semibold mb-6">Detalles y Contacto</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Sector -->
          <div>
            <label for="sector" class="block text-sm font-medium text-gray-700">Sector</label>
            <select id="sector" v-model="empresa.sector" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              <option disabled value="">Seleccione un sector</option>
              <option v-for="s in sectores" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>

          <!-- Número de Empleados -->
          <div>
            <label for="numero_empleados" class="block text-sm font-medium text-gray-700">Número de Empleados</label>
            <select id="numero_empleados" v-model="empresa.numero_empleados" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              <option disabled value="">Seleccione un rango</option>
              <option v-for="r in rangosEmpleados" :key="r" :value="r">{{ r }}</option>
            </select>
          </div>

          <!-- País -->
          <div>
            <label for="pais" class="block text-sm font-medium text-gray-700">País</label>
            <input type="text" id="pais" v-model="empresa.pais" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
          </div>

          <!-- Teléfono -->
          <div>
            <label for="telefono" class="block text-sm font-medium text-gray-700">Teléfono</label>
            <input type="tel" id="telefono" v-model="empresa.telefono" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
          </div>

          <!-- Nombre de Contacto -->
          <div>
            <label for="nombre_contacto" class="block text-sm font-medium text-gray-700">Nombre del Contacto Principal</label>
            <input type="text" id="nombre_contacto" v-model="empresa.nombre_contacto" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
          </div>

          <!-- Email de Contacto -->
          <div>
            <label for="email_contacto" class="block text-sm font-medium text-gray-700">Email del Contacto Principal</label>
            <input type="email" id="email_contacto" v-model="empresa.email_contacto" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
          </div>
        </div>
      </div>

      <!-- Sección del Logo -->
      <div class="bg-white p-8 rounded-2xl shadow-lg">
        <h2 class="text-xl font-semibold mb-6">Logo de la Empresa</h2>
        <div class="flex items-center gap-8">
          <img :src="empresa.logo_url || 'https://via.placeholder.com/150'" alt="Logo de la empresa" class="h-24 w-24 rounded-full object-cover bg-gray-100">
          <div>
            <input type="file" @change="handleLogoUpload" accept="image/*" ref="logoInput" class="hidden">
            <button type="button" @click="triggerLogoUpload" :disabled="isUploadingLogo" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              {{ isUploadingLogo ? 'Subiendo...' : 'Cambiar Logo' }}
            </button>
            <p class="text-xs text-gray-500 mt-2">PNG, JPG, GIF hasta 2MB.</p>
          </div>
        </div>
      </div>

      <!-- Botón de Guardar -->
      <div class="flex justify-end">
        <button type="submit" :disabled="isSaving" class="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 disabled:opacity-50">
          {{ isSaving ? 'Guardando...' : 'Guardar Cambios' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/services/supabase'
import { useAuthStore } from '@/stores/auth.store'
import { useToast } from 'primevue/usetoast'

const authStore = useAuthStore()
const toast = useToast()

const isLoading = ref(true)
const isSaving = ref(false)
const isUploadingLogo = ref(false)
const logoInput = ref(null)

const empresa = ref({
  nombre: '',
  sitio_web: '',
  descripcion: '',
  sector: '',
  numero_empleados: '',
  pais: '',
  telefono: '',
  nombre_contacto: '',
  email_contacto: '',
  logo_url: ''
})

// Opciones para los selectores (deben coincidir con los ENUMs de la DB)
const sectores = ['Tecnología', 'Salud', 'Finanzas', 'Educación', 'Retail', 'Manufactura', 'Consultoría', 'Gobierno', 'Sin fines de lucro', 'Otro']
const rangosEmpleados = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1001+']

onMounted(async () => {
  const empresaId = authStore.empresaId
  if (!empresaId) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo identificar la empresa.', life: 3000 })
    isLoading.value = false
    return
  }

  try {
    const { data, error } = await supabase
      .from('empresas')
      .select('*')
      .eq('id', empresaId)
      .single()

    if (error) throw error
    if (data) {
      empresa.value = data
    }
  } catch (err) {
    console.error("Error cargando el perfil de la empresa:", err)
    toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo cargar el perfil.', life: 3000 })
  } finally {
    isLoading.value = false
  }
})

const handleSaveChanges = async () => {
  isSaving.value = true; // 1. Deshabilita el botón y muestra "Guardando..."
  try {
    const { error } = await supabase
      .from('empresas')
      .update({
        // 2. Envía los datos del formulario a Supabase
        sitio_web: empresa.value.sitio_web,
        descripcion: empresa.value.descripcion,
        sector: empresa.value.sector,
        numero_empleados: empresa.value.numero_empleados,
        pais: empresa.value.pais,
        telefono: empresa.value.telefono,
        nombre_contacto: empresa.value.nombre_contacto,
        email_contacto: empresa.value.email_contacto
      })
      .eq('id', authStore.empresaId); // Para la empresa correcta

    if (error) throw error; // Si hay un error, salta al 'catch'

    // 3. Si todo va bien, muestra la notificación de éxito
    toast.add({ severity: 'success', summary: 'Éxito', detail: 'Perfil de la empresa actualizado.', life: 3000 });

  } catch (err) {
    // 4. Si algo falla, muestra una notificación de error
    console.error("Error guardando el perfil:", err);
    toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo guardar el perfil.', life: 3000 });
  } finally {
    isSaving.value = false; // 5. Vuelve a habilitar el botón
  }
};

const triggerLogoUpload = () => {
  logoInput.value.click()
}

const handleLogoUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  isUploadingLogo.value = true
  try {
    const fileExt = file.name.split('.').pop()
    const filePath = `public/${authStore.empresaId}/logo.${fileExt}`

    // Subir el archivo a Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('logos-empresas') // Asegúrate de que este bucket exista y sea público
      .upload(filePath, file, { upsert: true })

    if (uploadError) throw uploadError

    // Obtener la URL pública del archivo subido
    const { data: urlData } = supabase.storage
      .from('logos-empresas')
      .getPublicUrl(filePath)

    const publicUrl = urlData.publicUrl

    // Actualizar la URL en la tabla 'empresas'
    const { error: dbError } = await supabase
      .from('empresas')
      .update({ logo_url: publicUrl })
      .eq('id', authStore.empresaId)

    if (dbError) throw dbError

    empresa.value.logo_url = publicUrl
    toast.add({ severity: 'success', summary: 'Éxito', detail: 'Logo actualizado.', life: 3000 })

  } catch (err) {
    console.error("Error subiendo el logo:", err)
    toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo subir el logo.', life: 3000 })
  } finally {
    isUploadingLogo.value = false
  }
}
</script>