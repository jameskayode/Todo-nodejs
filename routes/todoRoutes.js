
const { protect, authenticate } = require('../middleware/authMiddleware');

const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const { validateTodo, validateTodos } = require('../middleware/validationMiddleware');

router.post('/todos', validateTodo, todoController.createTodo);
router.post('/bulk', validateTodos, todoController.createTodos);
router.get('/alltodos', todoController.getTodos);
router.get('/search', authenticate, todoController.searchTodos);
router.get('/paginate', authenticate, todoController.getPaginatedTodos);
router.get('/:id',protect, todoController.getTodoById);
router.put('/update/:id', validateTodo, todoController.updateTodo);
router.delete('/delete/:id', todoController.deleteTodo);

module.exports = router;
