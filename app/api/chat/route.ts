import { NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import { createClient } from '@/lib/supabase/server'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const SYSTEM = `You are the Flowdesk Assistant — a friendly product expert for Flowdesk, a customer support ticketing platform for SaaS teams. You can help with features, pricing (Starter $49/mo, Growth $99/mo), and how to get started. If asked anything unrelated to Flowdesk or customer support, say: "I'm only set up to help with questions about Flowdesk. Is there something about our product I can help with?" Keep responses short and friendly.`

export async function POST(req: Request) {
  try {
    const { messages, sessionId } = await req.json()
    const supabase = await createClient()

    const lastMsg = messages[messages.length - 1]

    // Save user message
    await supabase.from('chat_messages').insert({
      session_id: sessionId,
      role: 'user',
      content: lastMsg.content
    })

    const response = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: SYSTEM },
        { role: 'user', content: lastMsg.content }
      ],
      max_tokens: 300
    })

    const reply = response.choices[0].message.content || ''

    // Save assistant message
    await supabase.from('chat_messages').insert({
      session_id: sessionId,
      role: 'assistant',
      content: reply
    })

    return NextResponse.json({ content: reply })

  } catch (error: any) {
    console.error('Chat error:', error)
    return NextResponse.json({
      content: 'Sorry, something went wrong. Please try again.'
    }, { status: 200 })
  }
}