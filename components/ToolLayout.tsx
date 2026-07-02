import Link from 'next/link'
import { Tool, categoryColors, categoryLabels } from '@/lib/tools'
import AdSlot from './AdSlot'

interface Props {
  tool: Tool
  children: React.ReactNode
}

export default function ToolLayout({ tool, children }: Props) {
  const colors = categoryColors[tool.category]
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/" className="text-sm text-[#6B7280] hover:text-[#1B2B5E] transition-colors">← Todas as ferramentas</Link>
      </div>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">{tool.icon}</span>
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{ background: colors.bg, color: colors.text }}
        >
          {categoryLabels[tool.category]}
        </span>
      </div>
      <h1 className="font-mono-display font-bold text-2xl text-[#1B2B5E] mb-2">{tool.name}</h1>
      <p className="text-[#6B7280] mb-8">{tool.description}</p>

      <div className="bg-white border border-[#E2E6EF] rounded-xl p-6 shadow-sm">
        {children}
      </div>

      <div className="mt-8">
        <AdSlot slot="tool-bottom" />
      </div>
    </div>
  )
}
