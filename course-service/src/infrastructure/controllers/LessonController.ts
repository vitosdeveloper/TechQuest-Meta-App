import { Request, Response } from 'express';
import { ListLessonsUseCase } from '../../application/use-cases/ListLessonsUseCase';
import { GetLessonUseCase } from '../../application/use-cases/GetLessonUseCase';
import { SearchLessonsUseCase } from '../../application/use-cases/SearchLessonsUseCase';

export class LessonController {
  constructor(
    private readonly listLessonsUseCase: ListLessonsUseCase,
    private readonly getLessonUseCase: GetLessonUseCase,
    private readonly searchLessonsUseCase: SearchLessonsUseCase
  ) {}

  async search(req: Request, res: Response): Promise<void> {
    try {
      const q = req.query.q as string;
      if (!q) {
        res.json([]);
        return;
      }
      const results = await this.searchLessonsUseCase.execute(q);
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar lições.' });
    }
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const lessons = await this.listLessonsUseCase.execute();
      res.json(lessons);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar lições.' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const lesson = await this.getLessonUseCase.execute(req.params.id as string);
      res.json(lesson);
    } catch (error: any) {
      console.error(error);
      if (error.message === 'Lição não encontrada.') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Erro interno ao carregar a aula.' });
      }
    }
  }
}
