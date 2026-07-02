'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'all')
    setVisible(false)
  }

  const essential = () => {
    localStorage.setItem('cookie-consent', 'essential')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-4xl mx-auto bg-[#1B2B5E] text-white rounded-xl shadow-2xl p-5 flex flex-col md:flex-row items-start md:items-center gap-4">
        <p className="text-sm text-[#CBD5E1] flex-1 leading-relaxed">
          Usamos cookies próprios e de terceiros (Google AdSense) para análise de tráfego e exibição de publicidade personalizada, conforme a{' '}
          <Link href="/cookies" className="underline text-[#00C896]">Política de Cookies</Link> e a{' '}
          <Link href="/privacidade" className="underline text-[#00C896]">Política de Privacidade</Link>.
          Você pode escolher aceitar todos os cookies ou somente os essenciais ao funcionamento do site.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={essential}
            className="px-4 py-2 text-sm font-semibold border border-white/30 rounded-lg hover:bg-white/10 transition-colors whitespace-nowrap"
          >
            Apenas Essenciais
          </button>
          <button onClick={accept} className="btn-mint px-4 py-2 text-sm whitespace-nowrap">
            Aceitar Todos
          </button>
        </div>
      </div>
    </div>
  )
}
