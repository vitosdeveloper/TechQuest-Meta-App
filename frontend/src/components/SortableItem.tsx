import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BookOpen } from 'lucide-react';

interface CardProps {
  id: string | number;
  title: string;
  desc: string;
  badge: string;
  lessonFile: string;
  onOpenLesson: (lessonId: string) => void;
}

export const SortableItem: React.FC<CardProps> = ({ id, title, desc, badge, lessonFile, onOpenLesson }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 999 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners} 
      className="kanban-card"
    >
      <div className="card-title">{title}</div>
      <div className="card-desc">{desc}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="card-badge">{badge}</div>
        
        <button 
          onPointerDown={(e) => {
            // Previne que o click inicie o arrasto do DND
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.stopPropagation();
            onOpenLesson(lessonFile);
          }}
          className="action-btn"
        >
          <BookOpen size={12} /> LER AULA
        </button>
      </div>
    </div>
  );
};
