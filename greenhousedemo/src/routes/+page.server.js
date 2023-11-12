import { supabase } from "$lib/supabaseClient";

export async function load() {
  const { data } = await supabase.from("Warehouse").select();
  return {
    Warehouse: data ?? [],
  };
}