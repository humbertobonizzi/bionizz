'use client'
import Link from 'next/link'
import Logo from './Logo'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E2E6EF] shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={30} />
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <a href="/#ferramentas" className="text-sm text-[#6B7280] hover:text-[#1B2B5E] transition-colors font-medium">Ferramentas</a>
          <Link href="/privacidade" className="text-sm text-[#6B7280] hover:text-[#1B2B5E] transition-colors font-medium">Privacidade</Link>
        </nav>
      </div>
    </header>
  )
}
