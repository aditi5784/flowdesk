'use client'
import { useState, useRef, useEffect } from 'react'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm the Flowdesk assistant. Ask me anything about our product — pricing, features, or how to get started." }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const createSession = async () => {
      const res = await fetch('/api/chat-session', { method: 'POST' })
      const data = await res.json()
      setSessionId(data.sessionId)
    }
    createSession()
  }, [])

  const send = async () => {
  if (!input.trim() || loading) return
  
  let currentSessionId = sessionId
  if (!currentSessionId) {
    const res = await fetch('/api/chat-session', { method: 'POST' })
    const data = await res.json()
    currentSessionId = data.sessionId
    setSessionId(currentSessionId)
  }

  const userMsg = { role: 'user', content: input }
  const newMessages = [...messages, userMsg]
  setMessages(newMessages)
  setInput('')
  setLoading(true)

  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: newMessages, sessionId: currentSessionId })
  })
  const data = await res.json()
  setMessages(prev => [...prev, { role: 'assistant', content: data.content }])
  setLoading(false)
}

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="w-80 h-[480px] bg-white rounded-2xl shadow-2xl border flex flex-col mb-4 overflow-hidden">
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
            <div>
              <div className="font-semibold">Flowdesk Assistant</div>
              <div className="text-xs text-blue-200">Ask me anything</div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white text-xl">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] text-sm px-4 py-3 rounded-2xl leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-white text-gray-800 shadow-sm border rounded-bl-sm'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border shadow-sm px-4 py-3 rounded-2xl rounded-bl-sm text-sm text-gray-400">
                  Typing...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="p-4 bg-white border-t flex gap-2">
            <input
              className="flex-1 border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Type a message..."
            />
            <button onClick={send}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-700 transition">
              Send
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl flex items-center justify-center text-2xl transition">
        {open ? '✕' : '💬'}
      </button>
    </div>
  )
}