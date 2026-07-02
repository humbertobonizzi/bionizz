'use client'
import { useState, useCallback } from 'react'

const LATIN_SENTENCES = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
  'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
  'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.',
  'Ut labore et dolore magnam aliquam quaerat voluptatem.',
  'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse.',
  'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil.',
  'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus.',
  'Itaque earum rerum hic tenetur a sapiente delectus.',
  'At vero eos et accusamus et iusto odio dignissimos ducimus.',
  'Nam libero tempore, cum soluta nobis est eligendi optio.',
  'Quis nostrum exercitationem ullam corporis suscipit laboriosam.',
]

const PT_SENTENCES = [
  'A tecnologia transforma a maneira como as pessoas interagem com o mundo digital.',
  'Ferramentas online gratuitas facilitam o trabalho de desenvolvedores e designers.',
  'O Brasil é um país de dimensões continentais com grande diversidade cultural.',
  'A internet democratizou o acesso à informação em diversas regiões do mundo.',
  'Aplicativos modernos priorizam a experiência do usuário e a acessibilidade.',
  'O desenvolvimento sustentável é essencial para preservar os recursos naturais.',
  'A educação digital abre novas oportunidades para crianças e jovens de todas as regiões.',
  'Sistemas de informação eficientes aumentam a produtividade das organizações.',
  'A inteligência artificial está transformando setores como saúde, educação e finanças.',
  'Interfaces intuitivas reduzem a curva de aprendizado e melhoram a experiência.',
  'A segurança da informação é uma preocupação crescente no ambiente corporativo.',
  'Metodologias ágeis permitem entregas mais rápidas e adaptadas às necessidades do cliente.',
  'O design responsivo garante uma experiência consistente em dispositivos de diferentes tamanhos.',
  'A colaboração entre equipes multidisciplinares potencializa resultados inovadores.',
  'Boas práticas de programação garantem código legível, manutenível e eficiente.',
  'A transformação digital requer adaptação constante e aprendizado contínuo.',
  'Plataformas de comunicação online aproximam pessoas de diferentes partes do mundo.',
  'A automação de processos libera tempo para atividades de maior valor agregado.',
  'Dados bem estruturados são fundamentais para tomadas de decisão assertivas.',
  'A criatividade aliada à tecnologia gera soluções inovadoras para problemas complexos.',
]

function shuffle<T>(arr: T[], seed: number): T[] {
  const result = [...arr]
  let s = seed
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    const j = Math.abs(s) % (i + 1)
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

const WORDS_PER_PARA = { curto: 3, medio: 6, longo: 10 }

export default function GeradorLorem() {
  const [lang, setLang] = useState<'latim' | 'portugues'>('latim')
  const [paragraphs, setParagraphs] = useState(3)
  const [density, setDensity] = useState<'curto' | 'medio' | 'longo'>('medio')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = useCallback(() => {
    const sentences = lang === 'latim' ? LATIN_SENTENCES : PT_SENTENCES
    const sentPerPara = WORDS_PER_PARA[density]
    const seed = Date.now()
    const result = Array.from({ length: paragraphs }, (_, i) => {
      const shuffled = shuffle(sentences, seed + i)
      return shuffled.slice(0, sentPerPara).join(' ')
    }).join('\n\n')
    setOutput(result)
    setCopied(false)
  }, [lang, paragraphs, density])

  const copy = () => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Idioma</label>
          <select
            className="tool-input"
            value={lang}
            onChange={(e) => setLang(e.target.value as 'latim' | 'portugues')}
          >
            <option value="latim">Latim (Lorem Ipsum)</option>
            <option value="portugues">Português</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Parágrafos</label>
          <select
            className="tool-input"
            value={paragraphs}
            onChange={(e) => setParagraphs(Number(e.target.value))}
          >
            {[1,2,3,4,5,6,7,8,9,10].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1B2B5E] mb-1">Tamanho do parágrafo</label>
          <select
            className="tool-input"
            value={density}
            onChange={(e) => setDensity(e.target.value as 'curto' | 'medio' | 'longo')}
          >
            <option value="curto">Curto (3 frases)</option>
            <option value="medio">Médio (6 frases)</option>
            <option value="longo">Longo (10 frases)</option>
          </select>
        </div>
      </div>

      <button onClick={generate} className="btn-mint">
        📝 Gerar Texto
      </button>

      {output && (
        <div className="relative">
          <textarea
            className="tool-textarea"
            style={{ minHeight: 240 }}
            value={output}
            readOnly
          />
          <button
            onClick={copy}
            className="absolute top-3 right-3 text-xs px-3 py-1.5 rounded-md border border-[#E2E6EF] bg-white hover:border-[#00C896] transition-colors"
          >
            {copied ? '✓ Copiado' : 'Copiar'}
          </button>
        </div>
      )}
    </div>
  )
}
