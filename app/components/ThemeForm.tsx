"use client"
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function ThemeForm({
    submitLabel = "Créer un nouveau thème",
    onSubmit,
    }: {  
        submitLabel?: string
        onSubmit: (date: string, title: string, instructions: string, charLimit: number) => void
    }) {
    const [title, setTitle] = useState('')
    const [instructions, setInstructions] = useState('')
    const [charLimit, setCharLimit] = useState(0)
    const [date, setDate] = useState("")

    useEffect(() => {
        const fetchLastDate = async () => {
          const { data, error } = await supabase
            .from('themes')
            .select('date')
            .order('date', { ascending: false })
            .limit(1)
      
          if (error) {
            console.error("Erreur récupération dernière date :", error.message)
            return
          }
      
          if (data && data.length > 0) {
            const lastDate = new Date(data[0].date)
            const tomorrow = new Date(lastDate)
            tomorrow.setDate(tomorrow.getDate() + 1)
      
            const formatted = tomorrow.toISOString().split('T')[0]
            setDate(formatted)
          } else {
            // Aucun thème existant → on met aujourd'hui
            const today = new Date().toISOString().split('T')[0]
            setDate(today)
          }
        }
      
        fetchLastDate()
      }, [])
      

    const handleSubmit = async (e: React.FormEvent, date: string, title: string, instructions: string, charLimit: number) => {
        e.preventDefault();
        if (title && instructions) {
            onSubmit(date, title, instructions, charLimit)
        }
        const { error } = await supabase.from('themes').insert([
            { date, title, instructions, charLimit }
        ])
        if (error) {
            console.error("Erreur lors de l'ajout du thème :", error.message)
        }
    }

    return (
        <section className="mb-6 p-4 border rounded-xl bg-purple-50 shadow-sm text-gray-600">
            <form onSubmit={(e) => handleSubmit(e, date, title, instructions, charLimit)} className="space-y-4 p-4">
                <input
                    type="text"
                    placeholder="Titre"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full border px-3 py-2 rounded"
                />
                <input hidden
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full border px-3 py-2 rounded"
                />

                <textarea
                    placeholder="Instructions"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    required
                    className="w-full border px-3 py-2 rounded"
                />
                <input
                    type="number"
                    placeholder="Nombre de caractères"
                    value={charLimit}
                    onChange={(e) => setCharLimit(Number(e.target.value))}
                    required
                    className="w-full border px-3 py-2 rounded"
                    />
                <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">{submitLabel}</button>
            </form>
        </section>
    ) 
}
