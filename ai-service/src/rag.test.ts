import { TechQuestAiMentor } from './rag';

describe('TechQuestAiMentor', () => {
  let mentor: TechQuestAiMentor;

  beforeEach(() => {
    // Limpa variáveis antes de cada teste
    delete process.env.OPENAI_API_KEY;
    delete process.env.USE_OLLAMA;
  });

  it('Deve iniciar em Mock Mode quando não há API Key e USE_OLLAMA é false', () => {
    process.env.USE_OLLAMA = 'false';
    mentor = new TechQuestAiMentor();
    
    expect((mentor as any).isMockMode).toBe(true);
    expect((mentor as any).isOllama).toBe(false);
  });

  it('Deve iniciar usando ChatOllama quando USE_OLLAMA for true', () => {
    process.env.USE_OLLAMA = 'true';
    mentor = new TechQuestAiMentor();
    
    expect((mentor as any).isOllama).toBe(true);
  });

  it('Deve retornar aviso mockado em askQuestion quando em Mock Mode', async () => {
    process.env.USE_OLLAMA = 'false';
    mentor = new TechQuestAiMentor();

    const resposta = await mentor.askQuestion("O que é RAG?");
    expect(resposta).toContain('[Mock Mode]');
  });
});
