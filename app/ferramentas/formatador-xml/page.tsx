import type { Metadata } from 'next'
import { tools } from '@/lib/tools'
import ToolLayout from '@/components/ToolLayout'
import FormatadorXML from './FormatadorXML'

export const metadata: Metadata = {
  title: 'Formatador de XML',
  description: 'Formate e valide documentos XML com indentação automática. Ferramenta gratuita online.',
}

const tool = tools.find((t) => t.slug === 'formatador-xml')!

export default function Page() {
  return (
    <ToolLayout tool={tool}>
      <FormatadorXML />
    </ToolLayout>
  )
}
