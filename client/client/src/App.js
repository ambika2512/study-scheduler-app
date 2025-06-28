import React from 'react';
import TaskList from './components/TaskList';
import PlaylistPlanner from './components/PlaylistPlanner';

function App() {
  return (
    <div className="container p-4">
      <h1>Study Scheduler 🚀</h1>
      <TaskList />
      <hr />
      <PlaylistPlanner />
    </div>
  );
}

export default App;
