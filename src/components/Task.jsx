import React from 'react';

const Task = ({ text, onDelete }) => {
    return (
        <div className="task-card">
            <p>{text}</p>
            <button onClick={onDelete} className="delete-button">
                X
            </button>
        </div>
    );
};

export default Task;