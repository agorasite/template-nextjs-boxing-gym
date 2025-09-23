import Link from 'next/link'

const menu = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Classes', href: '/classes' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Join us', href: '/join' },
  { name: 'Sign up', href: '/signup' },
  { name: 'Login', href: '/login' },
  { name: 'Contact', href: '/contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/10 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold">BoxingGym</h3>
            <p className="mt-3 text-sm text-white/60">
              123 Boxing St, Athens, GR • +30 210 123 4567
            </p>
            <p className="mt-1 text-sm text-white/60">Open: Mon–Sat, 07:00–22:00</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Menu</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {menu.map((m) => (
                <li key={m.name}>
                  <Link href={m.href} className="text-white/80 hover:text-white">
                    {m.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/terms" className="text-white/80 hover:text-white">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-white/80 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/cookies" className="text-white/80 hover:text-white">Cookie Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Follow</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="#" className="text-white/80 hover:text-white">Instagram</a></li>
              <li><a href="#" className="text-white/80 hover:text-white">Facebook</a></li>
              <li><a href="#" className="text-white/80 hover:text-white">YouTube</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/60">© {year} BoxingGym. All rights reserved.</p>
          <p className="text-xs text-white/60">
            Powered by{' '}
            <a href="https://agorasite.gr" className="underline hover:text-white" target="_blank" rel="noreferrer">
              agorasite.gr
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
