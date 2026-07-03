'use client'
import { useState, useCallback, useEffect } from 'react'

type Harmonia = 'aleatoria' | 'complementar' | 'analoga' | 'triadica' | 'monocromatica'

function hslToHex(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360
  s /= 100
  l /= 100
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  const toHex = (n: number) => Math.round(255 * f(n)).toString(16).padStart(2, '0')
  return `#${toHex(0)}${toHex(8)}${toHex(4)}`
}

function gerarPaleta(harmonia: Harmonia): string[] {
  const baseHue = Math.floor(Math.random() * 360)
  const s = 55 + Math.random() * 30

  switch (harmonia) {
    case 'complementar':
      return [
        hslToHex(baseHue, s, 35),
        hslToHex(baseHue, s, 55),
        hslToHex(baseHue, s, 75),
        hslToHex(baseHue + 180, s, 55),
        hslToHex(baseHue + 180, s, 35),
      ]
    case 'analoga':
      return [-30, -15, 0, 15, 30].map((d) => hslToHex(baseHue + d, s, 55))
    case 'triadica':
      return [
        hslToHex(baseHue, s, 45),
        hslToHex(baseHue, s, 65),
        hslToHex(baseHue + 120, s, 55),
        hslToHex(baseHue + 240, s, 55),
        hslToHex(baseHue + 120, s, 35),
      ]
    case 'monocromatica':
      return [20, 35, 50, 65, 80].map((l) => hslToHex(baseHue, s, l))
    case 'aleatoria':
    default:
      return Array.from({ length: 5 }, () => hslToHex(Math.floor(Math.random() * 360), 45 + Math.random() * 40, 35 + Math.random() * 40))
  }
}

export default function GeradorPaletaCores() {
  const [harmonia, setHarmonia] = useState<Harmonia>('aleatoria')
  const [paleta, setPaleta] = useState<string[]>([])
  const [copiado, setCopiado] = useState<string | null>(null)

  const gerar = useCallback((h: Harmonia = harmonia) => {
    setPaleta(gerarPaleta(h))
  }, [harmonia])

  useEffect(() => {
    setPaleta(gerarPaleta('aleatoria'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const trocarHarmonia = (h: Harmonia) => {
    setHarmonia(h)
    gerar(h)
  }

  const copiar = (hex: string) => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopiado(hex)
      setTimeout(() => setCopiado(null), 1500)
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Harmonia</label>
        <select
          className="tool-input"
          value={harmonia}
          onChange={(e) => trocarHarmonia(e.target.value as Harmonia)}
        >
          <option value="aleatoria">Aleatória</option>
          <option value="complementar">Complementar</option>
          <option value="analoga">Análoga</option>
          <option value="triadica">Tríade</option>
          <option value="monocromatica">Monocromática</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {paleta.map((hex, i) => (
          <button
            key={`${hex}-${i}`}
            onClick={() => copiar(hex)}
            className="group flex flex-col rounded-lg overflow-hidden border border-[#E2E6EF] hover:shadow-md transition-shadow"
          >
            <div className="h-24 w-full" style={{ backgroundColor: hex }} />
            <div className="bg-white py-2 px-2 text-center">
              <span className="font-mono-display text-xs text-[#1B2B5E]">
                {copiado === hex ? '✓ Copiado' : hex.toUpperCase()}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div>
        <button onClick={() => gerar()} className="btn-mint">
          🎲 Gerar Nova Paleta
        </button>
      </div>

      <div className="text-xs text-[#6B7280]">
        Clique em uma cor para copiar o código hexadecimal.
      </div>
    </div>
  )
}
