import React, { useState, useEffect } from 'react';
import Column from './Column';

const Board = () => {
    const [columns, setColumns] = useState([])

    useEffect(() => {
        fetch('/api/board')  
            .then(res => res.json())
            .then(data => setColumns(data));
    }, []);

    return (
        <div className="board">
            <h1>Project Board</h1>
            <div className="columns-wrapper">
                {columns.map((column) => (
                    <Column
                        key={column.id}
                        title={column.title}
                        tasks={column.tasks}
                    />
                ))}
            </div>
        </div>
    );
};

export default Board;