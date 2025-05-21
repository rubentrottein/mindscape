"use client"
import Link from "next/link"
import { ReactNode, useEffect, useState } from "react"

export default function Sidebar({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const admin = localStorage.getItem("isAdmin")
    setIsAdmin(admin === "true")
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isAdmin")
    setIsAdmin(false)
    location.reload()
  }

  return (
    <div className="min-h-screen flex position-sticky top-0 z-50">
      <nav className="w-64 bg-purple-100 p-6 space-y-4 shadow-md">
        <h2 className="text-xl font-bold mb-6">📝 Écriture</h2>
        <ul className="space-y-2">
          <li>
            <Link href="/" className="text-purple-800 hover:underline">🏠 Accueil</Link>
          </li>
          <li>
            <Link href="/#form" className="text-purple-800 hover:underline">✍️ Écrire</Link>
          </li>
          <li>
            <Link href="/archives" className="text-purple-800 hover:underline">📚 Archives</Link>
          </li>
          {!isAdmin ? (
            <li>
              <Link href="/archives#admin" className="text-purple-800 hover:underline">🔐 Se connecter</Link>
            </li>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:underline"
              >
                🚪 Déconnexion
              </button>
            </li>
          )}
        </ul>
      </nav>

      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
