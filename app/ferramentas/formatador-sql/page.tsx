import type { Metadata } from 'next'
import { tools } from '@/lib/tools'
import ToolLayout from '@/components/ToolLayout'
import FormatadorSQL from './FormatadorSQL'

export const metadata: Metadata = {
  title: 'Formatador de SQL',
  description: 'Formate queries SQL com indentação e palavras-chave em maiúsculo. Ferramenta gratuita online.',
}

const tool = tools.find((t) => t.slug === 'formatador-sql')!

export default function Page() {
  return (
    <ToolLayout tool={tool}>
      <FormatadorSQL />
    </ToolLayout>
  )
}
