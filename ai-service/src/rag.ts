import * as fs from 'fs-extra';
import * as path from 'path';
import { glob } from 'glob';
import * as dotenv from 'dotenv';
import { OpenAIEmbeddings, ChatOpenAI } from '@langchain/openai';
import { OllamaEmbeddings } from '@langchain/ollama';
import { ChatOllama } from '@langchain/ollama';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { createRetrievalChain } from 'langchain/chains/retrieval';

// Carrega as variáveis de ambiente (ex: OPENAI_API_KEY, USE_OLLAMA) do arquivo .env
dotenv.config();

export class TechQuestAiMentor {
  private vectorStore: MemoryVectorStore | null = null;
  private isMockMode: boolean = false;
  private isOllama: boolean = false;
  private chatModel: any;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY || '';
    const useOllama = process.env.USE_OLLAMA === 'true';
    const ollamaBaseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
    const ollamaModel = process.env.OLLAMA_MODEL || 'llama3.2'; // Pode ser mistral, llama3, etc.
    
    this.isOllama = useOllama;

    if (this.isOllama) {
      console.log(`🤖 Iniciando Motor Local via Ollama! Modelo: [${ollamaModel}] | URL: [${ollamaBaseUrl}]`);
      this.chatModel = new ChatOllama({
        baseUrl: ollamaBaseUrl,
        model: ollamaModel,
        temperature: 0.3,
      });
    } else if (!apiKey || apiKey.includes('sua-c') || apiKey.includes('sua_c') || apiKey === 'sk-fallback-key-para-nao-travar-o-servidor') {
      console.warn('⚠️ OPENAI_API_KEY não configurada e USE_OLLAMA é false. AI Service rodando em MOCK MODE.');
      this.isMockMode = true;
      this.chatModel = new ChatOpenAI({ openAIApiKey: 'sk-fake', modelName: 'gpt-3.5-turbo' });
    } else {
      console.log('☁️ Iniciando Motor em Nuvem via OpenAI! (GPT-3.5)');
      this.chatModel = new ChatOpenAI({
        modelName: 'gpt-3.5-turbo',
        temperature: 0.3,
        openAIApiKey: apiKey,
      });
    }
  }

  /**
   * 1. Ingestão (Ingestion): Lê os arquivos .lesson.md, quebra em pedaços (Chunks) 
   *    e os converte em Vetores Embeddings para armazenar em memória.
   */
  async ingestLessons(workspacePath: string) {
    console.log('📖 Iniciando a leitura das lições do TechQuest (Repositório Centralizado)...');
    
    // Procura por todos os arquivos de lição no repositório de cursos
    const lessonsDir = path.join(workspacePath, 'course-service', 'lessons');
    const lessonFiles = glob.sync('**/*.lesson.md', { cwd: lessonsDir, absolute: true });
    
    if (lessonFiles.length === 0) {
      throw new Error(`Nenhum arquivo de lição encontrado no diretório: ${lessonsDir}`);
    }

    const rawDocs = await Promise.all(lessonFiles.map(async (file) => {
      const content = await fs.readFile(file, 'utf-8');
      return { pageContent: content, metadata: { source: path.basename(file) } };
    }));

    // Quebra o texto em pedaços (Chunks) para a IA não perder o contexto
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const splitDocs = await textSplitter.createDocuments(
      rawDocs.map(d => d.pageContent), 
      rawDocs.map(d => d.metadata)
    );

    // Converte os textos em Embeddings (Matemática Vetorial) e salva
    try {
      if (this.isMockMode) {
        console.log('⚠️ Mock Mode: Pulando embeddings reais para economizar/evitar erro de chave.');
        return;
      }
      
      let embeddings;
      if (this.isOllama) {
        console.log('🧮 Configurando gerador de Embeddings local (Ollama)...');
        const ollamaBaseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
        // Para embeddings, é altamente recomendado usar o nomic-embed-text
        const ollamaEmbeddingModel = process.env.OLLAMA_EMBEDDING_MODEL || 'nomic-embed-text'; 
        embeddings = new OllamaEmbeddings({
          baseUrl: ollamaBaseUrl,
          model: ollamaEmbeddingModel,
        });
      } else {
        console.log('☁️ Configurando gerador de Embeddings em nuvem (OpenAI)...');
        embeddings = new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY });
      }

      console.log('⏳ Iniciando processamento vetorial (isso pode demorar alguns minutos localmente)...');
      this.vectorStore = new MemoryVectorStore(embeddings);
      
      let count = 0;
      for (const doc of splitDocs) {
        await this.vectorStore.addDocuments([doc]);
        count++;
        // Loga a cada 5 chunks processados ou no último chunk
        if (count % 5 === 0 || count === splitDocs.length) {
            console.log(`📊 Progresso: ${count}/${splitDocs.length} blocos convertidos em embeddings.`);
        }
      }

      console.log(`✅ Base de Conhecimento RAG criada! ${splitDocs.length} chunks armazenados no VectorDB.`);
    } catch (err: any) {
      console.error('Erro ao gerar embeddings, ativando Mock Mode. Verifique se o Ollama está rodando ou se a chave OpenAI é válida. Erro:', err.message);
      this.isMockMode = true;
    }
  }

  /**
   * 2. Recuperação (Retrieval) e Geração (Generation): Busca a resposta no VectorDB
   *    e passa como contexto para o LLM responder.
   */
  async askQuestion(question: string, chatHistory: string = ''): Promise<string> {
    if (this.isMockMode) {
      return `[Mock Mode] Mestre da IA Offline. Para conversar comigo sobre "${question}" de verdade, crie uma chave em platform.openai.com e coloque no .env do ai-service!`;
    }

    if (!this.vectorStore) {
      throw new Error('O VectorDB não foi inicializado. Chame ingestLessons() primeiro.');
    }

    // Busca os trechos de texto mais semelhantes à pergunta
    const retriever = this.vectorStore.asRetriever(3); // Top 3 documentos

    // Cria o Prompt RAG
    const prompt = PromptTemplate.fromTemplate(`
      Você é o "Mestre do Código", um arquiteto sênior e mentor IA do jogo TechQuest Meta-App.
      Sua missão é ajudar os desenvolvedores a entenderem a arquitetura do projeto e tirar dúvidas gerais de programação (TypeScript, React, NestJS, Express, Kafka, Docker, etc).
      
      Regras:
      1. Se a pergunta for sobre o TechQuest, use o contexto abaixo (nossas lições de arquitetura) para dar uma resposta precisa baseada no nosso projeto.
      2. Se a pergunta for sobre programação geral (React, TS, Node, etc) e não estiver no contexto, sinta-se livre para usar todo o seu conhecimento global para ensinar o aluno da melhor forma possível.
      3. Você pode fugir do assunto de programação de leve para ser sociável ou fazer analogias, mas lembre-se de sempre trazer o foco de volta para o desenvolvimento e engenharia.
      4. Formate sua resposta usando Markdown. Use parágrafos espaçados para melhor leitura e use blocos de código formatados (com a linguagem especificada) sempre que mostrar código.
      
      Histórico da Conversa:
      {chat_history}
      
      Contexto das lições do TechQuest:
      {context}
      
      Pergunta do Aluno: {input}
      
      Resposta do Mestre:
    `);

    // Cria a corrente (Chain) que une o Document Retriever com o LLM
    const documentChain = await createStuffDocumentsChain({
      llm: this.chatModel,
      // @ts-ignore: Incompatibilidade de versão de tipagem do Langchain Core vs Langchain
      prompt: prompt,
      // @ts-ignore: Incompatibilidade de versão de tipagem do Langchain Core vs Langchain
      outputParser: new StringOutputParser(),
    });

    const retrievalChain = await createRetrievalChain({
      // @ts-ignore: Incompatibilidade de interface interna do Langchain Core vs Langchain Base
      combineDocsChain: documentChain,
      // @ts-ignore
      retriever: retriever,
    });

    const result = await retrievalChain.invoke({ 
      input: question,
      chat_history: chatHistory
    });
    return result.answer;
  }
}

// Exemplo de como inicializar o serviço se executarmos este arquivo diretamente:
if (require.main === module) {
  (async () => {
    try {
      const mentor = new TechQuestAiMentor();
      // O path resolve volta 2 diretórios para ler a raiz do repositório
      await mentor.ingestLessons(path.resolve(__dirname, '../../'));
      
      const answer = await mentor.askQuestion("Por que usamos Multi-stage build no Docker?");
      console.log("\n🤖 Resposta do Mestre do Código:\n", answer);
    } catch (e: any) {
      console.error(e.message);
      console.log("\n⚠️ Dica: Você configurou o arquivo .env com a sua OPENAI_API_KEY? A conexão com a OpenAI falhou ou não encontrou os arquivos.");
    }
  })();
}
