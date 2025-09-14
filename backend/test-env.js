const path = require('path');
console.log('Current working directory:', process.cwd());
console.log('__dirname:', __dirname);
console.log('Attempting to load config.env from:', path.resolve('../../config.env'));

// Try to load the config file
try {
  require('dotenv').config({ path: path.resolve('../../config.env') });
  console.log('Environment variables loaded successfully');
  console.log('GEMINI_API_KEY exists:', !!process.env.GEMINI_API_KEY);
} catch (error) {
  console.error('Error loading .env file:', error);
}
