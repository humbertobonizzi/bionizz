import type { Metadata } from 'next'
import { tools } from '@/lib/tools'
import ToolLayout from '@/components/ToolLayout'
import FormatadorJSON from './FormatadorJSON'

export const metadata: Metadata = {
  title: 'Formatador de JSON',
  description: 'Formate, valide e minifique JSON online. Ferramenta gratuita sem instalação.',
}

const tool = tools.find((t) => t.slug === 'formatador-json')!

export default function Page() {
  return (
    <ToolLayout tool={tool}>
      <FormatadorJSON />
    </ToolLayout>
  )
}
