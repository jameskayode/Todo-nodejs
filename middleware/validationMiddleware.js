const Joi = require('joi');

// User registration validation
exports.validateRegister = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// User login validation
exports.validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// Todo validation schema for creating a single todo
const todoCreateSchema = Joi.object({
  title: Joi.string().max(300).required(),
  description: Joi.string().max(1000).optional(),
  priority: Joi.string().valid('Low', 'Medium', 'High').optional(),
  dueDate: Joi.date().optional(),
  status: Joi.string().valid('Pending', 'In Progress', 'Completed').optional(),
});

// Todo validation schema for updating a todo
const todoUpdateSchema = Joi.object({
  title: Joi.string().max(300).optional(),
  description: Joi.string().max(1000).optional(),
  priority: Joi.string().valid('Low', 'Medium', 'High').optional(),
  dueDate: Joi.date().optional(),
  status: Joi.string().valid('Pending', 'In Progress', 'Completed').optional(),
});

// Middleware to validate a single todo (for creation)
exports.validateTodo = (req, res, next) => {
  const { error } = todoCreateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }
  next();
};

// Middleware to validate multiple todos (for bulk creation)
exports.validateTodos = (req, res, next) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ message: 'Request body must be an array of todos.' });
  }

  for (let i = 0; i < req.body.length; i++) {
    const { error } = todoCreateSchema.validate(req.body[i]);
    if (error) {
      return res.status(400).json({ message: `Todo at index ${i} is invalid: ${error.details[0].message}` });
    }
  }
  next();
};

// Middleware to validate todo updates
exports.validateTodoUpdate = (req, res, next) => {
  const { error } = todoUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }
  next();
};