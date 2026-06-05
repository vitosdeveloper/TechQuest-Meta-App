# ⚡ Caching Sênior: Redis e Estratégias de Invalidação

## 1. O Que É e o Problema que Resolve
Sempre que sua aplicação cresce, as consultas ao banco de dados viram o gargalo principal. Buscar os "Produtos mais vendidos" a cada requisição destrói o banco de dados.
O Caching coloca uma memória ultrarrápida (RAM) na frente do banco. Em vez de calcular do zero, você entrega a resposta salva. A latência cai de 200ms para 1ms.

### Dicionário Sênior
- **Redis:** O motor de cache In-Memory mais famoso do mundo. Diferente do Memcached, ele suporta listas, conjuntos e salva dados no disco de fundo.
- **Cache Hit / Cache Miss:** Hit é quando a resposta está no Cache. Miss é quando não está, forçando a API a bater no banco e, em seguida, salvar no cache.
- **Cache Stampede (Estouro de Manada):** Quando um dado muito acessado no cache expira, milhares de requisições batem no banco de dados simultaneamente na mesma fração de segundo, derrubando o servidor.

## 2. Vantagens e Desvantagens (Trade-offs)

| Estratégia | Cache-Aside (Lazy Loading) 🦥 | Write-Through ✍️ |
| :--- | :--- | :--- |
| **Como funciona** | A API busca no Cache. Se não tem, busca no Banco e salva no Cache. | Toda vez que salva no banco, já atualiza o Cache junto. |
| **Vantagem** | Só faz cache do que realmente é acessado. | Os dados nunca estão velhos (Zero Inconsistência). |
| **Desvantagem** | A primeira requisição sempre sofre penalidade de latência. | Maior tempo de gravação; a memória enche com dados inúteis. |

## 3. Cenário Ideal de Uso

**✅ Quando aplicar Redis:**
- Leaderboards de jogos, listagens de produtos de um e-commerce, validação de Refresh Tokens ou controle de Rate Limiting.

**❌ Quando NÃO aplicar Redis:**
- Para guardar a fonte primária da verdade de transações financeiras críticas. A memória RAM é volátil; o banco relacional (ACID) é o cofre.

## 4. Deep Dive (Exemplo Prático: Cache-Aside no Node.js)

Veja a diferença brutal na arquitetura usando o padrão `Cache-Aside`:

```typescript
import { redisClient } from './redis';
import { prisma } from './db';

async function getCourseLeaderboard() {
  // 1. Tenta pegar da memória RAM (1 milissegundo)
  const cachedData = await redisClient.get('leaderboard');
  if (cachedData) return JSON.parse(cachedData); // CACHE HIT!

  // 2. CACHE MISS! Bate no banco pesadão (200 milissegundos)
  const data = await prisma.userXp.findMany({
    orderBy: { xp: 'desc' },
    take: 10
  });

  // 3. Salva no cache com expiração de 5 minutos (TTL)
  await redisClient.setex('leaderboard', 300, JSON.stringify(data));
  return data;
}
```

## 5. Checklist do Sênior (Perguntas de Entrevista)

1. *"A máxima da computação diz que 'invalidação de cache' é uma das coisas mais difíceis de se fazer. Por que é tão difícil?"*
2. *"Como você resolveria o problema do Cache Stampede?" (Dica: Bloqueios Mutex ou TTL com Jitter).*
3. *"O que é CDN (Content Delivery Network) e como ela atua como um Cache Global para Frontend?"*
