'use client'
import { useState } from 'react'

export default function Pricing() {
  const [selected, setSelected] = useState('growth')

  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">Simple, honest pricing</h2>
        <p className="text-gray-500 text-center mb-16 text-lg">No per-ticket fees. No surprises.</p>
        <div className="grid md:grid-cols-2 gap-8">
          
          <div onClick={() => setSelected('starter')}
            className={`border-2 rounded-2xl p-8 cursor-pointer transition ${selected === 'starter' ? 'border-blue-600' : 'border-gray-200'}`}>
            <h3 className="text-2xl font-bold mb-2">Starter</h3>
            <div className="text-4xl font-bold mb-1">$49<span className="text-lg font-normal text-gray-400">/mo</span></div>
            <p className="text-gray-500 mb-6">Up to 3 agents</p>
            <ul className="space-y-3 text-gray-600 mb-8">
              {['Unified inbox','Basic routing','Email support','7-day reporting'].map(f => (
                <li key={f} className="flex gap-2">✓ {f}</li>
              ))}
            </ul>
            <a href="#demo" className="block text-center bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-700 transition">
              Get Started
            </a>
          </div>

          <div onClick={() => setSelected('growth')}
            className={`border-2 rounded-2xl p-8 cursor-pointer transition relative ${selected === 'growth' ? 'border-blue-600' : 'border-gray-200'}`}>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">Most Popular</div>
            <h3 className="text-2xl font-bold mb-2">Growth</h3>
            <div className="text-4xl font-bold mb-1">$99<span className="text-lg font-normal text-gray-400">/mo</span></div>
            <p className="text-gray-500 mb-6">Unlimited agents</p>
            <ul className="space-y-3 text-gray-600 mb-8">
              {['Everything in Starter','Smart routing + SLA tracking','Advanced analytics','Priority support','Custom integrations'].map(f => (
                <li key={f} className="flex gap-2">✓ {f}</li>
              ))}
            </ul>
            <a href="#demo" className="block text-center bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
              Get Started
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}