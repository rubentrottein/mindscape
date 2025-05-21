"use client"
// components/MessageForm.tsx
import { useState } from "react"

export default function MessageForm({
  charLimit,
  submitLabel = "Envoyer",
  onSubmit,
}: {
  charLimit: number
  onSubmit: (pseudo: string, message: string) => void
  submitLabel?: string
}) {
  const [pseudo, setPseudo] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.length <= charLimit && pseudo) {
      onSubmit(pseudo, message)
      setMessage("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
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
      <div className="text-sm text-right text-gray-500">
        {message.length} / {charLimit}
      </div>
      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        {submitLabel}
      </button>
    </form>
  )
}
