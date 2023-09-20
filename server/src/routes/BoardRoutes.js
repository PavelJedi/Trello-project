const express = require("express");
const router = express.Router();
const boardController = require("../controllers/BoardController");

router.get("/", boardController.getAllBoards);

router.get("/:id", boardController.getBoardById);

router.post("/", boardController.createBoard);

router.patch("/:id", boardController.updateBoard);

router.delete("/:id", boardController.deleteBoard);

router.patch("/:boardId/add-member/:memberId", boardController.addMemberToBoard);

router.patch("/:boardId/remove-member/:memberId", boardController.removeMemberFromBoard);

router.get("/:id/tasks", boardController.getAllTasksForBoard);

module.exports = router;
