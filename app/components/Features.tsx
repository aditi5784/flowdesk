const features = [
  {
    icon: '⚡',
    title: 'Smart Ticket Routing',
    desc: 'Automatically assign tickets to the right agent based on skills, availability, and past history. No more manual triage.'
  },
  {
    icon: '📊',
    title: 'SLA Tracking',
    desc: 'Set response time targets and get alerted before you breach them. Keep your team accountable with live dashboards.'
  },
  {
    icon: '🔗',
    title: 'Unified Inbox',
    desc: 'Email, chat, and in-app messages all in one place. Your team sees everything, no matter which channel the customer used.'
  },
  {
    icon: '📈',
    title: 'Reporting & Analytics',
    desc: 'Understand ticket volume trends, agent performance, and customer satisfaction scores in one clean report.'
  }
]

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gray-50 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">Everything your support team needs</h2>
        <p className="text-gray-500 text-center mb-16 text-lg">Built for teams that care about response times and customer happiness.</p>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map(f => (
            <div key={f.title} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}