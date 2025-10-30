'use client'

import { useEffect, useState } from 'react'
import ThemeList from '../components/ThemeList'
import AdminLogin from '../components/AdminLogin'


export default function Archives() {
  const [isAdmin, setIsAdmin] = useState(false)
  // Écouter les changements de stockage local pour détecter la connexion/déconnexion
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'isAdmin') {
        setIsAdmin(e.newValue === 'true')
      }
    }

    // Vérifier l'état initial
    const adminStatus = localStorage.getItem("isAdmin")
    if (adminStatus === "true") {
      setIsAdmin(true)
    }

    // Écouter les changements de stockage local
    window.addEventListener('storage', handleStorageChange)

    // Nettoyer l'écouteur d'événement
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])
  
/*
  const handleLogin = () => {
    if (passwordInput === "admin2024") {
      setIsAdmin(true)
      localStorage.setItem("isAdmin", "true")
      setPasswordInput("")
      // Forcer le rechargement des données après la connexion
      window.location.reload()
    } else {
      alert("Mot de passe incorrect")
    }
  }
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">🗂️ Archives</h1>
      <!--
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
      -->
      <ThemeList
        showFutureThemes={false}
      />
    </>
  )
}
*/  

return ( 
  <>
    <h1 className="text-2xl font-bold mb-4">🗂️ Archives</h1>
    <AdminLogin />
    <ThemeList
      showFutureThemes={false}
    />
  </>
)
}