import { supabase } from "./supabase"

type Message = {
    date: string;
    pseudo: string;
    content: string;
  };
  
  let messages: Message[] = [];
  
  export function saveMessage(message: Message) {
    messages.push(message);
  }
  
  export function getMessagesForDate(date: string): Message[] {
    return messages.filter((msg) => msg.date === date);
  }
  
  export function getAllMessages(): Message[] {
    return messages;
  }
  
  export async function getMessagesByDate(date: string) {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("date", date)
      .order("inserted_at", { ascending: true })
  
    if (error) {
      console.error("Erreur chargement messages :", error)
      return []
    }
  
    return data
  }
  