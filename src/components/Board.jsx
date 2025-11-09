import React, { useState, useEffect } from 'react';
import Column from './Column';

// temporary debugging data
const InitialBoardData = [
    {
        id: 'col1',
        title: 'To Do',
        tasks: [
            { id: 't1', text: 'Zaprojektować API w .NET' },
            { id: 't2', text: 'Skonfigurować Entity Framework' },
        ],
    },
    {
        id: 'col2',
        title: 'In Progress',
        tasks: [
            { id: 't3', text: 'Ustawić statyczną tablicę w React' },
        ],
    },
    {
        id: 'col3',
        title: 'Done',
        tasks: [],
    },
];

const Board = () => {
    const [columns, setColumns] = useState(InitialBoardData)

    const handleAddTask = (columnId, taskText) => {
        const newTask = {
            id: `t${Date.now()}`,
            text: taskText
        }
    
        setColumns((prevColumns) => {
            return prevColumns.map((column) => {
                if (column.id === columnId) {
                    return {
                        ...column,
                        tasks: [...column.tasks, newTask],
                    };
                }
                return column;
            });
        });
    }
    /* 
    useEffect(() => {
        fetch('/api/board')  
            .then(res => res.json())
            .then(data => setColumns(data));
    }, []); 
    */

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
                    />
                ))}
            </div>
        </div>
    );
};

export default Board;