import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AboutHero from '@/components/about/AboutHero'
import Values from '@/components/about/Values'
import Coaches from '@/components/about/Coaches'
import FacilityGrid from '@/components/about/FacilityGrid'
import CTA from '@/components/about/CTA'

export const metadata = {
  title: 'About — Boxing Gym',
  description: 'Our mission, coaches, and facilities.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar transparent={false} />
      <main>
         <AboutHero /> 
        <Values />
        <Coaches />
        <FacilityGrid />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
