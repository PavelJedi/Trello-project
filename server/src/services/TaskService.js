const Task = require("../models/TaskModel");

exports.getAllTasks = async (columnId) => {
  return await Task.find({ columnId }).sort({ position: 1 });
};

exports.createTask = async (taskData) => {
  const task = new Task(taskData);
  return await task.save();
};

exports.getTaskById = async (id) => {
  return await Task.findById(id);
};

exports.updateTask = async (id, updatedTaskData) => {
  return await Task.findByIdAndUpdate(id, updatedTaskData, {
    new: true,
    runValidators: true,
  });
};

exports.deleteTask = async (id) => {
  return await Task.findByIdAndDelete(id);
};
