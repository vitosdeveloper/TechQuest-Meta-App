import { ListLessonsUseCase } from './ListLessonsUseCase';
import { LessonRepository } from '../../domain/repositories/LessonRepository';
import { Lesson } from '../../domain/entities/Lesson';

describe('ListLessonsUseCase', () => {
  it('deve retornar todas as lições do repositório', async () => {
    // Cria um mock do repositório
    const mockLessons: Lesson[] = [
      new Lesson('agile', 'Metodologia Ágil', '...', '10'),
      new Lesson('clean-arch', 'Clean Architecture', '...', '20')
    ];

    const mockRepository: LessonRepository = {
      findAll: jest.fn().mockResolvedValue(mockLessons),
      findById: jest.fn(),
      search: jest.fn()
    };

    const useCase = new ListLessonsUseCase(mockRepository);
    const result = await useCase.execute();

    expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('agile');
  });
});
