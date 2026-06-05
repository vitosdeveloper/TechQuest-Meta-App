# 🏛️ Fundamentos do System Design: Escalando para Milhões

## 1. O Que É e o Problema que Resolve
System Design (Desenho de Sistemas) é o processo de definir a arquitetura, os módulos, as interfaces e a estrutura de dados de um sistema para satisfazer requisitos específicos (ex: suportar 1 milhão de usuários simultâneos).
**O Problema:** Um aplicativo recém-criado roda numa única máquina. Quando o aplicativo viraliza, aquela máquina "pega fogo" (Crash por exaustão de CPU/Memória). O System Design cria a engenharia para dividir a carga em dezenas de máquinas trabalhando juntas sem que o usuário perceba.

### Dicionário Sênior
- **Load Balancer (Balanceador de Carga):** O porteiro do seu sistema. Ele recebe todas as requisições e distribui de forma justa entre vários servidores. Ex: NGINX, AWS ALB.
- **Teorema CAP:** Uma regra absoluta em sistemas distribuídos. Diz que você só pode garantir duas de três coisas: Consistência (Consistency), Disponibilidade (Availability) e Tolerância a Particionamento (Partition Tolerance). A maioria dos sistemas escolhe CP ou AP.
- **Horizontal vs Vertical Scaling:** Escalar Verticalmente (Scale Up) é colocar mais memória e CPU em um único servidor (tem limite de hardware). Escalar Horizontalmente (Scale Out) é adicionar mais servidores na rede (teoricamente infinito).

## 2. Vantagens e Desvantagens (Trade-offs)

| Recurso | Scale Up (Vertical) 📈 | Scale Out (Horizontal) 🌐 |
| :--- | :--- | :--- |
| **Limite** | Baixo (Preso ao hardware máximo da AWS) | Virtualmente Ilimitado |
| **Downtime** | Exige desligar a máquina para dar upgrade | Zero Downtime (Adiciona servidores a quente) |
| **Complexidade** | Simples (Nenhuma mudança no código) | Altíssima (Sessões descentralizadas, Load Balancers) |
| **Ponto de Falha**| Único (Se a máquina cair, tudo cai) | Múltiplo (Se uma cair, as outras assumem) |

## 3. Cenário Ideal de Uso

**✅ Quando aplicar System Design Profundo:**
- Ao desenhar a arquitetura base de uma Startup que tem projeção de escala global.
- Quando a aplicação precisa de 99.999% de disponibilidade (SLA alto), garantindo que ela sobreviva até mesmo se o data-center de uma região inteira explodir (Multi-Region / Multi-AZ).

**❌ Quando NÃO aplicar:**
- Sistemas internos de controle de ponto de uma padaria local, que terá no máximo 10 funcionários. Aqui, rodar tudo em um único servidor na nuvem (ou até debaixo da mesa) é mais que suficiente e economiza 99% de tempo de engenharia.

## 4. Deep Dive (Exemplo Prático: Load Balancer no NGINX)

Quando você quer escalar o nosso `User Service`, você roda 3 instâncias dele nas portas 3001, 3002 e 3003. Mas o frontend precisa mandar o dado para qual porta?
O Balanceador de Carga resolve isso. Eis um arquivo `nginx.conf` simplificado provando isso na prática:

```nginx
# Define os servidores "trabalhadores" (Upstream)
upstream user_service_cluster {
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
    server 127.0.0.1:3003;
}

server {
    listen 80;

    location /api/users/ {
        # O NGINX repassa a requisição usando a estratégia Round-Robin por padrão
        # (Um para a 3001, o próximo para a 3002, etc.)
        proxy_pass http://user_service_cluster;
    }
}
```

## 5. Checklist do Sênior (Perguntas de Entrevista)

1. *"O que é e como funciona o conceito de Consistent Hashing?"*
2. *"Se eu fizer um Login e o Load Balancer me redirecionar para a Máquina 1, a Máquina 2 saberá que estou logado na minha próxima requisição? Como você resolveria isso?" (Dica: Sessões stateless com JWT ou Redis).*
3. *"Explique na prática como você projetaria uma arquitetura estilo Twitter para suportar o Justin Bieber tuitando algo para 100 milhões de seguidores simultaneamente?"*
