import { Lesson } from '../../domain/entities/Lesson';
import { LessonRepository } from '../../domain/repositories/LessonRepository';

export class GetLessonUseCase {
  constructor(private readonly lessonRepository: LessonRepository) {}

  async execute(id: string): Promise<Lesson> {
    const lesson = await this.lessonRepository.findById(id);
    
    if (!lesson) {
      throw new Error('Lição não encontrada.');
    }

    return lesson;
  }
}
