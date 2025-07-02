'use client';

import { useState, useEffect } from "react"
import { getTodayTheme } from "./lib/getTodayTheme"
import ThemeHeader from "./components/ThemeHeader"
import MessageForm from "./components/MessageForm"
import MessageList from "./components/MessageList"

export default function Home() {
  const [messages, setMessages] = useState<{ pseudo: string; content: string }[]>([])
  const [todayTheme, setTodayTheme] = useState<{ charLimit: number } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTodayTheme = async () => {
      try {
        const theme = await getTodayTheme()
        setTodayTheme(theme)
      } catch (err) {
        setError('Failed to load today\'s theme')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTodayTheme()
  }, [])

  const handleNewMessage = (pseudo: string, message: string) => {
    const newMessage = { pseudo, content: message }
    setMessages((prev) => [...prev, newMessage])
  }

  if (isLoading) {
    return <p className="p-4">Chargement du thème du jour...</p>
  }

  if (error) {
    return <p className="p-4 text-red-500">{error}</p>
  }

  return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-9xl mx-auto">

        <section className="space-y-6">
          <h1 className="text-2xl font-bold mb-2">✍️ Bienvenue sur notre page d'écriture quotidienne!</h1>
          
          <p className="text-white mb-6">
            Un thème, un temps court, un petit pas d’écriture.
            <br />
            Tu peux écrire vite, mal ou a peu près... Mais écris!
          </p>

          <ThemeHeader />

          <MessageForm
            charLimit={todayTheme?.charLimit || 0}
            onSubmit={handleNewMessage}
            submitLabel="Publier mon texte"
          />

          <MessageList />
        </section>
        <section className="space-y-4 music">
          <h1 className="text-2xl font-bold mb-2">Heureux Anniversaire Maman 🎉</h1>
          <p className="text-white-600 mb-6">Bienvenue sur ton MindScape 2.0 ! J'ai changé d'algorythme de définition des thèmes avec une IA nommée Claude ❤</p>
          <p>Amuse-toi bien et profite de la fête!</p>
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold mb-2">Playlists de travail : </h2>
            <h3>Classique : Valses de Chopin</h3>  
            <iframe width="560" height="315" src="https://www.youtube.com/embed/64B-gW9FtY8?si=2pHAX1eM0Vb9ca6u" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <h3>Néo-Classique : Clair-Obscur Expedition 33</h3>  
            <iframe width="560" height="315" src="https://www.youtube.com/embed/LAQZfeETFbg?si=ZVp0Pj4gLSnw0dzh" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <h3>Bebop : Jazz Noir</h3>  
            <iframe width="560" height="315" src="https://www.youtube.com/embed/gLD-WKMVYhE?si=MUX-ZX8uEee1aXxJ" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <h3>Pop/Folk : Happy Mornings</h3>  
            <iframe width="560" height="315" src="https://www.youtube.com/embed/gWKxl_jFPbs?si=YDFF50FKm-ne9edv" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <h3>Lo-Fi : Japanese City-pop</h3>  
            <iframe width="560" height="315" src="https://www.youtube.com/embed/5v-z79NQJC0?si=wNBeEN9fKvxzApQC" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <h3>La musique de ton fils</h3>  
            <iframe width="100%" height="300" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1051128922&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
          </div>
        </section>
      </div>
  )
}
