'use client';

import { useState } from "react"
import Header from "./header"
import { getTodayTheme } from "./lib/getTodayTheme"
import ThemeHeader from "./components/ThemeHeader"
import MessageForm from "./components/MessageForm"
import MessageList from "./components/MessageList"
const todayTheme = getTodayTheme()

export default function Home() {
  const [messages, setMessages] = useState<{ pseudo: string; content: string }[]>([])

  if (!todayTheme) {
    return <p className="p-4">Aucun thème pour aujourd’hui.</p>
  }

  const handleNewMessage = (pseudo: string, message: string) => {
    const newMessage = { pseudo, content: message }
    setMessages((prev) => [...prev, newMessage])
  }

  return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-9xl mx-auto">

        <section className="space-y-6">
          <h1 className="text-2xl font-bold mb-2">✍️ Bienvenue sur notre page d'écriture quotidienne!</h1>
          
          <p className="text-gray-600 mb-6">
            Un thème, un temps court, un petit pas d’écriture.
            <br />
            Tu peux écrire vite, mal ou a peu près... Mais écris!
          </p>

          <ThemeHeader theme={todayTheme} />

          <MessageForm
            charLimit={todayTheme.charLimit}
            onSubmit={handleNewMessage}
            submitLabel="Publier mon texte"
          />

          <MessageList />
        </section>
        <section className="space-y-4 music">
          <h1 className="text-2xl font-bold mb-2">Bonne fête Maman 🎉</h1>
          <p className="text-gray-600 mb-6">J'espère que ça va te plaire et te motiver malgré tous ces mémoires à corriger...</p>
          <p>Amuse-toi bien et profite de la fête!</p>
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold mb-2">Playlists de travail : </h2>
            <h3>Néo-Classique : Clair-Obscur Expedition 33</h3>  
            <iframe width="560" height="315" src="https://www.youtube.com/embed/LAQZfeETFbg?si=ZVp0Pj4gLSnw0dzh" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <h3>Bebop : Jazz Noir</h3>  
            <iframe width="560" height="315" src="https://www.youtube.com/embed/gLD-WKMVYhE?si=MUX-ZX8uEee1aXxJ" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <h3>Pop/Folk : Happy Mornings</h3>  
            <iframe width="560" height="315" src="https://www.youtube.com/embed/gWKxl_jFPbs?si=YDFF50FKm-ne9edv" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <h3>Lo-Fi : Japanese City-pop</h3>  
            <iframe width="560" height="315" src="https://www.youtube.com/embed/5v-z79NQJC0?si=wNBeEN9fKvxzApQC" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
        </section>
      </div>
  )
}
