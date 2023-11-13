import { writable } from "svelte/store";
import { supabase } from "$lib/supabaseClient";

export const user = writable(supabase.auth.user() || false);