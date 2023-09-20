const BoardService = require("../services/BoardService");

exports.getAllBoards = async (req, res) => {
  try {
    const boards = await BoardService.getAllBoards();
    res.json(boards);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createBoard = async (req, res) => {
  try {
    const board = await BoardService.createBoard(req.body);
    res.status(201).json(board);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBoardById = async (req, res) => {
  try {
    const board = await BoardService.getBoardById(req.params.id);
    res.json(board);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateBoard = async (req, res) => {
  try {
    const updatedBoard = await BoardService.updateBoard(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedBoard);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBoard = async (req, res) => {
  try {
    const deletedBoard = await BoardService.deleteBoard(req.params.id);
    res.json(deletedBoard);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.addMemberToBoard = async (req, res) => {
  try {
    const boardId = req.params.boardId;
    const memberId = req.params.memberId;
    const updatedBoard = await BoardService.addMemberToBoard(boardId, memberId);
    if (updatedBoard) {
      res.status(200).json(updatedBoard);
    } else {
      res.status(404).json({ error: "Board or user not found." });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.removeMemberFromBoard = async (req, res) => {
  try {
    const boardId = req.params.boardId;
    const memberId = req.params.memberId;
    const updatedBoard = await BoardService.removeMemberFromBoard(
      boardId,
      memberId
    );
    if (updatedBoard) {
      res.status(200).json(updatedBoard);
    } else {
      res.status(404).json({ error: "Board or user not found." });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllTasksForBoard = async (req, res) => {
  try {
    const boardId = req.params.id;
    const tasks = await BoardService.getAllTasksForBoard(boardId);
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
