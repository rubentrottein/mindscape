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
    const { date, pseudo, text } = await request.json()
    
    const { data, error } = await supabaseAdmin
      .from('messages')
      .insert([{ date, pseudo, text }])
      .select()
    
    if (error) throw error
    
    return NextResponse.json({ data })
  } catch (error) {
    console.error('Erreur création message:', error)
    return NextResponse.json({ error: 'Erreur création message' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  // Vérification admin
  if (!await verifyAdmin(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const { id, date, pseudo, text } = await request.json()
    
    const { data, error } = await supabaseAdmin
      .from('messages')
      .update({ date, pseudo, text })
      .eq('id', id)
      .select()
    
    if (error) throw error
    
    return NextResponse.json({ data })
  } catch (error) {
    console.error('Erreur mise à jour message:', error)
    return NextResponse.json({ error: 'Erreur mise à jour message' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  // Vérification admin
  if (!await verifyAdmin(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 })
    }
    
    const { error } = await supabaseAdmin
      .from('messages')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    
    return NextResponse.json({ message: 'Message supprimé' })
  } catch (error) {
    console.error('Erreur suppression message:', error)
    return NextResponse.json({ error: 'Erreur suppression message' }, { status: 500 })
  }
}