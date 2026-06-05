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

Nossa plataforma roda lindamente no Docker Compose (\`docker:infra\`), mas o mercado **exige** alta disponibilidade, orquestração e infraestrutura como código (IaC).

Você está pronto para levar a Meta-App para um cluster **Kubernetes** real?

Nesta missão guiada, você aprenderá a:
1. Provisionar a infraestrutura usando **Terraform**.
2. Empacotar a aplicação via **Helm Charts**.
3. Fazer o deploy contínuo via **ArgoCD / GitOps**.
    `
  },
  {
    id: 'terraform',
    title: 'Terraform: A Infraestrutura Mágica',
    icon: <Terminal size={24} />,
    content: `
# Infraestrutura como Código (Terraform)

Em vez de clicar em botões na AWS/GCP, nós declaramos nossos recursos.
No mundo real, você usaria o módulo do **EKS** (AWS) ou **GKE** (Google Cloud). Para estudos, vamos abstrair o cluster.

Crie um arquivo \`main.tf\`:

\`\`\`hcl
provider "kubernetes" {
  config_path    = "~/.kube/config"
  config_context = "minikube"
}

resource "kubernetes_namespace" "techquest" {
  metadata {
    name = "techquest-prod"
  }
}
\`\`\`

Para iniciar:
\`\`\`bash
terraform init
terraform apply -auto-approve
\`\`\`
    `
  },
  {
    id: 'k8s',
    title: 'Kubernetes: O Orquestrador',
    icon: <Layers size={24} />,
    content: `
# Helm & Kubernetes Manifests

Nosso Gateway e os microserviços precisam de \`Deployments\` e \`Services\`.

No Kubernetes, em vez do Docker Compose, a arquitetura ganha robustez:
- **ReplicaSets**: Mantém sempre X cópias do \`user-service\` rodando.
- **Services (ClusterIP)**: O \`api-gateway\` vai achar os serviços via DNS interno.
- **Ingress Controller**: Expõe o \`api-gateway\` e o \`frontend\` para o mundo externo.

\`\`\`yaml
# Exemplo simplificado de Deployment do user-service
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
  namespace: techquest-prod
spec:
  replicas: 3
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
      - name: app
        image: techquest/user-service:latest
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secrets
              key: url
\`\`\`
    `
  },
  {
    id: 'gitops',
    title: 'GitOps: Automação Total',
    icon: <Shield size={24} />,
    content: `
# ArgoCD (GitOps)

Seu código agora vive no Git. Você não executa mais \`kubectl apply\`.

O **ArgoCD** observa o repositório Github. Quando você altera o \`values.yaml\` do Helm alterando a versão da imagem de \`v1.0.0\` para \`v2.0.0\`, o ArgoCD detecta a mudança e magicamente atualiza os pods no Kubernetes.

\`\`\`yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: techquest-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: 'https://github.com/techquest/infra-repo.git'
    path: charts/techquest
    targetRevision: HEAD
  destination:
    server: 'https://kubernetes.default.svc'
    namespace: techquest-prod
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
\`\`\`

Com isso, a implantação na nuvem não é apenas um "upload de código", mas sim um protocolo auto-recuperável. Você domina a verdadeira engenharia de software Cloud-Native.
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
