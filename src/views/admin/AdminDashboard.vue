<template>
  <div class="space-y-8">
    <!-- Menú de navegación -->
    <nav class="bg-white shadow rounded-xl mb-6 px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-6">
        <router-link
          to="/admin/dashboard"
          class="text-primary font-semibold hover:underline"
          active-class="underline"
        >
          Dashboard
        </router-link>
        <router-link
          to="/admin/empleados"
          class="text-gray-700 hover:text-primary"
          active-class="text-primary font-semibold underline"
        >
          Empleados
        </router-link>
        <router-link
          to="/admin/servicios"
          class="text-gray-700 hover:text-primary"
          active-class="text-primary font-semibold underline"
        >
          Servicios
        </router-link>
        <router-link
          to="/admin/clases"
          class="text-gray-700 hover:text-primary"
          active-class="text-primary font-semibold underline"
        >
          Clases
        </router-link>
        <router-link
          to="/admin/encuestas"
          class="text-gray-700 hover:text-primary"
          active-class="text-primary font-semibold underline"
        >
          Encuestas
        </router-link>
        <router-link
          to="/admin/ranking"
          class="text-gray-700 hover:text-primary"
          active-class="text-primary font-semibold underline"
        >
          Ranking
        </router-link>
      </div>
      <div>
        <button @click="logout" class="text-sm text-red-600 hover:underline">
          Cerrar sesión
        </button>
      </div>
    </nav>

    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Panel de Administración</h1>
      <p class="mt-1 text-sm text-gray-500">
        Bienvenido, aquí puedes gestionar encuestas y ver la actividad de tu empresa.
      </p>
    </div>

    <!-- Estadísticas -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatsCard
        title="Usuarios conectados"
        :value="stats.usuariosConectados"
        icon="Users"
        trend="up"
      />
      <StatsCard
        title="Clases reservadas"
        :value="stats.clasesReservadas"
        icon="Calendar"
        trend="neutral"
      />
      <StatsCard
        title="Encuestas enviadas"
        :value="stats.encuestasEnviadas"
        icon="ClipboardList"
        trend="neutral"
      />
    </div>

    <!-- Ranking de empleados -->
    <div>
      <h2 class="text-lg font-semibold text-gray-900 mb-4">
        Ranking de empleados más activos
      </h2>
      <DataTable
        title="Ranking de empleados más activos"
        :columns="[
          { key: 'nombre', header: 'Empleado' },
          { key: 'clases', header: 'Clases Reservadas' },
          { key: 'conexiones', header: 'Conexiones' }
        ]"
        :data="rankingEmpleados"
        :searchable="false"
        :pagination="false"
      />
    </div>

    <!-- Crear y enviar encuesta -->
    <div class="mt-8">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">
        Crear y enviar encuesta
      </h2>
      <button
        class="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
        @click="crearEncuesta"
      >
        Crear nueva encuesta
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import { supabase } from '../../services/supabase';
import StatsCard from '../../components/common/StatsCard.vue';
import DataTable from '../../components/common/DataTable.vue';

const router = useRouter();
const authStore = useAuthStore();

const stats = ref({
  usuariosConectados: 0,
  clasesReservadas: 0,
  encuestasEnviadas: 0
});

const rankingEmpleados = ref([]);

const loadDashboardData = async () => {
  try {
    // Suponiendo que tienes el id de la empresa en el usuario autenticado
    const empresaId = authStore.user?.empresa_id;

    // Usuarios conectados de la empresa (ejemplo: usuarios con última conexión hoy)
    const { count: usuariosConectados } = await supabase
      .from('usuarios')
      .select('*', { count: 'exact', head: true })
      .eq('empresa_id', empresaId)
      .gte('ultima_conexion', new Date().toISOString().split('T')[0]);

    // Total de clases reservadas por empleados de la empresa
    const { count: clasesReservadas } = await supabase
      .from('reservas')
      .select('*', { count: 'exact', head: true })
      .eq('empresa_id', empresaId);

    // Total de encuestas enviadas por el admin de la empresa
    const { count: encuestasEnviadas } = await supabase
      .from('encuestas')
      .select('*', { count: 'exact', head: true })
      .eq('empresa_id', empresaId);

    // Ranking de empleados más activos (ejemplo: por cantidad de clases reservadas)
    const { data: ranking } = await supabase
      .from('usuarios')
      .select('id, nombre, apellido, reservas(count), conexiones')
      .eq('empresa_id', empresaId)
      .order('reservas.count', { ascending: false })
      .limit(10);

    rankingEmpleados.value = (ranking || []).map(e => ({
      nombre: `${e.nombre} ${e.apellido}`,
      clases: e.reservas?.count || 0,
      conexiones: e.conexiones || 0
    }));

    stats.value = {
      usuariosConectados: usuariosConectados || 0,
      clasesReservadas: clasesReservadas || 0,
      encuestasEnviadas: encuestasEnviadas || 0
    };
  } catch (error) {
    console.error('Error loading dashboard data:', error);
  }
};

const crearEncuesta = () => {
  router.push('/admin/encuestas/crear');
};

const logout = async () => {
  await authStore.logout();
  router.push('/login');
};

onMounted(() => {
  loadDashboardData();
});
</script>