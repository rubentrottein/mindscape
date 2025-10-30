// hooks/useAdmin.ts
import { useState, useEffect } from 'react'

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminPassword, setAdminPassword] = useState<string | null>(null)

  useEffect(() => {
    const password = localStorage.getItem("adminPassword")
    if (password) {
      setIsAdmin(true)
      setAdminPassword(password)
    }
  }, [])

  const login = async (password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })

      const result = await response.json()
      
      if (result.success) {
        localStorage.setItem("adminPassword", password)
        setIsAdmin(true)
        setAdminPassword(password)
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("adminPassword")
    setIsAdmin(false)
    setAdminPassword(null)
  }

  // Helper pour les headers d'auth des API calls
  const authHeaders = adminPassword ? {
    'Authorization': `Bearer ${adminPassword}`,
    'Content-Type': 'application/json'
  } : {}

  return { isAdmin, login, logout, authHeaders }
}