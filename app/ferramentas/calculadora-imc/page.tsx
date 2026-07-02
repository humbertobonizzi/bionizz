import type { Metadata } from 'next'
import { tools } from '@/lib/tools'
import ToolLayout from '@/components/ToolLayout'
import CalculadoraIMC from './CalculadoraIMC'

export const metadata: Metadata = {
  title: 'Calculadora de IMC',
  description: 'Calcule seu Índice de Massa Corporal com interpretação detalhada. Ferramenta gratuita online.',
}

const tool = tools.find((t) => t.slug === 'calculadora-imc')!

export default function Page() {
  return (
    <ToolLayout tool={tool}>
      <CalculadoraIMC />
    </ToolLayout>
  )
}
