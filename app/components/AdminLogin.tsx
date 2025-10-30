'use client'

import { useState } from 'react'
import { useAdmin } from '../hooks/useAdmin'

export default function AdminLogin() {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { isAdmin, login, logout } = useAdmin()

  const handleLogin = async () => {
    if (!password.trim()) return
    
    setLoading(true)
    const success = await login(password)
    
    if (success) {
      setPassword("")
      window.location.reload() // Recharge pour mettre à jour la sidebar
    } else {
      alert("Mot de passe incorrect")
    }
    setLoading(false)
  }
  const showPassword = () => {
    const input = document.querySelector('input[type="password"]') as HTMLInputElement
    if (input) {
      if (input.type === "password") {
        input.type = "text"
      } else {
        input.type = "password"
      }
    }
  }
  
  if (isAdmin) {
    return (
      <div className="mb-6 p-4 bg-green-50 rounded-lg">
        <p className="text-green-800 mb-3">✅ Connecté en tant qu'admin</p>
        <button
          onClick={() => { logout(); window.location.reload() }}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Se déconnecter
        </button>
      </div>
    )
  }

  return (
    <div className="mb-6" id="admin">
      <h3 className="text-lg font-semibold mb-3">🔐 Connexion Admin</h3>
      <div className="flex gap-2">
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          className="border px-3 py-2 rounded flex-1"
        />
        <button
          onClick={showPassword}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            👁
        </button>
        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "..." : "Connexion"}
        </button>
      </div>
    </div>
  )
}