// components/ThemeHeader.tsx
import { Theme } from "../lib/getTodayTheme"

export default function ThemeHeader({ theme }: { theme: Theme }) {
  return (
    <section className="mb-6 p-4 border rounded-xl bg-purple-50">
      <h2 className="text-xl font-bold mb-1">Thème du jour : <span className="text-purple-700">{theme.title}</span></h2>
      <p className="text-sm text-gray-600">{theme.instructions}</p>
      <p className="text-xs text-gray-500 mt-2">Limite : {theme.charLimit} caractères</p>
    </section>
  )
}
