import React, { useState } from 'react';
import Task from './Task';
import { MoreHorizontal, Plus } from 'lucide-react';
import { TaskData } from '../types/kanban';

interface ColumnProps {
    title: string;
    tasks: TaskData[]; 
    columnId: string;
    onAddTask: (columnId: string, taskText: string) => Promise<void>;
    onDeleteTask: (columnId: string, taskId: string) => Promise<void>;
    onDragStartTask: (task: TaskData, columnId: string) => void;
    onDragOverColumn: (e: React.DragEvent<HTMLDivElement>) => void;
    onDropOnColumn: (columnId: string) => void;
    editingTaskId: string | null;
    onSetEditingTaskId: (id: string | null) => void;
    onUpdateTask: (columnId: string, taskId: string, newText: string) => Promise<void>;
}

const Column : React.FC<ColumnProps> = ({ title, tasks, columnId, onAddTask, onDeleteTask,
        onDragStartTask, onDragOverColumn, onDropOnColumn,
        editingTaskId, onSetEditingTaskId, onUpdateTask }) => {

    const [newTaskText, setNewTaskText] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    
    const handleSubmit = (e : React.FormEvent<HTMLFormElement> | React.KeyboardEvent) => {
        e.preventDefault();
        if (newTaskText.trim() === '') return;

        onAddTask(columnId, newTaskText);
        setNewTaskText(''); // clear input
        setIsAdding(false);
    }

    return (
        <div 
            className={`w-80 bg-white rounded-xl shadow-md flex flex-col max-h-full relative
                        ${isAdding ? 'z-10' : 'z-0'}`}
            onDragOver={onDragOverColumn}
            onDrop={() => onDropOnColumn(columnId)}
        >
           <div className="p-4 flex items-center justify-between border-b border-slate-200">
                <h2 className="font-semibold text-slate-700 flex items-center gap-2">
                    {title}
                    <span className="bg-slate-200 text-slate-600 text-xs py-1 px-2 rounded-full">
                        {tasks.length}
                    </span>
                </h2>
                <button className="text-slate-400 hover:text-slate-600">
                    <MoreHorizontal size={18} />
                </button>
            </div>

            <div className="p-3 flex-1 overflow-y-auto flex flex-col gap-3">
                {tasks.map((task) => (
                    <Task 
                        key={task.id}
                        task={task}
                        columnId={columnId}
                        onDelete={() => onDeleteTask(columnId, task.id)}
                        onDragStart={() => onDragStartTask(task, columnId)}
                        editingTaskId={editingTaskId}
                        onSetEditingTaskId={onSetEditingTaskId}
                        onUpdateTask={onUpdateTask}
                    />
                ))}
               {tasks.length === 0 && <p className="p-2.5 text-gray italic text-[0.9rem] text-center">No tasks</p>}
            </div>
            
            <div className="p-3">
                {isAdding ? (
                    <form onSubmit={handleSubmit} className="bg-white border border-blue-400 rounded-lg p-3 shadow-sm">
                        <textarea
                            autoFocus
                            placeholder="What needs to be done?"
                            value={newTaskText}
                            onChange={(e) => setNewTaskText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }
                            }}
                            className="w-full text-sm resize-none outline-none placeholder:text-slate-400 mb-2"
                            rows={3}
                        />
                        <div className="flex gap-2">
                            <button type="submit" className="bg-blue-600 text-white text-sm font-medium px-3 py-1.5 rounded hover:bg-blue-700 transition">
                                Add task
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsAdding(false)}
                                className="text-slate-600 text-sm font-medium px-3 py-1.5 rounded hover:bg-slate-200 transition">
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="w-full flex items-center gap-2 p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition text-sm font-medium">
                        <Plus size={16} />
                    </button>
               )}
            </div>
        </div>
    );
};

export default Column;