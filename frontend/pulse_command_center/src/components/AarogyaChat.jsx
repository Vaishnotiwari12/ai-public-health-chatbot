import React, { useState, useRef, useEffect } from 'react';

const ChatMessage = ({ message }) => {
  const isBot = message.sender === 'bot';
  return (
    <div style={{ display: 'flex', justifyContent: isBot ? 'flex-start' : 'flex-end', margin: '8px' }}>
      <div style={{
        background: isBot ? '#f0f0f0' : '#007bff',
        color: isBot ? '#000' : '#fff',
        padding: '10px 15px',
        borderRadius: '15px',
        maxWidth: '70%',
      }}>
        {message.text}
      </div>
    </div>
  );
};

export default function AarogyaChat() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! I am Aarogya Sahayak, your AI health assistant for Churk. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message to chat
    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Create a placeholder for the bot's response
      const botMessage = { sender: 'bot', text: '' };
      setMessages(prev => [...prev, botMessage]);

      // Get the reader from the response body
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: streamDone } = await reader.read();
        done = streamDone;
        
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          
          // Update the last message (bot's message) with the new chunk
          setMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            lastMessage.text += chunk;
            return [...newMessages];
          });
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: 'Sorry, I encountered an error. Please try again later.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      maxWidth: '800px', 
      margin: '0 auto',
      border: '1px solid #ddd',
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{ 
        background: '#007bff', 
        color: 'white', 
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{ margin: 0 }}>Aarogya Sahayak</h2>
        <div style={{ fontSize: '0.9em', opacity: 0.8 }}>Your Health Assistant</div>
      </div>

      {/* Messages */}
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        padding: '20px',
        background: '#f9f9f9'
      }}>
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {isLoading && messages[messages.length - 1].sender === 'user' && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '8px' }}>
            <div style={{ 
              background: '#f0f0f0', 
              color: '#000', 
              padding: '10px 15px', 
              borderRadius: '15px',
              display: 'flex',
              gap: '5px'
            }}>
              <div style={{ 
                width: '8px', 
                height: '8px', 
                borderRadius: '50%', 
                background: '#666',
                animation: 'bounce 1s infinite',
                animationDelay: '0ms'
              }}></div>
              <div style={{ 
                width: '8px', 
                height: '8px', 
                borderRadius: '50%', 
                background: '#666',
                animation: 'bounce 1s infinite',
                animationDelay: '150ms'
              }}></div>
              <div style={{ 
                width: '8px', 
                height: '8px', 
                borderRadius: '50%', 
                background: '#666',
                animation: 'bounce 1s infinite',
                animationDelay: '300ms'
              }}></div>
              <style>{
                `@keyframes bounce {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-5px); }
                }`
              }</style>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} style={{ 
        padding: '15px', 
        background: '#fff',
        borderTop: '1px solid #eee',
        display: 'flex',
        gap: '10px'
      }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about health in Churk..."
          style={{ 
            flex: 1, 
            padding: '12px 15px',
            borderRadius: '25px',
            border: '1px solid #ddd',
            outline: 'none',
            fontSize: '16px',
            transition: 'border-color 0.3s',
            ':focus': {
              borderColor: '#007bff'
            }
          }}
          disabled={isLoading}
        />
        <button 
          type="submit" 
          style={{ 
            padding: '0 25px',
            borderRadius: '25px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'background 0.3s',
            ':hover': {
              background: '#0056b3'
            },
            ':disabled': {
              background: '#cccccc',
              cursor: 'not-allowed'
            }
          }}
          disabled={!input.trim() || isLoading}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
