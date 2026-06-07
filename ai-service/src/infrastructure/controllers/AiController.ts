import { Request, Response } from 'express';
import { AskQuestionUseCase } from '../../application/use-cases/AskQuestionUseCase';

export class AiController {
  constructor(private askQuestionUseCase: AskQuestionUseCase) {}

  public async ask(req: Request, res: Response): Promise<void> {
    try {
      const { question, chatHistory } = req.body;
      
      console.log(`🤖 [Controller] Pergunta recebida: ${question}`);
      const answer = await this.askQuestionUseCase.execute(question, chatHistory || '');
      
      res.json({ answer });
    } catch (error: any) {
      console.error('Erro no AiController:', error);
      res.status(500).json({ error: 'Falha no servidor de IA', details: error.message });
    }
  }
}
