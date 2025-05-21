'use client';

import { useState } from "react"
import { getTodayTheme } from "./lib/getTodayTheme"
import ThemeHeader from "./components/ThemeHeader"
import MessageForm from "./components/MessageForm"
import MessageList from "./components/MessageList"

const todayTheme = getTodayTheme()

export default function Home() {
  const [messages, setMessages] = useState<{ pseudo: string; content: string }[]>([])

  if (!todayTheme) {
    return <p className="p-4">Aucun thème pour aujourd’hui.</p>
  }

  const handleNewMessage = (pseudo: string, message: string) => {
    const newMessage = { pseudo, content: message }
    setMessages((prev) => [...prev, newMessage])
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">✍️ Écris un peu chaque jour</h1>
      <p className="text-gray-600 mb-6">
        Un thème, un temps court, un petit pas d’écriture.
        <br />
        Tu peux écrire seul·e, ou à deux. Mais écris chaque jour.
      </p>

      <ThemeHeader theme={todayTheme} />

      <MessageForm
        charLimit={todayTheme.charLimit}
        onSubmit={handleNewMessage}
        submitLabel="Publier mon texte"
      />

      <MessageList messages={messages} />
    </main>
  )
}
