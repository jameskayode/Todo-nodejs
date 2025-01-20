const todoService = require('../services/todoService');

// Create single or multiple todos
exports.createTodo = async (req, res) => {
  try {
    const userId = req.user.id;
    let result;

    if (Array.isArray(req.body)) {
      result = await todoService.createMultipleTodos(req.body, userId);
      res.status(201).json({ todos: result });
    } else {
      req.body.user = userId; 
      result = await todoService.createSingleTodo(req.body);
      res.status(201).json(result);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await todoService.getAllTodos(req.user.id);
    if (!todos.length) {
      return res.status(404).json({ message: 'No todos found for this user.' });
    }
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search todos by keyword
exports.searchTodos = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const todos = await todoService.searchTodosByKeyword(req.user.id, keyword);
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get paginated todos
exports.getPaginatedTodos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { todos, total } = await todoService.getPaginatedTodos(req.user.id, skip, limit);

    res.status(200).json({
      todos,
      pagination: {
        page,
        limit,
        total,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a todo by ID
exports.updateTodo = async (req, res) => {
  try {
    const todo = await todoService.updateTodoById(req.params.id, req.body);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a todo by ID
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await todoService.deleteTodoById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
