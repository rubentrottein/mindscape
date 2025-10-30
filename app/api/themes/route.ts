import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// Vérification du mot de passe admin
async function verifyAdmin(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false
  }
  
  const token = authHeader.substring(7)
  return token === process.env.ADMIN_PASSWORD
}

export async function POST(request: NextRequest) {
  // Vérification admin
  if (!await verifyAdmin(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const { date, title, instructions, charLimit } = await request.json()
    
    const { data, error } = await supabaseAdmin
      .from('themes')
      .insert([{ date, title, instructions, charLimit }])
      .select()
    
    if (error) throw error
    
    return NextResponse.json({ data })
  } catch (error) {
    console.error('Erreur création thème:', error)
    return NextResponse.json({ error: 'Erreur création thème' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  // Vérification admin
  if (!await verifyAdmin(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const { originalDate, date, title, instructions, charLimit } = await request.json()
    
    const { data, error } = await supabaseAdmin
      .from('themes')
      .update({ date, title, instructions, charLimit })
      .eq('date', originalDate)
      .select()
    
    if (error) throw error
    
    return NextResponse.json({ data })
  } catch (error) {
    console.error('Erreur mise à jour thème:', error)
    return NextResponse.json({ error: 'Erreur mise à jour thème' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  // Vérification admin
  if (!await verifyAdmin(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const url = new URL(request.url)
    const date = url.searchParams.get('date')
    
    if (!date) {
      return NextResponse.json({ error: 'Date requise' }, { status: 400 })
    }
    
    const { error } = await supabaseAdmin
      .from('themes')
      .delete()
      .eq('date', date)
    
    if (error) throw error
    
    return NextResponse.json({ message: 'Thème supprimé' })
  } catch (error) {
    console.error('Erreur suppression thème:', error)
    return NextResponse.json({ error: 'Erreur suppression thème' }, { status: 500 })
  }
}