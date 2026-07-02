import type { Metadata } from 'next'
import { tools } from '@/lib/tools'
import ToolLayout from '@/components/ToolLayout'
import CalculadoraCombustivel from './CalculadoraCombustivel'

export const metadata: Metadata = {
  title: 'Calculadora de Consumo de Combustível',
  description: 'Calcule consumo médio, custo por km e compare etanol vs gasolina. Ferramenta gratuita online.',
}

const tool = tools.find((t) => t.slug === 'calculadora-combustivel')!

export default function Page() {
  return (
    <ToolLayout tool={tool}>
      <CalculadoraCombustivel />
    </ToolLayout>
  )
}
