import React, { useState } from 'react';
import { GripVertical, X } from 'lucide-react';
import { TaskData } from '../types/kanban'

// colocation pattern
interface TaskProps {
  task: TaskData; 
  columnId: string;
  onDelete: () => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  editingTaskId: string | null;
  onSetEditingTaskId: (id: string | null) => void;
  onUpdateTask: (columnId: string, taskId: string, newText: string) => Promise<void>;
}

const Task : React.FC<TaskProps> = ({ task, columnId, onDelete, onDragStart,
         editingTaskId, onSetEditingTaskId, onUpdateTask }) => {

            const isEditing = editingTaskId === task.id;
            const [editText, setEditText] = useState(task.text);
            
            const handleSave = () => {
                onUpdateTask(columnId, task.id, editText);
            };

            const handleCancel = () => {
                setEditText(task.text);
                onSetEditingTaskId(null);
            }
 
            if (isEditing) {
                return (
                    <form 
                        onSubmit={(e) => { e.preventDefault(); handleSave(); }}
                        className="bg-white border-2 border-blue-500 rounded-lg p-2 shadow-lg z-20 relative"
                    >
                        <textarea
                            autoFocus
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onBlur={handleSave}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSave(); }
                                if (e.key === 'Escape') { handleCancel(); }
                            }}
                            className="w-full text-sm resize-none outline-none placeholder:text-slate-400"
                            rows={3}
                        />
                    </form>
                );
            }

    return (
        <div 
            draggable
            onDragStart={onDragStart}
            onClick={() => onSetEditingTaskId(task.id)}
            className="bg-white border border-slate-200 rounded-lg p-4 cursor-grab active:cursor-grabbing hover:shadow-md transition group"
        >            
            <div className="flex items-start gap-2">
                <GripVertical size={16} className="text-slate-300 mt-1 opacity-0 group-hover:opacity-100 transition flex-shrink-0" />
                
                <p className="text-sm font-medium text-slate-900 flex-1">{task.text}</p>
                
                <button 
                    onClick={(e: React.MouseEvent) => { 
                        e.stopPropagation();
                        onDelete();
                    }}
                    className="p-1 text-slate-400 hover:text-red-500 hover:bg-slate-100 rounded opacity-0 group-hover:opacity-100 transition">
                    <X size={16} />
                </button>
            </div>
        </div>
    );
};

export default Task;