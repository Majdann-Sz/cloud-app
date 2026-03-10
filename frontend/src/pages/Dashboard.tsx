import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8081/tasks")
      .then(res => setTasks(res.data))
      .catch(err => {
        setError("API error");
      });
  }, []);

  return (
    <div>
      <h1>Tasks</h1>

      {error && <p>{error}</p>}

      <ul>
        {tasks.map((task:any) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}