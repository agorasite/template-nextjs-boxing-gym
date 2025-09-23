import Image from 'next/image'

const images = [
  '/images/gym-1.jpg',
  '/images/gym-2.jpg',
  '/images/gym-3.jpg',
  '/images/gym-4.jpg',
  '/images/gym-5.jpg',
  '/images/gym-6.jpg',
  '/images/gym-7.jpg',
  '/images/gym-8.jpg',
  '/images/gym-9.jpg',
  '/images/gym-10.jpg',
  '/images/gym-11.jpg',
  '/images/gym-12.jpg',
]

export default function Gallery() {
  return (
    <section className="bg-neutral-950 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold">Inside the Gym</h2>
          <p className="text-sm text-white/60">Tap an image to view it larger.</p>
        </div>

        {/* 3–6 per row (responsive) */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {images.map((src, i) => (
            <figure key={src} className="group relative overflow-hidden rounded-xl">
              <Image
                src={src}
                alt={`Gym photo ${i + 1}`}
                className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105 lg:h-44 xl:h-40"
                width={600}
                height={400}
                priority={i < 6}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
