'use client'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

export default function LeadForm() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = async (data: any) => {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (res.ok) { reset(); setSubmitted(true) }
  }

  return (
    <section id="demo" className="py-24 bg-gray-50 px-6">
      <div className="max-w-xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">Book a demo</h2>
        <p className="text-gray-500 text-center mb-10">We'll show you around and answer any questions.</p>
        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-xl font-semibold text-green-800">You're on the list!</h3>
            <p className="text-green-700 mt-2">We'll reach out within one business day.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-8 rounded-2xl border shadow-sm">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name *</label>
              <input {...register('full_name', { required: 'Required' })}
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Jane Smith" />
              {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name.message as string}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Work Email *</label>
              <input {...register('email', { required: 'Required', pattern: { value: /\S+@\S+\.\S+/, message: 'Enter a valid email' } })}
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="jane@company.com" />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Company Name *</label>
              <input {...register('company_name', { required: 'Required' })}
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Acme Inc." />
              {errors.company_name && <p className="text-red-500 text-sm mt-1">{errors.company_name.message as string}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input {...register('phone')}
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+1 555 000 0000" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Company Size *</label>
              <select {...register('company_size', { required: 'Required' })}
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option value="">Select size</option>
                <option value="1-10">1–10 employees</option>
                <option value="11-50">11–50 employees</option>
                <option value="51-200">51–200 employees</option>
                <option value="200+">200+ employees</option>
              </select>
              {errors.company_size && <p className="text-red-500 text-sm mt-1">{errors.company_size.message as string}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">What are you looking for? *</label>
              <textarea {...register('message', { required: 'Required' })}
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-28 resize-none"
                placeholder="Tell us about your team and what's not working today..." />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message as string}</p>}
            </div>
            <button type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition">
              Request Demo →
            </button>
          </form>
        )}
      </div>
    </section>
  )
}