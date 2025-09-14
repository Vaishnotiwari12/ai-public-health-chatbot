import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

// Add styles for typing animation
const styles = `
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
  }
  
  .typing-dot {
    animation: bounce 1.4s infinite ease-in-out;
  }
`;

/**
 * AI CHATBOT COMPONENT
 * 
 * Multi-language AI assistant for health intelligence queries.
 * Supports English and Hindi with smart context understanding.
 * 
 * BACKEND INTEGRATION POINTS:
 * - OpenAI API for natural language processing
 * - Health data API for context-aware responses
 * - User session management for conversation history
 * - Analytics tracking for chatbot usage
 * 
 * SCALING CONSIDERATIONS:
 * - Implement conversation persistence
 * - Add typing indicators and better UX
 * - Integrate with health knowledge base
 * - Add voice input/output capabilities
 * - Implement conversation analytics
 * - Add multi-tenant support for different health organizations
 */
const AIChatbot = ({ currentLanguage = 'en' }) => {
  // UI State
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Chat State
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  
  // Refs for scroll management
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Multi-language Support
  const translations = {
    en: {
      title: 'Health AI Assistant',
      placeholder: 'Ask about health trends, alerts, or data...',
      send: 'Send',
      minimize: 'Minimize',
      maximize: 'Maximize',
      close: 'Close',
      thinking: 'AI is thinking...',
      error: 'Sorry, I encountered an error. Please try again.',
      welcome: 'Hello! I\'m your Health Intelligence Assistant. How can I help you today?',
      exampleQueries: [
        'What are the current health trends?',
        'Show me critical alerts',
        'Analyze health data patterns'
      ],
      voiceInput: 'Voice Input',
      clearChat: 'Clear Chat'
    },
    hi: {
      title: 'स्वास्थ्य एआई सहायक',
      placeholder: 'स्वास्थ्य रुझान, अलर्ट या डेटा के बारे में पूछें...',
      send: 'भेजें',
      minimize: 'छोटा करें',
      maximize: 'बड़ा करें',
      close: 'बंद करें',
      thinking: 'एआई सोच रहा है...',
      error: 'क्षमा करें, मुझे एक त्रुटि का सामना करना पड़ा। कृपया पुनः प्रयास करें।',
      welcome: 'नमस्ते! मैं आपका स्वास्थ्य बुद्धिमत्ता सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?',
      exampleQueries: [
        'वर्तमान स्वास्थ्य रुझान क्या हैं?',
        'महत्वपूर्ण अलर्ट दिखाएं',
        'स्वास्थ्य डेटा पैटर्न का विश्लेषण करें'
      ],
      voiceInput: 'वॉयस इनपुट',
      clearChat: 'चैट साफ़ करें'
    }
  };

  const t = translations?.[currentLanguage];
  const navigate = useNavigate();

  // Handle back navigation
  const handleBack = () => {
    navigate('/main-dashboard');
  };

  // Initialize conversation on first open
  useEffect(() => {
    if (isOpen && messages?.length === 0) {
      initializeConversation();
    }
  }, [isOpen]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize conversation with welcome message
  const initializeConversation = () => {
    const welcomeMessage = {
      id: Date.now(),
      type: 'assistant',
      content: t?.welcome,
      timestamp: new Date(),
      language: currentLanguage
    };

    setMessages([welcomeMessage]);
    
    // TODO: Create conversation session in backend
    // const sessionId = await createChatSession(currentLanguage);
    // setConversationId(sessionId);
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle sending messages to AI with streaming
  const handleSendMessage = async () => {
    if (!message?.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message?.trim(),
      timestamp: new Date(),
      language: currentLanguage
    };

    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    // Create a placeholder for the AI's response
    const aiMessageId = Date.now() + 1;
    setMessages(prev => [...prev, {
      id: aiMessageId,
      type: 'assistant',
      content: '',
      timestamp: new Date(),
      language: currentLanguage,
      isStreaming: true
    }]);

    try {
      // Prepare chat history for the API
      const chatHistory = messages
        .filter(m => m.type === 'user' || m.type === 'assistant')
        .map(m => ({
          role: m.type === 'user' ? 'user' : 'assistant',
          content: m.content
        }));

      // Call the streaming API
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/chat?${new URLSearchParams({
        message: message.trim(),
        chatHistory: JSON.stringify(chatHistory)
      })}`, {
        method: 'GET',
        headers: {
          'Accept': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error('ReadableStream not supported in this browser');
      }

      // Handle streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let fullResponse = '';

      const processStream = async () => {
        try {
          while (true) {
            const { done, value } = await reader.read();
            
            if (done) {
              // Update the final message without the streaming flag
              setMessages(prev => prev.map(msg => 
                msg.id === aiMessageId 
                  ? { ...msg, content: fullResponse, isStreaming: false }
                  : msg
              ));
              break;
            }

            // Process the stream
            const chunk = decoder.decode(value, { stream: true });
            buffer += chunk;

            // Process each line in the buffer
            const lines = buffer.split('\n\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6).trim();
                if (data === '[DONE]') {
                  // Update the final message without the streaming flag
                  setMessages(prev => prev.map(msg => 
                    msg.id === aiMessageId 
                      ? { ...msg, content: fullResponse, isStreaming: false }
                      : msg
                  ));
                  return;
                }

                try {
                  const parsed = JSON.parse(data);
                  if (parsed.content) {
                    fullResponse += parsed.content;
                    // Update the message with the new content
                    setMessages(prev => prev.map(msg => 
                      msg.id === aiMessageId 
                        ? { ...msg, content: fullResponse }
                        : msg
                    ));
                  }
                } catch (e) {
                  console.error('Error parsing SSE data:', e);
                }
              }
            }
          }
        } catch (error) {
          console.error('Error reading stream:', error);
          throw error;
        } finally {
          setIsLoading(false);
          scrollToBottom();
        }
      };

      // Start processing the stream
      processStream();
    } catch (error) {
      console.error('Error in streaming response:', error);
      // Update the message to show error state
      setMessages(prev => 
        prev.map(msg => 
          msg.id === aiMessageId 
            ? { 
                ...msg, 
                content: t?.error || 'Sorry, there was an error processing your request. Please try again.',
                isStreaming: false,
                isError: true
              }
            : msg
        )
      );
      toast.error(t?.error || 'Failed to get response from AI');
    } finally {
      setIsLoading(false);
    }
  };

  // AI Message Processing (Backend Integration Point)
  const sendMessageToAI = async (userMessage, language, chatHistory) => {
    // TODO: Implement actual OpenAI API integration
    // For now, return a mock response based on language
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock health intelligence responses based on keywords
    const lowerMessage = userMessage?.toLowerCase();
    
    if (lowerMessage?.includes('alert') || lowerMessage?.includes('अलर्ट')) {
      return {
        content: language === 'hi' ?'वर्तमान में 12 सक्रिय स्वास्थ्य अलर्ट हैं। 3 महत्वपूर्ण अलर्ट तत्काल ध्यान देने की आवश्यकता है।' :'There are currently 12 active health alerts. 3 critical alerts require immediate attention.',
        confidence: 0.95
      };
    }
    
    if (lowerMessage?.includes('trend') || lowerMessage?.includes('रुझान')) {
      return {
        content: language === 'hi' ?'स्वास्थ्य रुझान: पिछले 24 घंटों में 23% की वृद्धि के साथ 847 नागरिक प्रश्न। 2.4 मिलियन समुदाय संरक्षित।' :'Health trends: 847 citizen queries with 23% increase in last 24h. 2.4M communities protected.',
        confidence: 0.92
      };
    }

    if (lowerMessage?.includes('data') || lowerMessage?.includes('डेटा')) {
      return {
        content: language === 'hi' ?'सिस्टम स्वास्थ्य: 99.9% अपटाइम। वर्तमान में 47 जिलों में निगरानी सक्रिय। सभी प्रमुख संकेतक सामान्य सीमा में हैं।' :'System health: 99.9% uptime. Monitoring active across 47 districts. All key indicators within normal range.',
        confidence: 0.88
      };
    }

    // Default response
    return {
      content: language === 'hi' ?'मैं स्वास्थ्य डेटा, अलर्ट, रुझान और सिस्टम की स्थिति के बारे में जानकारी प्रदान कर सकता हूं। कृपया अधिक विशिष्ट प्रश्न पूछें।' :'I can provide information about health data, alerts, trends, and system status. Please ask more specific questions.',
      confidence: 0.8
    };
  };

  // Handle example query clicks
  const handleExampleClick = (exampleQuery) => {
    setMessage(exampleQuery);
  };

  // Toggle chat window
  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  // Close chat completely
  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSendMessage();
    }
  };

  // Format timestamp for messages
  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString(currentLanguage === 'hi' ? 'hi-IN' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) {
    return (
      // Floating Action Button
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary hover:bg-primary/90 shadow-medical-lg pulse-vital"
          data-chatbot-trigger
        >
          <Icon name="MessageCircle" size={24} className="text-white" />
        </Button>
      </div>
    );
  }

  const renderHeader = () => (
    <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
      <div className="flex items-center">
        <button 
          onClick={handleBack}
          className="mr-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Back to dashboard"
        >
          <Icon name="ArrowLeft" className="w-4 h-4 text-gray-600" />
        </button>
        <Icon name="MessageSquare" className="w-5 h-5 mr-2 text-blue-600" />
        <h3 className="font-medium text-gray-900">{t?.title}</h3>
      </div>
      <div className="flex items-center space-x-1">
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label={isMinimized ? t?.maximize : t?.minimize}
        >
          {isMinimized ? (
            <Icon name="Maximize2" size={16} />
          ) : (
            <Icon name="Minimize2" size={16} />
          )}
        </button>
        <button
          onClick={closeChat}
          className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label={t?.close}
        >
          <Icon name="X" size={16} />
        </button>
      </div>
    </div>
  );

  return (
    <>
      <style>{styles}</style>
      <div 
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 transition-all duration-300 ${
          isMinimized ? 'w-80 h-16' : 'w-80 sm:w-96 h-96 sm:h-[500px]'
        }`}
      >
        <div className="bg-white rounded-lg shadow-medical-lg border border-border overflow-hidden h-full flex flex-col">
          {renderHeader()}
          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50"
                style={{ maxHeight: 'calc(100% - 120px)' }}
              >
                {renderMessages()}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white text-slate-800 border p-3 rounded-lg shadow-sm">
                      <p className="text-sm">{t?.thinking}</p>
                      <div className="flex space-x-1 mt-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Example Queries (show when no messages) */}
                {messages?.length <= 1 && (
                  <div className="space-y-2">
                    <p className="text-xs text-slate-600 font-medium">Example queries:</p>
                    {t?.exampleQueries?.map((example, index) => (
                      <button
                        key={index}
                        onClick={() => handleExampleClick(example)}
                        className="block w-full text-left p-2 text-sm text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 rounded-md transition-colors"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white border-t">
                <div className="flex space-x-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e?.target?.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={t?.placeholder}
                    className="flex-1 text-sm"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!message?.trim() || isLoading}
                    className="px-3"
                    size="sm"
                  >
                    <Icon name="Send" size={16} />
                  </Button>
                  <Button
                    onClick={clearChat}
                    variant="outline"
                    size="sm"
                    className="px-3"
                    title={t?.clearChat}
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AIChatbot;