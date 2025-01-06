const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title must not exceed 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [500, 'Description must not exceed 500 characters'],
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: [true, 'Priority is required'],
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema);
