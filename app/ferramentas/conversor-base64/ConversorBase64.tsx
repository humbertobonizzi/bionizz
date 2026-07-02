'use client'
import { useState } from 'react'

function encodeBase64(text: string): string {
  const bytes = new TextEncoder().encode(text)
  let binary = ''
  bytes.forEach((b) => (binary += String.fromCharCode(b)))
  return btoa(binary)
}

function decodeBase64(b64: string): string {
  const binary = atob(b64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return new TextDecoder().decode(bytes)
}

export default function ConversorBase64() {
  const [text, setText] = useState('')
  const [b64, setB64] = useState('')
  const [error, setError] = useState('')
  const [copiedText, setCopiedText] = useState(false)
  const [copiedB64, setCopiedB64] = useState(false)

  const encode = () => {
    setError('')
    try {
      setB64(encodeBase64(text))
    } catch (e) {
      setError((e as Error).message)
    }
  }

  const decode = () => {
    setError('')
    try {
      setText(decodeBase64(b64))
    } catch {
      setError('Base64 inválido. Verifique o texto e tente novamente.')
    }
  }

  const copy = (value: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="flex flex-col gap-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[#1B2B5E]">Texto original</label>
            <button
              onClick={() => copy(text, setCopiedText)}
              className="text-xs px-2 py-1 rounded border border-[#E2E6EF] bg-white hover:border-[#00C896] transition-colors"
            >
              {copiedText ? '✓' : 'Copiar'}
            </button>
          </div>
          <textarea
            className="tool-textarea flex-1"
            style={{ minHeight: 180 }}
            placeholder="Digite ou cole o texto aqui..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={encode} className="btn-mint">
            Codificar → Base64
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[#1B2B5E]">Base64</label>
            <button
              onClick={() => copy(b64, setCopiedB64)}
              className="text-xs px-2 py-1 rounded border border-[#E2E6EF] bg-white hover:border-[#00C896] transition-colors"
            >
              {copiedB64 ? '✓' : 'Copiar'}
            </button>
          </div>
          <textarea
            className="tool-textarea flex-1"
            style={{ minHeight: 180 }}
            placeholder="Cole Base64 aqui para decodificar..."
            value={b64}
            onChange={(e) => setB64(e.target.value)}
          />
          <button onClick={decode} className="btn-primary">
            ← Decodificar Base64
          </button>
        </div>
      </div>

      <p className="text-xs text-[#6B7280]">
        Suporte completo a UTF-8 — emojis e caracteres especiais são preservados corretamente.
      </p>
    </div>
  )
}
