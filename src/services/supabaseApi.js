// Servicio global para construir URLs de Supabase REST API con filtros

export function buildSupabaseUrl({ table, filters = {}, select = '*' }) {
  const baseUrl = `https://vrmxccuklpnysvtnmfja.supabase.co/rest/v1/${table}`;
  const params = [`select=${encodeURIComponent(select)}`];

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.push(`${key}=eq.${encodeURIComponent(value)}`);
    }
  });

  return `${baseUrl}?${params.join('&')}`;
}

// Ejemplo de uso:
// import { buildSupabaseUrl } from '@/services/supabaseApi'
// const url = buildSupabaseUrl({
//   table: 'encuestas',
//   filters: { empresa_id: '48e8bbc4-67b7-4a27-b03f-d91957d3579a' },
//   select: '*'
// });