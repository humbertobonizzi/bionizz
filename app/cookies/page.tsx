import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Política de cookies do utilidades.br. Saiba quais cookies usamos e como gerenciá-los.',
}

export default function CookiesPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Link href="/" className="text-sm text-[#6B7280] hover:text-[#1B2B5E] transition-colors mb-8 block">
        ← Voltar para o início
      </Link>

      <h1 className="font-mono-display font-bold text-3xl text-[#1B2B5E] mb-2">Política de Cookies</h1>
      <p className="text-sm text-[#6B7280] mb-8">Última atualização: julho de 2025</p>

      <div className="space-y-8 text-[#1A1A2E]">

        <section>
          <h2 className="font-semibold text-xl text-[#1B2B5E] mb-3">1. O que são cookies?</h2>
          <p className="text-[#6B7280] leading-relaxed">
            Cookies são pequenos arquivos de texto armazenados no seu navegador quando você visita um site.
            Eles permitem que o site reconheça seu dispositivo em visitas futuras e lembre preferências ou informações de sessão.
            Cookies não contêm vírus e não podem executar código malicioso.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-xl text-[#1B2B5E] mb-3">2. Cookies essenciais</h2>
          <p className="text-[#6B7280] leading-relaxed mb-3">
            Estes cookies são estritamente necessários para o funcionamento do site e não podem ser desativados.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-[#E2E6EF] rounded-lg overflow-hidden">
              <thead className="bg-[#F7F8FA]">
                <tr>
                  <th className="text-left p-3 font-medium text-[#1B2B5E]">Nome</th>
                  <th className="text-left p-3 font-medium text-[#1B2B5E]">Finalidade</th>
                  <th className="text-left p-3 font-medium text-[#1B2B5E]">Duração</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-[#E2E6EF]">
                  <td className="p-3 font-mono text-xs">cookie-consent</td>
                  <td className="p-3 text-[#6B7280]">Armazena sua preferência de consentimento de cookies</td>
                  <td className="p-3 text-[#6B7280]">1 ano</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="font-semibold text-xl text-[#1B2B5E] mb-3">3. Cookies de análise (Google Analytics)</h2>
          <p className="text-[#6B7280] leading-relaxed mb-3">
            Usamos o Google Analytics para entender como os visitantes interagem com nosso site.
            Estes cookies coletam dados agregados e anônimos sobre o número de visitantes, páginas mais acessadas e tempo de permanência.
            Estes cookies só são ativados com seu consentimento.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-[#E2E6EF] rounded-lg overflow-hidden">
              <thead className="bg-[#F7F8FA]">
                <tr>
                  <th className="text-left p-3 font-medium text-[#1B2B5E]">Nome</th>
                  <th className="text-left p-3 font-medium text-[#1B2B5E]">Finalidade</th>
                  <th className="text-left p-3 font-medium text-[#1B2B5E]">Duração</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-[#E2E6EF]">
                  <td className="p-3 font-mono text-xs">_ga</td>
                  <td className="p-3 text-[#6B7280]">Distingue usuários únicos</td>
                  <td className="p-3 text-[#6B7280]">2 anos</td>
                </tr>
                <tr className="border-t border-[#E2E6EF]">
                  <td className="p-3 font-mono text-xs">_ga_*</td>
                  <td className="p-3 text-[#6B7280]">Mantém o estado da sessão</td>
                  <td className="p-3 text-[#6B7280]">2 anos</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="font-semibold text-xl text-[#1B2B5E] mb-3">4. Cookies de publicidade (Google AdSense)</h2>
          <p className="text-[#6B7280] leading-relaxed mb-3">
            O Google AdSense usa cookies para exibir anúncios relevantes com base no seu histórico de navegação.
            Esses cookies permitem que o Google e seus parceiros mostrem anúncios personalizados.
            Estes cookies só são ativados com seu consentimento.
          </p>
          <p className="text-[#6B7280] leading-relaxed">
            Para saber mais sobre como o Google usa dados de publicidade, acesse:{' '}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00C896] underline"
            >
              Como o Google usa cookies em publicidade
            </a>
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-xl text-[#1B2B5E] mb-3">5. Como gerenciar cookies</h2>
          <p className="text-[#6B7280] leading-relaxed mb-4">
            Você pode gerenciar ou excluir cookies a qualquer momento pelas configurações do seu navegador.
            Note que desativar cookies pode afetar a funcionalidade de alguns sites.
          </p>

          <div className="space-y-4">
            <div className="bg-[#F7F8FA] border border-[#E2E6EF] rounded-lg p-4">
              <h3 className="font-semibold text-[#1B2B5E] mb-2">Google Chrome</h3>
              <p className="text-sm text-[#6B7280]">
                Configurações → Privacidade e segurança → Cookies e outros dados do site → Gerenciar e excluir cookies e dados do site
              </p>
            </div>
            <div className="bg-[#F7F8FA] border border-[#E2E6EF] rounded-lg p-4">
              <h3 className="font-semibold text-[#1B2B5E] mb-2">Mozilla Firefox</h3>
              <p className="text-sm text-[#6B7280]">
                Configurações → Privacidade e Segurança → Cookies e dados de sites → Limpar dados
              </p>
            </div>
            <div className="bg-[#F7F8FA] border border-[#E2E6EF] rounded-lg p-4">
              <h3 className="font-semibold text-[#1B2B5E] mb-2">Safari</h3>
              <p className="text-sm text-[#6B7280]">
                Preferências → Privacidade → Gerenciar Dados de Sites
              </p>
            </div>
            <div className="bg-[#F7F8FA] border border-[#E2E6EF] rounded-lg p-4">
              <h3 className="font-semibold text-[#1B2B5E] mb-2">Microsoft Edge</h3>
              <p className="text-sm text-[#6B7280]">
                Configurações → Cookies e permissões de site → Cookies e dados de sites
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-semibold text-xl text-[#1B2B5E] mb-3">6. Alterações nesta política</h2>
          <p className="text-[#6B7280] leading-relaxed">
            Podemos atualizar esta política para refletir mudanças em nossas práticas ou por exigências legais.
            A data de última atualização estará sempre indicada no topo desta página.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-xl text-[#1B2B5E] mb-3">7. Contato</h2>
          <p className="text-[#6B7280] leading-relaxed">
            Para dúvidas sobre nossa política de cookies:{' '}
            <a href="mailto:[email protected]" className="text-[#00C896] underline">[email protected]</a>
          </p>
          <p className="text-[#6B7280] leading-relaxed mt-2">
            Veja também nossa <Link href="/privacidade" className="text-[#00C896] underline">Política de Privacidade</Link>.
          </p>
        </section>

      </div>
    </div>
  )
}
