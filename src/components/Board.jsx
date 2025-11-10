import React, { useState, useEffect } from 'react';
import Column from './Column';

const emptyBoardStructure = [ 
    { id: 'col1', title: 'To Do', tasks: [] },
    { id: 'col2', title: 'In Progress', tasks: [] },
    { id: 'col3', title: 'Done', tasks: [] }
]

const Board = () => {
    const [columns, setColumns] = useState(emptyBoardStructure)

    // states for drag & drop tasks
    const [draggedTask, setDraggedTask] = useState(null)
    const [sourceColumn, setSourceColumn] = useState(null)

    const handleDragStart = (task, columnId) => {
        setDraggedTask(task);
        setSourceColumn(columnId);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = async (targetColumnId) => {
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
                throw new Error("Failed to move the task on the server", error)
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

    useEffect(() => {
        fetch('/api/board')  
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch data to board');
                return res.json()
            })
            .then(data => setColumns(data))
            .catch(error => {
                console.error("Error while loading the board:", error);
            });
    }, []); 

    const handleAddTask =  async (columnId, taskText) => {
        const newTask = {
            text: taskText,
            columnId: columnId
        }
        
        try {
            const response = await fetch(`/api/tasks/`, {
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

    const handleDeleteTask =  async (columnId, taskId) => {
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
                <h1 className="text-3xl font-bold text-slate-900">Project Board</h1>
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
                    />
                ))}
            </div>
        </div>
    );
};

export default Board;