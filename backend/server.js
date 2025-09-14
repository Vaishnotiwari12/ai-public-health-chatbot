// 1. Import Dependencies
require('dotenv').config(); // Loads environment variables from .env file
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// 2. Initialize Express App and Gemini AI
const app = express();
const port = 3001; // Port for our backend server

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 3. Setup Middleware
app.use(cors({
  origin: 'http://localhost:4028',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use(express.json()); // Allow the server to understand JSON in request bodies

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// 4. Define the Chat API Endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { query } = req.body;
        if (!query) {
            return res.status(400).send('Query is required');
        }

        // Initialize the Gemini model
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-05-20" });

        // This is the System Prompt that guides the AI. It's crucial for safety and accuracy.
        const systemPrompt = `You are 'Aarogya Sahayak', a helpful and empathetic AI health assistant for rural communities in India, specifically near Churk, Uttar Pradesh (current date: ${new Date().toLocaleDateString('en-IN')}).
        - Your purpose is to provide clear, simple health information.
        - Respond in the same language as the user's query (simple Hindi or English).
        - CRITICAL SAFETY RULE: You are NOT a doctor. You MUST end every single response about symptoms or medical advice with a clear disclaimer: '**Disclaimer: This is not medical advice. Please consult a doctor at your nearest health center.**'`;

        // The magic function for streaming: generateContentStream
        const result = await model.generateContentStream({
            contents: [{ role: "user", parts: [{ text: query }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
        });

        // Set headers for a streaming response
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Transfer-Encoding', 'chunked');

        // Loop through the stream and send each chunk to the frontend
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            res.write(chunkText); // Send the chunk of text to the client
        }

        // End the response stream once Gemini is done
        res.end();

    } catch (error) {
        console.error("Error in /api/chat:", error);
        res.status(500).send("An error occurred while processing your request.");
    }
});

// 5. Start the Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
