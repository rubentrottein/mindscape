'use client';

import { useEffect, useState } from "react"
import { getArchivedThemes } from "../lib/getArchivedThemes"
import { supabase } from "../lib/supabase"

type Message = {
  id: number
  pseudo: string
  text: string
  date: string
}

export default function Archives() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [passwordInput, setPasswordInput] = useState("")
  const [messages, setMessages] = useState<{ [date: string]: Message[] }>({})
  const [editingMessage, setEditingMessage] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin")
    if (adminStatus === "true") setIsAdmin(true)

    const fetchMessages = async () => {
      const archivedThemes = getArchivedThemes()
      const newMessages: { [date: string]: Message[] } = {}
      for (const theme of archivedThemes) {
        const { data, error } = await supabase
          .from("messages")
          .select("id, pseudo, text, date")
          .eq("date", theme.date)

        if (data) {
          newMessages[theme.date] = data
        } else {
          console.error(`Erreur chargement messages pour ${theme.date}:`, error)
        }
      }
      setMessages(newMessages)
    }

    fetchMessages()
  }, [])

  const handleLogin = () => {
    if (passwordInput === "admin2024") {
      setIsAdmin(true)
      localStorage.setItem("isAdmin", "true")
      setPasswordInput("")
    } else {
      alert("Mot de passe incorrect")
    }
  }

  const handleEditClick = (date: string, id: number, text: string) => {
    setEditingMessage((prev) => ({
      ...prev,
      [`${date}-${id}`]: text,
    }))
  }

  const handleEditChange = (key: string, newText: string) => {
    setEditingMessage((prev) => ({ ...prev, [key]: newText }))
  }

  const handleSave = async (date: string, id: number) => {
    const key = `${date}-${id}`
    const newText = editingMessage[key]

    const { error } = await supabase
      .from("messages")
      .update({ text: newText })
      .eq("id", id)

    if (error) {
      console.error("Erreur mise à jour message:", error)
      return
    }

    setMessages((prev) => ({
      ...prev,
      [date]: prev[date].map((msg) =>
        msg.id === id ? { ...msg, text: newText } : msg
      ),
    }))

    setEditingMessage((prev) => {
      const updated = { ...prev }
      delete updated[key]
      return updated
    })
  }

  const archivedThemes = getArchivedThemes()

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🗂️ Archives</h1>

      {!isAdmin && (
        <div className="mb-6">
          <input
            type="password"
            placeholder="Mot de passe admin"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="border px-3 py-2 rounded mr-2"
          />
          <button
            onClick={handleLogin}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Se connecter
          </button>
        </div>
      )}

      {archivedThemes.map((theme) => (
        <div key={theme.date} className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            📅 {theme.date} — <span className="italic">{theme.title}</span>
          </h2>
          <i>{theme.instructions}</i>
          <p>Limite : {theme.charLimit} caractères</p>

          {messages[theme.date]?.length > 0 ? (
            <ul className="space-y-4">
              {messages[theme.date].map((msg) => {
                const key = `${theme.date}-${msg.id}`
                const isEditing = editingMessage[key] !== undefined

                return (
                  <li key={msg.id} className="border p-4 rounded">
                    <p className="text-sm font-semibold">{msg.pseudo}</p>

                    {isEditing ? (
                      <>
                        <textarea
                          className="w-full border mt-2 p-2 rounded"
                          value={editingMessage[key]}
                          onChange={(e) => handleEditChange(key, e.target.value)}
                        />
                        <button
                          onClick={() => handleSave(theme.date, msg.id)}
                          className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          💾 Sauvegarder
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="mt-1 whitespace-pre-wrap">{msg.text}</p>
                        {isAdmin && (
                          <button
                            onClick={() => handleEditClick(theme.date, msg.id, msg.text)}
                            className="mt-2 text-sm text-blue-600 hover:underline"
                          >
                            ✏️ Modifier
                          </button>
                        )}
                      </>
                    )}
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className="text-gray-500 italic">Aucun message ce jour-là.</p>
          )}
        </div>
      ))}
    </main>
  )
}
