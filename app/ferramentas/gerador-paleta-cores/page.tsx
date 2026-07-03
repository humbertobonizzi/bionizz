import type { Metadata } from 'next'
import { tools } from '@/lib/tools'
import ToolLayout from '@/components/ToolLayout'
import GeradorPaletaCores from './GeradorPaletaCores'

export const metadata: Metadata = {
  title: 'Gerador de Paleta de Cores',
  description: 'Gere paletas harmônicas de cores (complementares, análogas, tríade, monocromática) para seus projetos de design.',
}

const tool = tools.find((t) => t.slug === 'gerador-paleta-cores')!

export default function Page() {
  return (
    <ToolLayout tool={tool}>
      <GeradorPaletaCores />
    </ToolLayout>
  )
}
