const testimonials = [
  { name: 'Sarah Chen', role: 'Head of Support, Loomly', quote: 'We cut our average response time from 6 hours to 45 minutes in the first month. Our CSAT score went from 72% to 94%.' },
  { name: 'Marcus Webb', role: 'CTO, Paperform', quote: 'Finally a tool that doesn\'t require a 3-month onboarding. We were live in a day and the team actually likes using it.' },
  { name: 'Priya Nair', role: 'Customer Success Lead, Rows', quote: 'The SLA tracking alone is worth it. We know before a ticket breaches and can act — no more angry escalations.' }
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-blue-950 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-16">Loved by support teams worldwide</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map(t => (
            <div key={t.name} className="bg-white/10 rounded-2xl p-8 border border-white/10">
              <p className="text-blue-100 mb-6 leading-relaxed">"{t.quote}"</p>
              <div>
                <div className="font-semibold text-white">{t.name}</div>
                <div className="text-blue-400 text-sm">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}