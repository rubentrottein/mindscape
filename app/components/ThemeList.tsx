// components/ThemeList.tsx
'use client';

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export type Theme = {
  date: string
  title: string
  instructions: string
  charLimit: number
}

export default function ThemeList({
    onSelect,
    filter,
    render
  }: {
    onSelect?: (theme: Theme) => void
    filter?: (theme: Theme) => boolean
    render?: (theme: Theme) => React.ReactNode
  }) {
  const [themes, setThemes] = useState<Theme[]>([])

  useEffect(() => {
    const fetchThemes = async () => {
      const { data, error } = await supabase
        .from("themes")
        .select("date, title, instructions, charLimit")
        .order("date", { ascending: false })

      if (error) {
        console.error("Erreur chargement des thèmes:", error.message)
      } else if (data) {
        const filtered = filter ? data.filter(filter) : data
        setThemes(filtered)
      }
    }

    fetchThemes()
  }, [filter])

  return (
    <div>
      {themes.map((theme) => (
        render ? render(theme) : (
          <div key={theme.date} className="mb-6 border rounded p-4">
            <h2 className="text-xl font-semibold">
              📅 {theme.date} — <span className="italic">{theme.title}</span>
            </h2>
            <p className="text-sm italic mb-1">{theme.instructions}</p>
            <p className="text-sm">Limite : {theme.charLimit} caractères</p>
            {onSelect && (
              <button
                onClick={() => onSelect(theme)}
                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Voir les messages
              </button>
            )}
          </div>
        )
      ))}
    </div>
  )
}
