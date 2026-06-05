# 🤖 Integração Contínua e Entrega Contínua (CI/CD)

## 1. O Que É e o Problema que Resolve
No passado, a "Sexta-feira de Deploy" era um terror. O time inteiro parava para copiar e colar código nos servidores. Frequentemente, a versão do desenvolvedor A entrava em conflito com a do desenvolvedor B, quebrando a produção.
CI/CD é a prática de **automação extrema**. Um robô cuida de testar, compilar e jogar o código na produção toda vez que alguém clica em "Merge", sem toque humano.

### Dicionário Sênior
- **CI (Continuous Integration):** A parte onde todo código enviado pelos desenvolvedores é mesclado em uma linha principal. O CI aciona robôs que rodam testes unitários, linting e verificam a qualidade do código para garantir que a integração não explodiu nada.
- **CD (Continuous Delivery):** O código validado é empacotado (ex: num container Docker) e fica pronto para ser colocado em produção. Geralmente requer um clique manual do Tech Lead para autorizar a subida.
- **CD (Continuous Deployment):** A automação final. Não há botão de aprovação. O código passa nos testes e VAI direto para o cliente final. O *Google* e o *Facebook* operam assim.

## 2. Vantagens e Desvantagens (Trade-offs)

| Recurso | Deploy Manual ✋ | Continuous Deployment (CD Puro) 🤖 |
| :--- | :--- | :--- |
| **DORA Metrics** | Baixa frequência, Alto Lead Time | Elite: Múltiplos deploys/dia em minutos |
| **Gargalos** | Dependentes da equipe de Infraestrutura | Nulo (Os Devs têm poder total) |
| **Exigência Técnica**| Nenhuma | Exige cultura feroz de Testes Automatizados (TDD) |

## 3. Cenário Ideal de Uso

**✅ Quando aplicar CI/CD:**
- SEMPRE. Desde o dia zero de qualquer projeto sério. Configurar um GitHub Actions para rodar `npm test` leva 5 minutos e previne anos de dor de cabeça.

**❌ Quando NÃO aplicar:**
- Literalmente nunca. Não ter CI hoje é equivalente a programar num Bloco de Notas sem Git.

## 4. Deep Dive (Exemplo Prático: Pipeline Feroz no GitHub Actions)

Um arquivo simples `.github/workflows/main.yml` que te eleva para a Elite do mercado:

```yaml
name: CI/CD Pipeline
on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Instalar Dependências
        run: npm ci
        
      - name: Linter & Formatador
        run: npm run lint
        
      - name: Bateria de Testes (Vitest)
        run: npm test

      # Se algum passo falhar, ele nem tenta fazer o Build do Docker!
      - name: Build Docker Image
        run: docker build -t meurepo/user-service:latest .
```

## 5. Checklist do Sênior (Perguntas de Entrevista)

1. *"Qual a diferença técnica entre Continuous Delivery e Continuous Deployment?"*
2. *"Se o seu CI rodar milhares de testes E2E (Ponta a ponta), ele pode demorar 2 horas. Como manter a agilidade da equipe perante a esse bloqueio?" (Dica: Paralelização e Pirâmide de Testes).*
3. *"O que é o conceito de Infraestrutura Imutável no contexto do Continuous Deployment?"*
