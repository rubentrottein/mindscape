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
  const today = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    getMessagesByDate(today).then((data) => {
      setMessages(data || [])
    })
  }, [today])

  return (
    <section>
      <ul className="space-y-4">
        {messages.map((msg) => (
          <li key={msg.inserted_at} className="border p-4 rounded bg-white shadow-sm">
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{msg.text}</p>
            <p className="text-xs text-right text-gray-500 mt-2">– {msg.pseudo}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}