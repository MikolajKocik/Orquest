import React from 'react';
import Task from './Task';

const Column = ({ title, tasks }) => {
    return (
        <div className="column">
            <h2>{title}</h2>
            <div className="tasks-container">
                {tasks.map((task) => (
                    <Task key={task.id} text={task.text} />
                ))}
                {tasks.length === 0 && <p className="empty-column-text">No tasks</p>}
            </div>
        </div>
    );
};

export default Column;