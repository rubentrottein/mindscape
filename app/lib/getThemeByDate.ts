import { supabase } from "./supabase";

export async function getThemeByDate(date: string) {
  const { data, error } = await supabase
    .from('themes')
    .select('*')
    .eq('date', date)
    .single();  // if you expect only one theme per date

  if (error) {
    console.error("Error fetching theme:", error.message);
    return null;
  }

  return data;
}