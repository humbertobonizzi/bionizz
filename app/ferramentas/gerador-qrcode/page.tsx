import type { Metadata } from 'next'
import { tools } from '@/lib/tools'
import ToolLayout from '@/components/ToolLayout'
import GeradorQRCode from './GeradorQRCode'

export const metadata: Metadata = {
  title: 'Gerador de QR Code',
  description: 'Gere QR codes para URLs, textos ou contatos. Download em PNG. Ferramenta gratuita online.',
}

const tool = tools.find((t) => t.slug === 'gerador-qrcode')!

export default function Page() {
  return (
    <ToolLayout tool={tool}>
      <GeradorQRCode />
    </ToolLayout>
  )
}
