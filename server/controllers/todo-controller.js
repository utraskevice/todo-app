const Todo = require('../models/todo-model.js');

const createTodo = async (req, res) => {
  const { userId, todo_name, is_favorite, status } = req.body;

  const newTodo = {
    user_id: userId,
    todo_name,
    is_favorite,
    status,
  };

  try {
    const todo = new Todo(newTodo);

    await todo.save();

    res.json({ message: 'Todo added' });
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};

const updateTodo = async (req, res) => {
  const todoId = req.params.id;
  const newTodoData = req.body;

  try {
    await Todo.findByIdAndUpdate(todoId, newTodoData);
    const updatedTodo = await Todo.findById(todoId);

    res.json(updatedTodo);
  } catch (error) {
    console.log(error);
  }
};

const deleteTodo = async (req, res) => {
  const todoId = req.params.id;

  try {
    await Todo.findByIdAndDelete(todoId);

    res.json({ message: 'Post deleted' });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createTodo, getTodo, updateTodo, deleteTodo };
