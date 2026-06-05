import { Lesson } from '../entities/Lesson';

export interface SearchResult {
  lessonId: string;
  title: string;
  snippet: string;
}

export interface LessonRepository {
  findAll(): Promise<Lesson[]>;
  findById(id: string): Promise<Lesson | null>;
  search(query: string): Promise<SearchResult[]>;
}
