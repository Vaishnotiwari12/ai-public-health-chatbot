const express = require('express');
const { body, query } = require('express-validator');
const chatController = require('../controllers/chat.controller');

const router = express.Router();

/**
 * @route   GET /api/chat
 * @desc    Info about the chat API
 * @access  Public
 * @returns {Object} API information
 */
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Health Chatbot API',
    availableEndpoints: [
      {
        methods: ['GET', 'POST'],
        path: '/api/chat',
        description: 'Send a message to the AI',
        parameters: {
          message: 'string (required)',
          chatHistory: 'JSON string (optional) for GET, array for POST'
        }
      }
    ]
  });
});

// Handle POST requests with JSON body
router.post(
  '/',
  [
    body('query', 'Query is required').not().isEmpty()
  ],
  chatController.chatWithAI
);

module.exports = router;
