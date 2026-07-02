'use client'
import { useState } from 'react'

export default function FormatadorJSON() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null)
  const [copied, setCopied] = useState(false)

  const validate = (text: string): { ok: boolean; parsed: unknown; message: string } => {
    try {
      const parsed = JSON.parse(text)
      return { ok: true, parsed, message: 'JSON válido ✓' }
    } catch (e) {
      return { ok: false, parsed: null, message: `Erro: ${(e as Error).message}` }
    }
  }

  const format = () => {
    const v = validate(input)
    setStatus({ ok: v.ok, message: v.message })
    if (v.ok) setOutput(JSON.stringify(v.parsed, null, 2))
    else setOutput('')
  }

  const minify = () => {
    const v = validate(input)
    setStatus({ ok: v.ok, message: v.message })
    if (v.ok) setOutput(JSON.stringify(v.parsed))
    else setOutput('')
  }

  const check = () => {
    const v = validate(input)
    setStatus({ ok: v.ok, message: v.message })
    if (v.ok) setOutput(JSON.stringify(v.parsed, null, 2))
  }

  const copy = () => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium text-[#1B2B5E] mb-1">JSON de entrada</label>
        <textarea
          className="tool-textarea"
          placeholder={'{\n  "exemplo": "cole seu JSON aqui"\n}'}
          value={input}
          onChange={(e) => { setInput(e.target.value); setStatus(null) }}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={format} className="btn-primary">Formatar</button>
        <button onClick={minify} className="btn-primary">Minificar</button>
        <button onClick={check} className="btn-primary" style={{ background: '#6B7280' }}>Validar</button>
      </div>

      {status && (
        <div
          className={`text-sm px-3 py-2 rounded-lg font-medium ${
            status.ok
              ? 'bg-[#F0FDF9] text-[#065F46] border border-[#BBEDE0]'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {status.message}
        </div>
      )}

      {output && (
        <div className="relative">
          <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Resultado</label>
          <textarea className="tool-textarea" value={output} readOnly />
          <button
            onClick={copy}
            className="absolute top-8 right-3 text-xs px-3 py-1.5 rounded-md border border-[#E2E6EF] bg-white hover:border-[#00C896] transition-colors"
          >
            {copied ? '✓ Copiado' : 'Copiar'}
          </button>
        </div>
      )}
    </div>
  )
}
