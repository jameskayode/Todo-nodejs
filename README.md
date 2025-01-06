
# Todo App API

Welcome to the **Todo App API**! This API provides endpoints for user authentication, user management, and todo management with features like JWT-based authentication, support for CRUD operations, and bulk operations.

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment_variables)
- [Project Structure](#project_structure)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [User Management](#user-management)
  - [Todo Management](#todo-management)
- [Schemas](#schemas)
- [Error Handling](#error-handling)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This API allows users to:
- Register and authenticate via JSON Web Tokens (JWT).
- Manage their profile information.
- Perform CRUD operations for their todos, including single and bulk operations.

The API is developed using Node.js, Express, and follows RESTful principles.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jameskayode/Todo-nodejs.git
   cd todo-app-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables by creating a `.env` file:
   ```env
   PORT=5000
   JWT_SECRET=your_secret_key
   DATABASE_URL=your_database_connection_string
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## Usage

- Base URL: `http://localhost:5000`

Use any API client like [Postman](https://www.postman.com/) or [Swagger UI](http://localhost:5000/api-docs) to test the endpoints.

To view the Swagger documentation:
1. Start the server.
2. Navigate to `http://localhost:5000/api-docs` in your browser.

## ---Available Scripts

    npm run dev: Starts the development server using nodemon.
    npm start: Starts the server in production mode.

## Environment Variables

Here are the environment variables required for the project:
Variable	Description	Example Value
MONGO_URI	MongoDB connection string	mongodb://localhost:27017/todoapi
JWT_SECRET	Secret key for JWT authentication	your-strong-secret-key

## Project Structure

todoapi/
├── middleware/              # Custom middleware
│   └── errorMiddleware.js   # Global error handler
├── models/                  # Database models
│   └── Todo.js              # Todo schema
├── routes/                  # Route definitions
│   └── todoRoutes.js        # Routes for managing todos
├── .env                     # Environment variables
├── server.js                # Main entry point
└── package.json             # Project metadata and dependencies


## API Documentation

### Authentication

| Method | Endpoint              | Description               |
|--------|------------------------|---------------------------|
| POST   | `/api/users/register` | Register a new user       |
| POST   | `/api/users/login`    | Login and obtain a token  |

#### Example: User Registration
```json
POST /api/users/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### User Management

| Method | Endpoint             | Description               |
|--------|-----------------------|---------------------------|
| GET    | `/api/users/profile` | Get the logged-in profile |

#### Example: Get User Profile
- Add the JWT token to the `Authorization` header: `Bearer <your_token>`.

---

### Todo Management

| Method | Endpoint                     | Description                      |
|--------|-------------------------------|----------------------------------|
| GET    | `/api/todos/alltodos`        | Retrieve all todos              |
| POST   | `/api/todos/todos`           | Create a single todo            |
| POST   | `/api/todos/bulk`            | Create multiple todos           |
| GET    | `/api/todos/{id}`            | Get details of a single todo    |
| PUT    | `/api/todos/update/{id}`     | Update a todo by ID             |

#### Example: Create a Todo
```json
POST /api/todos/todos
{
  "title": "Complete API documentation",
  "description": "Write detailed API documentation",
  "priority": "High",
  "dueDate": "2025-01-15",
  "status": "pending"
}
```

---

## Schemas

### User Registration
```json
{
  "name": "string",
  "email": "string (email)",
  "password": "string (minLength: 6)"
}
```

### Todo
```json
{
  "_id": "string (auto-generated)",
  "title": "string",
  "description": "string",
  "priority": "enum [High, Medium, Low] (default: Low)",
  "dueDate": "string (date-time)",
  "user": "string (user ID)",
  "createdAt": "string (auto-generated)",
  "updatedAt": "string (auto-generated)"
}
```

---

## Error Handling

| Error Code | Description                 |
|------------|-----------------------------|
| 400        | Validation error            |
| 401        | Unauthorized                |
| 404        | Resource not found          |
| 500        | Internal server error       |

Example response for validation error:
```json
{
  "message": "Validation failed"
}
```

---

## Examples

1. **Register a User**
   ```json
   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "securePassword123"
   }
   ```

2. **Login a User**
   ```json
   {
     "email": "john@example.com",
     "password": "securePassword123"
   }
   ```

3. **Create a Todo**
   ```json
   {
     "title": "Complete the report",
     "description": "Finish the sales report",
     "priority": "High",
     "dueDate": "2025-01-20"
   }
   ```

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make changes and commit:
   ```bash
   git commit -m "Added a new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

---

--- 

Enjoy building with the Todo App API! 🚀