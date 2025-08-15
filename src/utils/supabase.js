import { createClient } from '@supabase/supabase-js'

// URL y clave pública de Supabase
const SUPABASE_URL = 'https://vrmxccuklpnysvtnmfja.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZybXhjY3VrbHBueXN2dG5tZmphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NzIwMTQsImV4cCI6MjA2MzI0ODAxNH0.e2J2o2o0Cv0-gJpTzt27pXThEg0jMSZWKOfdrCGpe2k'

// Crear una instancia única de Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export default supabase