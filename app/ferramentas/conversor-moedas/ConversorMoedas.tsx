'use client'
import { useState, useEffect } from 'react'

const CURRENCIES = ['BRL', 'USD', 'EUR', 'GBP', 'ARS', 'JPY', 'CAD', 'CHF']
const CURRENCY_NAMES: Record<string, string> = {
  BRL: 'Real Brasileiro',
  USD: 'Dólar Americano',
  EUR: 'Euro',
  GBP: 'Libra Esterlina',
  ARS: 'Peso Argentino',
  JPY: 'Iene Japonês',
  CAD: 'Dólar Canadense',
  CHF: 'Franco Suíço',
}

export default function ConversorMoedas() {
  const [rates, setRates] = useState<Record<string, number> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatedAt, setUpdatedAt] = useState('')
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('BRL')
  const [value, setValue] = useState('1')

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/BRL')
      .then((r) => r.json())
      .then((data) => {
        if (data.result === 'success') {
          setRates(data.rates)
          setUpdatedAt(new Date(data.time_last_update_unix * 1000).toLocaleDateString('pt-BR'))
        } else {
          setError('Falha ao carregar taxas de câmbio.')
        }
      })
      .catch(() => setError('Erro de conexão. Verifique sua internet.'))
      .finally(() => setLoading(false))
  }, [])

  const convert = () => {
    if (!rates) return null
    const num = parseFloat(value)
    if (isNaN(num)) return null
    // rates are relative to BRL base
    const inBRL = num / rates[from]
    return inBRL * rates[to]
  }

  const result = convert()

  const swap = () => {
    setFrom(to)
    setTo(from)
  }

  return (
    <div className="flex flex-col gap-6">
      {loading && (
        <div className="flex items-center gap-2 text-[#6B7280] text-sm">
          <span className="w-4 h-4 border-2 border-[#00C896] border-t-transparent rounded-full animate-spin" />
          Carregando taxas de câmbio...
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">{error}</div>
      )}

      {!loading && !error && rates && (
        <>
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Valor</label>
              <input
                type="number"
                className="tool-input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="1"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-[#1B2B5E] mb-1">De</label>
              <select className="tool-input" value={from} onChange={(e) => setFrom(e.target.value)}>
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>{c} — {CURRENCY_NAMES[c]}</option>
                ))}
              </select>
            </div>
            <button
              onClick={swap}
              className="pb-2 text-xl text-[#6B7280] hover:text-[#1B2B5E] transition-colors"
              title="Inverter"
            >
              ⇄
            </button>
            <div className="flex-1">
              <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Para</label>
              <select className="tool-input" value={to} onChange={(e) => setTo(e.target.value)}>
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>{c} — {CURRENCY_NAMES[c]}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="result-box">
            {result !== null ? (
              <div>
                <span className="text-lg font-bold">
                  {result.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                </span>
                <span className="ml-2 text-sm text-[#6B7280]">{to}</span>
              </div>
            ) : (
              <span className="text-[#6B7280] text-sm">Digite um valor para converter</span>
            )}
          </div>

          <p className="text-xs text-[#6B7280]">
            Taxas atualizadas em: {updatedAt} · As taxas são aproximadas e podem diferir das taxas comerciais.
          </p>
        </>
      )}
    </div>
  )
}
