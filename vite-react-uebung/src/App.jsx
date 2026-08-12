import { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [removingIndex, setRemovingIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  function addTask() {
    if (input.trim() === '') return;
    setTasks([...tasks, { text: input, done: false }]);
    setInput('');
  }

  function toggleTask(index) {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  }

  function deleteTask(index) {
    setRemovingIndex(index);
    setTimeout(() => {
      setTasks((prev) => prev.filter((_, i) => i !== index));
      setRemovingIndex(null);
    }, 250);
  }

  return (
  <div className={`page ${darkMode ? 'dark' : ''}`}>
    <div className="todo-app">
        <div className="app-header">
          <h1>📝To-Do List</h1>
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            title="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
        

        <div className="input-row">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            placeholder="Add a task..."
          />
          <button onClick={addTask}>Add</button>
        </div>

        {tasks.length === 0 ? (
          <p className="empty-message">No tasks yet — add one above!</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task, index) => (
              <li
                className={`task-item ${removingIndex === index ? 'removing' : ''}`}
                key={index}
              >
                <span
                  className={`task-text ${task.done ? 'done' : ''}`}
                  onClick={() => toggleTask(index)}
                >
                  {task.text}
                </span>
                <button className="delete-btn" onClick={() => deleteTask(index)}>
                  ❌
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;