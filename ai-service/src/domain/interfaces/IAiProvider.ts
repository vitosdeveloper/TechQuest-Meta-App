export interface IAiProvider {
  askQuestion(question: string, chatHistory: string): Promise<string>;
  isInitialized(): boolean;
}
