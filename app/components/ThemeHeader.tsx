'use client'

import { useEffect, useState } from 'react'
import { Theme } from "../types/Theme"
import { getTodayTheme } from "../lib/getTodayTheme"

export default function ThemeHeader() {
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    const fetchTheme = async () => {
      const todayTheme = await getTodayTheme()
      setTheme(todayTheme)
    }
    fetchTheme()
  }, [])

  if (!theme) return <p className="italic text-sm text-gray-500">Chargement du thème...</p>

  return (
    <section className="mb-6 p-4 border rounded-xl bg-purple-50">
      <h2 className="text-xl text-green-600 font-bold mb-1">
        Thème du jour : <span className="text-purple-700">{theme.title}</span>
      </h2>
      <p className="text-sm text-gray-600">{theme.instructions}</p>
      <p className="text-xs text-gray-500 mt-2">Limite : {theme.charLimit} caractères</p>
    </section>
  )
}
