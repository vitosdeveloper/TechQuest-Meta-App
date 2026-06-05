# 🧱 SOLID e Design Patterns (Padrões de Projeto)

O código que compila não é sinônimo de um código bom. Se você já entrou num arquivo com 2.500 linhas cheio de `if/else`, sentiu o peso da falta de princípios arquiteturais na base. Os desenvolvedores seniores estruturam o código seguindo metodologias globais que promovem flexibilidade e escalabilidade.

## 1. O Que É e o Problema que Resolve

### Os Princípios SOLID
Criado pelo Uncle Bob, SOLID é um acrônimo de 5 princípios da Programação Orientada a Objetos para evitar códigos engessados:
- **(S)ingle Responsibility:** Uma classe deve ter um e apenas um motivo para mudar. (Não faça o Controller validar dados e salvar no banco).
- **(O)pen/Closed:** O código deve estar "Aberto para extensão", mas "Fechado para modificação". (Você adiciona código novo, não altera o antigo).
- **(L)iskov Substitution:** Classes filhas devem poder substituir suas classes pai sem quebrar a aplicação.
- **(I)nterface Segregation:** Não force ninguém a implementar interfaces com métodos que não vão usar. É melhor ter muitas interfaces pequenas.
- **(D)ependency Inversion:** O conceito que alimenta a Clean Architecture (vimos isso profundamente na aula `user-service.lesson.md`).

### GoF Design Patterns
Design Patterns (Padrões de Projeto do "Gang of Four") são "receitas de bolo" para problemas de código que se repetem no mundo todo.
Em vez de inventar a roda sobre "como ter uma classe de Log global no sistema todo", usamos o padrão **Singleton**. Em vez de ter 30 IFs para calcular impostos diferentes, usamos o padrão **Strategy**.

### Dicionário Sênior
- **Código Legado:** Embora muitos pensem que é "código velho", código legado de verdade é **código sem testes**.
- **Smell (Cheiro de Código Ruim):** Sinais de que o código está apodrecendo (ex: funções com mais de 3 parâmetros, arquivos "God Class" de 10.000 linhas).

## 2. Vantagens e Desvantagens (Trade-offs)

| Abordagem | Sem Padrões (Hardcoded) | Com Padrões e SOLID |
| :--- | :--- | :--- |
| **Facilidade de Leitura Inicial** | Muito fácil (é só ler de cima pra baixo) | Difícil (Exige navegar entre arquivos e classes) |
| **Novas Features** | Causa bugs paralelos inesperados | Você cria um arquivo novo, não altera os velhos |
| **Testes (Mocking)** | Impossível testar partes isoladas | Trivial e isolado por componente |
| **Burocracia** | Zero | Alta (Você cria mais código para estruturar do que lógica real) |

## 3. Cenário Ideal de Uso

**✅ Quando usar Strategy:** Quando você tem uma regra que muda muito baseada em uma variável (ex: Meio de pagamento - Boleto, Cartão de Crédito, Pix). Em vez de `if/switch`, use Strategy.
**✅ Quando usar Factory:** Quando a criação de um objeto se tornou complexa demais e precisa de instâncias de múltiplos lugares (O NestJS usa `FactoryProviders` para criar injeções dinâmicas).
**❌ Quando NÃO usar Design Patterns (Over-engineering):** Em scripts descartáveis (lambdas de migração de dados) ou no Frontend em fluxos triviais do React. Aplicar padrões arquiteturais em código "jogado fora amanhã" é perda de tempo.

## 4. O Padrão de Mercado

Hoje, quem encampa profundamente os padrões GoF nativamente na comunidade web é o **Angular** (Frontend) e o **NestJS** (Backend). Eles usam **Decorators** intensamente, que é em si uma implementação elegante do padrão Decorator.

## 5. Deep Dive (Exemplo Prático: Open/Closed + Strategy)

Problema: Um sistema de gamificação que precisa calcular recompensas de XP diferentes dependendo se a conta é Grátis, Premium ou VIP. 

**🔴 O Código Ruim (Sem SOLID):**
```typescript
class RewardCalculator {
  calculate(userType: string, baseXP: number) {
    if (userType === "FREE") return baseXP * 1;
    if (userType === "PREMIUM") return baseXP * 1.5;
    if (userType === "VIP") return baseXP * 2;
    // O que acontece quando criarem o plano "ELITE"? Temos que vir aqui alterar o arquivo!
  }
}
```

**🟢 O Código Sênior (Com Strategy e Open/Closed):**
```typescript
// 1. Criamos um contrato de estratégia
interface IRewardStrategy {
  calculate(baseXP: number): number;
}

// 2. Criamos as classes base isoladas (Elas nunca mais precisarão ser alteradas!)
class FreeReward implements IRewardStrategy { calculate = (xp) => xp * 1; }
class PremiumReward implements IRewardStrategy { calculate = (xp) => xp * 1.5; }
class VipReward implements IRewardStrategy { calculate = (xp) => xp * 2; }

// 3. A classe de cálculo agora é fechada para alteração, mas aberta para expansão!
class RewardContext {
  constructor(private strategy: IRewardStrategy) {}
  
  executeCalculation(baseXP: number) {
    return this.strategy.calculate(baseXP);
  }
}

// 4. Uso
const calculator = new RewardContext(new PremiumReward());
console.log(calculator.executeCalculation(100)); // 150
```
Amanhã o seu chefe pede a conta "ELITE". Você não toca no arquivo do `RewardContext`. Você apenas cria o arquivo `EliteReward.ts`. Zero risco de quebrar o plano "FREE"!

## 6. Checklist do Sênior (Perguntas de Entrevista)

1. *"Explique como o Padrão Strategy atende aos requisitos do princípio Open/Closed (Aberto/Fechado) do SOLID."*
2. *"O que é o padrão Singleton e quais são os perigos de usá-lo globalmente no gerenciamento de estado?"*
3. *"De acordo com o 'Single Responsibility Principle' (SRP), uma classe que converte dados em JSON e depois salva no banco de dados está ferindo o princípio? Por quê?"*
