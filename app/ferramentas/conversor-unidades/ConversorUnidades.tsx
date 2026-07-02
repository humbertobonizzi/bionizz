'use client'
import { useState } from 'react'

type UnitCategory = 'comprimento' | 'peso' | 'temperatura' | 'area' | 'volume'

interface UnitDef {
  label: string
  toBase: (v: number) => number
  fromBase: (v: number) => number
}

const units: Record<UnitCategory, Record<string, UnitDef>> = {
  comprimento: {
    mm: { label: 'Milímetro (mm)', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    cm: { label: 'Centímetro (cm)', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
    m:  { label: 'Metro (m)',        toBase: (v) => v,        fromBase: (v) => v },
    km: { label: 'Quilômetro (km)', toBase: (v) => v * 1000,  fromBase: (v) => v / 1000 },
    in: { label: 'Polegada (in)',   toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    ft: { label: 'Pé (ft)',         toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    mi: { label: 'Milha (mi)',      toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
  },
  peso: {
    mg:  { label: 'Miligrama (mg)',  toBase: (v) => v / 1e6,  fromBase: (v) => v * 1e6 },
    g:   { label: 'Grama (g)',       toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    kg:  { label: 'Quilograma (kg)', toBase: (v) => v,        fromBase: (v) => v },
    ton: { label: 'Tonelada (ton)',  toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    oz:  { label: 'Onça (oz)',       toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
    lb:  { label: 'Libra (lb)',      toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
  },
  temperatura: {
    C: { label: 'Celsius (°C)',    toBase: (v) => v,              fromBase: (v) => v },
    F: { label: 'Fahrenheit (°F)', toBase: (v) => (v - 32) * 5/9, fromBase: (v) => v * 9/5 + 32 },
    K: { label: 'Kelvin (K)',      toBase: (v) => v - 273.15,     fromBase: (v) => v + 273.15 },
  },
  area: {
    cm2: { label: 'Centímetro² (cm²)', toBase: (v) => v / 10000,       fromBase: (v) => v * 10000 },
    m2:  { label: 'Metro² (m²)',        toBase: (v) => v,               fromBase: (v) => v },
    km2: { label: 'Quilômetro² (km²)',  toBase: (v) => v * 1e6,         fromBase: (v) => v / 1e6 },
    ha:  { label: 'Hectare (ha)',        toBase: (v) => v * 10000,       fromBase: (v) => v / 10000 },
    ac:  { label: 'Acre (ac)',           toBase: (v) => v * 4046.856,    fromBase: (v) => v / 4046.856 },
  },
  volume: {
    ml:   { label: 'Mililitro (ml)',    toBase: (v) => v / 1000,    fromBase: (v) => v * 1000 },
    L:    { label: 'Litro (L)',         toBase: (v) => v,            fromBase: (v) => v },
    m3:   { label: 'Metro³ (m³)',       toBase: (v) => v * 1000,     fromBase: (v) => v / 1000 },
    floz: { label: 'Fl. Oz (fl oz)',    toBase: (v) => v * 0.0295735, fromBase: (v) => v / 0.0295735 },
    gal:  { label: 'Galão (gal)',       toBase: (v) => v * 3.78541,  fromBase: (v) => v / 3.78541 },
  },
}

const categoryLabels: Record<UnitCategory, string> = {
  comprimento: 'Comprimento',
  peso: 'Peso',
  temperatura: 'Temperatura',
  area: 'Área',
  volume: 'Volume',
}

export default function ConversorUnidades() {
  const [cat, setCat] = useState<UnitCategory>('comprimento')
  const [from, setFrom] = useState(Object.keys(units.comprimento)[0])
  const [to, setTo] = useState(Object.keys(units.comprimento)[2])
  const [value, setValue] = useState('')

  const handleCatChange = (c: UnitCategory) => {
    setCat(c)
    const keys = Object.keys(units[c])
    setFrom(keys[0])
    setTo(keys[Math.min(2, keys.length - 1)])
    setValue('')
  }

  const convert = () => {
    const num = parseFloat(value)
    if (isNaN(num)) return null
    const fromDef = units[cat][from]
    const toDef = units[cat][to]
    if (!fromDef || !toDef) return null
    const base = fromDef.toBase(num)
    return toDef.fromBase(base)
  }

  const result = convert()
  const currentUnits = units[cat]
  const unitKeys = Object.keys(currentUnits)

  return (
    <div className="flex flex-col gap-6">
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(units) as UnitCategory[]).map((c) => (
          <button
            key={c}
            onClick={() => handleCatChange(c)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              cat === c
                ? 'bg-[#1B2B5E] text-white'
                : 'bg-[#F7F8FA] text-[#6B7280] hover:bg-[#E2E6EF]'
            }`}
          >
            {categoryLabels[c]}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Valor</label>
          <input
            type="number"
            className="tool-input"
            placeholder="Digite o valor"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-[#1B2B5E] mb-1">De</label>
          <select
            className="tool-input"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            {unitKeys.map((k) => (
              <option key={k} value={k}>{currentUnits[k].label}</option>
            ))}
          </select>
        </div>

        <div className="text-2xl text-[#6B7280] pb-2">→</div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Para</label>
          <select
            className="tool-input"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            {unitKeys.map((k) => (
              <option key={k} value={k}>{currentUnits[k].label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Result */}
      <div className="result-box">
        {result !== null ? (
          <div>
            <span className="text-lg font-bold">{parseFloat(result.toPrecision(10)).toString()}</span>
            <span className="text-sm ml-2 text-[#6B7280]">{currentUnits[to]?.label}</span>
          </div>
        ) : (
          <span className="text-[#6B7280] text-sm">Digite um valor para ver o resultado</span>
        )}
      </div>
    </div>
  )
}
