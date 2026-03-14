import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const SYSTEM = `You are the Flowdesk Assistant — a friendly product expert for Flowdesk, a customer support ticketing platform for SaaS teams. You can help with features, pricing (Starter $49/mo, Growth $99/mo), and how to get started. If asked anything unrelated to Flowdesk or customer support, say: "I'm only set up to help with questions about Flowdesk. Is there something about our product I can help with?" Keep responses short and friendly.`

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash-8b',
      systemInstruction: SYSTEM
    })

    const lastMsg = messages[messages.length - 1]

    const chat = model.startChat({})
    const result = await chat.sendMessage(lastMsg.content)
    const reply = result.response.text()

    return NextResponse.json({ content: reply })
    
  } catch (error: any) {
    console.error('Chat error:', error)
    return NextResponse.json({ 
      content: 'Sorry, something went wrong. Please try again.' 
    }, { status: 200 })
  }
}