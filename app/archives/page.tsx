'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import ThemeList from '../components/ThemeList'
import { Theme } from '../types/Theme'

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
  }, [])

  const fetchMessagesForTheme = async (theme: Theme) => {
    const { data, error } = await supabase
      .from('messages')
      .select('id, pseudo, text, date')
      .eq('date', theme.date)

    if (error) {
      console.error(`Erreur chargement messages pour ${theme.date}:`, error)
    } else {
      setMessages((prev) => ({ ...prev, [theme.date]: data || [] }))
    }
  }

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

  return (
    <>
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

      <ThemeList
        showFutureThemes={false}
      />
    </>
  )
}
