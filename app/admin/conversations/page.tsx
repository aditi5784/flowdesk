'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function Conversations() {
  const [sessions, setSessions] = useState<any[]>([])
  const [selected, setSelected] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/admin/login'); return }
      const { data } = await supabase.from('chat_sessions').select('*').order('created_at', { ascending: false })
      setSessions(data || [])
    }
    load()
  }, [])

  const openSession = async (session: any) => {
    setSelected(session)
    const supabase = await createClient()
    const { data } = await supabase.from('chat_messages').select('*')
      .eq('session_id', session.id).order('created_at', { ascending: true })
    setMessages(data || [])
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Conversations</h1>
      <div className="flex gap-6">
        <div className="w-64 bg-white rounded-2xl border shadow-sm overflow-hidden">
          {sessions.length === 0 && (
            <div className="p-6 text-sm text-gray-400">No conversations yet.</div>
          )}
          {sessions.map(s => (
            <div key={s.id} onClick={() => openSession(s)}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition ${selected?.id === s.id ? 'bg-blue-50' : ''}`}>
              <div className="text-sm font-medium">{s.visitor_email || 'Anonymous visitor'}</div>
              <div className="text-xs text-gray-400">{new Date(s.created_at).toLocaleString()}</div>
            </div>
          ))}
        </div>
        <div className="flex-1 bg-white rounded-2xl border shadow-sm p-6">
          {!selected ? (
            <div className="text-gray-400 text-sm">Select a conversation to view messages.</div>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {messages.map(m => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm ${
                    m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
                  }`}>
                    <div>{m.content}</div>
                    <div className={`text-xs mt-1 ${m.role === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                      {new Date(m.created_at).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}