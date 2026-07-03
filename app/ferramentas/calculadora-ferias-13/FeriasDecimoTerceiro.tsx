'use client'
import { useState, useMemo } from 'react'

const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

type Aba = 'ferias' | 'decimo'

export default function FeriasDecimoTerceiro() {
  const [aba, setAba] = useState<Aba>('ferias')

  // Férias
  const [salarioFerias, setSalarioFerias] = useState('3000')
  const [diasFerias, setDiasFerias] = useState('30')
  const [venderAbono, setVenderAbono] = useState(false)

  const resultFerias = useMemo(() => {
    const S = parseFloat(salarioFerias) || 0
    const dias = Math.max(1, Math.min(30, parseFloat(diasFerias) || 0))
    if (S <= 0 || dias <= 0) return null

    const valorDia = S / 30
    const valorFerias = valorDia * dias
    const tercoConstitucional = valorFerias / 3

    let valorAbono = 0
    let tercoAbono = 0
    if (venderAbono) {
      valorAbono = valorDia * 10
      tercoAbono = valorAbono / 3
    }

    const total = valorFerias + tercoConstitucional + valorAbono + tercoAbono

    return { valorFerias, tercoConstitucional, valorAbono, tercoAbono, total }
  }, [salarioFerias, diasFerias, venderAbono])

  // 13º salário
  const [salario13, setSalario13] = useState('3000')
  const [meses13, setMeses13] = useState('12')

  const result13 = useMemo(() => {
    const S = parseFloat(salario13) || 0
    const meses = Math.max(1, Math.min(12, parseFloat(meses13) || 0))
    if (S <= 0) return null

    const total = (S / 12) * meses
    const parcela1 = total / 2
    const parcela2 = total / 2

    return { total, parcela1, parcela2 }
  }, [salario13, meses13])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 border-b border-[#E2E6EF]">
        <button
          onClick={() => setAba('ferias')}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
            aba === 'ferias' ? 'border-[#00C896] text-[#1B2B5E]' : 'border-transparent text-[#6B7280]'
          }`}
        >
          Férias
        </button>
        <button
          onClick={() => setAba('decimo')}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
            aba === 'decimo' ? 'border-[#00C896] text-[#1B2B5E]' : 'border-transparent text-[#6B7280]'
          }`}
        >
          13º Salário
        </button>
      </div>

      {aba === 'ferias' ? (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Salário bruto (R$)</label>
              <input type="number" className="tool-input" value={salarioFerias} onChange={(e) => setSalarioFerias(e.target.value)} min="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Dias de férias</label>
              <input type="number" className="tool-input" value={diasFerias} onChange={(e) => setDiasFerias(e.target.value)} min="1" max="30" />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-[#1B2B5E]">
            <input type="checkbox" checked={venderAbono} onChange={(e) => setVenderAbono(e.target.checked)} />
            Vender 1/3 das férias (abono pecuniário — 10 dias)
          </label>

          {resultFerias ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-[#F0FDF9] border border-[#BBEDE0] rounded-lg p-4">
                <div className="text-xs text-[#6B7280] mb-1">Valor das Férias</div>
                <div className="font-mono-display font-bold text-xl text-[#1B2B5E]">{fmt(resultFerias.valorFerias)}</div>
              </div>
              <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-lg p-4">
                <div className="text-xs text-[#6B7280] mb-1">+ 1/3 Constitucional</div>
                <div className="font-mono-display font-bold text-xl text-[#1B2B5E]">{fmt(resultFerias.tercoConstitucional)}</div>
              </div>
              <div className="bg-[#FFF7ED] border border-[#FDE68A] rounded-lg p-4">
                <div className="text-xs text-[#6B7280] mb-1">Total a Receber</div>
                <div className="font-mono-display font-bold text-xl text-[#C2410C]">{fmt(resultFerias.total)}</div>
              </div>
              {venderAbono && (
                <div className="md:col-span-3 text-sm text-[#6B7280]">
                  Inclui abono pecuniário de {fmt(resultFerias.valorAbono)} + 1/3 de {fmt(resultFerias.tercoAbono)}.
                </div>
              )}
            </div>
          ) : (
            <div className="result-box">
              <span className="text-[#6B7280] text-sm">Preencha os campos para calcular</span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Salário bruto (R$)</label>
              <input type="number" className="tool-input" value={salario13} onChange={(e) => setSalario13(e.target.value)} min="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Meses trabalhados no ano</label>
              <input type="number" className="tool-input" value={meses13} onChange={(e) => setMeses13(e.target.value)} min="1" max="12" />
            </div>
          </div>

          {result13 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-[#F0FDF9] border border-[#BBEDE0] rounded-lg p-4">
                  <div className="text-xs text-[#6B7280] mb-1">1ª Parcela</div>
                  <div className="font-mono-display font-bold text-xl text-[#1B2B5E]">{fmt(result13.parcela1)}</div>
                </div>
                <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-lg p-4">
                  <div className="text-xs text-[#6B7280] mb-1">2ª Parcela (bruta)</div>
                  <div className="font-mono-display font-bold text-xl text-[#1B2B5E]">{fmt(result13.parcela2)}</div>
                </div>
                <div className="bg-[#FFF7ED] border border-[#FDE68A] rounded-lg p-4">
                  <div className="text-xs text-[#6B7280] mb-1">Total (bruto)</div>
                  <div className="font-mono-display font-bold text-xl text-[#C2410C]">{fmt(result13.total)}</div>
                </div>
              </div>
              <div className="text-xs text-[#6B7280]">
                A 2ª parcela sofre desconto de INSS e, quando aplicável, Imposto de Renda — valores não calculados aqui. Este resultado é uma estimativa e não substitui o holerite oficial.
              </div>
            </>
          ) : (
            <div className="result-box">
              <span className="text-[#6B7280] text-sm">Preencha os campos para calcular</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
