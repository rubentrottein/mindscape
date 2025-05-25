// components/Header.tsx
'use client'

import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  
  const getPageTitle = () => {
    switch(pathname) {
      case '/':
        return 'Accueil'
      case '/archives':
        return 'Archives'
      case '/custom':
        return 'Administration'
      default:
        return 'MindScape'
    }
  }

  return (
    <header className="shadow-sm py-4 px-6">
      <h1>{getPageTitle()}</h1>
    </header>
  )
}
