const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: String,
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  columnId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Column', 
    required: true,
  },
  position: Number, 
  dueDate: Date,
  labels: [
    {
      type: String,
      trim: true,
    },
  ],
  attachments: [
    {
      name: String,
      url: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Task', taskSchema);
