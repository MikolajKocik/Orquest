import React, { useState, useEffect } from 'react';
import Column from './Column';
import { ColumnData, TaskData } from '../types/kanban';

const emptyBoardStructure = [ 
    { id: 'col1', title: 'To Do', tasks: [] },
    { id: 'col2', title: 'In Progress', tasks: [] },
    { id: 'col3', title: 'Done', tasks: [] }
]

const Board : React.FC = () => {
    const [columns, setColumns] = useState<ColumnData[]>(emptyBoardStructure);

    // states for drag & drop tasks
    const [draggedTask, setDraggedTask] = useState<TaskData | null>(null);
    const [sourceColumn, setSourceColumn] = useState<string | null>(null);
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/board')  
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch data to board');
                return res.json()
            })
            .then((data: ColumnData[]) => setColumns(data))
            .catch(error => {
                console.error("Error while loading the board:", error);
            });
    }, []); 

    const handleDragStart = (task: TaskData, columnId: string) => {
        setDraggedTask(task);
        setSourceColumn(columnId);
    };

    const handleDragOver = (e : React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = async (targetColumnId: string) => {
        if (!draggedTask || !sourceColumn || sourceColumn === targetColumnId) {
            setDraggedTask(null);
            setSourceColumn(null);
            return;
        }

        try {
            const response = await fetch(`/api/tasks/${draggedTask.id}/move`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({newColumnId: targetColumnId}),
            })

            if (!response.ok) {
                throw new Error("Failed to move the task on the server")
            }

            setColumns((prevColumns) => {
                return prevColumns.map((column) => {
                    if (column.id === sourceColumn) {
                        return {
                            ...column,
                            tasks: column.tasks.filter(t => t.id !== draggedTask.id)
                        };
                    }

                    if (column.id === targetColumnId) {
                        return {
                            ...column,
                            tasks: [...column.tasks, draggedTask]
                        }
                    }

                    return column;
                });
            });

        } catch (error) {
            console.error("Failed to move task:", error);
            alert("An error occurred while moving the task.");
        } finally {
            // clear drag & drop states after operation
            setDraggedTask(null);
            setSourceColumn(null);
        }
    }

    const handleUpdateTaskText = async (columnId: string, taskId: string, newText: string) => {
        if (!newText.trim()) {
            handleDeleteTask(columnId, taskId);
            setEditingTaskId(null);
            return;
        }

        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ text: newText })
            });

            if (!response.ok) {
                throw new Error("Faild to update the task on server");
            }

            const updatedTask = await response.json();

            setColumns((prevColumns) => {
                return (prevColumns.map((column) => {
                    if (column.id === columnId) {
                        return {
                            ...column,
                            tasks: column.tasks.map(task => 
                                task.id === taskId ? updatedTask : task
                            )
                        }
                    }
                    return column;
                }));
            });
        } catch (error) {
            console.error("Failed to update task:", error);
            alert("An error occurred while updating the task.")
        } finally {
            setEditingTaskId(null);
        }
    }

    const handleAddTask =  async (columnId: string, taskText: string) => {
        const newTask = {
            text: taskText,
            columnId: columnId
        }
        
        try {
            const response = await fetch(`/api/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask),
            });

            if (!response.ok) {
                throw new Error("Error occured while adding the task")
            }

            const createdTask = await response.json();
    
            setColumns((prevColumns) => {
                return prevColumns.map((column) => {
                    if (column.id === columnId) {
                        return {
                            ...column,
                            tasks: [...column.tasks, createdTask],
                        };
                    }
                    return column;
                });
            });

        } catch (error) {
            console.error("Unable to add the task:", error);
            alert("Failed to add the task")
        }
    }

    const handleDeleteTask = async (columnId: string, taskId: string) => {
        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error("Failed to delete task.")
            }
        
            setColumns((prevColumns) => {
                return prevColumns.map((column) => {
                    if (column.id === columnId) {
                        return {
                            ...column,
                            tasks: column.tasks.filter(task => task.id !== taskId)
                        };
                    }
                    return column;
                });
            })
        }
        catch (error) {
            console.error("Unable to delete task:", error);
            alert("Error occured while removing task.")
        }
    }

    return (
        <div className ="flex-1 overflow-auto p-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-slate-900">Board</h1>
                <p className="text-slate-600 mt-1">
                    {columns.reduce((acc, col) => acc + col.tasks.length, 0)} tasks
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-55 h-full items-start">
                {columns.map((column) => (
                    <Column
                        key={column.id}
                        columnId={column.id}
                        title={column.title}                   
                        tasks={column.tasks}
                        onAddTask={handleAddTask}
                        onDeleteTask={handleDeleteTask}
                        onDragStartTask={handleDragStart}
                        onDragOverColumn={handleDragOver}
                        onDropOnColumn={handleDrop}
                        editingTaskId={editingTaskId}
                        onSetEditingTaskId={setEditingTaskId}
                        onUpdateTask={handleUpdateTaskText}
                    />
                ))}
            </div>
        </div>
    );
};

export default Board;