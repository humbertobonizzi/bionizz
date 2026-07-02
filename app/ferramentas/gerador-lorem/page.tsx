import type { Metadata } from 'next'
import { tools } from '@/lib/tools'
import ToolLayout from '@/components/ToolLayout'
import GeradorLorem from './GeradorLorem'

export const metadata: Metadata = {
  title: 'Gerador de Lorem Ipsum',
  description: 'Gere texto de preenchimento em português ou latim para protótipos e designs. Ferramenta gratuita online.',
}

const tool = tools.find((t) => t.slug === 'gerador-lorem')!

export default function Page() {
  return (
    <ToolLayout tool={tool}>
      <GeradorLorem />
    </ToolLayout>
  )
}
