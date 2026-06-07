import { DynamicTool } from '@langchain/core/tools';
import { IVectorStore } from '../../../domain/interfaces/IVectorStore';

export class KnowledgeBaseTool extends DynamicTool {
  constructor(private vectorStore: IVectorStore) {
    super({
      name: 'techquest_knowledge_base',
      description: 'Use esta ferramenta SEMPRE que precisar de informações sobre a arquitetura do projeto TechQuest, aulas, conceitos do código-fonte, ou quando o aluno perguntar sobre como as coisas são feitas neste repositório. O argumento deve ser a pergunta do usuário ou palavras-chave claras.',
      func: async (query: string) => {
        try {
          console.log(`📚 [KnowledgeBaseTool] Pesquisando no VectorDB por: "${query}"`);
          const results = await this.vectorStore.search(query, 3);
          
          if (!results || results.length === 0) {
            return 'Nenhuma informação interna encontrada na base de conhecimento sobre isso.';
          }

          return results.join('\n\n---\n\n');
        } catch (error: any) {
          console.error(`📚 [KnowledgeBaseTool] Falha na busca:`, error.message);
          return 'Houve um erro interno ao tentar buscar na base de conhecimento.';
        }
      }
    });
  }
}
