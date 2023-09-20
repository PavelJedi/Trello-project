const TaskService = require("../services/TaskService");

exports.getAllTasks = async (req, res) => {
  try {
    const columnId = req.params.columnId;
    const tasks = await TaskService.getAllTasks(columnId);
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const task = await TaskService.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await TaskService.getTaskById(req.params.id);
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await TaskService.updateTask(req.params.id, req.body);
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await TaskService.deleteTask(req.params.id);
    res.json(deletedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
