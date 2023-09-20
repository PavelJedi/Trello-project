const ColumnService = require("../services/ColumnService");

exports.getAllColumns = async (req, res) => {
  try {
    const boardId = req.params.boardId;
    const columns = await ColumnService.getAllColumns(boardId);
    res.json(columns);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createColumn = async (req, res) => {
  try {
    const column = await ColumnService.createColumn(req.body);
    res.status(201).json(column);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getColumnById = async (req, res) => {
  try {
    const column = await ColumnService.getColumnById(req.params.id);
    res.json(column);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateColumn = async (req, res) => {
  try {
    const updatedColumn = await ColumnService.updateColumn(req.params.id, req.body);
    res.status(200).json(updatedColumn);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteColumn = async (req, res) => {
  try {
    const deletedColumn = await ColumnService.deleteColumn(req.params.id);
    res.json(deletedColumn);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
