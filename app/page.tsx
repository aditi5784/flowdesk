import Hero from './components/Hero'
import Features from './components/Features'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import LeadForm from './components/LeadForm'
import ChatWidget from './components/ChatWidget'

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <LeadForm />
      <ChatWidget />
    </main>
  )
}