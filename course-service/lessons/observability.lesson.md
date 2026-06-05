# 👁️ Observabilidade: O Radar do Arquiteto

## 1. O Que É e o Problema que Resolve
Monolitos antigos escrevem erros num arquivo `app.log` escondido num servidor debaixo da escada. Quando o sistema cai, você entra via SSH e usa o comando `grep` para caçar o erro por horas.
Em uma arquitetura de 50 Microserviços rodando em 500 Contêineres, entrar com SSH não existe. A máquina inteira desaparece do mapa. A **Observabilidade** resolve isso, garantindo que o seu sistema grite o que está doendo através de *Logs, Métricas e Traces* centralizados em painéis visuais ricos.

### Dicionário Sênior
Os Três Pilares da Observabilidade:
1. **Logs (Eventos Pontuais):** O registro textual de um evento discreto ("Erro 500 no Pagamento de ID #99"). ElasticSearch ou Loki cuidam disso.
2. **Métricas (Visão Sistêmica Agregada):** Números brutos para matemática ("A CPU bateu 90%", "Tivemos 5.000 erros HTTP hoje"). Prometheus guarda, Grafana visualiza.
3. **Traces (Rastreamento Distribuído):** O caminho da requisição. Se o usuário aperta "Comprar", o Frontend bate no Gateway, que bate no Vendas, que bate na Gamificação. O Trace une todos eles por um único UUID invisível, permitindo ver em que milissegundo exato a requisição engasgou! (Jaeger/Zipkin).

## 2. Vantagens e Desvantagens (Trade-offs)

| Recurso | Sem Observabilidade 🙈 | Stack Completa (Grafana/Elastic) 📊 |
| :--- | :--- | :--- |
| **Resolução de Erros (MTTR)**| Horas ou dias | Minutos (O erro salta na tela com o Stack Trace pronto) |
| **Armazenamento (Custo)** | Zero | Gigantesco (Guardar logs de 1 bilhão de eventos pesa TBs no disco) |
| **Prevenção** | Você só age quando o cliente liga xingando | Você cria Alarmes e age *antes* do servidor cair (Alerta de CPU a 80%) |

## 3. Cenário Ideal de Uso

**✅ Quando aplicar Observabilidade (Grafana/Prometheus):**
- Sistemas em Produção (independente de ser Monolito ou Microserviços). Se há clientes pagando, você não pode dirigir no escuro. As métricas salvam o negócio da falência.

**❌ Quando NÃO aplicar:**
- Em desenvolvimento local para projetos de final de semana (TCCs), onde ligar toda a infraestrutura monstruosa do ElasticSearch ou Prometheus pesa mais no seu computador do que a própria aplicação.

## 4. Deep Dive (Exemplo Prático: Métrica no Prometheus)

Em sistemas Node.js/Fastify Sênior, não escrevemos `console.log("processando")`. Nós criamos Histograma de Métricas:

```typescript
import client from 'prom-client';

// O Registro Oficial Global do Prometheus na memória
const register = new client.Registry();

// Métrica do Tipo Contador (Apenas Sobe)
const httpRequestCounter = new client.Counter({
  name: 'cyber_http_requests_total',
  help: 'Total de requisições recebidas',
  labelNames: ['method', 'status']
});

register.registerMetric(httpRequestCounter);

// Durante a requisição da sua API:
fastify.get('/ping', async (req, reply) => {
  httpRequestCounter.inc({ method: 'GET', status: '200' });
  return 'pong';
});

// A rota /metrics que o Servidor Prometheus vai varrer de 15 em 15 segundos
fastify.get('/metrics', async (req, reply) => {
  reply.header('Content-Type', register.contentType);
  return register.metrics();
});
```

## 5. Checklist do Sênior (Perguntas de Entrevista)

1. *"O que é e qual o propósito de um `Correlation ID` (ou `Trace ID`) injetado num Header HTTP passando pelo API Gateway?"*
2. *"Se o banco de dados que guarda os logs do sistema cair, o seu sistema principal deve cair junto?" (Dica: A assincronidade e os agentes de log - ex: Filebeat/Fluentd).*
3. *"Qual a diferença entre uma métrica do tipo `Counter` e `Gauge` na abstração do Prometheus?"*
