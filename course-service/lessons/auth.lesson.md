# 🔐 Autenticação Sênior: JWT, OAuth e RBAC

## 1. O Que É e o Problema que Resolve
No começo, o desenvolvedor salva senhas em texto puro e usa *cookies de sessão* baseados em memória do servidor. O problema é que, em um ecossistema de microserviços, se o "User Service 1" salva a sessão na memória dele, quando o Load Balancer redirecionar o usuário para o "User Service 2", ele será deslogado!
Para resolver isso, usamos métodos **Stateless** (sem estado). O servidor não precisa lembrar de quem está logado; o cliente carrega uma carteira de identidade criptografada (Token).

### Dicionário Sênior
- **JWT (JSON Web Token):** Um padrão de mercado onde o token assinado (por uma chave secreta no servidor) contém dados do usuário (ex: id, cargo). Ele permite autenticar o usuário sem bater no banco de dados.
- **OAuth 2.0 / OIDC:** Protocolo padrão para delegar autorização (Ex: "Logar com Google"). O OIDC adiciona uma camada de identidade em cima do OAuth 2.0.
- **RBAC (Role-Based Access Control):** Controle de Acesso Baseado em Cargos. Em vez de perguntar "O João pode apagar o arquivo?", a API pergunta "O João tem a role 'ADMIN'?".

## 2. Vantagens e Desvantagens (Trade-offs)

| Método | Stateful (Sessão na Memória) 🧠 | Stateless (JWT) 🎫 |
| :--- | :--- | :--- |
| **Revogação (Logout forçado)** | Imediata (Só apagar da memória) | Complexa (Requer Blacklist no Redis) |
| **Escalabilidade** | Baixa (Requer Sticky Sessions) | Infinita (Qualquer servidor valida a assinatura) |
| **Tamanho da Requisição**| Leve (Apenas ID do Cookie) | Pesado (O Token inteiro trafega toda vez) |
| **Vulnerabilidade** | CSRF | XSS (Se salvo no localStorage) |

## 3. Cenário Ideal de Uso

**✅ Quando usar JWT:**
- Microserviços e APIs distribuídas.
- Aplicativos Mobile conversando com a API (Mobile não lida bem com Cookies).

**❌ Quando usar Stateful (Sessões tradicionais):**
- Sistemas críticos bancários onde você precisa invalidar a sessão em 0.001s remotamente sem depender de Redis (embora hoje em dia a maioria use Tokens de curto prazo + Refresh Tokens).

## 4. Deep Dive (Exemplo Prático: Middleware JWT)

Em vez de bater no banco de dados para saber se o cara é Admin, decodificamos a assinatura matemática:

```typescript
// middleware/auth.ts
import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
  if (!token) return res.status(401).send("Acesso Negado");

  try {
    // A mágica: Não usamos o banco! Apenas matemática (HMAC SHA256)
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { id: 1, role: 'ADMIN' }
    next();
  } catch (err) {
    res.status(403).send("Token Inválido ou Expirado");
  }
}
```

## 5. Como o TechQuest Implementou Isso

No nosso sistema atual, nós abandonamos a autenticação "mock" temporária inicial e adotamos criptografia de verdade para que o app seja seu objeto de estudo:
- **Acesso direto via Nickname (sem email):** O `user-service` utiliza **BcryptJS** no caso de uso `CreateUserUseCase` para registrar você e realizar o login apenas com seu Login/Senha gerando a identidade da sua conta isolada. O e-mail não é requisitado na interface.
- O Gateway (`api-gateway`) impõe a verificação do JWT em todas as requisições privadas, barrando invasores com erros `401 Unauthorized` (como proteger o `query-service` ou o `gamification-service`). Apenas o endpoint de login e criação de usuários são exceções públicas.
- O Frontend foi refatorado e captura os erros 401 do Gateway silenciosamente via um "Interceptor" (`apiFetch`). Se o Gateway disser que seu Token expirou (7 dias), o Frontend destrói sua sessão local no localStorage e te ejeta diretamente de volta à tela de login.
- **O Isolamento de Dados está ativo:** Todo o seu progresso (Kanban), sua experiência (XP, Gamificação) e até o histórico do Chat da IA (no seu navegador) são estritamente atrelados ao ID único do seu usuário gerado, impedindo que os dados, XP e chats de outros usuários interfiram na sua conta.

## 6. Checklist do Sênior (Perguntas de Entrevista)

1. *"Se um hacker roubar um JWT, ele terá acesso para sempre? Como o Refresh Token resolve isso?"*
2. *"Por que salvar JWT no `localStorage` do React é perigoso em relação a ataques XSS? Qual a alternativa?" (Dica: HttpOnly Cookies).*
3. *"O que é Salting de senha e qual a diferença entre Bcrypt e Argon2?"*
