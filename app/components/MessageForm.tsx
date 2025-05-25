"use client"
// components/MessageForm.tsx
import { useState } from "react"

import { supabase } from "../lib/supabase"

export default function MessageForm({
  charLimit,
  submitLabel = "Envoyer",
  onSubmit,
}: {
  charLimit: number
  onSubmit: (date: string, pseudo: string, text: string) => void
  submitLabel?: string
}) {
  const [date, setDate] = useState("")
  const [pseudo, setPseudo] = useState("")
  const [message, setMessage] = useState("")
  const today = new Date().toISOString().slice(0, 10);

  const handleSubmit = async (e: React.FormEvent, date: string, pseudo: string, text: string) => {
    //e.preventDefault();
    const { error } = await supabase.from("messages").insert([
      {
        //date du thème en cours (dynamique),
        date,
        pseudo,
        text,
      },
    ])
  
    if (error) {
      console.error("Erreur Supabase :", error)
    }
  }
  

  return (
    <form onSubmit={(e) => handleSubmit(e, today, pseudo, message)} className="space-y-4 mb-8">
      <input
        type="text"
        placeholder="Pseudo"
        className="w-full border px-3 py-2 rounded"
        value={pseudo}
        onChange={(e) => setPseudo(e.target.value)}
        required
      />
      <textarea
        placeholder="Ton message"
        className="w-full border px-3 py-2 rounded h-32 resize-none"
        maxLength={charLimit}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="text-sm text-right text-gray-500">
        {message.length} / {charLimit}
      </div>
      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        {submitLabel}
      </button>
    </form>
  )
}
