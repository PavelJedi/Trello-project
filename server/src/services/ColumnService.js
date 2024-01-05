// columnService.js
const Column = require("../models/ColumnModel");
const Board = require("../models/BoardModel");

exports.getAllColumns = async (boardId) => {
  const board = await Board.findById(boardId).populate("columns");
  return board.columns;
};

exports.createColumn = async (columnData) => {
  const column = new Column(columnData);
  return await column.save();
};

exports.getColumnById = async (id) => {
  return await Column.findById(id);
};

exports.updateColumn = async (id, updatedColumnData) => {
  return await Column.findByIdAndUpdate(id, updatedColumnData, {
    new: true,
    runValidators: true,
  });
};

exports.deleteColumn = async (id) => {
  return await Column.findByIdAndDelete(id);
};
