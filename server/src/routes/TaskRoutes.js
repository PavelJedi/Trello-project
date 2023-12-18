const express = require("express");
const router = express.Router();
const taskController = require("../controllers/TaskController");

router.get("/:columnId", taskController.getAllTasks);

router.get("/:id", taskController.getTaskById);

router.post("/", taskController.createTask);

router.patch("/:id", taskController.updateTask);

router.delete("/:id", taskController.deleteTask);

module.exports = router;