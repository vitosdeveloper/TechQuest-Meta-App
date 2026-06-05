import { LessonRepository, SearchResult } from '../../domain/repositories/LessonRepository';

export class SearchLessonsUseCase {
  constructor(private readonly lessonRepository: LessonRepository) {}

  async execute(query: string): Promise<SearchResult[]> {
    return this.lessonRepository.search(query);
  }
}
