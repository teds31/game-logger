// src/hooks.server.js
// import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit'

const supabaseUrl = "https://hqnkcwitgblbebgmuocy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxbmtjd2l0Z2JsYmViZ211b2N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg0MTAxNTEsImV4cCI6MjAwMzk4NjE1MX0.DiFUyS-FDV4-3QW0yog6JFOpIk1Uzln52LLy2QIU1eo";

export const handle = async ({ event, resolve }) => {
  event.locals.supabase = createSupabaseServerClient({
    supabaseUrl: supabaseUrl,
    supabaseKey: supabaseKey,
    event,
  })

  /**
   * a little helper that is written for convenience so that instead
   * of calling `const { data: { session } } = await supabase.auth.getSession()`
   * you just call this `await getSession()`
   */
  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()
    return session
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range'
    },
  })
}