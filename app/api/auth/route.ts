import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    
    if (password === process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}