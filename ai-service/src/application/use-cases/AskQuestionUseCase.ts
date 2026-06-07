import { IAiProvider } from '../../domain/interfaces/IAiProvider';

export class AskQuestionUseCase {
  constructor(private aiProvider: IAiProvider) {}

  public async execute(question: string, chatHistory: string = ''): Promise<string> {
    if (!question || question.trim() === '') {
      throw new Error('A pergunta não pode estar vazia.');
    }

    if (!this.aiProvider.isInitialized()) {
      // Caso não esteja inicializado, podemos delegar pro provider decidir ou forçar inicialização.
      // Assumiremos que o IngestKnowledgeUseCase já inicializou a base.
      console.warn('⚠️ IAiProvider avisou que não está totalmente inicializado (RAG pode estar vazio).');
    }

    return await this.aiProvider.askQuestion(question, chatHistory);
  }
}
