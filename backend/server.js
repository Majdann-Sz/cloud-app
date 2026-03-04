const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Backend działa!");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});app.get("/users", (req, res) => {
  res.json([
    { id: 1, name: "Jan" },
    { id: 2, name: "Anna" },
    { id: 3, name: "Piotr" }
  ]);
});