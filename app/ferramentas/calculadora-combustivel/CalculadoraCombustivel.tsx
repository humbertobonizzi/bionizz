'use client'
import { useState } from 'react'

type Tab = 'consumo' | 'custo' | 'etanol'

export default function CalculadoraCombustivel() {
  const [tab, setTab] = useState<Tab>('consumo')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'consumo', label: 'Consumo Médio' },
    { id: 'custo', label: 'Custo por km' },
    { id: 'etanol', label: 'Etanol vs Gasolina' },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t.id ? 'bg-[#1B2B5E] text-white' : 'bg-[#F7F8FA] text-[#6B7280] hover:bg-[#E2E6EF]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'consumo' && <ConsumoMedio />}
      {tab === 'custo' && <CustoPorKm />}
      {tab === 'etanol' && <EtanolGasolina />}
    </div>
  )
}

function ConsumoMedio() {
  const [distancia, setDistancia] = useState('')
  const [litros, setLitros] = useState('')

  const d = parseFloat(distancia)
  const l = parseFloat(litros)
  const result = d > 0 && l > 0 ? d / l : null

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-[#6B7280]">Consumo Médio = Distância percorrida ÷ Litros gastos</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Distância percorrida (km)</label>
          <input type="number" className="tool-input" value={distancia} onChange={(e) => setDistancia(e.target.value)} placeholder="ex: 500" min="0" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Litros gastos (L)</label>
          <input type="number" className="tool-input" value={litros} onChange={(e) => setLitros(e.target.value)} placeholder="ex: 40" min="0" />
        </div>
      </div>
      <div className="result-box">
        {result !== null ? (
          <span><strong>{result.toFixed(2)} km/L</strong> de consumo médio</span>
        ) : (
          <span className="text-[#6B7280] text-sm">Preencha os campos acima</span>
        )}
      </div>
    </div>
  )
}

function CustoPorKm() {
  const [preco, setPreco] = useState('')
  const [consumo, setConsumo] = useState('')

  const p = parseFloat(preco)
  const c = parseFloat(consumo)
  const result = p > 0 && c > 0 ? p / c : null

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-[#6B7280]">Custo por km = Preço do combustível ÷ Consumo médio</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Preço do combustível (R$/L)</label>
          <input type="number" className="tool-input" value={preco} onChange={(e) => setPreco(e.target.value)} placeholder="ex: 5.89" min="0" step="0.01" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Consumo médio (km/L)</label>
          <input type="number" className="tool-input" value={consumo} onChange={(e) => setConsumo(e.target.value)} placeholder="ex: 12" min="0" step="0.1" />
        </div>
      </div>
      <div className="result-box">
        {result !== null ? (
          <span>Custo de <strong>R$ {result.toFixed(3)} por km</strong> rodado</span>
        ) : (
          <span className="text-[#6B7280] text-sm">Preencha os campos acima</span>
        )}
      </div>
    </div>
  )
}

function EtanolGasolina() {
  const [precoEtanol, setPrecoEtanol] = useState('')
  const [precoGasolina, setPrecoGasolina] = useState('')

  const e = parseFloat(precoEtanol)
  const g = parseFloat(precoGasolina)
  const ratio = e > 0 && g > 0 ? (e / g) * 100 : null
  const vantajoso = ratio !== null && ratio < 70

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-[#6B7280]">
        O etanol é vantajoso quando seu preço é inferior a 70% do preço da gasolina.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Preço do Etanol (R$/L)</label>
          <input type="number" className="tool-input" value={precoEtanol} onChange={(e) => setPrecoEtanol(e.target.value)} placeholder="ex: 3.49" min="0" step="0.01" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Preço da Gasolina (R$/L)</label>
          <input type="number" className="tool-input" value={precoGasolina} onChange={(e) => setPrecoGasolina(e.target.value)} placeholder="ex: 5.89" min="0" step="0.01" />
        </div>
      </div>
      <div className={`result-box ${ratio !== null ? (vantajoso ? 'bg-[#F0FDF9] border-[#BBEDE0]' : 'bg-[#FFF7ED] border-[#FDE68A]') : ''}`}>
        {ratio !== null ? (
          <div>
            <div className="font-bold text-lg">
              {vantajoso ? '✅ Etanol compensa!' : '⛽ Prefira a gasolina'}
            </div>
            <div className="text-sm mt-1 text-[#6B7280]">
              O etanol está a <strong>{ratio.toFixed(1)}%</strong> do preço da gasolina
              {vantajoso ? ' (abaixo do limite de 70%)' : ' (acima do limite de 70%)'}
            </div>
          </div>
        ) : (
          <span className="text-[#6B7280] text-sm">Preencha os preços acima</span>
        )}
      </div>
    </div>
  )
}
