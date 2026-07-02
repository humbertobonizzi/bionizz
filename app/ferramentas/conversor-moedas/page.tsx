import type { Metadata } from 'next'
import { tools } from '@/lib/tools'
import ToolLayout from '@/components/ToolLayout'
import ConversorMoedas from './ConversorMoedas'

export const metadata: Metadata = {
  title: 'Conversor de Moedas',
  description: 'Converta moedas com taxas de câmbio atualizadas. BRL, USD, EUR, GBP e mais. Ferramenta gratuita online.',
}

const tool = tools.find((t) => t.slug === 'conversor-moedas')!

export default function Page() {
  return (
    <ToolLayout tool={tool}>
      <ConversorMoedas />
    </ToolLayout>
  )
}
