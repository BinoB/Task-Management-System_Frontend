import React, { useEffect, useState } from 'react';
import api from '../api/api';
import TaskList from '../components/TaskList';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');
  const [status, setStatus] = useState('Pending');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get('/api/task');
        setTasks(res.data);
        console.log(api);
      } catch (err) {
        console.error('Failed to fetch tasks', err);
      }
    };
    fetchTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/task', { title, description, dueDate, priority, status });
      setTasks([...tasks, res.data]);
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('Low');
      setStatus('Pending');
    } catch (err) {
      console.error('Failed to create task', err);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const res = await api.put(`/api/task${id}`, updatedTask);
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
    } catch (err) {
      console.error('Failed to update task', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/api/task${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <form onSubmit={createTask}>
        <div>
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Due Date</label>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>
        <div>
          <label>Priority</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button type="submit">Add Task</button>
      </form>
      <TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} />
    </div>
  );
};

export default Dashboard;
