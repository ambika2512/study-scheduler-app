import React, { useState } from 'react';
import axios from 'axios';

export default function PlaylistPlanner() {
  const [topics, setTopics] = useState('');
  const [total, setTotal] = useState('');
  const [days, setDays] = useState('');
  const [plan, setPlan] = useState(null);

  const generate = async () => {
    const { data } = await axios.post('http://localhost:5000/api/playlists/plan', {
      totalMinutes: parseInt(total),
      topics: topics.split(',').map(s => s.trim()),
      days: parseInt(days),
    });
    setPlan(data.schedule);
  };

  return (
    <div>
      <h2>Playlist Planner</h2>
      <textarea
        placeholder="Topics separated by commas"
        value={topics}
        onChange={e => setTopics(e.target.value)}
      />
      <input
        type="number"
        placeholder="Total minutes"
        value={total}
        onChange={e => setTotal(e.target.value)}
      />
      <input
        type="number"
        placeholder="Days"
        value={days}
        onChange={e => setDays(e.target.value)}
      />
      <button onClick={generate}>Generate Plan</button>

      {plan && (
        <ul>
          {plan.map(p => (
            <li key={p.day}>
              Day {p.day}: {p.minutes} minutes — Topics: {p.topics.join(', ')}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
