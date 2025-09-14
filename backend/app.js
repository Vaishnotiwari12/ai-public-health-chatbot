// Load environment variables from config.env in the root directory
const path = require('path');
require('dotenv').config({ 
  path: path.resolve(__dirname, '../config.env') 
});
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const winston = require('winston');
const chatRoutes = require('./src/routes/chat.routes');
const config = require('./src/config');

// Initialize express app
const app = express();

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use(limiter);

// Request logging
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

// Body parsing middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Configure CORS
app.use(cors({
  origin: [
    'http://localhost:4028',
    'http://127.0.0.1:4028',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Log all requests

// Log all requests
app.use((req, res, next) => {
  logger.info({
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('user-agent')
  });
  next();
});

// API Routes
app.use('/api/chat', chatRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'UP', 
    timestamp: new Date(),
    environment: config.nodeEnv,
    version: process.env.npm_package_version
  });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const errorResponse = {
    error: {
      message: err.message || 'Internal Server Error',
      status,
      timestamp: new Date().toISOString()
    }
  };

  // Include stack trace in development
  if (config.nodeEnv === 'development') {
    errorResponse.error.stack = err.stack;
  }

  // Log the error
  logger.error({
    status,
    message: err.message,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
    ip: req.ip
  });

  res.status(status).json(errorResponse);
});

// Server configuration
const PORT = config.port;
const server = app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT} in ${config.nodeEnv} mode`);
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${config.nodeEnv}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  
  // Close server & exit process
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  logger.error(err.name, err.message);
  
  // Close server & exit process
  server.close(() => {
    process.exit(1);
  });
});

// Handle SIGTERM (for Docker, Kubernetes, etc.)
process.on('SIGTERM', () => {
  logger.info('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    logger.info('💥 Process terminated!');
  });
});

module.exports = { app, server };
