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
      <nav className="w-64 bg-purple-100 p-6 space-y-4 shadow-md sidebar">
        <h2 className="text-xl font-bold mb-6 text-red-400">📝 Écriture</h2>
        <ul className="space-y-5">
          <li>
            <Link href="/#form" className="text-purple-800 hover:underline sidebar-element">✍️ Écrire</Link>
          </li>
          <li>
            <Link href="/archives" className="text-purple-800 hover:underline sidebar-element">📚 Archives</Link>
          </li>
          {!isAdmin ? (
            <li>
              <Link href="/archives#admin" className="text-green-400 hover:underline sidebar-element">🔐 Se connecter</Link>
            </li>
          ) : (
            <li className="py-175">
              <button
                onClick={handleLogout}
                className="text-red-600 hover:underline"
              >
                🚪 Déconnexion
              </button>
              <br />
              <button className="py-2 px-2 my-auto w-24 text-center rounded bg-purple-600 text-white hover:bg-orange-700">
                <Link href="/custom" className="text-white">Admin ➕</Link>
              </button>
              <li>
                <Link href="/custom" className="text-green-400 hover:underline sidebar-element">Page Admin 1.0</Link>
              </li>
            </li>
          )}
        </ul>
      </nav>

      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
