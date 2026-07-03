export type Category = 'conversor' | 'calculadora' | 'gerador' | 'formatador'

export interface Tool {
  slug: string
  name: string
  description: string
  category: Category
  icon: string
}

export const tools: Tool[] = [
  { slug: 'conversor-unidades', name: 'Conversor de Unidades', description: 'Converta comprimento, peso, temperatura, área e volume instantaneamente.', category: 'conversor', icon: '📐' },
  { slug: 'conversor-moedas', name: 'Conversor de Moedas', description: 'Taxas de câmbio atualizadas diariamente. BRL, USD, EUR, GBP e mais.', category: 'conversor', icon: '💱' },
  { slug: 'calculadora-imc', name: 'Calculadora de IMC', description: 'Calcule seu Índice de Massa Corporal com interpretação detalhada.', category: 'calculadora', icon: '⚖️' },
  { slug: 'calculadora-juros', name: 'Juros Compostos', description: 'Simule investimentos e financiamentos com juros compostos.', category: 'calculadora', icon: '📈' },
  { slug: 'calculadora-combustivel', name: 'Consumo de Combustível', description: 'Calcule consumo médio, custo por km e autonomia do seu veículo.', category: 'calculadora', icon: '⛽' },
  { slug: 'calculadora-fluxo-caixa', name: 'Fluxo de Caixa', description: 'Organize entradas e saídas e projete seu saldo nos próximos meses.', category: 'calculadora', icon: '💰' },
  { slug: 'gerador-senhas', name: 'Gerador de Senhas', description: 'Crie senhas fortes e aleatórias com configurações personalizadas.', category: 'gerador', icon: '🔐' },
  { slug: 'gerador-qrcode', name: 'Gerador de QR Code', description: 'Gere QR codes para URLs, textos ou contatos. Download em PNG.', category: 'gerador', icon: '📱' },
  { slug: 'gerador-lorem', name: 'Lorem Ipsum', description: 'Gere texto de preenchimento em português ou latim para protótipos.', category: 'gerador', icon: '📝' },
  { slug: 'formatador-json', name: 'Formatador de JSON', description: 'Formate, valide e minifique JSON com syntax highlighting.', category: 'formatador', icon: '{ }' },
  { slug: 'formatador-sql', name: 'Formatador de SQL', description: 'Formate queries SQL com indentação e palavras-chave em maiúsculo.', category: 'formatador', icon: '🗄️' },
  { slug: 'formatador-xml', name: 'Formatador de XML', description: 'Formate e valide documentos XML com indentação automática.', category: 'formatador', icon: '</>' },
  { slug: 'conversor-base64', name: 'Codificador Base64', description: 'Encode e decode texto em Base64 instantaneamente no navegador.', category: 'conversor', icon: '🔄' },
]

export const categoryLabels: Record<Category, string> = {
  conversor: 'Conversor',
  calculadora: 'Calculadora',
  gerador: 'Gerador',
  formatador: 'Formatador',
}

export const categoryColors: Record<Category, { bg: string; text: string }> = {
  conversor: { bg: '#EEF2FF', text: '#3730A3' },
  calculadora: { bg: '#FFF7ED', text: '#C2410C' },
  gerador: { bg: '#F0FDF9', text: '#065F46' },
  formatador: { bg: '#FDF4FF', text: '#7E22CE' },
}
