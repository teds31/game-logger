// src/routes/+layout.js
// import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit'

const supabaseUrl = "https://hqnkcwitgblbebgmuocy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxbmtjd2l0Z2JsYmViZ211b2N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg0MTAxNTEsImV4cCI6MjAwMzk4NjE1MX0.DiFUyS-FDV4-3QW0yog6JFOpIk1Uzln52LLy2QIU1eo";

export const load = async ({ fetch, data, depends }) => {
  depends('supabase:auth')

  const supabase = createSupabaseLoadClient({
    supabaseUrl: supabaseUrl,
    supabaseKey: supabaseKey,
    event: { fetch },
    serverSession: data.session,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return { supabase, session }
}