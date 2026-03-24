let tasks = [
  { id: 1, title: "Task 1" },
  { id: 2, title: "Task 2" }
];
const toTaskDto = (task) => {
  return {
    id: task.id,
    title: task.title
  };
};
exports.getTasks = (req, res) => {
  const dto = tasks.map(toTaskDto);
  res.json(dto);
};

exports.getTaskById = (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);

  if (!task) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  res.json(toTaskDto(task));
};

exports.createTask = (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      error: "Title is required"
    });
  }

  const newTask = {
    id: tasks.length + 1,
    title
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
};

exports.updateTask = (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);

  if (!task) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  task.title = req.body.title;

  res.json(task);
};

exports.deleteTask = (req, res) => {
  const index = tasks.findIndex(t => t.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  tasks.splice(index, 1);

  res.status(204).send();
};