import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const { id, status } = await req.json()
    const supabase = await createClient()
    
    const { error } = await supabase
      .from('leads')
      .update({ status: status })
      .eq('id', id)
    
    if (error) {
      console.error('Update error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ success: true })
    
  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}