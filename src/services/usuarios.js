// Llama a la función RPC en Supabase para obtener usuarios con conteo de reservas

import { supabase } from '@/services/supabase'

export async function obtenerUsuariosConConteoReservas(idEmpresa) {
  const { data, error } = await supabase.rpc('obtener_usuarios_con_conteo_reservas', {
    id_empresa: idEmpresa
  });
  if (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
  return data;
}

// Ejemplo de uso:
// const usuarios = await obtenerUsuariosConConteoReservas('48e8bbc4-67b7-4a27-b03f-d91957d3579a');