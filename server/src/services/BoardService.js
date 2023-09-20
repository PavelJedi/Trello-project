const Board = require("../models/BoardModel");
const User = require("../models/UserModel");
const Task = require("../models/TaskModel");

exports.getAllBoards = async () => {
  return await Board.find();
};

exports.createBoard = async (boardData) => {
  const board = new Board(boardData);
  return await board.save();
};

exports.getBoardById = async (id) => {
  return await Board.findById(id);
};

exports.updateBoard = async (id, updatedBoardData) => {
  return await Board.findByIdAndUpdate(id, updatedBoardData, {
    new: true,
    runValidators: true,
  });
};

exports.deleteBoard = async (id) => {
  return await Board.findByIdAndDelete(id);
};

exports.addMemberToBoard = async (boardId, memberId) => {
  const board = await Board.findById(boardId);
  if (board) {
    const user = await User.findById(memberId);
    if (user) {
      board.members.push(memberId);
      return await board.save();
    }
  }
  return null;
};

exports.removeMemberFromBoard = async (boardId, memberId) => {
  const board = await Board.findById(boardId);
  if (board) {
    board.members = board.members.filter(
      (member) => member.toString() !== memberId
    );
    return await board.save();
  }
  return null;
};

exports.getAllTasksForBoard = async (boardId) => {
  const tasks = await Task.find({ columnId: boardId });
  return tasks;
};
