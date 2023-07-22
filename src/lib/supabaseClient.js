// supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://hqnkcwitgblbebgmuocy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxbmtjd2l0Z2JsYmViZ211b2N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg0MTAxNTEsImV4cCI6MjAwMzk4NjE1MX0.DiFUyS-FDV4-3QW0yog6JFOpIk1Uzln52LLy2QIU1eo";

export const supabase = createClient(`${ supabaseUrl }`, `${ supabaseKey }`)

async function testSupabaseQuery() {
  try {
    const { data, error } = await supabase.from('game-log-data').select('*');
    if (error) {
      console.error('Query Error:', error);
    } else {
      console.log('Form Data:', data);
    }
  } catch (error) {
    console.error('Query Error:', error);
  }
}

testSupabaseQuery();