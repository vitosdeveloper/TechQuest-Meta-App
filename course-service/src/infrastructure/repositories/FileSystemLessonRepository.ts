import * as fs from 'fs';
import * as path from 'path';
import { Lesson } from '../../domain/entities/Lesson';
import { LessonRepository } from '../../domain/repositories/LessonRepository';

export class FileSystemLessonRepository implements LessonRepository {
  private workspaceRoot: string;

  constructor() {
    this.workspaceRoot = process.env.LESSONS_PATH || path.resolve(__dirname, '../../../../course-service/lessons');
  }

  // A Trilha de Conhecimento Obrigatória
  private readonly LESSON_ORDER = [
    'intro.lesson.md',
    'agile.lesson.md',
    'solid.lesson.md',
    'system-design.lesson.md',
    'databases.lesson.md',
    'microfrontends.lesson.md',
    'user-service.lesson.md',
    'auth.lesson.md',
    'tests.lesson.md',
    'security.lesson.md',
    'mensageria.lesson.md',
    'eda-advanced.lesson.md',
    'caching.lesson.md',
    'realtime.lesson.md',
    'grpc-graphql.lesson.md',
    'devops.lesson.md',
    'ci.lesson.md',
    'cloud-native.lesson.md',
    'observability.lesson.md',
    'ai-engineering.lesson.md',
    '21.deploy.lesson.md'
  ];

  private async getLessonFiles(): Promise<string[]> {
    if (!fs.existsSync(this.workspaceRoot)) return [];
    
    const allFiles = await fs.promises.readdir(this.workspaceRoot);
    const validFiles = allFiles.filter(f => f.endsWith('.lesson.md'));

    // Ordenação hardcoded baseada na Trilha
    return validFiles.sort((a, b) => {
      const idxA = this.LESSON_ORDER.indexOf(a);
      const idxB = this.LESSON_ORDER.indexOf(b);
      // Se não estiver na lista, joga pro final
      if (idxA === -1) return 1;
      if (idxB === -1) return -1;
      return idxA - idxB;
    }).map(f => path.join(this.workspaceRoot, f));
  }

  async findAll(): Promise<Lesson[]> {
    const files = await this.getLessonFiles();
    
    return files.map(file => {
      const id = path.basename(file);
      return new Lesson(id, file);
    });
  }

  async findById(id: string): Promise<Lesson | null> {
    const files = await this.getLessonFiles();
    const foundFile = files.find(file => path.basename(file) === id);

    if (!foundFile) return null;

    const content = await fs.promises.readFile(foundFile, 'utf-8');
    return new Lesson(id, foundFile, id.replace('.lesson.md', ''), content);
  }

  async search(query: string): Promise<any[]> {
    if (!query || query.trim().length < 2) return [];
    
    const files = await this.getLessonFiles();
    const results: any[] = [];
    const lowerQuery = query.toLowerCase();

    for (const file of files) {
      const content = await fs.promises.readFile(file, 'utf-8');
      const lowerContent = content.toLowerCase();
      
      const index = lowerContent.indexOf(lowerQuery);
      if (index !== -1) {
        // Pega 40 caracteres antes e 60 depois
        const start = Math.max(0, index - 40);
        const end = Math.min(content.length, index + query.length + 60);
        let snippet = content.substring(start, end).replace(/\n/g, ' ');
        
        if (start > 0) snippet = '...' + snippet;
        if (end < content.length) snippet = snippet + '...';

        const id = path.basename(file);
        results.push({
          lessonId: id,
          title: id.replace('.lesson.md', ''),
          snippet
        });
      }
    }
    
    return results;
  }
}
