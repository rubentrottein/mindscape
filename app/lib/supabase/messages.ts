import { supabase } from "../supabase"

export async function getMessagesByDate(date: string) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("date", date)
    .order("inserted_at", { ascending: true })

  if (error) {
    console.error("Erreur récupération messages :", error)
    return []
  }

  return data
}
