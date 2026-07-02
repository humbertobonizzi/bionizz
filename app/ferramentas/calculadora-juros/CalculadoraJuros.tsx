'use client'
import { useState, useMemo } from 'react'

const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function CalculadoraJuros() {
  const [capital, setCapital] = useState('10000')
  const [taxa, setTaxa] = useState('1')
  const [periodo, setPeriodo] = useState('24')
  const [taxaUnit, setTaxaUnit] = useState<'mensal' | 'anual'>('mensal')
  const [periodoUnit, setPeriodoUnit] = useState<'meses' | 'anos'>('meses')
  const [aporte, setAporte] = useState('0')

  const result = useMemo(() => {
    const C = parseFloat(capital) || 0
    const taxaRaw = parseFloat(taxa) / 100 || 0
    const periodoRaw = parseFloat(periodo) || 0
    const A = parseFloat(aporte) || 0

    // Convert to monthly
    const taxaMensal = taxaUnit === 'mensal' ? taxaRaw : Math.pow(1 + taxaRaw, 1/12) - 1
    const meses = periodoUnit === 'meses' ? periodoRaw : periodoRaw * 12

    if (taxaMensal <= 0 || meses <= 0 || C < 0) return null

    const rows: { ano: number; montante: number; totalInvestido: number; juros: number }[] = []
    let montante = C

    for (let m = 1; m <= meses; m++) {
      montante = montante * (1 + taxaMensal) + A
      if (m % 12 === 0 || m === meses) {
        const totalInvestido = C + A * m
        rows.push({
          ano: Math.ceil(m / 12),
          montante,
          totalInvestido,
          juros: montante - totalInvestido,
        })
      }
    }

    const ultimo = rows[rows.length - 1]
    return { montante: ultimo?.montante ?? 0, totalInvestido: ultimo?.totalInvestido ?? 0, juros: ultimo?.juros ?? 0, rows }
  }, [capital, taxa, periodo, taxaUnit, periodoUnit, aporte])

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Capital inicial (R$)</label>
          <input type="number" className="tool-input" value={capital} onChange={(e) => setCapital(e.target.value)} min="0" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Aporte mensal (R$)</label>
          <input type="number" className="tool-input" value={aporte} onChange={(e) => setAporte(e.target.value)} min="0" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Taxa de juros (%)</label>
          <div className="flex gap-2">
            <input type="number" className="tool-input flex-1" value={taxa} onChange={(e) => setTaxa(e.target.value)} min="0" step="0.1" />
            <select className="tool-input w-auto" value={taxaUnit} onChange={(e) => setTaxaUnit(e.target.value as 'mensal' | 'anual')}>
              <option value="mensal">a.m.</option>
              <option value="anual">a.a.</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Período</label>
          <div className="flex gap-2">
            <input type="number" className="tool-input flex-1" value={periodo} onChange={(e) => setPeriodo(e.target.value)} min="1" />
            <select className="tool-input w-auto" value={periodoUnit} onChange={(e) => setPeriodoUnit(e.target.value as 'meses' | 'anos')}>
              <option value="meses">Meses</option>
              <option value="anos">Anos</option>
            </select>
          </div>
        </div>
      </div>

      {result ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-[#F0FDF9] border border-[#BBEDE0] rounded-lg p-4">
              <div className="text-xs text-[#6B7280] mb-1">Montante Final</div>
              <div className="font-mono-display font-bold text-xl text-[#1B2B5E]">{fmt(result.montante)}</div>
            </div>
            <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-lg p-4">
              <div className="text-xs text-[#6B7280] mb-1">Total Investido</div>
              <div className="font-mono-display font-bold text-xl text-[#1B2B5E]">{fmt(result.totalInvestido)}</div>
            </div>
            <div className="bg-[#FFF7ED] border border-[#FDE68A] rounded-lg p-4">
              <div className="text-xs text-[#6B7280] mb-1">Juros Ganhos</div>
              <div className="font-mono-display font-bold text-xl text-[#C2410C]">{fmt(result.juros)}</div>
            </div>
          </div>

          {result.rows.length > 0 && (
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[#6B7280] border-b border-[#E2E6EF]">
                    <th className="text-left py-2 font-medium">Ano</th>
                    <th className="text-right py-2 font-medium">Montante</th>
                    <th className="text-right py-2 font-medium">Investido</th>
                    <th className="text-right py-2 font-medium">Juros</th>
                  </tr>
                </thead>
                <tbody>
                  {result.rows.map((r, i) => (
                    <tr key={i} className="border-b border-[#E2E6EF] last:border-0 hover:bg-[#F7F8FA]">
                      <td className="py-2">{r.ano}</td>
                      <td className="py-2 text-right font-mono-display text-xs">{fmt(r.montante)}</td>
                      <td className="py-2 text-right font-mono-display text-xs">{fmt(r.totalInvestido)}</td>
                      <td className="py-2 text-right font-mono-display text-xs text-[#00A87E]">{fmt(r.juros)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <div className="result-box">
          <span className="text-[#6B7280] text-sm">Preencha os campos para simular</span>
        </div>
      )}
    </div>
  )
}
