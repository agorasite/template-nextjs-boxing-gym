import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ClassesHero from '@/components/classes/ClassesHero'
import ClassesContent from '@/components/classes/ClassesContent'
import ClassesCTA from '@/components/classes/CTA'
import { fetchClasses } from '@/lib/classes'

export const metadata = {
  title: 'Classes — Boxing Gym',
  description: 'Browse our boxing and strength classes, find your fit, and book a trial.',
}
export const revalidate = 300 // optional ISR

export default async function ClassesPage() {
  const classes = await fetchClasses()

  return (
    <>
      <Navbar transparent={false} />
      <main>
        <ClassesHero />
        <ClassesContent initialClasses={classes}/>
        <ClassesCTA />
      </main>
      <Footer />
    </>
  )
}
