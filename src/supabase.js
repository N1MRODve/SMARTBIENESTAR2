import { createClient } from '@supabase/supabase-js';

// SOLUCIÓN TEMPORAL: Hardcodear las credenciales (solo para desarrollo)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 
  'https://vrmxccuklpnysvtnmfja.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY || 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZybXhjY3VrbHBueXN2dG5tZmphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NzIwMTQsImV4cCI6MjA2MzI0ODAxNH0.e2J2o2o0Cv0-gJpTzt27pXThEg0jMSZWKOfdrCGpe2k'

// Inicialización del cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);