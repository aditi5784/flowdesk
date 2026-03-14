// app/admin/dashboard/LeadRow.tsx
'use client'
import { useState } from 'react'

const STATUSES = ['New', 'Contacted', 'Qualified', 'Demo Scheduled', 'Closed Won', 'Closed Lost']

const statusColors: Record<string, string> = {
  'New': 'bg-blue-100 text-blue-800',
  'Contacted': 'bg-yellow-100 text-yellow-800',
  'Qualified': 'bg-purple-100 text-purple-800',
  'Demo Scheduled': 'bg-indigo-100 text-indigo-800',
  'Closed Won': 'bg-green-100 text-green-800',
  'Closed Lost': 'bg-red-100 text-red-800',
}

export default function LeadRow({ lead, isAdmin }: { lead: any, isAdmin: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const [status, setStatus] = useState(lead.status)

  const updateStatus = async (newStatus: string) => {
    setStatus(newStatus)
    await fetch('/api/leads/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: lead.id, status: newStatus })
    })
  }

  return (
    <>
      <tr className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <td className="py-3 px-4">{lead.full_name}</td>
        <td className="py-3 px-4 text-gray-500">{lead.email}</td>
        <td className="py-3 px-4">{lead.company_name}</td>
        <td className="py-3 px-4 text-gray-500">{lead.company_size}</td>
        <td className="py-3 px-4 text-gray-500">{new Date(lead.created_at).toLocaleDateString()}</td>
        <td className="py-3 px-4" onClick={e => e.stopPropagation()}>
          {isAdmin ? (
            <select value={status} onChange={e => updateStatus(e.target.value)}
              className={`text-xs px-2 py-1 rounded-full border-0 font-medium ${statusColors[status]}`}>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          ) : (
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[status]}`}>{status}</span>
          )}
        </td>
      </tr>
      {expanded && (
        <tr className="bg-blue-50">
          <td colSpan={6} className="px-4 py-4">
            <div className="text-sm">
              <span className="font-medium">Phone:</span> {lead.phone || '—'}
              <span className="ml-6 font-medium">Message:</span> {lead.message}
            </div>
          </td>
        </tr>
      )}
    </>
  )
}