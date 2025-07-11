"use client"
// components/MessageList.tsx
import { useEffect, useState } from "react"
import { getMessagesByDate } from "../lib/supabase/messages"

type Message = {
  date: string;
  pseudo: string;
  text: string;
  inserted_at: string;
}

export default function MessageList() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const today = new Date().toISOString().slice(0, 10)

  const fetchMessages = async () => {
    try {
      setIsRefreshing(true)
      const data = await getMessagesByDate(today)
      setMessages(data || [])
    } catch (error) {
      console.error("Erreur lors du chargement des messages:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  // Chargement initial
  useEffect(() => {
    fetchMessages()
  }, [today])

  // Actualisation automatique toutes les 30 secondes
  useEffect(() => {
    const intervalId = setInterval(fetchMessages, 30000) // Toutes les 30 secondes
    return () => clearInterval(intervalId)
  }, [today])

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Messages du jour</h2>
        <button
          onClick={fetchMessages}
          disabled={isRefreshing}
          className="text-sm text-purple-300 hover:text-purple-800 flex items-center gap-1"
        >
          {isRefreshing ? (
            <>
              <span className="animate-spin">⟳</span> Chargement...
            </>
          ) : (
            'Rafraîchir'
          )}
        </button>
      </div>
      
      <div className="max-h-[500px] overflow-y-auto pr-2">
        <ul className="space-y-4">
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Aucun message pour le moment. Soyez le premier à écrire !</p>
          ) : (
            messages.map((msg) => (
              <li key={msg.inserted_at} className="border p-4 rounded bg-white shadow-sm">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{msg.text}</p>
                <p className="text-xs text-right text-gray-500 mt-2">– {msg.pseudo}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  )
}