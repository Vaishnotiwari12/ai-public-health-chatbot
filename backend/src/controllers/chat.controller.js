const { validationResult } = require('express-validator');

// Mock response for testing
const MOCK_RESPONSE = "I'm a mock response from the AI. This confirms that the frontend and backend are communicating correctly. The Google Generative AI integration will be set up next.";

// System prompt for the AI (not used in mock mode)
const SYSTEM_PROMPT = `You are a helpful and empathetic healthcare assistant. 
Provide accurate, clear, and concise health information. 
For serious symptoms or emergencies, always recommend consulting a healthcare professional.`;

/**
 * @description Process chat message and get response (mocked for now)
 * @route   POST /api/chat
 * @access  Public
 */
const chatWithAI = async (req, res, next) => {
  try {
    console.log(`Incoming request to /api/chat`);
    console.log('Request body:', req.body);
    
    const { query } = req.body;
    
    if (!query || typeof query !== 'string' || query.trim() === '') {
      return res.status(400).json({ 
        error: 'Query is required and must be a non-empty string' 
      });
    }
    
    console.log('Processing query:', query.substring(0, 50) + (query.length > 50 ? '...' : ''));

    // Set headers for streaming
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Mock response for testing
    try {
      // Simulate streaming by sending the response in chunks
      const chunkSize = 10;
      for (let i = 0; i < MOCK_RESPONSE.length; i += chunkSize) {
        const chunk = MOCK_RESPONSE.substring(i, i + chunkSize);
        res.write(chunk);
        // Add a small delay to simulate network
        await new Promise(resolve => setTimeout(resolve, 20));
      }
      
      // End the response
      res.end();
    } catch (error) {
      console.error('Error in mock response:', error);
      res.status(500).json({
        error: 'Failed to send mock response',
        details: error.message
      });
    }

  } catch (error) {
    console.error('Error in chatWithAI:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      status: error.status,
      response: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers
      }
    });
    
    // Handle specific Gemini API errors
    if (error.message.includes('API key not valid') || error.message.includes('API_KEY_INVALID')) {
      return res.status(401).json({
        error: 'Invalid API key. Please check your GEMINI_API_KEY in .env file.',
        details: 'The provided API key is either missing or invalid.'
      });
    }
    
    // Handle rate limiting or quota exceeded
    if (error.message.includes('quota') || error.message.includes('rate limit') || error.status === 429) {
      return res.status(429).json({
        error: 'API rate limit or quota exceeded. Please try again later.',
        details: 'You have exceeded your API quota or rate limit.'
      });
    }
    
    // More specific error handling
    if (error.response?.data?.error) {
      return res.status(error.response.status || 500).json({
        error: error.response.data.error.message || 'API request failed',
        details: error.response.data.error
      });
    }
    
    // Generic error response with more details
    const errorResponse = {
      error: 'Failed to process your request',
      message: error.message,
      ...(process.env.NODE_ENV === 'development' && {
        stack: error.stack,
        details: error.toString()
      })
    };
    
    res.status(500).json(errorResponse);
  }
};

module.exports = {
  chatWithAI
};
