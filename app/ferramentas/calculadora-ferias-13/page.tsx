import type { Metadata } from 'next'
import { tools } from '@/lib/tools'
import ToolLayout from '@/components/ToolLayout'
import FeriasDecimoTerceiro from './FeriasDecimoTerceiro'

export const metadata: Metadata = {
  title: 'Calculadora de Férias e 13º Salário',
  description: 'Calcule o valor de férias com 1/3 constitucional e do 13º salário proporcional ou integral, a partir do salário bruto.',
}

const tool = tools.find((t) => t.slug === 'calculadora-ferias-13')!

export default function Page() {
  return (
    <ToolLayout tool={tool}>
      <FeriasDecimoTerceiro />
    </ToolLayout>
  )
}
