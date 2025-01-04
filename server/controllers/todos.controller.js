

const { Todos } = require("../schemas/routine.schema");
const User = require("../schemas/user.schema");
const generateDate = require("../lib/utils");

const addTodo =  async (req, res) => {
  const { userId } = req.userData;
  const { title, description, priority } = req.body;
  const date = generateDate();
  const todos = await Todos.create({
    title: title,
    description: description,
    createdAt: date,
    priority: priority,
    user: userId,
  });
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $push: { todos: todos._id } },
    { new: true }
  ).populate("todos");

  return res
    .status(201)
    .json({
      task: todos,
      user: updatedUser,
      message: "Task created successfully",
    });
};

const getTodos = async (req, res) => {
  const { userId } = req.userData;
  const populateTodos = await User.findById(userId).populate("todos");
  if (populateTodos.todos.length == 0)
    return res.json({ message: "No todos are present" });
  res.json({ todos: populateTodos.todos });
};

const updateTodo = async (req, res) => {
  const id = req.query.id;
  const data = req.body;
  const updatedTask = await Todos.findByIdAndUpdate(
    id,
    { ...data },
    { new: true }
  );
  res.json(updatedTask);
};

const deleteTodo = async (req, res) => {
  const id = req.query.id;
  const { userId } = req.userData;
  const updated = await User.findByIdAndUpdate(
    userId,
    { $pull: { todos: id } },
    { new: true }
  );
  const deletedTask = await Todos.findByIdAndDelete(id);
  res.status(200).json({ updated, deletedTask });
};

module.exports = {addTodo,getTodos,updateTodo,deleteTodo}
