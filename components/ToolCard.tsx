import Link from 'next/link'
import { Tool, categoryColors, categoryLabels } from '@/lib/tools'

export default function ToolCard({ tool }: { tool: Tool }) {
  const colors = categoryColors[tool.category]
  return (
    <Link
      href={`/ferramentas/${tool.slug}`}
      className="group bg-white border border-[#E2E6EF] rounded-xl p-5 shadow-sm hover:shadow-md hover:border-[#00C896] transition-all flex flex-col gap-3"
    >
      <div className="flex items-start justify-between">
        <span className="text-2xl">{tool.icon}</span>
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{ background: colors.bg, color: colors.text }}
        >
          {categoryLabels[tool.category]}
        </span>
      </div>
      <div>
        <h3 className="font-semibold text-[#1B2B5E] group-hover:text-[#00A87E] transition-colors mb-1">{tool.name}</h3>
        <p className="text-sm text-[#6B7280] leading-relaxed">{tool.description}</p>
      </div>
    </Link>
  )
}
