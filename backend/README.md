# AI Public Health Chatbot - Backend

A Node.js + Express.js backend that integrates with Google's Gemini AI to power a public health chatbot. This service handles user queries and returns AI-generated responses with a focus on public health information.

## Features

- RESTful API endpoint for chat interactions
- Integration with Google's Gemini AI
- Input validation and error handling
- Environment-based configuration
- CORS support
- Health check endpoint
- Request logging
- Rate limiting (to be implemented)

## Prerequisites

- Node.js (v16 or higher)
- npm (comes with Node.js)
- Google Gemini API key

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd ai-public-health-chatbot/backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your Google Gemini API key and other configurations:
   ```env
   # Google Gemini API Configuration
   GEMINI_API_KEY=your_gemini_api_key_here
   
   # Server Configuration
   PORT=3000
   NODE_ENV=development
   
   # CORS Configuration
   ALLOWED_ORIGINS=http://localhost:3001
   ```

### 4. Start the development server

```bash
npm run dev
```

The server will start on `http://localhost:3000` by default.

## API Endpoints

### POST /api/chat

Send a message to the AI and get a response.

**Request Body:**
```json
{
  "message": "What are the symptoms of COVID-19?",
  "chatHistory": [
    {
      "role": "user",
      "content": "Hello, I have some health questions."
    },
    {
      "role": "model",
      "content": "Hello! I'm here to help with your health questions. What would you like to know?"
    }
  ]
}
```

**Response:**
```json
{
  "reply": "Common symptoms of COVID-19 include fever, cough, and difficulty breathing. More severe cases can lead to pneumonia, severe acute respiratory syndrome, and even death. If you're experiencing severe symptoms, please seek medical attention immediately.",
  "timestamp": "2025-09-14T01:28:38.000Z"
}
```

### GET /health

Check if the API is running.

**Response:**
```json
{
  "status": "UP",
  "timestamp": "2025-09-14T01:28:38.000Z"
}
```

## Project Structure

```
backend/
├── src/
│   ├── config/        # Configuration files
│   ├── controllers/   # Route controllers
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   └── utils/         # Helper functions
├── .env               # Environment variables
├── .env.example       # Example environment variables
├── app.js            # Main application file
└── package.json      # Project dependencies
```

## Error Handling

The API returns appropriate HTTP status codes and error messages in the following format:

```json
{
  "error": {
    "message": "Detailed error message",
    "stack": "Error stack trace (only in development)"
  }
}
```

## Security

- Input validation is implemented using express-validator
- Environment variables are used for sensitive information
- CORS is configured to only allow requests from specified origins
- API key is required for all requests

## Testing

To run tests:

```bash
npm test
```

## Deployment

1. Set `NODE_ENV=production` in your environment variables
2. Install production dependencies:
   ```bash
   npm install --production
   ```
3. Start the server:
   ```bash
   npm start
   ```

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
