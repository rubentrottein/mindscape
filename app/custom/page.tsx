"use client"
// pages/index.tsx
import { useState } from "react"
import { getTodayTheme } from "../lib/getTodayTheme"
import ThemeHeader from "../components/ThemeHeader"
import MessageForm from "../components/MessageForm"
import MessageList from "../components/MessageList"
import ThemeForm from "../components/ThemeForm"
import ThemeList from "../components/ThemeList"

const todayTheme = getTodayTheme()

export default function Home() {
  const [themes, setThemes] = useState<{ date: string; title: string; instructions: string; charLimit: number }[]>([])

  if (!todayTheme) {
    return <p className="p-4">Aucun thème pour aujourd’hui.</p>
  }

  const handleNewTheme = (date: string, title: string, instructions: string, charLimit: number) => {
    const newTheme = { date, title, instructions, charLimit }
    setThemes((prev) => [...prev, newTheme])
    // Ici on pourrait écrire dans un fichier ou une API si nécessaire
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1>Customisation</h1>
      <h2 className="text-2xl font-bold mb-4">📝 Ajout de nouveaux thèmes...</h2>
      <ThemeForm onSubmit={handleNewTheme} />
      <ThemeList />
    </main>
  )
}
