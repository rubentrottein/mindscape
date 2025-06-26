// app/components/ThemeList.tsx
'use client'

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

import { Theme } from "../types/Theme"
import { Message } from "../types/Message"

type ThemeListProps = {
  showFutureThemes?: boolean
}

export default function ThemeList({ showFutureThemes = false }: ThemeListProps) {
  const [themes, setThemes] = useState<Theme[]>([])
  const [messagesByDate, setMessagesByDate] = useState<Record<string, Message[]>>({})
  const [filteredThemes, setFilteredThemes] = useState<Theme[]>([])

  useEffect(() => {
    const fetchThemes = async () => {
      const { data, error } = await supabase
        .from("themes")
        .select("date, title, instructions, charLimit")
        .order("date", { ascending: false })

      if (error) {
        console.error("Erreur chargement des thèmes:", error.message)
      } else if (data) {
        setThemes(data)
        // Charger les messages pour chaque thème
        data.forEach(theme => fetchMessagesForTheme(theme.date))
      }
    }

    fetchThemes()
  }, [])

  // Filtrer les thèmes en fonction de showFutureThemes
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0] // Format YYYY-MM-DD
    
    const filtered = showFutureThemes 
      ? themes // Afficher tous les thèmes
      : themes.filter(theme => theme.date <= today) // Uniquement les thèmes passés ou actuels
      
    setFilteredThemes(filtered)
  }, [themes, showFutureThemes])

  const fetchMessagesForTheme = async (date: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('date', date)
      .order('inserted_at', { ascending: true })

    if (!error && data) {
      setMessagesByDate(prev => ({
        ...prev,
        [date]: data
      }))
    }
  }

  return (
    <details>
      <summary>
      <h2 className="text-2xl font-bold mb-4">Tous les Thèmes</h2>
      </summary>
      <div className="space-y-8 mt-8">
        {filteredThemes.map((theme) => (
            <div key={theme.date} className="border rounded-lg p-6 bg-white shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl text-green-600 font-semibold">
                    {new Date(theme.date).toLocaleDateString('fr-FR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h3>
                  <h4 className="text-lg text-gray-700 mb-2">{theme.title}</h4>
                  <p className="text-gray-600 mb-2">{theme.instructions}</p>
                  <p className="text-sm text-gray-500">Limite : {theme.charLimit} caractères</p>
                </div>
              </div>

              {/* Section des messages */}
              <div className="mt-4 pt-4 border-t text-black">
                <h4 className="font-bold mb-2">Textes ({messagesByDate[theme.date]?.length || 0})</h4>
                {messagesByDate[theme.date]?.length > 0 ? (
                  <div className="space-y-3">
                    {messagesByDate[theme.date].map((message) => (
                      <div key={message.id} className="bg-black text-white p-3 rounded">
                        <div className="flex justify-between text-sm text-gray-500 mb-1">
                          <span className="font-medium">{message.pseudo}</span>
                        </div>
                        <p className="whitespace-pre-line">{message.text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">Aucun message pour ce thème.</p>
                )}
              </div>
            </div>
          ))}
      </div>
    </details>
  )
}