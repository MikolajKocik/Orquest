import React from 'react';
import { GripVertical, X } from 'lucide-react';

const Task = ({ task, onDelete, onDragStart }) => {
    return (
        <div 
            draggable
            onDragStart={onDragStart}
            className="bg-white border border-slate-200 rounded-lg p-4 cursor-grab active:cursor-grabbing hover:shadow-md transition group"
        >            
            <div className="flex items-start gap-2">
                <GripVertical size={16} className="text-slate-300 mt-1 opacity-0 group-hover:opacity-100 transition flex-shrink-0" />
                
                <p className="text-sm font-medium text-slate-900 flex-1">{task.text}</p>
                
                <button onClick={onDelete} className="p-1 text-slate-400 hover:text-red-500 hover:bg-slate-100 rounded opacity-0 group-hover:opacity-100 transition">
                    <X size={16} />
                </button>
            </div>
        </div>
    );
};

export default Task;