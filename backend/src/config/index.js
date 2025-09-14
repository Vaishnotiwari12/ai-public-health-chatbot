const path = require('path');

// Load environment variables from config.env in the root directory
require('dotenv').config({ 
  path: path.resolve(__dirname, '../../config.env') 
});

// Validate required environment variables
const requiredEnvVars = ['GEMINI_API_KEY'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
  process.exit(1);
}

// Application configuration
const config = {
  // Server configuration
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  
  // Gemini AI configuration
  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
    model: 'gemini-2.0-flash-exp',
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    },
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
    ],
  },
  
  // CORS configuration
  cors: {
    allowedOrigins: process.env.ALLOWED_ORIGINS 
      ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
      : ['http://localhost:3000'],
  },
};

// Validate configuration
if (!config.gemini.apiKey) {
  console.error('GEMINI_API_KEY is required in environment variables');
  process.exit(1);
}

module.exports = config;
