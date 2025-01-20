const Todo = require('../models/Todo');

exports.createSingleTodo = async (todoData) => {
  return await Todo.create(todoData);
};

exports.createMultipleTodos = async (todosData, userId) => {
  // Add the user field to each todo object
  const todosWithUser = todosData.map((todo) => ({
    ...todo,
    user: userId,
  }));
  return await Todo.insertMany(todosWithUser);
};


exports.getAllTodos = async (userId) => {
  return await Todo.find({ user: userId });
};

exports.searchTodosByKeyword = async (userId, keyword) => {
  return await Todo.find({
    user: userId,
    $or: [
      { title: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } },
    ],
  });
};

exports.getPaginatedTodos = async (userId, skip, limit) => {
  const todos = await Todo.find({ user: userId }).skip(skip).limit(limit);
  const total = await Todo.countDocuments({ user: userId });
  return { todos, total };
};

exports.updateTodoById = async (todoId, updateData) => {
  return await Todo.findByIdAndUpdate(todoId, updateData, { new: true });
};

exports.deleteTodoById = async (todoId) => {
  return await Todo.findByIdAndDelete(todoId);
};
