import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client public (lecture seule après RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Client admin (contourne RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})