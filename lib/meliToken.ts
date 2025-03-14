import { supabase } from "./supabase";

// Obtener el último token de Supabase
export async function getMeliToken() {
  const { data, error } = await supabase
    .from("meli_tokens")
    .select("*")
    .order("expires_at", { ascending: false })
    .limit(1)
    .single();

  if (error) return null;
  return data;
}

// Guardar un nuevo token en Supabase
export async function saveMeliToken(access_token: string, refresh_token: string, expires_in: number) {
  const expires_at = new Date(Date.now() + expires_in * 1000).toISOString();

  await supabase.from("meli_tokens").delete().neq("id", ""); // Eliminar registros antiguos

  const { error } = await supabase
    .from("meli_tokens")
    .insert([{ access_token, refresh_token, expires_at }]);

  return !error;
}
