import * as fs from 'fs-extra';
import * as path from 'path';
import { glob } from 'glob';
import { IVectorStore } from '../../../domain/interfaces/IVectorStore';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OpenAIEmbeddings } from '@langchain/openai';
import { OllamaEmbeddings } from '@langchain/ollama';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

export class MemoryVectorStoreImpl implements IVectorStore {
  private vectorStore: MemoryVectorStore | null = null;
  private isMockMode: boolean = false;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY || '';
    if (!process.env.USE_OLLAMA && (!apiKey || apiKey.includes('sua-c') || apiKey.includes('sua_c'))) {
      this.isMockMode = true;
    }
  }

  async ingestFiles(workspacePath: string): Promise<number> {
    const lessonsDir = path.join(workspacePath, 'course-service', 'lessons');
    const lessonFiles = glob.sync('**/*.lesson.md', { cwd: lessonsDir, absolute: true });
    
    if (lessonFiles.length === 0) {
      throw new Error(`Nenhum arquivo de lição encontrado no diretório: ${lessonsDir}`);
    }

    const rawDocs = await Promise.all(lessonFiles.map(async (file) => {
      const content = await fs.readFile(file, 'utf-8');
      return { pageContent: content, metadata: { source: path.basename(file) } };
    }));

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const splitDocs = await textSplitter.createDocuments(
      rawDocs.map(d => d.pageContent), 
      rawDocs.map(d => d.metadata)
    );

    try {
      if (this.isMockMode) {
        console.log('⚠️ Mock Mode: Pulando embeddings reais para evitar erro de chave.');
        return splitDocs.length;
      }
      
      let embeddings;
      if (process.env.USE_OLLAMA === 'true') {
        const ollamaBaseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
        const ollamaEmbeddingModel = process.env.OLLAMA_EMBEDDING_MODEL || 'nomic-embed-text'; 
        embeddings = new OllamaEmbeddings({
          baseUrl: ollamaBaseUrl,
          model: ollamaEmbeddingModel,
        });
      } else {
        embeddings = new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY });
      }

      this.vectorStore = new MemoryVectorStore(embeddings);
      
      let count = 0;
      for (const doc of splitDocs) {
        await this.vectorStore.addDocuments([doc]);
        count++;
        if (count % 5 === 0 || count === splitDocs.length) {
            console.log(`📊 Progresso: ${count}/${splitDocs.length} blocos convertidos em embeddings.`);
        }
      }
      return splitDocs.length;
    } catch (err: any) {
      console.error('Erro ao gerar embeddings:', err.message);
      this.isMockMode = true;
      return 0;
    }
  }

  async search(query: string, topK: number = 3): Promise<string[]> {
    if (!this.vectorStore) return [];
    const results = await this.vectorStore.similaritySearch(query, topK);
    return results.map(r => r.pageContent);
  }

  get hasData(): boolean {
    return this.vectorStore !== null || this.isMockMode;
  }
}
