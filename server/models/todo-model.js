const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  todo_name: {
    type: String,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    default: false,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['To do', 'In progress', 'Done'],
    default: 'To do',
  },
});

const Todo = mongoose.model('todo', todoSchema);
module.exports = Todo;
