# 🛡️ Cibersegurança e Proteção de APIs

## 1. O Que É e o Problema que Resolve
Deixar uma API exposta na internet é como deixar as chaves do seu carro na ignição. Hackers criam robôs que fazem milhões de requisições por segundo para derrubar o sistema ou tentar invadir contas por Força Bruta. Se um desenvolvedor salva os dados de uma empresa sem segurança, ele não comete um "erro" de código, ele gera processos legais milionários (LGPD/GDPR).

O desenvolvimento de software sênior abraça a cultura do **Security By Design** — a segurança não é adicionada no fim do projeto, ela é a base fundadora.

### Dicionário Sênior
- **CORS (Cross-Origin Resource Sharing):** Uma barreira dos navegadores. Ele impede que o site `hacker-mal.com` faça uma requisição silenciosa via JavaScript para a API `seubanco.com/transferir`.
- **Rate Limiting:** O freio de mão. Se o mesmo IP tentar bater na rota `/login` 100 vezes em 1 minuto, o servidor bloqueia o cara temporariamente retornando erro 429 (Too Many Requests).
- **SQL Injection & XSS (Cross-Site Scripting):** As duas vulnerabilidades mais antigas da internet (OWASP Top 10). O SQLi ocorre quando você concatena string pura na Query de Banco de Dados. O XSS ocorre quando o Frontend aceita uma tag `<script>` na área de comentários sem higienizá-la, executando vírus no computador dos outros usuários.

## 2. Vantagens e Desvantagens (Trade-offs)

| Camada de Segurança | Sem Segurança (Inocente) 🕊️ | DevSecOps (Blindado) 🛡️ |
| :--- | :--- | :--- |
| **Velocidade de Dev** | Alta (Qualquer um faz Request) | Mais Lenta (Configurações CORS e Tokens exigem atenção constante) |
| **Experiência do Usuário**| Lisa | Pode irritar usuários reais com Captchas e Rate Limiting exagerados. |
| **Custo de Operação**| Nulo | Alto (WAF na AWS, serviços anti-DDoS como Cloudflare custam caro). |

## 3. Cenário Ideal de Uso

**✅ Quando aplicar Rate Limiting e Sanitização:**
- EM QUALQUER ROTA PUBLICA! Não existe "Appzinho MVP". A partir do momento que uma API tem um IP global na nuvem, ela será escaneada e atacada por bots da Rússia, China e de todas as partes do mundo nas primeiras 24 horas. É inevitável.

**❌ Quando NÃO aplicar segurança estrita (CORS):**
- Quando seus microserviços estão conversando entre si em uma sub-rede privada na nuvem (VPC). Ali eles estão isolados do mundo exterior (Atrás do API Gateway).

## 4. Deep Dive (Exemplo Prático: Rate Limiting no Gateway)

No nosso API Gateway, não precisamos sujar as rotas do backend com lógicas de tráfego. Usamos um pacote maduro para cortar as asas do hacker logo na entrada do castelo:

```typescript
import rateLimit from 'express-rate-limit';

// Configura o escudo mágico
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Janela de 15 minutos
  max: 100, // Limite de 100 requisições por IP
  message: {
    erro: "Força Bruta Detectada: Muitos acessos do mesmo IP. Tente novamente em 15 minutos."
  },
  standardHeaders: true, // Retorna informação correta ao navegador do hacker
  legacyHeaders: false,
});

// Aplica o bloqueio na entrada do Gateway (Em todas as rotas que começam com /api/)
app.use('/api/', apiLimiter);
```

## 5. Checklist do Sênior (Perguntas de Entrevista)

1. *"Como a parametrização do ORM (Prisma/TypeORM) protege automaticamente contra Ataques de SQL Injection em comparação a escrever Queries à mão no driver?"*
2. *"Se eu fizer um ataque de Negação de Serviço Distribuída (DDoS) controlando 50.000 computadores zumbis com IPs diferentes, o seu Rate Limit simples de IP via Express vai resolver? Como o Cloudflare funciona nestes casos?"*
3. *"O que é o OWASP Top 10 e cite 3 vulnerabilidades da última lista."*
