import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Política de privacidade do bionizz conforme a LGPD. Saiba como coletamos e usamos suas informações.',
}

export default function PrivacidadePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Link href="/" className="text-sm text-[#6B7280] hover:text-[#1B2B5E] transition-colors mb-8 block">
        ← Voltar para o início
      </Link>

      <h1 className="font-mono-display font-bold text-3xl text-[#1B2B5E] mb-2">Política de Privacidade</h1>
      <p className="text-sm text-[#6B7280] mb-8">Última atualização: julho de 2025</p>

      <div className="prose prose-slate max-w-none space-y-8 text-[#1A1A2E]">

        <section>
          <h2 className="font-semibold text-xl text-[#1B2B5E] mb-3">1. Quem somos</h2>
          <p className="text-[#6B7280] leading-relaxed">
            O <strong>bionizz</strong> é um site de ferramentas online gratuitas operado por um desenvolvedor independente
            com sede no Brasil, construído para fins didáticos e de estudo. Para fins da Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018),
            o operador deste site é o controlador dos dados pessoais aqui descritos.
          </p>
          <p className="text-[#6B7280] leading-relaxed mt-2">
            O projeto é open source e o código-fonte completo está disponível em{' '}
            <a href="https://github.com/humbertobonizzi/bionizz" target="_blank" rel="noopener noreferrer" className="text-[#00C896] underline">
              github.com/humbertobonizzi/bionizz
            </a>.
          </p>
          <p className="text-[#6B7280] leading-relaxed mt-2">
            Este site foi construído com o auxílio de ferramentas de Inteligência Artificial Generativa. Embora tenhamos revisado
            o conteúdo e os cálculos das ferramentas, resultados podem eventualmente conter erros. Não utilize as ferramentas
            deste site como única fonte para decisões financeiras, jurídicas, médicas ou de qualquer outra natureza sensível.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-xl text-[#1B2B5E] mb-3">2. Dados que coletamos</h2>
          <p className="text-[#6B7280] leading-relaxed mb-2">
            Este site não exige cadastro nem coleta dados pessoais identificáveis diretamente. No entanto, ao acessar nossas páginas, os seguintes dados podem ser coletados:
          </p>
          <ul className="list-disc list-inside text-[#6B7280] space-y-1 pl-2">
            <li>Endereço IP (por servidores de hospedagem)</li>
            <li>Tipo de navegador e sistema operacional</li>
            <li>Páginas visitadas e tempo de permanência (via Google Analytics, se habilitado)</li>
            <li>Cookies de publicidade (Google AdSense)</li>
          </ul>
          <p className="text-[#6B7280] leading-relaxed mt-2">
            Todas as ferramentas disponíveis neste site funcionam inteiramente no seu navegador (client-side). Nenhum dado digitado nas ferramentas é enviado aos nossos servidores.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-xl text-[#1B2B5E] mb-3">3. Finalidade do tratamento</h2>
          <ul className="list-disc list-inside text-[#6B7280] space-y-1 pl-2">
            <li>Operação e manutenção do site</li>
            <li>Análise de tráfego e melhoria da experiência do usuário (Google Analytics)</li>
            <li>Exibição de publicidade personalizada (Google AdSense)</li>
            <li>Cumprimento de obrigações legais</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-xl text-[#1B2B5E] mb-3">4. Base legal (LGPD, Art. 7º)</h2>
          <ul className="list-disc list-inside text-[#6B7280] space-y-1 pl-2">
            <li><strong>Legítimo interesse</strong> — para logs de acesso necessários à operação técnica do site</li>
            <li><strong>Consentimento</strong> — para cookies não essenciais de analytics e publicidade, coletado via banner de cookies</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-xl text-[#1B2B5E] mb-3">5. Retenção de dados</h2>
          <ul className="list-disc list-inside text-[#6B7280] space-y-1 pl-2">
            <li>Logs de acesso do servidor: até 90 dias</li>
            <li>Cookies: conforme descrito na nossa <Link href="/cookies" className="text-[#00C896] underline">Política de Cookies</Link></li>
            <li>Dados de analytics: conforme configuração do Google Analytics (padrão: 26 meses)</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-xl text-[#1B2B5E] mb-3">6. Seus direitos (LGPD, Art. 18)</h2>
          <p className="text-[#6B7280] leading-relaxed mb-2">Você tem direito a:</p>
          <ul className="list-disc list-inside text-[#6B7280] space-y-1 pl-2">
            <li>Confirmação da existência de tratamento</li>
            <li>Acesso aos dados coletados</li>
            <li>Correção de dados incompletos ou desatualizados</li>
            <li>Anonimização, bloqueio ou eliminação de dados desnecessários</li>
            <li>Portabilidade dos dados</li>
            <li>Eliminação dos dados tratados com base no consentimento</li>
            <li>Informação sobre compartilhamento com terceiros</li>
            <li>Revogação do consentimento a qualquer momento</li>
            <li>Oposição ao tratamento</li>
          </ul>
          <p className="text-[#6B7280] leading-relaxed mt-2">
            Para exercer seus direitos, entre em contato através do{' '}
            <a href="https://github.com/humbertobonizzi/bionizz" target="_blank" rel="noopener noreferrer" className="text-[#00C896] underline">
              repositório do projeto no GitHub
            </a>.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-xl text-[#1B2B5E] mb-3">7. Compartilhamento com terceiros</h2>
          <p className="text-[#6B7280] leading-relaxed">
            Compartilhamos dados com os seguintes terceiros, cada um com sua própria política de privacidade:
          </p>
          <ul className="list-disc list-inside text-[#6B7280] space-y-1 pl-2 mt-2">
            <li>
              <strong>Google LLC</strong> — Google AdSense e Google Analytics.{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#00C896] underline">
                Ver política de privacidade do Google
              </a>
            </li>
          </ul>
          <p className="text-[#6B7280] leading-relaxed mt-2">
            Não vendemos dados pessoais a terceiros.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-xl text-[#1B2B5E] mb-3">8. Segurança</h2>
          <p className="text-[#6B7280] leading-relaxed">
            Adotamos medidas técnicas razoáveis para proteger os dados coletados, incluindo transmissão via HTTPS.
            No entanto, nenhum sistema é 100% seguro, e não podemos garantir segurança absoluta.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-xl text-[#1B2B5E] mb-3">9. Alterações nesta política</h2>
          <p className="text-[#6B7280] leading-relaxed">
            Esta política pode ser atualizada periodicamente. Alterações significativas serão comunicadas nesta página com a data de atualização.
            O uso continuado do site após alterações constitui aceite da nova política.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-xl text-[#1B2B5E] mb-3">10. Contato</h2>
          <p className="text-[#6B7280] leading-relaxed">
            Para dúvidas sobre esta política ou para exercer seus direitos, entre em contato através do{' '}
            <a href="https://github.com/humbertobonizzi/bionizz" target="_blank" rel="noopener noreferrer" className="text-[#00C896] underline">
              repositório do projeto no GitHub
            </a>.
          </p>
        </section>

      </div>
    </div>
  )
}
