"use client"

import { useState } from "react"
import { getTodayTheme } from "../lib/getTodayTheme"
import ThemeForm from "../components/ThemeForm"
import ThemeList from "../components/ThemeList"
import CustomMessageForm from "../components/CustomMessageForm"

const todayTheme = getTodayTheme()

export default function Home() {
  const [themes, setThemes] = useState<{ date: string; title: string; instructions: string; charLimit: number }[]>([])
  const [messages, setMessages] = useState<{ pseudo: string; content: string; date: string }[]>([])

  if (!todayTheme) {
    return <p className="p-4">Aucun thème pour aujourd'hui.</p>
  }

  const handleNewTheme = (date: string, title: string, instructions: string, charLimit: number) => {
    const newTheme = { date, title, instructions, charLimit }
    setThemes((prev) => [...prev, newTheme])
    // Ici on pourrait écrire dans un fichier ou une API si nécessaire
  }

  const handleNewCustomMessage = (pseudo: string, content: string, date: string) => {
    const newMessage = { pseudo, content, date }
    setMessages((prev) => [...prev, newMessage])
    console.log("Nouveau message ajouté:", newMessage)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-9xl mx-auto p-4">
      
      {/* Section ajout de thème */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">Ajouter un nouveau thème</h2>
        <ThemeForm onSubmit={handleNewTheme} />
        <ThemeList showFutureThemes={true}/>
      </section>

      {/* Section écriture sur thème passé */}
      <section className="space-y-5 music">
        <CustomMessageForm onSubmit={handleNewCustomMessage}/>
        
        {/* Affichage des messages récents (optionnel) */}
        {messages.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Messages récents ajoutés :</h3>
            <div className="space-y-2">
              {messages.slice(-5).map((msg, index) => (
                <div key={index} className="p-3 bg-gray-100 rounded-md text-white">
                  <div className="flex justify-between items-start mb-2">
                    <strong>{msg.pseudo}</strong>
                    <span className="text-sm text-gray-100">{msg.date}</span>
                  </div>
                  <p className="text-sm">{msg.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}