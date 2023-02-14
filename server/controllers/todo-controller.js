const Todo = require('../models/todo-model.js');
const serverErrorHandler = '../utills/error.js';

const createTodo = async (req, res) => {
  const { userId, todo_name } = req.body;

  const newTodo = {
    user_id: userId,
    todo_name,
  };

  try {
    const todo = new Todo(newTodo);

    await todo.save();

    res.status(201).json({ message: 'To do task  added' });
  } catch (error) {
    serverErrorHandler(error, res, 500, {
      message: 'Task not saved, try again later',
    });
  }
};

const getTodo = async (req, res) => {
  const userId = req.params.id;

  try {
    const allTodo = await Todo.find({});
    const userTodo = allTodo
      .filter((todo) => todo.user_id.toString() === userId)
      .map((todo) => ({
        ...todo.toObject(),
        user_id: todo.user_id.toString(),
      }));

    res.json({
      todo: userTodo,
    });
  } catch (error) {
    serverErrorHandler(error, res, 500, {
      message: 'Unable to retrive to do tasks',
    });
  }
};

const updateTodo = async (req, res) => {
  const todoId = req.params.id;
  const newTodoData = req.body;

  try {
    await Todo.findByIdAndUpdate(todoId, newTodoData);
    const updatedTodo = await Todo.findById(todoId);

    res.json({ message: 'Task updated', todo: updatedTodo });
  } catch (error) {
    serverErrorHandler(error, res, 500, {
      message: 'Task is not updated, try again later',
    });
  }
};

const toggleFavorite = async (req, res) => {
  Todo.findById(req.params.id, function (_error, todo) {
    todo.isFavorite = !todo.isFavorite;
    todo.save(function (error, updatedTodo) {
      if (error) {
        console.log(error);
      } else {
        res.json({ message: 'Favorite toggled', todo: updatedTodo });
      }
    });
  });
};

const deleteTodo = async (req, res) => {
  const todoId = req.params.id;

  try {
    await Todo.findByIdAndDelete(todoId);

    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    serverErrorHandler(error, res, 500, {
      message: 'Task is not deleted, try again later',
    });
  }
};

module.exports = {
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
  toggleFavorite,
};
