'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isLogin = pathname === '/admin/login'

  const logout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (isLogin) return <>{children}</>

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-56 bg-gray-950 text-white flex flex-col">
        <div className="p-6 font-bold text-lg border-b border-white/10">Flowdesk</div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { href: '/admin/dashboard', label: 'Leads' },
            { href: '/admin/conversations', label: 'Conversations' },
            { href: '/admin/team', label: 'Team' },
          ].map(({ href, label }) => (
            <Link key={href} href={href}
              className={`block px-4 py-2 rounded-lg text-sm transition ${
                pathname === href ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-white/10'
              }`}>
              {label}
            </Link>
          ))}
        </nav>
        <button onClick={logout} className="p-4 text-gray-500 hover:text-white text-sm text-left transition">
          Sign out
        </button>
      </aside>
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  )
}