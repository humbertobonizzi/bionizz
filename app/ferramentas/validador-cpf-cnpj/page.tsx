import type { Metadata } from 'next'
import { tools } from '@/lib/tools'
import ToolLayout from '@/components/ToolLayout'
import ValidadorCpfCnpj from './ValidadorCpfCnpj'

export const metadata: Metadata = {
  title: 'Validador de CPF e CNPJ',
  description: 'Valide CPF e CNPJ pelo dígito verificador ou gere números válidos aleatórios para testes de sistemas.',
}

const tool = tools.find((t) => t.slug === 'validador-cpf-cnpj')!

export default function Page() {
  return (
    <ToolLayout tool={tool}>
      <ValidadorCpfCnpj />
    </ToolLayout>
  )
}
