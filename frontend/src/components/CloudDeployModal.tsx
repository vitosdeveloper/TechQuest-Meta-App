import React, { useState } from 'react';
import { Cloud, Terminal, CheckCircle2, ArrowRight, X, Layers, Shield } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CloudDeployModalProps {
  onClose: () => void;
}

const markdownComponents = {
  code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" {...props}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }
};

const STEPS = [
  {
    id: 'intro',
    title: 'A Nuvem Espera por Você',
    icon: <Cloud size={24} />,
    content: `
# Deploy Cloud-Native da Meta-App

Nossa plataforma roda lindamente no Docker Compose (\`docker-compose up -d --build\`), mas o mercado **exige** alta disponibilidade, orquestração e infraestrutura como código (IaC).

Você está pronto para levar a Meta-App para um cluster **Kubernetes** real na nuvem?

Nesta missão guiada, você aprenderá a:
1. Provisionar a infraestrutura real na AWS usando nossos scripts **Terraform**.
2. Empacotar e aplicar seus serviços via **Kubernetes Manifests**.
3. Fazer o deploy contínuo via **ArgoCD / GitOps**.
    `
  },
  {
    id: 'terraform',
    title: 'Terraform: A Infraestrutura Mágica',
    icon: <Terminal size={24} />,
    content: `
# Infraestrutura como Código (Terraform)

Em vez de clicar em botões no console da AWS, nós declaramos nossos recursos.
No nosso repositório, você encontra scripts reais para a AWS na pasta \`infra/terraform\`.

Nós já deixamos pronto para você:
- \`vpc.tf\`: Criação de Redes Privadas e Públicas.
- \`eks.tf\`: Criação do Cluster Kubernetes Elastic da AWS.
- \`rds.tf\`: Criação do Banco PostgreSQL Gerenciado.

Para provisionar a infraestrutura de verdade (Atenção: gera custos na AWS):
\`\`\`bash
cd infra/terraform
terraform init
terraform apply
\`\`\`
Após alguns minutos, seu Cluster EKS e Banco de Dados estarão no ar!
    `
  },
  {
    id: 'k8s',
    title: 'Kubernetes: O Orquestrador',
    icon: <Layers size={24} />,
    content: `
# Kubernetes Manifests

Nosso Gateway e os microserviços precisam de \`Deployments\` e \`Services\`.
Na pasta \`k8s/\`, você encontra os manifestos Kubernetes já estruturados.

No Kubernetes, em vez do Docker Compose, a arquitetura ganha robustez:
- **Deployments**: Mantém sempre X cópias dos serviços rodando (ex: \`user-service\`).
- **Services (ClusterIP)**: O \`api-gateway\` vai achar os serviços via DNS interno nativo do Kubernetes.
- **Ingress Controller**: Expõe o \`api-gateway\` e o \`frontend\` para o mundo externo.

Para testar o deploy manualmente no seu novo cluster EKS:
\`\`\`bash
# 1. Autentique-se no seu cluster EKS
aws eks update-kubeconfig --region us-east-1 --name techquest-cluster

# 2. Aplique as configurações do User Service
kubectl apply -f k8s/user-service/
\`\`\`
    `
  },
  {
    id: 'gitops',
    title: 'GitOps: Automação Total',
    icon: <Shield size={24} />,
    content: `
# ArgoCD (GitOps)

Seu código agora vive no Git (\`github.com/vitosdeveloper\`). Na nuvem moderna, você não executa mais \`kubectl apply\` manualmente na sua máquina.

O **ArgoCD** é instalado dentro do cluster e fica observando o repositório Github. Quando você altera a versão da imagem do \`api-gateway\` de \`v1.0.0\` para \`v2.0.0\` num commit, o ArgoCD detecta a mudança e magicamente atualiza os pods no Kubernetes.

\`\`\`yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: techquest-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: 'https://github.com/vitosdeveloper/SEU_REPOSITORIO.git'
    path: k8s
    targetRevision: HEAD
  destination:
    server: 'https://kubernetes.default.svc'
    namespace: techquest-prod
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
\`\`\`

Com isso, a implantação na nuvem não é apenas um "upload de código", mas sim um protocolo auto-recuperável. Você domina a verdadeira engenharia de software Cloud-Native!
    `
  }
];

export const CloudDeployModal: React.FC<CloudDeployModalProps> = ({ onClose }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const step = STEPS[stepIndex];

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 999999 }}>
      <div className="modal-content glass-panel" style={{ maxWidth: '800px', width: '90%' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent)' }}>
            {step.icon}
            <h2 style={{ margin: 0, color: 'var(--accent)' }}>{step.title}</h2>
          </div>
          <button className="close-btn" onClick={onClose}><X /></button>
        </div>

        <div className="modal-body markdown-body" style={{ minHeight: '400px' }}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {step.content}
          </ReactMarkdown>
        </div>

        <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
          <button 
            className="action-btn" 
            style={{ background: 'transparent', border: '1px solid var(--border-color)', color: '#fff' }}
            onClick={() => setStepIndex(Math.max(0, stepIndex - 1))}
            disabled={stepIndex === 0}
          >
            Anterior
          </button>

          <div style={{ display: 'flex', gap: '8px' }}>
            {STEPS.map((_, i) => (
              <div key={i} style={{
                width: '10px', height: '10px', borderRadius: '50%',
                background: i === stepIndex ? 'var(--accent)' : 'var(--border-color)'
              }} />
            ))}
          </div>

          <button 
            className="action-btn"
            style={{ background: stepIndex === STEPS.length - 1 ? 'var(--success)' : 'var(--accent)', color: '#000', fontWeight: 'bold' }}
            onClick={() => {
              if (stepIndex === STEPS.length - 1) onClose();
              else setStepIndex(stepIndex + 1);
            }}
          >
            {stepIndex === STEPS.length - 1 ? (
              <><CheckCircle2 size={18} /> Concluir Missão</>
            ) : (
              <>Próximo <ArrowRight size={18} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
