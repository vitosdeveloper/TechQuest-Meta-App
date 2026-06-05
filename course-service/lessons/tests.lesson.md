# 🧪 Testes Corporativos, TDD e Mutational Testing

## 1. O Que É e o Problema que Resolve
Desenvolvedores amadores apertam F5 na tela de login 500 vezes por semana, digitando 'teste@teste.com' para ver se o código novo quebrou a tela. Isso é estupidez humana.
O código profissional é validado através de Código de Testes (Robôs). Os testes garantem que você pode refatorar uma função monstruosa e ter 100% de paz mental sabendo que, se nada explodiu vermelho no terminal, ela continua perfeita.

### Dicionário Sênior
- **TDD (Test-Driven Development):** Uma religião de engenharia. Em vez de escrever o sistema e "testar depois", você escreve o Teste PRIMEIRO esperando que ele falhe (Red). Depois você escreve o código mínimo para ele passar (Green). Depois você limpa o código (Refactor).
- **Pirâmide de Testes:** Uma estratégia que dita a velocidade: A base da pirâmide são **Testes Unitários** (Testam uma função; rodam em 1ms, aos milhares). O meio são **Testes de Integração** (Testam o código com o banco de dados; demoram segundos). O topo são **Testes E2E - Ponta a Ponta** (Um robô fingindo ser humano no Chrome apertando botões; lentos e caros, demoram horas).
- **Mutational Testing:** O teste para testar o teste. Uma ferramenta (ex: Stryker) altera o código fonte propositalmente (troca um `>` por `<`) para verificar se os seus testes falham. Se o código mutante sobreviver porque o teste passou sem ver, seu teste é inútil.

## 2. Vantagens e Desvantagens (Trade-offs)

| Cultura | Código sem Testes (Fé) 🙏 | Cultura de Testes (TDD/Ciência) 🧪 |
| :--- | :--- | :--- |
| **Velocidade Inicial** | Altíssima (Em 1 dia o app sai) | Lenta (Demora o dobro para fazer algo simples) |
| **Longo Prazo (> 6 Meses)** | Paralisia e medo absoluto de alterar 1 linha de código. | Aumento massivo de velocidade, a base é rocha pura. |
| **Custo para o Negócio** | Barato até o primeiro Bug grave. | Investimento inicial alto, mas evita processos judiciais. |

## 3. Cenário Ideal de Uso

**✅ Quando aplicar Testes Sólidos (Vitest/Jest):**
- Nas regras de negócios (Domain Layer) e nos Casos de Uso. É obrigatório!
- Em microserviços e bibliotecas Open-Source (NPM). Sem cobertura de testes ninguém usará o seu código.

**❌ Quando NÃO aplicar (Over-engineering):**
- Perder tempo testando métodos internos de Bibliotecas Terceirizadas. (Ex: Testar se o Sequelize consegue salvar no MySQL... O pessoal do Sequelize já testou isso. Teste a SUA lógica).
- Tentativas obsessivas de bater "100% de Code Coverage", criando testes irrelevantes apenas para atingir métricas no SonarQube, sacrificando sanidade e orçamento da empresa.

## 4. Deep Dive (Exemplo Prático: Mocks Vitest)

Se você vai testar o Ganho de XP, você não deve ligar o banco de dados. Você Moca o banco. É assim que o teste roda em meio milissegundo no `Vitest`:

```typescript
import { expect, test, vi } from 'vitest';
import { GamificationUseCase } from './gamification';

// 1. Isolamos o Banco de Dados (Dependency Inversion Sólida)
const mockRepository = {
  saveXP: vi.fn().mockResolvedValue(true)
};

test('Deve somar 100 XP quando uma aula for completada', async () => {
  // 2. Injetamos o MOCK no coração da nossa regra
  const sut = new GamificationUseCase(mockRepository);
  
  // 3. Executamos
  const resultado = await sut.completarAula({ xpAtual: 50 });

  // 4. Asserções Sênior
  expect(resultado.novoXp).toBe(150);
  expect(mockRepository.saveXP).toHaveBeenCalledTimes(1); // Ele realmente tentou salvar?
});
```

## 5. Checklist do Sênior (Perguntas de Entrevista)

1. *"No React Testing Library, nós testamos por Componentes ou pelo comportamento visual do usuário? Por que usar `getByRole` é preferível a `getByTestId`?"*
2. *"A Métrica de Cobertura de Código (Code Coverage) a 95% garante que o sistema está livre de bugs? Por quê?"*
3. *"Como a Arquitetura Limpa e a Injeção de Dependências viabilizam financeiramente e estruturalmente a construção de Testes Unitários de Backend?"*
