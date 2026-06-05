# ⚡ Tempo Real: WebSockets e Streaming

## 1. O Que É e o Problema que Resolve

A Web clássica foi desenhada para leitura de documentos acadêmicos via protocolo HTTP. Ela obedece a regra: **O Cliente pergunta, o Servidor responde.** E a conexão se fecha imediatamente.
Mas como desenhar um Chat do WhatsApp, ou um mapa do Uber se movendo? Fazer o cliente perguntar ao servidor "E aí, meu carro andou?" a cada 1 segundo (Short Polling) destruiria os processadores do servidor e a bateria do celular.

Para contornar o protocolo HTTP, surgiram tecnologias persistentes de **Tempo Real (Real-time)**.

### Dicionário Sênior
- **WebSocket (WS):** Um protocolo mágico de via de mão dupla (Full-Duplex). O cliente e o servidor "atendem o telefone" e deixam a linha aberta eternamente. Ambos podem falar um com o outro a qualquer momento, sem mandar cabeçalhos HTTP inúteis.
- **Server-Sent Events (SSE):** Via de mão única. A conexão fica aberta, mas APENAS o servidor envia pacotes para o cliente. Ótimo para feed do Twitter ou cotações da Bolsa de Valores.
- **Short Polling:** O anti-padrão onde o Frontend roda um `setInterval` dando `fetch` na API de segundo em segundo. 

## 2. Vantagens e Desvantagens (Trade-offs)

| Tecnologia | Direção de Dados | Consumo de Rede | Complexidade de Escala |
| :--- | :--- | :--- | :--- |
| **Polling (REST)** | Cliente -> Servidor -> Cliente | Alto (Cabeçalhos a cada seg) | Baixíssima (Stateless) |
| **Server-Sent Events**| Servidor -> Cliente | Muito Baixo | Média |
| **WebSockets** | Bi-direcional | Extremamente Baixo | Altíssima (Conexões presas - Stateful) |

## 3. Cenário Ideal de Uso

**✅ Quando usar WebSockets (Socket.io):**
- Chats (WhatsApp Web), multiplayer de jogos em navegador, plataformas de trade (Corretoras de Crypto), edições colaborativas à la Google Docs.

**✅ Quando usar Server-Sent Events (SSE):**
- Seus clientes só precisam receber notificações (Dashboard ao vivo, cotação da bolsa). Se o cliente não precisa mandar eventos para o servidor frequentemente, evite WebSockets e use SSE, que roda direto no HTTP padrão.

**❌ Quando NÃO usar WebSockets:**
- Se uma vez a cada hora você precisa checar se há uma atualização.
- O maior problema do WebSocket em Arquiteturas de Microserviços é que ele **cria estado (Stateful)**. Se um Load Balancer rotear sua conexão WebSocket para a Máquina A, você ficará "preso" nela. Se a Máquina A reiniciar, sua conexão cai. Escalar WebSockets horizontalmente exige servidores complexos de "Pub/Sub" como Redis no meio para espalhar os eventos.

## 4. Deep Dive (Exemplo Prático: SSE vs Polling)

Polling Tradicional no React (Terrível):
```javascript
// Bombardeando seu próprio servidor de 1 em 1 segundo
useEffect(() => {
  const timer = setInterval(() => {
    fetch('/api/notificacoes').then(res => setNotifs(res));
  }, 1000);
  return () => clearInterval(timer);
}, []);
```

Server-Sent Events no React (Elegante):
```javascript
useEffect(() => {
  // Apenas UMA requisição que nunca fecha! O servidor manda eventos pro EventSource.
  const evtSource = new EventSource("/api/notificacoes/stream");
  
  evtSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    setNotifs(prev => [...prev, data]);
  };
  
  return () => evtSource.close();
}, []);
```

## 5. Checklist do Sênior (Perguntas de Entrevista)

1. *"Se eu tiver 1 milhão de usuários simultâneos no meu Chat WebSockets, por que meu Load Balancer ou Proxy NGINX pode parar de funcionar antes da minha CPU estourar? (Dica: Limites de Portas Ephemeral e Descritores de Arquivos no Linux)."*
2. *"Como o Redis Pub/Sub ajuda a escalar servidores Node.js Socket.io horizontalmente?"*
3. *"Explique o que é Long-Polling e por que era usado antes de 2011."*
