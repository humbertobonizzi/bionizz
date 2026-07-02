'use client'
import { useState } from 'react'
import { format } from 'sql-formatter'

type Dialect = 'sql' | 'mysql' | 'postgresql' | 'tsql'

const DIALECT_LABELS: Record<Dialect, string> = {
  sql: 'SQL Padrão',
  mysql: 'MySQL',
  postgresql: 'PostgreSQL',
  tsql: 'T-SQL (SQL Server)',
}

export default function FormatadorSQL() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [dialect, setDialect] = useState<Dialect>('sql')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleFormat = () => {
    try {
      const result = format(input, { language: dialect, keywordCase: 'upper', indentStyle: 'standard' })
      setOutput(result)
      setError('')
    } catch (e) {
      setError((e as Error).message)
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
        <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Dialeto SQL</label>
        <select
          className="tool-input"
          value={dialect}
          onChange={(e) => setDialect(e.target.value as Dialect)}
        >
          {(Object.entries(DIALECT_LABELS) as [Dialect, string][]).map(([v, l]) => (
            <option key={v} value={v}>{l}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1B2B5E] mb-1">SQL de entrada</label>
        <textarea
          className="tool-textarea"
          placeholder="SELECT * FROM usuarios WHERE id = 1 AND ativo = true ORDER BY nome ASC;"
          value={input}
          onChange={(e) => { setInput(e.target.value); setError('') }}
        />
      </div>

      <button onClick={handleFormat} className="btn-primary self-start">Formatar SQL</button>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
          Erro: {error}
        </div>
      )}

      {output && (
        <div className="relative">
          <label className="block text-sm font-medium text-[#1B2B5E] mb-1">SQL formatado</label>
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
