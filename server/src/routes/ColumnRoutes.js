const express = require("express");
const router = express.Router();
const columnController = require("../controllers/ColumnController");

router.get("/:boardId", columnController.getAllColumns);

router.post("/", columnController.createColumn);

router.get("/:id", columnController.getColumnById);

router.patch("/:id", columnController.updateColumn);

router.delete("/:id", columnController.deleteColumn);

module.exports = router;
