'use client'
import { useState } from 'react'

interface IMCCategory {
  label: string
  range: string
  color: string
  min: number
  max: number
}

const categories: IMCCategory[] = [
  { label: 'Abaixo do peso', range: '< 18,5', color: '#3B82F6', min: 0,    max: 18.5 },
  { label: 'Normal',         range: '18,5 – 24,9', color: '#22C55E', min: 18.5, max: 25 },
  { label: 'Sobrepeso',      range: '25 – 29,9', color: '#EAB308', min: 25,   max: 30 },
  { label: 'Obesidade I',    range: '30 – 34,9', color: '#F97316', min: 30,   max: 35 },
  { label: 'Obesidade II',   range: '35 – 39,9', color: '#EF4444', min: 35,   max: 40 },
  { label: 'Obesidade III',  range: '≥ 40', color: '#991B1B', min: 40,   max: Infinity },
]

function getCategory(imc: number) {
  return categories.find((c) => imc >= c.min && imc < c.max) ?? categories[categories.length - 1]
}

export default function CalculadoraIMC() {
  const [peso, setPeso] = useState('')
  const [altura, setAltura] = useState('')

  const pesoNum = parseFloat(peso)
  const alturaNum = parseFloat(altura)
  const alturaM = alturaNum > 10 ? alturaNum / 100 : alturaNum // accept cm or m
  const valid = !isNaN(pesoNum) && !isNaN(alturaM) && alturaM > 0 && pesoNum > 0
  const imc = valid ? pesoNum / (alturaM * alturaM) : null
  const cat = imc !== null ? getCategory(imc) : null

  // Position on bar: 10–45 scale
  const barMin = 10, barMax = 45
  const barPct = imc !== null ? Math.min(100, Math.max(0, ((imc - barMin) / (barMax - barMin)) * 100)) : null

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Peso (kg)</label>
          <input
            type="number"
            className="tool-input"
            placeholder="ex: 70"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            min="1"
            max="500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Altura (cm ou m)</label>
          <input
            type="number"
            className="tool-input"
            placeholder="ex: 170 ou 1.70"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            min="0.5"
            max="300"
          />
        </div>
      </div>

      {imc !== null && cat && (
        <>
          <div className="result-box flex items-center gap-4">
            <div>
              <div className="text-3xl font-bold font-mono-display" style={{ color: cat.color }}>
                {imc.toFixed(1)}
              </div>
              <div className="text-sm text-[#6B7280]">IMC</div>
            </div>
            <div className="border-l border-[#BBEDE0] pl-4">
              <div className="font-semibold text-[#1B2B5E]">{cat.label}</div>
              <div className="text-sm text-[#6B7280]">IMC {cat.range}</div>
            </div>
          </div>

          {/* Visual bar */}
          <div>
            <div className="relative h-4 rounded-full overflow-hidden flex">
              {categories.map((c, i) => (
                <div
                  key={i}
                  className="flex-1 h-full"
                  style={{ background: c.color, opacity: 0.7 }}
                />
              ))}
            </div>
            {barPct !== null && (
              <div className="relative mt-1">
                <div
                  className="absolute w-0.5 h-3 bg-[#1B2B5E] -translate-x-0.5"
                  style={{ left: `${barPct}%` }}
                />
              </div>
            )}
            <div className="flex justify-between text-xs text-[#6B7280] mt-3">
              <span>10</span>
              <span>18,5</span>
              <span>25</span>
              <span>30</span>
              <span>35</span>
              <span>40+</span>
            </div>
          </div>

          {/* Category table */}
          <div className="mt-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[#6B7280] border-b border-[#E2E6EF]">
                  <th className="text-left py-1.5 font-medium">Classificação</th>
                  <th className="text-right py-1.5 font-medium">IMC</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c, i) => (
                  <tr
                    key={i}
                    className={`border-b border-[#E2E6EF] last:border-0 ${c.label === cat?.label ? 'font-semibold' : ''}`}
                  >
                    <td className="py-1.5 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: c.color }} />
                      {c.label}
                    </td>
                    <td className="py-1.5 text-right text-[#6B7280]">{c.range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {!valid && (
        <div className="result-box">
          <span className="text-[#6B7280] text-sm">Preencha peso e altura para calcular</span>
        </div>
      )}

      <p className="text-xs text-[#6B7280] mt-2">
        ⚠️ O IMC é uma estimativa e não substitui avaliação médica profissional.
      </p>
    </div>
  )
}
