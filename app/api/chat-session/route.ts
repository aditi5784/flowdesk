import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('chat_sessions')
      .insert({})
      .select()
      .single()
    
    if (error) {
      console.error('Session error:', error)
      return NextResponse.json({ sessionId: crypto.randomUUID() })
    }
    
    return NextResponse.json({ sessionId: data.id })
  } catch (error) {
    return NextResponse.json({ sessionId: crypto.randomUUID() })
  }
}