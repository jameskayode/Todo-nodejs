const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const allRoutes = require('./routes/routeIndex');
const swaggerUi = require('swagger-ui-express');

const { errorHandler } = require('./middleware/errorMiddleware');

// Swagger setup
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// API Routes
app.use('/api', allRoutes); 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
