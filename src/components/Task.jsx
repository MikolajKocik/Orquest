import React from 'react';

const Task = ({ text }) => {
    return (
        <div className="task-card">
            <p>{text}</p>
        </div>
    );
};

export default Task;