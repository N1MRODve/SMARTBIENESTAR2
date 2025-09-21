import { createClient } from '@supabase/supabase-js'

// Lee las variables de entorno de Vite usando import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Crear una instancia única de Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase