import type { Metadata } from 'next'
import { tools } from '@/lib/tools'
import ToolLayout from '@/components/ToolLayout'
import CalculadoraJuros from './CalculadoraJuros'

export const metadata: Metadata = {
  title: 'Calculadora de Juros Compostos',
  description: 'Simule investimentos e financiamentos com juros compostos. Calcule montante final, total investido e juros ganhos.',
}

const tool = tools.find((t) => t.slug === 'calculadora-juros')!

export default function Page() {
  return (
    <ToolLayout tool={tool}>
      <CalculadoraJuros />
    </ToolLayout>
  )
}
