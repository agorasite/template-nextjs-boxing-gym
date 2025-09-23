import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Promo from '@/components/Promo'
import Gallery from '@/components/Gallery'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar transparent />
      <main>
        <Hero />
        <Promo />
        <Gallery />
      </main>
      <Footer />
    </>
  )
}
