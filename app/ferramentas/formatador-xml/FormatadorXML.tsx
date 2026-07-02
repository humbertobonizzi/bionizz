'use client'
import { useState } from 'react'
import xmlFormat from 'xml-formatter'

export default function FormatadorXML() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null)
  const [copied, setCopied] = useState(false)

  const handleFormat = () => {
    try {
      const result = xmlFormat(input, { indentation: '  ', collapseContent: true, lineSeparator: '\n' })
      setOutput(result)
      setStatus({ ok: true, message: 'XML válido ✓' })
    } catch (e) {
      setStatus({ ok: false, message: `Erro: ${(e as Error).message}` })
      setOutput('')
    }
  }

  const handleMinify = () => {
    try {
      const result = xmlFormat(input, { indentation: '', lineSeparator: '' })
      setOutput(result.replace(/\s+/g, ' ').trim())
      setStatus({ ok: true, message: 'XML minificado ✓' })
    } catch (e) {
      setStatus({ ok: false, message: `Erro: ${(e as Error).message}` })
      setOutput('')
    }
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
        <label className="block text-sm font-medium text-[#1B2B5E] mb-1">XML de entrada</label>
        <textarea
          className="tool-textarea"
          placeholder={'<?xml version="1.0"?>\n<root>\n  <item>Cole seu XML aqui</item>\n</root>'}
          value={input}
          onChange={(e) => { setInput(e.target.value); setStatus(null) }}
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        <button onClick={handleFormat} className="btn-primary">Formatar</button>
        <button onClick={handleMinify} className="btn-primary" style={{ background: '#6B7280' }}>Minificar</button>
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
          <label className="block text-sm font-medium text-[#1B2B5E] mb-1">XML formatado</label>
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
