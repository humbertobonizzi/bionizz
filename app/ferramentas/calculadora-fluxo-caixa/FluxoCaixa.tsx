'use client'
import { useState, useMemo } from 'react'

const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

type Tipo = 'entrada' | 'saida'
type Recorrencia = 'unica' | 'mensal'

interface Lancamento {
  id: number
  descricao: string
  valor: number
  tipo: Tipo
  recorrencia: Recorrencia
}

let nextId = 1

export default function FluxoCaixa() {
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([])
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [tipo, setTipo] = useState<Tipo>('entrada')
  const [recorrencia, setRecorrencia] = useState<Recorrencia>('unica')
  const [meses, setMeses] = useState('12')

  const adicionar = () => {
    const v = parseFloat(valor)
    if (!descricao.trim() || !v || v <= 0) return
    setLancamentos((prev) => [...prev, { id: nextId++, descricao: descricao.trim(), valor: v, tipo, recorrencia }])
    setDescricao('')
    setValor('')
  }

  const remover = (id: number) => {
    setLancamentos((prev) => prev.filter((l) => l.id !== id))
  }

  const result = useMemo(() => {
    const numMeses = Math.max(1, Math.min(60, parseInt(meses) || 1))
    if (lancamentos.length === 0) return null

    const rows: { mes: number; entradas: number; saidas: number; saldoMes: number; saldoAcumulado: number }[] = []
    let saldoAcumulado = 0
    let totalEntradas = 0
    let totalSaidas = 0

    for (let m = 1; m <= numMeses; m++) {
      let entradas = 0
      let saidas = 0
      for (const l of lancamentos) {
        if (l.recorrencia === 'mensal' || (l.recorrencia === 'unica' && m === 1)) {
          if (l.tipo === 'entrada') entradas += l.valor
          else saidas += l.valor
        }
      }
      const saldoMes = entradas - saidas
      saldoAcumulado += saldoMes
      totalEntradas += entradas
      totalSaidas += saidas
      rows.push({ mes: m, entradas, saidas, saldoMes, saldoAcumulado })
    }

    return { totalEntradas, totalSaidas, saldoFinal: saldoAcumulado, rows }
  }, [lancamentos, meses])

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-3 items-end">
        <div>
          <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Descrição</label>
          <input type="text" className="tool-input" value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Ex: Salário, Aluguel" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Valor (R$)</label>
          <input type="number" className="tool-input" value={valor} onChange={(e) => setValor(e.target.value)} min="0" step="0.01" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Tipo</label>
          <select className="tool-input" value={tipo} onChange={(e) => setTipo(e.target.value as Tipo)}>
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Recorrência</label>
          <select className="tool-input" value={recorrencia} onChange={(e) => setRecorrencia(e.target.value as Recorrencia)}>
            <option value="unica">Única</option>
            <option value="mensal">Mensal</option>
          </select>
        </div>
        <button
          onClick={adicionar}
          className="bg-[#00C896] hover:bg-[#00A87E] text-white font-medium rounded-lg px-4 py-2 h-fit"
        >
          Adicionar
        </button>
      </div>

      {lancamentos.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[#6B7280] border-b border-[#E2E6EF]">
                <th className="text-left py-2 font-medium">Descrição</th>
                <th className="text-right py-2 font-medium">Valor</th>
                <th className="text-left py-2 font-medium">Tipo</th>
                <th className="text-left py-2 font-medium">Recorrência</th>
                <th className="text-right py-2 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {lancamentos.map((l) => (
                <tr key={l.id} className="border-b border-[#E2E6EF] last:border-0 hover:bg-[#F7F8FA]">
                  <td className="py-2">{l.descricao}</td>
                  <td className={`py-2 text-right font-mono-display text-xs ${l.tipo === 'entrada' ? 'text-[#00A87E]' : 'text-[#C2410C]'}`}>
                    {l.tipo === 'entrada' ? '+' : '-'}{fmt(l.valor)}
                  </td>
                  <td className="py-2 capitalize">{l.tipo === 'entrada' ? 'Entrada' : 'Saída'}</td>
                  <td className="py-2 capitalize">{l.recorrencia === 'unica' ? 'Única' : 'Mensal'}</td>
                  <td className="py-2 text-right">
                    <button onClick={() => remover(l.id)} className="text-[#6B7280] hover:text-[#C2410C]" aria-label="Remover">
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Meses a projetar</label>
        <input type="number" className="tool-input w-32" value={meses} onChange={(e) => setMeses(e.target.value)} min="1" max="60" />
      </div>

      {result ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-[#F0FDF9] border border-[#BBEDE0] rounded-lg p-4">
              <div className="text-xs text-[#6B7280] mb-1">Total Entradas</div>
              <div className="font-mono-display font-bold text-xl text-[#1B2B5E]">{fmt(result.totalEntradas)}</div>
            </div>
            <div className="bg-[#FFF7ED] border border-[#FDE68A] rounded-lg p-4">
              <div className="text-xs text-[#6B7280] mb-1">Total Saídas</div>
              <div className="font-mono-display font-bold text-xl text-[#C2410C]">{fmt(result.totalSaidas)}</div>
            </div>
            <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-lg p-4">
              <div className="text-xs text-[#6B7280] mb-1">Saldo Projetado</div>
              <div className="font-mono-display font-bold text-xl text-[#1B2B5E]">{fmt(result.saldoFinal)}</div>
            </div>
          </div>

          <div className="overflow-x-auto mt-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[#6B7280] border-b border-[#E2E6EF]">
                  <th className="text-left py-2 font-medium">Mês</th>
                  <th className="text-right py-2 font-medium">Entradas</th>
                  <th className="text-right py-2 font-medium">Saídas</th>
                  <th className="text-right py-2 font-medium">Saldo do Mês</th>
                  <th className="text-right py-2 font-medium">Saldo Acumulado</th>
                </tr>
              </thead>
              <tbody>
                {result.rows.map((r) => (
                  <tr key={r.mes} className="border-b border-[#E2E6EF] last:border-0 hover:bg-[#F7F8FA]">
                    <td className="py-2">{r.mes}</td>
                    <td className="py-2 text-right font-mono-display text-xs text-[#00A87E]">{fmt(r.entradas)}</td>
                    <td className="py-2 text-right font-mono-display text-xs text-[#C2410C]">{fmt(r.saidas)}</td>
                    <td className="py-2 text-right font-mono-display text-xs">{fmt(r.saldoMes)}</td>
                    <td className="py-2 text-right font-mono-display text-xs font-medium">{fmt(r.saldoAcumulado)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="result-box">
          <span className="text-[#6B7280] text-sm">Adicione lançamentos para ver a projeção</span>
        </div>
      )}
    </div>
  )
}
