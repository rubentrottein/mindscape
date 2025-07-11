"use client"
// components/MessageForm.tsx
import { useState, useEffect } from "react"

import { supabase } from "../lib/supabase"

// Clé pour le stockage local
const STORAGE_KEY = 'mindscape_draft'

export default function MessageForm({
  charLimit,
  submitLabel = "Envoyer",
  onSubmit,
}: {
  charLimit: number
  onSubmit: (date: string, pseudo: string, text: string) => void
  submitLabel?: string
}) {
  const [date, setDate] = useState("")
  const [pseudo, setPseudo] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const today = new Date().toISOString().slice(0, 10);

  // Récupérer les données sauvegardées au chargement
  useEffect(() => {
    const savedDraft = sessionStorage.getItem(STORAGE_KEY)
    if (savedDraft) {
      try {
        const { savedPseudo, savedMessage } = JSON.parse(savedDraft)
        if (savedPseudo) setPseudo(savedPseudo)
        if (savedMessage) setMessage(savedMessage)
      } catch (e) {
        console.error('Erreur lors du chargement de la sauvegarde', e)
      }
    }
  }, [])

  // Sauvegarder automatiquement les modifications
  useEffect(() => {
    const saveDraft = () => {
      const draft = { savedPseudo: pseudo, savedMessage: message }
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft))
    }

    // Sauvegarder immédiatement
    saveDraft()

    // Configurer un intervalle de sauvegarde toutes les 5 secondes
    const intervalId = setInterval(saveDraft, 5000)

    // Nettoyer l'intervalle lors du démontage du composant
    return () => clearInterval(intervalId)
  }, [pseudo, message])

  const handleSubmit = async (e: React.FormEvent, date: string, pseudo: string, text: string) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      const { error } = await supabase.from("messages").insert([
        {
          date,
          pseudo,
          text,
        },
      ]);
      
      if (error) {
        console.error("Erreur Supabase :", error);
      } else {
        // Vider le formulaire et le stockage après une soumission réussie
        setMessage('');
        sessionStorage.removeItem(STORAGE_KEY);
        
        // Appeler la fonction onSubmit pour mettre à jour l'état parent
        if (onSubmit) {
          onSubmit(date, pseudo, text);
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
    } finally {
      setIsSubmitting(false);
    }
  }
  

  return (
    <form onSubmit={(e) => handleSubmit(e, today, pseudo, message)} className="space-y-4 mb-8">
      <input
        type="text"
        placeholder="Pseudo"
        className="w-full border px-3 py-2 rounded"
        value={pseudo}
        onChange={(e) => setPseudo(e.target.value)}
        required
      />
      <textarea
        placeholder="Ton message"
        className="w-full border px-3 py-2 rounded h-32 resize-none"
        maxLength={charLimit}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="text-sm text-right text-gray-100">
        {message.length} / {charLimit}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`px-4 py-2 rounded text-white ${isSubmitting ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
      >
        {isSubmitting ? 'Envoi en cours...' : submitLabel}
      </button>
    </form>
  )
}
