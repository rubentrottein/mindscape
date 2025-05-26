import { supabase } from './supabase'
import { Theme } from '../types/Theme'

export async function getTodayTheme(): Promise<Theme | null> {
  const today = new Date().toISOString().slice(0, 10)

  const { data, error } = await supabase
    .from('themes')
    .select('*')
    .eq('date', today)
    .single()

  if (error) {
    console.error('Erreur récupération thème du jour :', error.message)
    return null
  }

  return data
}
