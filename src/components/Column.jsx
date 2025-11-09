import React, { useState } from 'react';
import Task from './Task';

const Column = ({ title, tasks, columnId, onAddTask, onDeleteTask }) => {
    const [newTaskText, setNewTaskText] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTaskText.trim() === '') return;

        onAddTask(columnId, newTaskText);
        setNewTaskText(''); // clear input
    }

    return (
        <div className="column">
            <h2>{title}</h2>
            <div className="tasks-container">
                {tasks.map((task) => (
                    <Task 
                        key={task.id}
                        text={task.text}
                        onDelete={() => onDeleteTask(columnId, task.id)}
                    />
                ))}
                {tasks.length === 0 && <p className="empty-column-text">No tasks</p>}
            </div>
        
            <form className="add-task-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    placeholder="Write task title..."
                    className="add-task-input"
                />
                <button type="submit" className="add-task-button">
                    Add task
                </button>
            </form>
        </div>
    );
};

export default Column;