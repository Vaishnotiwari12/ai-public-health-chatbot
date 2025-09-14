import React, { useState, useRef, useEffect } from 'react';
import { 
  FiSend, 
  FiMic, 
  FiMicOff, 
  FiAlertCircle, 
  FiThermometer,
  FiHeart,
} from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import SymptomChecker from './components/SymptomChecker';
import { chatWithAI } from '../../services/api';

const HealthChatbot = () => {
  const [messages, setMessages] = useState([
    { text: 'Welcome to HealthBot! How can I help you today?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [activeTab, setActiveTab] = useState('symptoms'); // Default to symptoms tab
  const messagesEndRef = useRef(null);
  const { t, i18n } = useTranslation();
  
  // Quick actions for common health queries
  const quickActions = [
    { text: 'Check symptoms', icon: '🤒' },
    { text: 'Vaccine schedule', icon: '💉' },
    { text: 'Nearby hospitals', icon: '🏥' },
    { text: 'Emergency', icon: '🚑' }
  ];

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = input;
    // Add user message and clear input
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInput('');
    
    // Add loading message
    const loadingMessage = { text: '...', sender: 'bot', loading: true };
    setMessages(prev => [...prev, loadingMessage]);
    
    try {
      // Get chat history (excluding system messages and loading messages)
      const chatHistory = messages
        .filter(msg => msg.sender !== 'system' && !msg.loading)
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        }));
      
      // Call the API
      const response = await chatWithAI(userMessage, chatHistory);
      
      // Remove loading message and add bot response
      setMessages(prev => [
        ...prev.filter(msg => !msg.loading),
        { text: response.reply, sender: 'bot' }
      ]);
      
    } catch (error) {
      console.error('Error sending message:', error);
      // Remove loading message and show error
      setMessages(prev => [
        ...prev.filter(msg => !msg.loading),
        { 
          text: 'Sorry, I encountered an error. Please try again later.', 
          sender: 'bot',
          isError: true
        }
      ]);
    }
  };

  const handleQuickAction = (action) => {
    setInput(action);
    // Auto-send quick action
    setTimeout(() => handleSendMessage(), 100);
  };

  // Toggle voice input (UI only in this demo)
  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    console.log('Voice recognition', isListening ? 'stopped' : 'started');
  };

  const handleEmergencyCall = () => {
    // In a real app, this would trigger a call to emergency services
    window.open('tel:108');
  };

  // Open Google Maps with directions to the facility
  const openDirections = (facility) => {
    const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(facility.address)}&travelmode=driving`;
    window.open(mapUrl, '_blank');
  };

  // Sample healthcare facilities data
  const healthcareFacilities = [
    { id: 1, name: 'City General Hospital', distance: '1.2 km', waitTime: '15 min', address: 'City General Hospital, Main Street, City' },
    { id: 2, name: 'Community Health Center', distance: '2.5 km', waitTime: '30 min', address: 'Community Health Center, Park Avenue, City' },
    { id: 3, name: 'Urgent Care Clinic', distance: '3.1 km', waitTime: '45 min', address: 'Urgent Care Clinic, Oak Street, City' },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">HealthBot</h1>
          <div className="flex space-x-2">
            <button 
              onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'hi' : 'en')}
              className="px-3 py-1 bg-blue-700 rounded-full text-sm"
            >
              {i18n.language === 'en' ? 'हिंदी' : 'English'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden container mx-auto p-4 flex flex-col">
        {/* Tabs */}
        <div className="flex border-b mb-4 overflow-x-auto">
          {[
            { id: 'symptoms', icon: <FiThermometer className="mr-1" />, label: t('tabs.symptoms', 'Symptoms') },
            { id: 'chat', icon: <FiSend className="mr-1" />, label: t('tabs.chat', 'Chat') },
            { id: 'vaccines', icon: <FiThermometer className="mr-1" />, label: t('tabs.vaccines', 'Vaccines') },
            { id: 'hospitals', icon: <FiHeart className="mr-1" />, label: t('tabs.hospitals', 'Hospitals') },
          ].map(tab => (
            <button
              key={tab.id}
              className={`flex items-center px-4 py-2 whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'border-b-2 border-blue-500 text-blue-600 font-medium' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto mb-4">
          {activeTab === 'symptoms' && <SymptomChecker />}
          
          {activeTab === 'chat' && (
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                      msg.sender === 'user' 
                        ? 'bg-blue-500 text-white rounded-br-none' 
                        : 'bg-white text-gray-800 shadow rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}

          {activeTab === 'vaccines' && (
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-semibold mb-4">{t('vaccines.title', 'Vaccination Schedule')}</h2>
              <div className="space-y-4">
                {[
                  { name: 'COVID-19', due: 'As per government guidelines', status: 'Up to date' },
                  { name: 'Influenza', due: 'Annual', status: 'Due soon' },
                  { name: 'Tetanus', due: 'Every 10 years', status: 'Up to date' },
                ].map((vaccine, index) => (
                  <div key={index} className="p-3 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{vaccine.name}</h3>
                        <p className="text-sm text-gray-600">{t('vaccines.due', 'Due')}: {vaccine.due}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        vaccine.status === 'Up to date' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {vaccine.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'hospitals' && (
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-semibold mb-4">{t('hospitals.nearby', 'Nearby Healthcare Facilities')}</h2>
              <div className="space-y-4">
                {healthcareFacilities.map((facility) => (
                  <div key={facility.id} className="p-3 border-b border-gray-100">
                    <h3 className="font-medium">{facility.name}</h3>
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>{facility.distance} • {facility.waitTime} {t('hospitals.waitTime', 'wait time')}</span>
                      <button 
                        onClick={() => openDirections(facility)}
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        {t('hospitals.directions', 'Directions')}
                        <svg 
                          className="w-4 h-4 ml-1" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                          />
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action.text)}
              className="bg-white p-2 rounded-lg shadow text-center text-sm flex flex-col items-center"
            >
              <span className="text-xl mb-1">{action.icon}</span>
              <span>{action.text}</span>
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="flex items-center bg-white p-2 rounded-lg shadow">
          <button 
            onClick={toggleVoiceInput}
            className={`p-2 rounded-full ${isListening ? 'bg-blue-100 text-blue-500' : 'text-gray-500'}`}
          >
            {isListening ? <FiMicOff /> : <FiMic />}
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your health query..."
            className="flex-1 p-2 mx-2 outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-blue-500 text-white rounded-full"
          >
            <FiSend />
          </button>
        </div>
      </main>

      {/* Emergency Button - Positioned above input on mobile */}
      <button
        onClick={handleEmergencyCall}
        className="fixed right-4 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center transition-colors duration-200 z-10"
        style={{ bottom: '5.5rem', width: '3rem', height: '3rem' }}
        aria-label="Emergency Help"
      >
        <FiAlertCircle className="text-2xl" />
      </button>
    </div>
  );
};

export default HealthChatbot;
