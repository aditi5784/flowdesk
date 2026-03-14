'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function TeamPage() {
  const [members, setMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/admin/login'); return }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (profile?.role !== 'super_admin') {
        router.push('/admin/dashboard')
        return
      }

      setIsAdmin(true)
      const { data } = await supabase.from('profiles').select('*')
      setMembers(data || [])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-gray-400">Loading...</div>
    </div>
  )

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Team Members</h1>
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              {['Email', 'Role', 'Action'].map(h => (
                <th key={h} className="text-left py-3 px-4 font-medium text-gray-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {members.map(m => (
              <tr key={m.id} className="border-b">
                <td className="py-3 px-4">{m.email}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    m.role === 'super_admin'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {m.role === 'super_admin' ? 'Super Admin' : 'Member'}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {m.role !== 'super_admin' && (
                    <button
                      onClick={() => removeUser(m.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium">
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  async function removeUser(id: string) {
    const supabase = createClient()
    await supabase.from('profiles').delete().eq('id', id)
    setMembers(prev => prev.filter(m => m.id !== id))
  }
}