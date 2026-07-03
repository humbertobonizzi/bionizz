'use client'
import { useState } from 'react'
import { tools, Category, categoryLabels } from '@/lib/tools'
import ToolCard from '@/components/ToolCard'
import AdSlot from '@/components/AdSlot'

const TICKER_ITEMS = [
  'Conversor de Unidades',
  'Calculadora de IMC',
  'Gerador de Senhas',
  'Formatador de JSON',
  'Conversor de Moedas',
]

const ALL = 'all' as const
type Filter = Category | typeof ALL

export default function HomePage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<Filter>(ALL)

  const filtered = tools.filter((t) => {
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === ALL || t.category === category
    return matchSearch && matchCat
  })

  const categories: { value: Filter; label: string }[] = [
    { value: ALL, label: 'Todas' },
    { value: 'conversor', label: categoryLabels.conversor },
    { value: 'calculadora', label: categoryLabels.calculadora },
    { value: 'gerador', label: categoryLabels.gerador },
    { value: 'formatador', label: categoryLabels.formatador },
  ]

  const duration = TICKER_ITEMS.length * 3

  return (
    <>
      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes cycle-text-before {
          ${TICKER_ITEMS.map((item, i) => `${Math.round((i / TICKER_ITEMS.length) * 100)}% { content: "${item}"; }`).join(' ')}
          100% { content: "${TICKER_ITEMS[0]}"; }
        }
        .ticker-pseudo::before {
          content: "${TICKER_ITEMS[0]}";
          animation: cycle-text-before ${duration}s step-end infinite;
        }
        .blink-cursor {
          animation: blink 1s step-end infinite;
        }
      `}</style>

      {/* Hero */}
      <section className="bg-grid relative overflow-hidden py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-[#E2E6EF] rounded-full px-4 py-1.5 mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#00C896] animate-pulse" />
            <span className="text-xs font-medium text-[#6B7280]">{tools.length} ferramentas disponíveis</span>
          </div>

          <h1 className="font-mono-display font-bold text-4xl md:text-5xl text-[#1B2B5E] mb-4 leading-tight">
            Sua caixa de ferramentas.
            <br />
            Sem instalar nada.
          </h1>
          <p className="text-lg text-[#6B7280] mb-8">Conversores, calculadoras e geradores que rodam direto no navegador. Grátis, sem cadastro, sem enrolação.</p>

          {/* Terminal ticker */}
          <div className="inline-flex items-center gap-1 font-mono-display text-sm text-[#00C896] bg-[#0d1b3e] px-5 py-3 rounded-lg">
            <span className="text-[#6B7280] mr-2 select-none">$</span>
            <span className="ticker-pseudo" />
            <span className="blink-cursor text-[#00C896]">▌</span>
          </div>
        </div>
      </section>

      {/* AdSense banner below hero */}
      <div className="max-w-6xl mx-auto px-4 my-6">
        <AdSlot slot="hero-bottom" />
      </div>

      {/* Tools section */}
      <section id="ferramentas" className="max-w-6xl mx-auto px-4 pb-16">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="search"
            placeholder="Buscar ferramenta..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="tool-input md:max-w-xs"
          />
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  category === cat.value
                    ? 'bg-[#1B2B5E] text-white border-[#1B2B5E]'
                    : 'bg-white text-[#6B7280] border-[#E2E6EF] hover:border-[#1B2B5E] hover:text-[#1B2B5E]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-[#6B7280]">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-medium">Nenhuma ferramenta encontrada</p>
            <p className="text-sm mt-1">Tente outro termo de busca</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
