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
    <section>
      <h2 className="text-xl font-semibold mb-4">Ajouter un nouveau thème</h2>
      <ThemeForm onSubmit={handleNewTheme} />
      <ThemeList showFutureThemes={true}/>
    </section>
  )
}
