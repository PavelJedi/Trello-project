const mongoose = require("mongoose");

const columnSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board", 
    required: true,
  },
  position: Number, 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Column", columnSchema);
