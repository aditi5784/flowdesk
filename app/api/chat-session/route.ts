import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST() {
  const supabase = await createClient()
  const { data } = await supabase.from('chat_sessions').insert({}).select().single()
  return NextResponse.json({ sessionId: data?.id })
}