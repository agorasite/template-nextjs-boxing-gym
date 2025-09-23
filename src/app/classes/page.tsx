import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ClassesHero from '@/components/classes/ClassesHero'
import ClassesContent from '@/components/classes/ClassesContent'
import ClassesCTA from '@/components/classes/CTA'

export const metadata = {
  title: 'Classes — Boxing Gym',
  description: 'Browse our boxing and strength classes, find your fit, and book a trial.',
}

export default function ClassesPage() {
  return (
    <>
      <Navbar transparent={false} />
      <main>
        <ClassesHero />
        <ClassesContent />
        <ClassesCTA />
      </main>
      <Footer />
    </>
  )
}
