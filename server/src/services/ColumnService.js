// columnService.js
const Column = require("../models/ColumnModel");

exports.getAllColumns = async (boardId) => {
  return await Column.find({ boardId }).sort({ position: 1 });
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
