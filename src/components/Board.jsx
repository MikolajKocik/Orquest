import React, { useState, useEffect } from 'react';
import Column from './Column';

const emptyBoardStructure = [ 
    { 
        id: 'col1', title: 'To Do', tasks: [] 
    },
    {
        id: 'col2', title: 'In Progress', tasks: []
    },
    {
        id: 'col3', title: 'Done', tasks: []
    }
]

const Board = () => {
    const [columns, setColumns] = useState(emptyBoardStructure)

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
        <div className="board">
            <h1>Project Board</h1>
            <div className="columns-wrapper">
                {columns.map((column) => (
                    <Column
                        key={column.id}
                        columnId={column.id}
                        title={column.title}
                        tasks={column.tasks}
                        onAddTask={handleAddTask}
                        onDeleteTask={handleDeleteTask}
                    />
                ))}
            </div>
        </div>
    );
};

export default Board;