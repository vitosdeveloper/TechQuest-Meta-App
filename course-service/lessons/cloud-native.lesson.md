# ☁️ Cloud Native: Kubernetes e IaC (Terraform)

## 1. O Que É e o Problema que Resolve
Ir para a nuvem não significa "alugar um servidor na AWS" e instalar o Apache manualmente. Se a AWS desligar esse servidor acidentalmente, sua startup morre.
O termo **Cloud Native** significa construir aplicações que *nascem* para a resiliência em nuvem. Para isso, usamos contêineres gerenciados e a **Infraestrutura como Código (IaC)**. Em vez de clicar em botões no painel da Amazon, você escreve código definindo suas máquinas.

### Dicionário Sênior
- **IaC (Infrastructure as Code):** Usar código (como HCL no Terraform) para descrever redes, bancos e servidores. Isso permite versionar no Git a sua própria infraestrutura física.
- **Terraform:** Ferramenta da HashiCorp que revolucionou a indústria. Você escreve "Eu quero um Banco de Dados" num arquivo de texto, e o Terraform cria ele na AWS, Google ou Azure.
- **GitOps:** Uma evolução do IaC. O Git passa a ser a única Fonte da Verdade (Single Source of Truth). Se um hacker apagar seu servidor, o sistema detecta que a realidade não bate com o Git e recria o servidor sozinho!

## 2. Vantagens e Desvantagens (Trade-offs)

| Prática | ClickOps (Clicar no painel da AWS) 🖱️ | IaC (Terraform) 📝 |
| :--- | :--- | :--- |
| **Reprodutibilidade**| Impossível. Alguém vai esquecer o que clicou há 2 anos. | Imediata. Basta rodar o comando em outra conta AWS. |
| **Auditoria** | Quem deletou o servidor? O log da AWS é confuso. | O `git blame` aponta exatamente quem fez o commit que deletou o recurso. |
| **Velocidade** | Rápido para a 1ª máquina. | Lento na 1ª máquina, automático para as próximas mil. |

## 3. Cenário Ideal de Uso

**✅ Quando aplicar Terraform/IaC:**
- Sistemas modernos que precisam de múltiplos ambientes (Dev, Staging, Produção). O IaC garante que Staging seja o clone absolutamente exato de Produção.

**❌ Quando NÃO aplicar:**
- Projetos pessoais de TCC usando a Vercel ou Firebase, onde a "Infraestrutura" já está 100% abstraída (Platform as a Service - PaaS).

## 4. Deep Dive (Exemplo Prático: IaC com Terraform)

A mágica do Terraform HCL (HashiCorp Configuration Language). Se você salvar esse arquivo e rodar `terraform apply`, um cluster Kubernetes real será erguido na nuvem:

```hcl
provider "aws" {
  region = "us-east-1"
}

# Em 4 linhas de código, você levanta o mesmo cluster que a Netflix usa
resource "aws_eks_cluster" "meu_cluster_cyber" {
  name     = "TechQuest_Prod_EKS"
  role_arn = aws_iam_role.eks_role.arn

  vpc_config {
    subnet_ids = [aws_subnet.sub1.id, aws_subnet.sub2.id]
  }
}
```

E se amanhã a empresa quiser trocar da AWS para o Google Cloud? Você muda o *provider* para `"google"` e adapta a sintaxe do recurso.

## 5. Checklist do Sênior (Perguntas de Entrevista)

1. *"O que é o arquivo `terraform.tfstate` e por que ele nunca deve ser comitado no GitHub em texto puro?"*
2. *"A AWS oferece o CloudFormation. O Google oferece o Deployment Manager. Por que o mercado adotou em peso o Terraform (HashiCorp) ao invés dessas ferramentas oficiais?" (Dica: Cloud Agnostic).*
3. *"Explique o princípio GitOps usando o ArgoCD ou FluxCD interagindo com o Kubernetes."*
