import React from 'react';
import { X, Info } from 'lucide-react';

interface AboutModalProps {
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 style={{ margin: 0 }}><Info color="var(--primary)" /> Sobre o TechQuest Meta-App</h2>
          <button className="close-btn" onClick={onClose}><X /></button>
        </div>
        <div className="modal-body markdown-body">
          <p>
            Bem-vindo ao <strong>TechQuest Meta-App</strong>, o sistema definitivo para aprendizado de Arquitetura de Software e Cloud-Native!
          </p>
          <p>
            Este sistema não é apenas um portal de cursos estático; ele é, em si mesmo, o objeto de estudo. Todo o sistema que você está utilizando para ler estas aulas foi arquitetado usando <strong>as melhores práticas da Engenharia de Software Moderna (Senior/Enterprise)</strong>.
          </p>
          
          <h3>🚀 O Que Você Vai Aprender</h3>
          <ul>
            <li><strong>Microserviços & API Gateway:</strong> A comunicação entre o Frontend e os backends é feita usando um Gateway reverso NestJS.</li>
            <li><strong>Arquitetura Orientada a Eventos (EDA):</strong> Ao clicar em "Inicializar Sistema", o <code>user-service</code> cria sua conta e dispara um evento via <strong>Apache Kafka</strong> para o <code>gamification-service</code>, que processa seu XP de forma assíncrona, robusta e tolerante a falhas (Outbox Pattern & DLQ).</li>
            <li><strong>Clean Architecture:</strong> O código-fonte dos microserviços separa estritamente o Domínio da Infraestrutura (Casos de Uso, Entidades e Repositórios).</li>
            <li><strong>12-Factor App & Docker:</strong> O ecossistema é totalmente conteinerizável, consumindo credenciais via Variáveis de Ambiente e pronto para deploy em nuvem (Kubernetes/AWS).</li>
            <li><strong>AI Engineering:</strong> O assistente "Mestre do Código" não é hardcoded! Ele consome LangChain e possui Arquitetura RAG (Vector Stores na memória) processando as próprias aulas deste sistema para responder suas dúvidas.</li>
          </ul>

          <p><strong>Missão:</strong> Leia as Masterclasses (Cards) no painel, faça perguntas para a IA sobre as tecnologias, explore os diretórios de código fonte no seu VSCode, e torne-se um Engenheiro Global!</p>
        </div>
      </div>
    </div>
  );
};
