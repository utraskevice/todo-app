const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');

    app.listen(PORT, () => console.log(`Server is running on port:` + PORT));
  })
  .catch((e) => console.log(e));

const {
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
  toggleFavorite,
} = require('./controllers/todo-controller.js');

const {
  signupUser,
  loginUser,
  getUserInfo,
} = require('./controllers/user-controller.js');

// example one
app.get('/message', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// Routes
app.post('/signup', signupUser);

app.post('/login', loginUser);

app.get('/users/:id', getUserInfo);

app.post('/todo', createTodo);

app.get('/todo/:id', getTodo);

app.put('/todo/:id', updateTodo);

app.put("/favorite/:id", toggleFavorite)

app.delete('/todo/:id', deleteTodo);

module.exports = app;
