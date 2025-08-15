<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold text-gray-900">Desafíos de Bienestar</h2>
      <router-link 
        to="/empleado/desafios" 
        class="text-sm text-primary hover:text-primary-dark font-medium"
      >
        Ver todos →
      </router-link>
    </div>

    <!-- Desafíos Activos -->
    <div class="mb-8">
      <h3 class="text-lg font-medium text-gray-800 mb-4 flex items-center">
        <Trophy class="h-5 w-5 mr-2 text-yellow-500" />
        Desafíos Activos
      </h3>
      
      <div v-if="desafiosActivos.length === 0" class="text-center py-8 text-gray-500">
        <Target class="h-12 w-12 text-gray-300 mx-auto mb-3" />
        <p>No hay desafíos activos en este momento</p>
      </div>
      
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          v-for="desafio in desafiosActivos" 
          :key="desafio.id"
          class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
        >
          <div class="relative">
            <img 
              :src="desafio.imagen" 
              :alt="desafio.titulo"
              class="w-full h-32 object-cover"
            />
            <div class="absolute top-2 right-2">
              <span class="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                Activo
              </span>
            </div>
          </div>
          
          <div class="p-4">
            <h4 class="font-semibold text-gray-900 mb-2">{{ desafio.titulo }}</h4>
            <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ desafio.descripcion }}</p>
            
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs text-gray-500">
                Termina: {{ formatearFecha(desafio.fecha_fin) }}
              </span>
              <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                {{ desafio.puntos }} puntos
              </span>
            </div>
            
            <button 
              @click="apuntarseDesafio(desafio)"
              class="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors font-medium"
            >
              Apuntarse
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Desafíos Pasados (últimos 3) -->
    <div>
      <h3 class="text-lg font-medium text-gray-800 mb-4 flex items-center">
        <Clock class="h-5 w-5 mr-2 text-gray-400" />
        Desafíos Recientes
      </h3>
      
      <div v-if="desafiosPasados.length === 0" class="text-center py-6 text-gray-500">
        <p class="text-sm">No hay desafíos completados recientemente</p>
      </div>
      
      <div v-else class="space-y-3">
        <div 
          v-for="desafio in desafiosPasados.slice(0, 3)" 
          :key="desafio.id"
          class="flex items-center p-3 border border-gray-200 rounded-lg bg-gray-50"
        >
          <img 
            :src="desafio.imagen" 
            :alt="desafio.titulo"
            class="w-12 h-12 object-cover rounded-lg mr-3"
          />
          
          <div class="flex-1">
            <h4 class="font-medium text-gray-900 text-sm">{{ desafio.titulo }}</h4>
            <p class="text-xs text-gray-500">
              Completado el {{ formatearFecha(desafio.fecha_fin) }}
            </p>
          </div>
          
          <div class="text-right">
            <span class="text-xs text-gray-600">{{ desafio.puntos }} pts</span>
            <div class="flex items-center mt-1">
              <CheckCircle class="h-4 w-4 text-green-500 mr-1" />
              <span class="text-xs text-green-600 font-medium">Completado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Trophy, Target, Clock, CheckCircle } from 'lucide-vue-next';

const router = useRouter();

// Datos dummy para desafíos
const desafiosDummy = ref([
  {
    id: 1,
    titulo: "Camina 10,000 pasos diarios",
    descripcion: "Mantén un estilo de vida activo caminando al menos 10,000 pasos cada día durante una semana completa.",
    imagen: "https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg?auto=compress&cs=tinysrgb&w=400",
    puntos: 150,
    fecha_inicio: "2025-01-15T00:00:00Z",
    fecha_fin: "2025-02-15T23:59:59Z",
    estado: "activo",
    participantes: 45
  },
  {
    id: 2,
    titulo: "Meditación de 5 minutos",
    descripcion: "Dedica 5 minutos diarios a la meditación durante 2 semanas para mejorar tu bienestar mental.",
    imagen: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400",
    puntos: 100,
    fecha_inicio: "2025-01-20T00:00:00Z",
    fecha_fin: "2025-02-20T23:59:59Z",
    estado: "activo",
    participantes: 32
  },
  {
    id: 3,
    titulo: "Hidratación saludable",
    descripcion: "Bebe al menos 8 vasos de agua al día durante 10 días consecutivos para mantener una hidratación óptima.",
    imagen: "https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=400",
    puntos: 75,
    fecha_inicio: "2025-01-10T00:00:00Z",
    fecha_fin: "2025-01-25T23:59:59Z",
    estado: "activo",
    participantes: 28
  },
  {
    id: 4,
    titulo: "Descanso digital",
    descripcion: "Desconéctate de dispositivos electrónicos 1 hora antes de dormir durante una semana.",
    imagen: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400",
    puntos: 120,
    fecha_inicio: "2024-12-15T00:00:00Z",
    fecha_fin: "2024-12-30T23:59:59Z",
    estado: "completado",
    participantes: 67
  },
  {
    id: 5,
    titulo: "Alimentación consciente",
    descripcion: "Practica la alimentación consciente durante las comidas principales por 2 semanas.",
    imagen: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
    puntos: 200,
    fecha_inicio: "2024-12-01T00:00:00Z",
    fecha_fin: "2024-12-20T23:59:59Z",
    estado: "completado",
    participantes: 41
  }
]);

// Computed properties para filtrar desafíos
const desafiosActivos = computed(() => {
  const ahora = new Date();
  return desafiosDummy.value.filter(desafio => {
    const fechaFin = new Date(desafio.fecha_fin);
    return desafio.estado === 'activo' && fechaFin > ahora;
  });
});

const desafiosPasados = computed(() => {
  const ahora = new Date();
  return desafiosDummy.value.filter(desafio => {
    const fechaFin = new Date(desafio.fecha_fin);
    return desafio.estado === 'completado' || fechaFin <= ahora;
  }).sort((a, b) => new Date(b.fecha_fin) - new Date(a.fecha_fin));
});

// Métodos
const formatearFecha = (fechaString) => {
  const fecha = new Date(fechaString);
  return fecha.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

const apuntarseDesafio = (desafio) => {
  // Navegar a la vista completa del desafío
  router.push(`/empleado/desafios/${desafio.id}`);
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>