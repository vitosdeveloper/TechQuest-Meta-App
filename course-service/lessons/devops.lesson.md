# 📚 Lição: DevOps e Orquestração (Kubernetes)

## 1. O Que É e o Problema que Resolve

Neste módulo, elevamos nosso sistema do nível "funciona na minha máquina" para o nível "funciona em qualquer servidor do planeta". Empacotamos o nosso serviço em uma "caixa" invisível chamada Container (Docker) e entregamos para o "maestro" (Kubernetes) orquestrar.

- **O Problema Antigo:** Antes dos contêineres, instalar um app exigia que o servidor tivesse a exata versão do Node.js, bibliotecas do sistema operacional e variáveis configuradas à mão. "Funcionou na minha máquina, mas quebrou em Produção".
- **A Solução:** O Docker isola o app e TODAS as suas dependências num pacote estático (Imagem). O Kubernetes pega milhares desses pacotes e garante que eles rodem, não importa o que aconteça com a máquina física por baixo.

### Dicionário Sênior
- **Multi-stage Build:** Técnica onde você usa a primeira etapa do Docker apenas para compilar (ex: build do TypeScript) e a segunda etapa pega SÓ o resultado limpo. Isso joga o tamanho da sua imagem de 1.5GB para 50MB, prevenindo vulnerabilidades de segurança.
- **Probes (Liveness & Readiness):** O "batimento cardíaco" do sistema. O Kubernetes pinga a rota `/health`. Se não responder, ele entende que o sistema travou e mata o contêiner, subindo um novo automaticamente (Self-Healing).
- **Service & Ingress:** O Service garante um IP fixo interno para seus pods mutáveis. O Ingress é a porta de entrada da rua (ex: seu domínio) para dentro do cluster.

## 2. Vantagens e Desvantagens (Trade-offs)

| Recurso | Bare-metal (VM/Servidor Nu) 💻 | Kubernetes (Cloud Native) 🚢 |
| :--- | :--- | :--- |
| **Portabilidade** | Preso ao provedor/SO | Roda em qualquer nuvem ou máquina |
| **Escala Horizontal** | Lenta (minutos/horas) | Imediata (segundos) |
| **Complexidade** | Simples (Acesso SSH) | Altíssima (Manifestos, Rede Virtual) |
| **Custo Inicial** | Muito baixo | Alto (O próprio cluster K8s já cobra uma base) |

## 3. Cenário Ideal de Uso

**✅ Quando aplicar:**
- Seu sistema precisa escalar automaticamente com picos de tráfego (Ex: Black Friday).
- Você possui múltiplos microserviços e precisa garantir que eles não entrem em conflito.
- A equipe é madura o suficiente para manter a complexidade de uma malha de serviços.

**❌ Quando NÃO aplicar:**
- Startups validando o primeiro MVP de um monolito. Um VPS na DigitalOcean ou Render/Vercel resolve 100% dos problemas de forma muito mais barata. Não mate uma formiga com uma bazuca.

## 4. Deep Dive (Como testar na prática)

1. Crie a imagem minúscula do seu serviço:
   `docker build -t techquest/user-service:latest .`
2. Em um cluster real (ou Minikube/Docker Desktop local), aplique a declaração da infraestrutura:
   `kubectl apply -f k8s/user-service/deployment.yaml`
   `kubectl apply -f k8s/user-service/service.yaml`
3. Monitore os Pods nascendo:
   `kubectl get pods -w`

## 5. Checklist do Sênior (Perguntas de Entrevista)

1. *"Qual é a diferença brutal entre Virtual Machines (VMs) e Containers (Docker)?"*
2. *"Por que executar o Node.js como usuário 'root' dentro do Docker é considerado uma falha crítica de segurança?"*
3. *"O que acontece com os dados em disco quando um Pod do Kubernetes morre por erro de memória (OOMKilled)?"*
