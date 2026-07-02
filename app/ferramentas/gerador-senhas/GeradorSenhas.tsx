'use client'
import { useState, useCallback } from 'react'

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWER = 'abcdefghijklmnopqrstuvwxyz'
const DIGITS = '0123456789'
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?'

function calcEntropy(charset: number, length: number) {
  return Math.log2(Math.pow(charset, length))
}

function getStrength(entropy: number): { label: string; color: string; width: string } {
  if (entropy < 40) return { label: 'Fraca', color: '#EF4444', width: '25%' }
  if (entropy < 60) return { label: 'Média', color: '#EAB308', width: '50%' }
  if (entropy < 80) return { label: 'Forte', color: '#22C55E', width: '75%' }
  return { label: 'Muito Forte', color: '#00C896', width: '100%' }
}

function generate(length: number, upper: boolean, lower: boolean, digits: boolean, symbols: boolean) {
  let charset = ''
  if (upper) charset += UPPER
  if (lower) charset += LOWER
  if (digits) charset += DIGITS
  if (symbols) charset += SYMBOLS
  if (!charset) charset = LOWER

  const arr = new Uint32Array(length)
  crypto.getRandomValues(arr)
  return Array.from(arr).map((n) => charset[n % charset.length]).join('')
}

export default function GeradorSenhas() {
  const [length, setLength] = useState(16)
  const [upper, setUpper] = useState(true)
  const [lower, setLower] = useState(true)
  const [digits, setDigits] = useState(true)
  const [symbols, setSymbols] = useState(false)
  const [count, setCount] = useState(1)
  const [passwords, setPasswords] = useState<string[]>([])
  const [copied, setCopied] = useState<number | null>(null)

  const charsetSize =
    (upper ? 26 : 0) + (lower ? 26 : 0) + (digits ? 10 : 0) + (symbols ? SYMBOLS.length : 0) || 26
  const entropy = calcEntropy(charsetSize, length)
  const strength = getStrength(entropy)

  const handleGenerate = useCallback(() => {
    setPasswords(Array.from({ length: count }, () => generate(length, upper, lower, digits, symbols)))
    setCopied(null)
  }, [length, upper, lower, digits, symbols, count])

  const copy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(idx)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Options */}
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-[#1B2B5E] mb-1">
            Comprimento: <span className="text-[#00C896]">{length} caracteres</span>
          </label>
          <input
            type="range"
            min={8}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-[#00C896]"
          />
          <div className="flex justify-between text-xs text-[#6B7280] mt-1">
            <span>8</span><span>64</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {[
            { label: 'Maiúsculas (A-Z)', value: upper, set: setUpper },
            { label: 'Minúsculas (a-z)', value: lower, set: setLower },
            { label: 'Números (0-9)', value: digits, set: setDigits },
            { label: 'Símbolos (!@#...)', value: symbols, set: setSymbols },
          ].map(({ label, value, set }) => (
            <label key={label} className="flex items-center gap-2 cursor-pointer select-none text-sm">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => set(e.target.checked)}
                className="accent-[#00C896] w-4 h-4"
              />
              {label}
            </label>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Quantidade</label>
            <select
              className="tool-input w-auto"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
            >
              {[1,2,3,5,10].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <div className="text-xs text-[#6B7280] mb-1">Força estimada</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-[#E2E6EF] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: strength.width, background: strength.color }}
                />
              </div>
              <span className="text-xs font-semibold" style={{ color: strength.color }}>{strength.label}</span>
            </div>
            <div className="text-xs text-[#6B7280] mt-0.5">Entropia: {entropy.toFixed(0)} bits</div>
          </div>
        </div>
      </div>

      <button onClick={handleGenerate} className="btn-mint">
        🎲 Gerar {count > 1 ? `${count} Senhas` : 'Senha'}
      </button>

      {passwords.length > 0 && (
        <div className="flex flex-col gap-2">
          {passwords.map((pw, i) => (
            <div key={i} className="flex items-center gap-2 bg-[#F7F8FA] border border-[#E2E6EF] rounded-lg p-3">
              <span className="font-mono-display text-sm flex-1 break-all text-[#1B2B5E]">{pw}</span>
              <button
                onClick={() => copy(pw, i)}
                className="shrink-0 text-xs px-3 py-1.5 rounded-md border border-[#E2E6EF] bg-white hover:border-[#00C896] transition-colors"
              >
                {copied === i ? '✓ Copiado' : 'Copiar'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
