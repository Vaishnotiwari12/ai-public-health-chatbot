# AI Public Health Chatbot

A healthcare-focused chatbot application that provides medical information and assistance.

## Features
- Interactive chat interface
- AI-powered responses
- Health information lookup
- User-friendly interface

## Tech Stack
- Frontend: React, Vite, TailwindCSS
- Backend: Node.js, Express
- AI: Google Generative AI

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Google Generative AI API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Vaishnotiwari12/ai-public-health-chatbot.git
   cd ai-public-health-chatbot
   ```

2. Set up the backend:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Update .env with your API keys
   ```

3. Set up the frontend:
   ```bash
   cd ../frontend/pulse_command_center
   npm install
   cp .env.example .env
   # Update .env with your API keys
   ```

### Running Locally

1. Start the backend:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend:
   ```bash
   cd frontend/pulse_command_center
   npm run dev
   ```

## Deployment

### Frontend (Vercel)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2FVaishnotiwari12%2Fai-public-health-chatbot&project-name=ai-health-chatbot&repository-name=ai-public-health-chatbot)

### Backend (Railway)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%2FRailwayStarter%2Fnode-express&envs=PORT%2CGEMINI_API_KEY&PORTDesc=Port+to+listen+on&GEMINI_API_KEYDesc=Google+Generative+AI+API+Key)

## Environment Variables

### Backend
Create a `.env` file in the `backend` directory with the following variables:
```
PORT=3000
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=development
```

### Frontend
Create a `.env` file in the `frontend/pulse_command_center` directory with:
```
VITE_API_URL=http://localhost:3000
VITE_GEMINI_API_KEY=your_gemini_api_key
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
