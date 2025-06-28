import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const fetch = async () => {
    const { data } = await axios.get('http://localhost:5000/api/tasks');
    setTasks(data);
  };

  useEffect(() => { fetch(); }, []);

  const add = async () => {
    await axios.post('http://localhost:5000/api/tasks', { title });
    setTitle('');
    fetch();
  };

  const complete = async (id) => {
    await axios.put(`http://localhost:5000/api/tasks/${id}/complete`);
    fetch();
  };

  return (
    <div>
      <h2>Tasks</h2>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="New task"
      />
      <button onClick={add}>Add</button>
      <ul>
        {tasks.map(t => (
          <li key={t._id}>
            <span style={{ textDecoration: t.isCompleted ? 'line-through' : 'none' }}>
              {t.title}
            </span>
            {!t.isCompleted && <button onClick={() => complete(t._id)}>✓</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
