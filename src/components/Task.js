import React, { useState } from 'react';

const Task = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({ ...task });

  const handleUpdate = () => {
    onUpdate(task._id, updatedTask);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <>
          <input
            type="text" 
            value={updatedTask.title}
            onChange={(e) => setUpdatedTask({ ...updatedTask, title: e.target.value })}
          />
          <input
            type="text"
            value={updatedTask.description}
            onChange={(e) => setUpdatedTask({ ...updatedTask, description: e.target.value })}
          />
          <input
            type="date"
            value={updatedTask.dueDate?.slice(0, 10)} // to handle ISO date format
            onChange={(e) => setUpdatedTask({ ...updatedTask, dueDate: e.target.value })}
          />
          <select value={updatedTask.priority} onChange={(e) => setUpdatedTask({ ...updatedTask, priority: e.target.value })}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <select value={updatedTask.status} onChange={(e) => setUpdatedTask({ ...updatedTask, status: e.target.value })}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</p>
          <p>Priority: {task.priority}</p>
          <p>Status: {task.status}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(task._id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default Task;
