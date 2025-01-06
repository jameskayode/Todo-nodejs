const Todo = require('../models/Todo');

// Create a single todo
exports.createTodo = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    const todo = await Todo.create({ title, description, priority, dueDate });
    res.status(201).json({ success: true, data: todo });
  } catch (error) {
    console.error('Error creating todo:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ success: true, data: todos });
  } catch (error) {
    console.error('Error fetching todos:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch todos.' });
  }
};

// Get a single todo by ID
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ success: false, message: 'Todo not found.' });
    }
    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    console.error('Error fetching todo:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch todo.' });
  }
};

// Update a todo
exports.updateTodo = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, priority, dueDate },
      { new: true, runValidators: true }
    );
    if (!todo) {
      return res.status(404).json({ success: false, message: 'Todo not found.' });
    }
    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    console.error('Error updating todo:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ success: false, message: 'Todo not found.' });
    }
    res.status(200).json({ success: true, message: 'Todo deleted successfully.' });
  } catch (error) {
    console.error('Error deleting todo:', error.message);
    res.status(500).json({ success: false, message: 'Failed to delete todo.' });
  }
};

// Create multiple todos
exports.createTodos = async (req, res) => {
  try {
    const todos = await Todo.insertMany(req.body);
    res.status(201).json({ success: true, data: todos });
  } catch (error) {
    console.error('Error creating todos:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};
exports.searchTodos = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({ success: false, message: 'Keyword is required.' });
    }

    // Search todos with case-insensitive matching in title or description
    const todos = await Todo.find({
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ],
    });

    res.status(200).json({ success: true, data: todos });
  } catch (error) {
    console.error('Error searching todos:', error.message);
    res.status(500).json({ success: false, message: 'Failed to search todos.' });
  }
};

// Get paginated todos
exports.getPaginatedTodos = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = 'createdAt' } = req.query;

    // Convert query strings to numbers
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    const todos = await Todo.find()
      .sort({ [sort]: 1 }) // Sort in ascending order; use `-1` for descending
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    // Get total count of todos
    const total = await Todo.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        todos,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (error) {
    console.error('Error fetching paginated todos:', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch todos.' });
  }
};
