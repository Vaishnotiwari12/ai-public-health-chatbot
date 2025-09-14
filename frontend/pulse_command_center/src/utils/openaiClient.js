import OpenAI from 'openai';

/**
 * OPENAI CLIENT CONFIGURATION
 * 
 * Centralized OpenAI API client for the Health Intelligence System.
 * Used by the AI chatbot for natural language processing.
 * 
 * SECURITY CONSIDERATIONS:
 * - API key stored in environment variables
 * - Client-side usage flagged for development (use backend proxy in production)
 * - Rate limiting should be implemented
 * 
 * PRODUCTION DEPLOYMENT:
 * - Move API calls to backend to secure API keys
 * - Implement request/response caching
 * - Add retry logic and error handling
 * - Monitor API usage and costs
 * 
 * SCALING CONSIDERATIONS:
 * - Implement connection pooling
 * - Add request queuing for high traffic
 * - Cache common responses
 * - Implement fallback models for high availability
 */

/**
 * Initialize OpenAI client with API key from environment variables
 * @returns {OpenAI} Configured OpenAI client instance
 */
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Required for client-side usage in React
});

/**
 * HEALTH INTELLIGENCE CHAT COMPLETION
 * 
 * Specialized chat completion function for health intelligence queries.
 * Supports multi-language responses and health domain context.
 * 
 * @param {string} userMessage - User's health intelligence query
 * @param {string} language - Response language ('en' or 'hi')
 * @param {Array} chatHistory - Previous conversation messages
 * @returns {Promise<Object>} AI response with content and confidence
 */
export async function getHealthIntelligenceResponse(userMessage, language = 'en', chatHistory = []) {
  try {
    // System prompt for health intelligence context
    const systemPrompt = language === 'hi' 
      ? `आप एक स्वास्थ्य बुद्धिमत्ता सहायक हैं। आप स्वास्थ्य डेटा, रुझान, अलर्ट और सिस्टम की स्थिति के बारे में सहायता प्रदान करते हैं। हमेशा सटीक, उपयोगी और स्पष्ट जानकारी दें।`
      : `You are a Health Intelligence Assistant. You help with health data, trends, alerts, and system status. Always provide accurate, helpful, and clear information.`;

    // Build messages array with conversation history
    const messages = [
      { role: 'system', content: systemPrompt },
      ...chatHistory?.slice(-10)?.map(msg => ({
        role: msg?.type === 'user' ? 'user' : 'assistant',
        content: msg?.content
      })),
      { role: 'user', content: userMessage }
    ];

    const response = await openai?.chat?.completions?.create({
      model: 'gpt-5-mini', // Using cost-effective model for chat
      messages,
      reasoning_effort: 'low', // Fast responses for chat
      verbosity: 'medium', // Balanced detail level
      max_completion_tokens: 500, // Reasonable limit for chat responses
    });

    return {
      content: response?.choices?.[0]?.message?.content,
      confidence: 0.9, // Mock confidence score
      usage: response?.usage
    };

  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    
    // Return fallback response based on language
    return {
      content: language === 'hi' ?'क्षमा करें, मुझे एक तकनीकी समस्या का सामना करना पड़ा। कृपया कुछ देर बाद पुनः प्रयास करें।' :'Sorry, I encountered a technical issue. Please try again in a moment.',
      confidence: 0.0,
      isError: true
    };
  }
}

/**
 * HEALTH DATA ANALYSIS
 * 
 * Analyze health data patterns and provide insights.
 * 
 * @param {Object} healthData - Health metrics and data points
 * @param {string} language - Analysis language
 * @returns {Promise<Object>} Analysis results and recommendations
 */
export async function analyzeHealthData(healthData, language = 'en') {
  try {
    const systemPrompt = language === 'hi'
      ? `आप एक स्वास्थ्य डेटा विश्लेषक हैं। दिए गए डेटा का विश्लेषण करें और मुख्य बिंदु, रुझान और सिफारिशें प्रदान करें।`
      : `You are a health data analyst. Analyze the provided data and provide key insights, trends, and recommendations.`;

    const response = await openai?.chat?.completions?.create({
      model: 'gpt-5',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Analyze this health data: ${JSON.stringify(healthData)}` }
      ],
      reasoning_effort: 'high', // Deep analysis for data insights
      verbosity: 'high', // Detailed analysis
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'health_analysis',
          schema: {
            type: 'object',
            properties: {
              summary: { type: 'string', description: 'Brief summary of findings' },
              key_insights: { 
                type: 'array', 
                items: { type: 'string' },
                description: 'List of key insights'
              },
              trends: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    metric: { type: 'string' },
                    direction: { type: 'string', enum: ['increasing', 'decreasing', 'stable'] },
                    significance: { type: 'string', enum: ['high', 'medium', 'low'] }
                  }
                }
              },
              recommendations: {
                type: 'array',
                items: { type: 'string' },
                description: 'Actionable recommendations'
              },
              risk_level: { type: 'string', enum: ['low', 'medium', 'high', 'critical'] }
            },
            required: ['summary', 'key_insights', 'recommendations', 'risk_level']
          }
        }
      }
    });

    return JSON.parse(response?.choices?.[0]?.message?.content);

  } catch (error) {
    console.error('Error analyzing health data:', error);
    return {
      summary: language === 'hi' ? 'डेटा विश्लेषण में त्रुटि' : 'Error in data analysis',
      key_insights: [],
      recommendations: [],
      risk_level: 'unknown',
      isError: true
    };
  }
}

export default openai;