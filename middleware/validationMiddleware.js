const Joi = require('joi');

// Validate user registration inputs
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

// Validate login inputs
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

const todoSchema = Joi.object({
  title: Joi.string().max(100).required(),
  description: Joi.string().max(500).required(),
  priority: Joi.string().valid('Low', 'Medium', 'High').required(),
  dueDate: Joi.date().required(),
});

// Middleware for single todo validation
exports.validateTodo = (req, res, next) => {
  const { error } = todoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// Middleware for multiple todos validation
exports.validateTodos = (req, res, next) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ message: 'Request body must be an array of todos.' });
  }

  for (let i = 0; i < req.body.length; i++) {
    const { error } = todoSchema.validate(req.body[i]);
    if (error) {
      return res.status(400).json({ message: `Todo at index ${i} is invalid: ${error.details[0].message}` });
    }
  }
  next();
};
