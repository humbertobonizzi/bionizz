import type { Metadata } from 'next'
import { tools } from '@/lib/tools'
import ToolLayout from '@/components/ToolLayout'
import ConversorUnidades from './ConversorUnidades'

export const metadata: Metadata = {
  title: 'Conversor de Unidades',
  description: 'Converta comprimento, peso, temperatura, área e volume instantaneamente. Ferramenta gratuita online.',
}

const tool = tools.find((t) => t.slug === 'conversor-unidades')!

export default function Page() {
  return (
    <ToolLayout tool={tool}>
      <ConversorUnidades />
    </ToolLayout>
  )
}
