"use client"
// pages/index.tsx
import { useState } from "react"
import { getTodayTheme } from "../lib/getTodayTheme"
import ThemeHeader from "../components/ThemeHeader"
import MessageForm from "../components/MessageForm"
import MessageList from "../components/MessageList"

const todayTheme = getTodayTheme()

export default function Home() {
  const [messages, setMessages] = useState<{ pseudo: string; content: string }[]>([])

  if (!todayTheme) {
    return <p className="p-4">Aucun thème pour aujourd’hui.</p>
  }

  const handleNewMessage = (pseudo: string, message: string) => {
    const newMessage = { pseudo, content: message }
    setMessages((prev) => [...prev, newMessage])
    // Ici on pourrait écrire dans un fichier ou une API si nécessaire
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📝 Écris pour ta mère</h1>
      <a href="/">Retour à l'accueil</a>
      <ThemeHeader theme={todayTheme} />
      <MessageForm charLimit={todayTheme.charLimit} onSubmit={handleNewMessage} />
      <MessageList messages={messages} />
    </main>
  )
}
