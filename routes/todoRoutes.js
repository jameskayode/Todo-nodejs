const express = require('express');
const todoController = require('../controllers/todoController');
const { validateTodo, validateTodos, validateTodoUpdate } = require('../middleware/validationMiddleware');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

// Merged create single and multiple todos
router.post('/createtodo', authenticate, (req, res, next) => {
  if (Array.isArray(req.body)) {
    validateTodos(req, res, next); 
  } else {
    validateTodo(req, res, next); 
  }
}, todoController.createTodo);

// Merged get all, paginate, and search todos
router.get('/', authenticate, (req, res, next) => {
    if (req.query.keyword) {
      todoController.searchTodos(req, res, next);
    } else if (req.query.page || req.query.limit) {
      todoController.getPaginatedTodos(req, res, next);
    } else {
      todoController.getTodos(req, res, next);
    }
  });

// Update a todo by ID
router.put('/update/:id', authenticate, validateTodoUpdate, todoController.updateTodo);

// Delete a todo by ID
router.delete('/delete/:id', authenticate, todoController.deleteTodo);

module.exports = router;