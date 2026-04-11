import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const API_URL =
    "https://tasks-api-wrx86301-h9ckdycrbbejfpa6.germanywestcentral-01.azurewebsites.net/tasks";

  // 🔄 pobieranie listy tasków
  const loadTasks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // ➕ dodawanie taska
  const addTask = async () => {
    if (!title.trim()) return;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (!res.ok) throw new Error("POST failed");

      setTitle("");
      loadTasks();
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  // ❌ usuwanie taska
  const deleteTask = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("DELETE failed");

      loadTasks();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ color: "red" }}>Tasks</h1>
      <h2>TEST DELETE BUTTON</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
      />

      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}{" "}
            <button onClick={() => deleteTask(task.id)}>Usuń</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;