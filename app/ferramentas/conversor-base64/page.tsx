import type { Metadata } from 'next'
import { tools } from '@/lib/tools'
import ToolLayout from '@/components/ToolLayout'
import ConversorBase64 from './ConversorBase64'

export const metadata: Metadata = {
  title: 'Codificador Base64',
  description: 'Encode e decode texto em Base64 instantaneamente no navegador. Ferramenta gratuita online.',
}

const tool = tools.find((t) => t.slug === 'conversor-base64')!

export default function Page() {
  return (
    <ToolLayout tool={tool}>
      <ConversorBase64 />
    </ToolLayout>
  )
}
