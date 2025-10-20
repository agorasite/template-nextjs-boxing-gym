'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import type { LucideIcon } from 'lucide-react'
import {
  Home as HomeIcon,
  Info,
  Dumbbell,
  CreditCard,
  Users,
  UserPlus,
  LogIn,
  Mail,
} from 'lucide-react'

type NavItem = { name: string; href: string; Icon: LucideIcon }

const items: NavItem[] = [
  { name: 'Home', href: '/', Icon: HomeIcon },
  { name: 'About', href: '/about', Icon: Info },
  { name: 'Classes', href: '/classes', Icon: Users },
  { name: 'Offerings', href: '/offerings', Icon: CreditCard },
  { name: 'Pricing', href: '/pricing', Icon: CreditCard },
  { name: 'Join us', href: '/join', Icon: Users },
  { name: 'Sign up', href: '/signup', Icon: UserPlus },
  { name: 'Login', href: '/login', Icon: LogIn },
  { name: 'Contact', href: '/contact', Icon: Mail },
]

export default function Navbar({ transparent = true }: { transparent?: boolean }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(!transparent)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 20 || !transparent)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [transparent])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        solid ? 'bg-neutral-950/90 backdrop-blur' : 'bg-transparent'
      }`}
      aria-label="Primary"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Gym logo" width={36} height={36} />
          <span className="text-lg font-semibold tracking-tight">BoxingGym</span>
        </Link>

        {/* Desktop menu */}
        <ul className="hidden items-end gap-6 md:flex">
          {items.map(({ name, href, Icon }) => {
            const active = isActive(href)
            return (
              <li key={name} className="pb-1">
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={[
                    'flex items-center gap-2 border-b-2 pb-1 text-sm transition-colors',
                    active
                      ? 'border-[var(--brand-red)] font-semibold text-white'
                      : 'border-transparent text-neutral-200 hover:text-white hover:border-white/20',
                  ].join(' ')}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span>{name}</span>
                </Link>
              </li>
            )
          })}
          <li className="pb-1">
            <Link
              href="/join"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white"
              style={{ background: 'var(--brand-red)' }}
            >
              <UserPlus className="h-4 w-4" aria-hidden="true" />
              Join now
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="inline-flex items-center justify-center rounded-md border border-white/10 p-2 md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((s) => !s)}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="mx-4 mb-4 rounded-2xl border border-white/10 bg-neutral-950/95 p-3 md:hidden">
          <ul className="flex flex-col">
            {items.map(({ name, href, Icon }) => {
              const active = isActive(href)
              return (
                <li key={name}>
                  <Link
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    className={[
                      'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium',
                      active
                        ? 'border-l-2 border-[var(--brand-red)] bg-white/10 font-semibold text-white'
                        : 'text-neutral-200 hover:bg-white/5',
                    ].join(' ')}
                    onClick={() => setOpen(false)}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span>{name}</span>
                  </Link>
                </li>
              )
            })}
            <li className="pt-2">
              <Link
                href="/join"
                className="flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-white"
                style={{ background: 'var(--brand-red)' }}
                onClick={() => setOpen(false)}
              >
                <UserPlus className="h-4 w-4" aria-hidden="true" />
                Join now
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
