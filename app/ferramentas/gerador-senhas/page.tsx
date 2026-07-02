import type { Metadata } from 'next'
import { tools } from '@/lib/tools'
import ToolLayout from '@/components/ToolLayout'
import GeradorSenhas from './GeradorSenhas'

export const metadata: Metadata = {
  title: 'Gerador de Senhas Fortes',
  description: 'Gere senhas fortes e aleatórias com configurações personalizadas. Ferramenta gratuita online.',
}

const tool = tools.find((t) => t.slug === 'gerador-senhas')!

export default function Page() {
  return (
    <ToolLayout tool={tool}>
      <GeradorSenhas />
    </ToolLayout>
  )
}
