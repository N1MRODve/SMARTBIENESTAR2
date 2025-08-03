<template>
  <AdminLayout>
    <template #default>
      <div class="p-6">
        <h1 class="text-2xl font-semibold mb-6">Servicios contratados</h1>
        <div v-if="loading" class="text-gray-500">Cargando servicios...</div>
        <div v-else>
          <div v-if="serviciosContratados.length === 0" class="text-gray-600">
            No hay servicios contratados para tu empresa.
          </div>
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="servicio in serviciosContratados"
              :key="servicio.id"
              class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden"
            >
              <img
                v-if="servicio.detalle_servicio?.imagen_url"
                :src="servicio.detalle_servicio.imagen_url"
                alt="Imagen del servicio"
                class="w-full h-40 object-cover"
              />
              <div class="flex-1 flex flex-col p-6">
                <h2 class="text-xl font-bold mb-2 text-primary">
                  {{ servicio.detalle_servicio?.nombre || servicio.tipo_servicio }}
                </h2>
                <p class="text-gray-700 mb-3 line-clamp-3">
                  {{ servicio.detalle_servicio?.descripcion || 'Sin descripción' }}
                </p>
                <div class="text-sm text-gray-500 mb-2">
                  <span>Desde: {{ servicio.fecha_inicio?.slice(0,10) }}</span>
                  <span v-if="servicio.fecha_fin"> | Hasta: {{ servicio.fecha_fin.slice(0,10) }}</span>
                </div>
                <span
                  class="self-start px-3 py-1 rounded-full text-xs font-semibold"
                  :class="servicio.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                >
                  {{ servicio.activo ? 'Activo' : 'Inactivo' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { supabase } from '@/services/supabase';

const authStore = useAuthStore();
const serviciosContratados = ref([]);
const loading = ref(true);

const cargarServiciosContratados = async () => {
  loading.value = true;
  const empresaId = authStore.user?.empresa_id;
  if (!empresaId) {
    serviciosContratados.value = [];
    loading.value = false;
    return;
  }

  // 1. Trae los servicios contratados
  const { data: contratados } = await supabase
    .from('servicios_contratados')
    .select('*')
    .eq('empresa_id', empresaId);

  // 2. Trae el catálogo de servicios (incluye id)
  const { data: catalogo } = await supabase
    .from('servicios')
    .select('id, nombre, descripcion, imagen_url');

  // 3. Une los datos por id
  serviciosContratados.value = (contratados || []).map(sc => {
    const detalle = (catalogo || []).find(
      s => s.id && sc.tipo_servicio && s.id === sc.tipo_servicio
    );
    return {
      ...sc,
      detalle_servicio: detalle || {}
    };
  });

  loading.value = false;
};

onMounted(() => {
  cargarServiciosContratados();
});
</script>