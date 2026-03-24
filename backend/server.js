console.log("START SERWERA");

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "db",
  database: "tasksdb",
  password: "postgres",
  port: 5432,
});

// HEALTHCHECK endpoint (do punktu 5.4)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// GET ALL
app.get("/tasks", async (req, res) => {
  const result = await pool.query("SELECT * FROM tasks");
  res.json(result.rows);
});

// GET BY ID
app.get("/tasks/:id", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM tasks WHERE id=$1",
    [req.params.id]
  );
  res.json(result.rows[0]);
});

// CREATE
app.post("/tasks", async (req, res) => {
  const { title } = req.body;
  const result = await pool.query(
    "INSERT INTO tasks(title) VALUES($1) RETURNING *",
    [title]
  );
  res.status(201).json(result.rows[0]);
});

// UPDATE
app.put("/tasks/:id", async (req, res) => {
  const { title } = req.body;
  await pool.query(
    "UPDATE tasks SET title=$1 WHERE id=$2",
    [title, req.params.id]
  );
  res.json({ message: "updated" });
});

// DELETE
app.delete("/tasks/:id", async (req, res) => {
  await pool.query(
    "DELETE FROM tasks WHERE id=$1",
    [req.params.id]
  );
  res.status(204).send();
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});