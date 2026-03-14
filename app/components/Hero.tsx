export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 flex items-center justify-center text-white px-6">
      <div className="max-w-3xl text-center">
        <div className="inline-block bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm px-4 py-1 rounded-full mb-6">
          Now in public beta
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Support tickets,<br />finally under control
        </h1>
        <p className="text-xl text-blue-200 mb-10 max-w-xl mx-auto">
          Flowdesk gives growing SaaS teams one place to manage customer support — fast routing, SLA tracking, and reporting that actually makes sense.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#demo" className="bg-white text-blue-900 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition">
            Request a Demo
          </a>
          <a href="#features" className="border border-white/30 text-white px-8 py-4 rounded-xl hover:bg-white/10 transition">
            See How It Works
          </a>
        </div>
      </div>
    </section>
  )
}