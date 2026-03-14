import { createClient } from '@/lib/supabase/server'
import LeadRow from './LeadRow'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  const { data: leads } = await supabase.from('leads').select('*').order('created_at', { ascending: false })
  const isAdmin = profile?.role === 'super_admin'

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Leads</h1>
        <span className="text-sm text-gray-400">{leads?.length || 0} total</span>
      </div>
      <div className="bg-white rounded-2xl border overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              {['Name','Email','Company','Size','Date','Status'].map(h => (
                <th key={h} className="text-left py-3 px-4 font-medium text-gray-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads?.map(lead => (
              <LeadRow key={lead.id} lead={lead} isAdmin={isAdmin} />
            ))}
          </tbody>
        </table>
        {(!leads || leads.length === 0) && (
          <div className="text-center py-12 text-gray-400">No leads yet. Submit the demo form to see them here.</div>
        )}
      </div>
    </div>
  )
}