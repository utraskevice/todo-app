const Todo = require('../models/todo-model.js');
const User = require('../models/user-model.js');
const serverErrorHandler = '../utills/error.js';

const signupUser = async (req, res) => {
  const newUserData = req.body;
  console.log(newUserData);
  try {
    const isUserExist = await User.findOne({ email: newUserData.email });

    if (!isUserExist && newUserData.password === newUserData.confirmPassword) {
      const newUser = new User(newUserData);

      const createdUser = await newUser.save();

      res.status(201).json({
        message: 'User created',
        user: createdUser,
      });
    } else {
      res.status(401).json({
        message:
          'Sorry, information yu are givin is not correct or user is allready exist',
      });
    }
  } catch (error) {
    serverErrorHandler(error, res, 500, {
      message: 'Can not sign up, try again later',
    });
  }
};

const loginUser = async (req, res) => {
  const userData = req.body;

  try {
    const user = await User.findOne(userData);

    if (user) {
      res.status(200).json({ user, message: 'Logged in successfully' });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    serverErrorHandler(error, res, 500, {
      message: 'Can not login, try again later',
    });
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
