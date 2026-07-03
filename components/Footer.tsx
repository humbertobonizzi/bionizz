import Link from 'next/link'
import { LogoMark } from './Logo'

export default function Footer() {
  return (
    <footer className="bg-[#1B2B5E] text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <LogoMark size={26} />
              <span className="font-mono-display font-bold text-lg">bionizz</span>
            </div>
            <p className="text-sm text-[#94A3C8] max-w-xs">Ferramentas online, gratuitas e sem cadastro. Tudo roda no seu navegador.</p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-[#94A3C8]">
            <Link href="/privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Política de Cookies</Link>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-[#2D4080] text-xs text-[#94A3C8]">
          <p>© {new Date().getFullYear()} bionizz — Todos os direitos reservados.</p>
          <p className="mt-1">
            Este site exibe anúncios do Google AdSense e usa cookies de terceiros para personalização de publicidade, conforme nossa{' '}
            <Link href="/cookies" className="underline hover:text-white">Política de Cookies</Link>.
          </p>
        </div>
      </div>
    </footer>
  )
}
