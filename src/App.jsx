
import { useState } from 'react'

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const [search, setSearch] = useState('')

  function addTask(e) {
    e.preventDefault()
    const text = task.trim()

    if (!text) return

    setTasks(previous => [
      ...previous,
      { id: Date.now() + Math.random(), text, done: false },
    ])
    setTask('')
  }

  function toggleTask(id) {
    setTasks(previous =>
      previous.map(item =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    )
  }

  function deleteTask(id) {
    setTasks(previous => previous.filter(item => item.id !== id))
  }

  const filteredTasks = tasks.filter(item =>
    item.text.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="page">
      <section className="card">
        <h1>My ToDo App ✨</h1>
        <p className="subtitle">Plan your day, one task at a time.</p>

        <form onSubmit={addTask} className="add-form">
          <input
            value={task}
            onChange={e => setTask(e.target.value)}
            placeholder="Add a new task..."
            aria-label="New task"
          />
          <button type="submit">Add</button>
        </form>

        <input
          className="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Search tasks..."
          aria-label="Search tasks"
        />

        <p className="count">
          Completed: {tasks.filter(item => item.done).length} / {tasks.length}
        </p>

        <ul className="task-list">
          {filteredTasks.map(item => (
            <li key={item.id} className={item.done ? 'task done' : 'task'}>
              <label>
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() => toggleTask(item.id)}
                />
                <span>{item.text}</span>
              </label>
              <button
                className="delete"
                onClick={() => deleteTask(item.id)}
                aria-label={`Delete ${item.text}`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        {filteredTasks.length === 0 && (
          <p className="empty">
            {search ? 'No matching tasks found.' : 'No tasks yet. Add one above!'}
          </p>
        )}
      </section>
    </main>
  )
}

export default App
