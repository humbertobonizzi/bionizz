import type { Metadata } from 'next'
import { tools } from '@/lib/tools'
import ToolLayout from '@/components/ToolLayout'
import FluxoCaixa from './FluxoCaixa'

export const metadata: Metadata = {
  title: 'Calculadora de Fluxo de Caixa',
  description: 'Organize entradas e saídas, pontuais ou recorrentes, e projete seu saldo nos próximos meses.',
}

const tool = tools.find((t) => t.slug === 'calculadora-fluxo-caixa')!

export default function Page() {
  return (
    <ToolLayout tool={tool}>
      <FluxoCaixa />
    </ToolLayout>
  )
}
