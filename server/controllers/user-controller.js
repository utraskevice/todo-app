const Todo = require('../models/todo-model.js');
const User = require('../models/user-model.js');

const signupUser = async (req, res) => {
  const newUserData = req.body;
  console.log(newUserData);
  try {
    const isUserExist = await User.findOne({ email: newUserData.email });

    if (!isUserExist) {
      const newUser = new User(newUserData);

      const createdUser = await newUser.save();

      res.json({
        message: 'User created',
        user: createdUser,
      });
    } else {
      res.json({ message: 'Sorry, user with given email already exists' });
    }
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  const userData = req.body;

  try {
    const user = await User.findOne(userData);

    if (user) {
      res.json({ message: 'User founded', user });
    } else {
      res.json({ message: 'User with given email or password not found' });
    }
  } catch (error) {
    console.log(error);
  }
};

const getUserInfo = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    const allTodo = await Todo.find({});
    const userTodo = allTodo
      .filter((todo) => todo.user_id.toString() === userId)
      .map((todo) => ({
        ...todo.toObject(),
        user_id: todo.user_id.toString(),
      }));

    res.json({
      ...user.toObject(),
      todo: userTodo,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { signupUser, loginUser, getUserInfo };
