'use client'
import { useState, useMemo } from 'react'
import { limparNumero, validarCPF, validarCNPJ, formatarCPF, formatarCNPJ, gerarCPF, gerarCNPJ } from '@/lib/cpfCnpj'

export default function ValidadorCpfCnpj() {
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState(false)

  const status = useMemo(() => {
    const digitos = limparNumero(input)
    if (digitos.length === 0) return null

    if (digitos.length === 11) {
      const valido = validarCPF(digitos)
      return { tipo: 'CPF', formatado: formatarCPF(digitos), valido, message: valido ? 'CPF válido ✓' : 'CPF inválido ✗' }
    }

    if (digitos.length === 14) {
      const valido = validarCNPJ(digitos)
      return { tipo: 'CNPJ', formatado: formatarCNPJ(digitos), valido, message: valido ? 'CNPJ válido ✓' : 'CNPJ inválido ✗' }
    }

    return { tipo: null, formatado: digitos, valido: false, message: 'Digite um número com 11 (CPF) ou 14 (CNPJ) dígitos' }
  }, [input])

  const copy = () => {
    if (!status) return
    navigator.clipboard.writeText(status.formatado).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium text-[#1B2B5E] mb-1">CPF ou CNPJ</label>
        <input
          type="text"
          className="tool-input font-mono-display"
          placeholder="Digite ou cole um CPF ou CNPJ"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={() => setInput(gerarCPF())} className="btn-primary">Gerar CPF</button>
        <button onClick={() => setInput(gerarCNPJ())} className="btn-primary" style={{ background: '#6B7280' }}>Gerar CNPJ</button>
      </div>

      {status && (
        <>
          <div
            className={`text-sm px-3 py-2 rounded-lg font-medium ${
              status.valido
                ? 'bg-[#F0FDF9] text-[#065F46] border border-[#BBEDE0]'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {status.message}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Formatado</label>
            <input type="text" className="tool-input font-mono-display" value={status.formatado} readOnly />
            <button
              onClick={copy}
              className="absolute top-8 right-3 text-xs px-3 py-1.5 rounded-md border border-[#E2E6EF] bg-white hover:border-[#00C896] transition-colors"
            >
              {copied ? '✓ Copiado' : 'Copiar'}
            </button>
          </div>
        </>
      )}

      <div className="text-xs text-[#6B7280]">
        Os números gerados são aleatórios e estruturalmente válidos, mas não pertencem a pessoas ou empresas reais — use apenas para testes de sistemas.
      </div>
    </div>
  )
}
