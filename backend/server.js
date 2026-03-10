const express = require("express");
const app = express();

app.use(express.json());

let tasks = [
  { id: 1, title: "Task 1" },
  { id: 2, title: "Task 2" }
];

// CRUD

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  res.json(task);
});

app.post("/tasks", (req, res) => {
  tasks.push(req.body);
  res.status(201).json(req.body);
});

app.put("/tasks/:id", (req, res) => {
  res.json({ message: "updated" });
});

app.delete("/tasks/:id", (req, res) => {
  res.status(204).send();
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});