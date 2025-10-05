import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL || ""
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE || ""

export function getSupabaseServer() {
  if (!supabaseUrl || !supabaseServiceRole) return null
  return createClient(supabaseUrl, supabaseServiceRole, {
    auth: { persistSession: false },
  })
}


