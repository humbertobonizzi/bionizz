# bionizz

Site de ferramentas online gratuitas, sem cadastro e sem instalação. Tudo roda no navegador.

## Ferramentas disponíveis

**Conversores**
- Conversor de Unidades (comprimento, peso, temperatura, área, volume)
- Conversor de Moedas (taxas ao vivo via open.er-api.com)
- Codificador Base64 (encode/decode UTF-8)

**Calculadoras**
- Calculadora de IMC (com classificação e barra visual)
- Juros Compostos (com aportes mensais e tabela anual)
- Consumo de Combustível (consumo médio, custo/km, etanol vs gasolina)

**Geradores**
- Gerador de Senhas (força por entropia, crypto.getRandomValues)
- Gerador de QR Code (download PNG, cor personalizada)
- Lorem Ipsum (latim ou português, parágrafos configuráveis)

**Formatadores**
- Formatador de JSON (formatar, minificar, validar)
- Formatador de SQL (4 dialetos: SQL, MySQL, PostgreSQL, T-SQL)
- Formatador de XML (formatar, minificar, validar)

## Stack

- [Next.js 15](https://nextjs.org/) (App Router, geração estática)
- TypeScript
- Tailwind CSS
- Vercel (deploy)

## Desenvolvimento local

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Deploy

O projeto está configurado para deploy na Vercel. Basta conectar o repositório no painel da Vercel — sem nenhuma variável de ambiente necessária.

## AdSense

Os slots de anúncio estão em `components/AdSlot.tsx` e o script em `app/layout.tsx`. Substitua `ca-pub-XXXXXXXXXXXXXXXX` pelo seu Publisher ID após aprovação no Google AdSense.

## LGPD

O site inclui banner de consentimento de cookies, política de privacidade e política de cookies, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
