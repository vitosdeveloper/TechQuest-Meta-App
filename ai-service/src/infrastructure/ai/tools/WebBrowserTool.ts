import { DynamicTool } from '@langchain/core/tools';
import * as cheerio from 'cheerio';

export class WebBrowserTool extends DynamicTool {
  constructor() {
    super({
      name: 'web_browser',
      description: 'Uma ferramenta capaz de extrair conteúdo em texto de sites na internet. Sempre passe a URL exata (ex: https://example.com) como argumento para esta ferramenta quando precisar ler um site.',
      func: async (url: string) => {
        try {
          // Checagem básica se é URL
          if (!url.startsWith('http')) {
            return 'Erro: a URL precisa começar com http ou https.';
          }

          console.log(`🌐 [WebBrowserTool] Acessando URL: ${url}`);
          
          const response = await fetch(url, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (TechQuest AI Agent) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
          });

          if (!response.ok) {
            return `Erro ao acessar o site: Status ${response.status} ${response.statusText}`;
          }

          const html = await response.text();
          const $ = cheerio.load(html);

          // Remover elementos desnecessários como scripts e styles
          $('script, style, noscript, iframe, img, svg, video').remove();

          // Extrair apenas o texto, remover espaços extras
          const textContent = $('body').text().replace(/\s+/g, ' ').trim();

          // Limitar o tamanho para não estourar o limite de tokens da IA local
          const maxLength = 4000;
          if (textContent.length > maxLength) {
            return textContent.substring(0, maxLength) + '... (Conteúdo truncado por limite de tamanho)';
          }

          return textContent || 'O site não retornou nenhum texto legível.';
        } catch (error: any) {
          console.error(`🌐 [WebBrowserTool] Falha ao acessar ${url}:`, error.message);
          return `Erro ao tentar acessar ou ler o site: ${error.message}`;
        }
      }
    });
  }
}
