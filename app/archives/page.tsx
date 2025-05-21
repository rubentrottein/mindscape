'use client';

import { useEffect, useState } from "react"
import { getArchivedThemes } from "../lib/getArchivedThemes" // réutilise ton JSON
import { themesData } from "../lib/ThemesData"
import { messagesData } from "../lib/messagesData" // fichier JSON simulé pour les messages
import Sidebar from "../sidebar";
import Layout from "../layout";

type Message = {
  pseudo: string
  content: string
}

export default function Archives() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [passwordInput, setPasswordInput] = useState("")
  const [messages, setMessages] = useState(messagesData) // messagesData format : { [date: string]: Message[] }
  const [editingMessage, setEditingMessage] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin")
    if (adminStatus === "true") setIsAdmin(true)
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

  const handleEditClick = (date: string, index: number, content: string) => {
    setEditingMessage((prev) => ({
      ...prev,
      [`${date}-${index}`]: content,
    }))
  }

  const handleEditChange = (key: string, newContent: string) => {
    setEditingMessage((prev) => ({ ...prev, [key]: newContent }))
  }

  const handleSave = (date: string, index: number) => {
    const key = `${date}-${index}`
    const newContent = editingMessage[key]

    setMessages((prev) => ({
      ...prev,
      [date]: prev[date].map((msg, i) =>
        i === index ? { ...msg, content: newContent } : msg
      ),
    }))
    setEditingMessage((prev) => {
      const updated = { ...prev }
      delete updated[key]
      return updated
    })
  }

  const archivedThemes = getArchivedThemes(themesData)

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
                📅 {theme.date} — <span className="italic">{theme.label}</span>
            </h2>

            {messages[theme.date]?.length > 0 ? (
                <ul className="space-y-4">
                {messages[theme.date].map((msg, index) => {
                    const key = `${theme.date}-${index}`
                    const isEditing = editingMessage[key] !== undefined

                    return (
                    <li key={index} className="border p-4 rounded">
                        <p className="text-sm font-semibold">{msg.pseudo}</p>

                        {isEditing ? (
                        <>
                            <textarea
                            className="w-full border mt-2 p-2 rounded"
                            value={editingMessage[key]}
                            onChange={(e) =>
                                handleEditChange(key, e.target.value)
                            }
                            />
                            <button
                            onClick={() => handleSave(theme.date, index)}
                            className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                            >
                            💾 Sauvegarder
                            </button>
                        </>
                        ) : (
                        <>
                            <p className="mt-1 whitespace-pre-wrap">{msg.content}</p>
                            {isAdmin && (
                            <button
                                onClick={() =>
                                handleEditClick(theme.date, index, msg.content)
                                }
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
