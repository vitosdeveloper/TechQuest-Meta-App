import { Lesson } from '../../domain/entities/Lesson';
import { LessonRepository } from '../../domain/repositories/LessonRepository';
import { createClient } from 'redis';

// Cria o client do Redis globalmente no módulo
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://127.0.0.1:6379'
});

redisClient.on('error', err => console.warn('Redis Client Error:', err.message));
// Conecta de forma não bloqueante
redisClient.connect().catch(() => console.warn('Não foi possível conectar ao Redis de primeira.'));

export class ListLessonsUseCase {
  constructor(private readonly lessonRepository: LessonRepository) {}

  async execute(): Promise<Lesson[]> {
    const CACHE_KEY = 'techquest:lessons:all';
    
    try {
      if (redisClient.isReady) {
        // 1. Tenta ler do Cache
        const cached = await redisClient.get(CACHE_KEY);
        if (cached) {
          console.log('⚡ [CACHE HIT] Retornando aulas diretamente da memória Redis!');
          return JSON.parse(cached);
        }
      }
    } catch (err) {
      console.warn('Erro ao ler do Redis', err);
    }

    console.log('🐢 [CACHE MISS] Lendo do Disco/Sistema de Arquivos...');
    // 2. Fallback: Lê do Banco / Disco
    const lessons = await this.lessonRepository.findAll();

    try {
      if (redisClient.isReady) {
        // 3. Salva no Cache para a próxima (Cache-Aside) com expiração de 1 hora
        await redisClient.setEx(CACHE_KEY, 3600, JSON.stringify(lessons));
      }
    } catch (err) {
      console.warn('Erro ao escrever no Redis', err);
    }

    return lessons;
  }
}
