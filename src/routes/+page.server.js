  import { supabase } from "$lib/supabaseClient";

  export async function load() {
    const { data } = await supabase.from("game-logger-data").select();
    return {
      entries: data ?? [],
    };
  }