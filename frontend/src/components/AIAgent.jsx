// src/components/AIAgent.jsx
import React, { useState } from 'react';
import './AIAgent.css';

export default function AIAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (inputText.trim()) {
      // Add user message
      setMessages(prev => [...prev, { text: inputText, isUser: true }]);
      
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [
          ...prev, 
          { 
            text: "This is a sample AI response. Real AI integration will be added later.", 
            isUser: false 
          }
        ]);
      }, 1000);

      setInputText('');
    }
  };

  return (
    <div className={`ai-agent ${isOpen ? 'open' : ''}`}>
      <button 
        className="ai-toggle-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="ai-icon" viewBox="0 0 24 24">
          <path d="M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-8 11H8v-2h4v2zm0-4H8v-2h4v2zm1-9c0-.55.45-1 1-1s1 .45 1 1h-2zm-6 0c0-.55.45-1 1-1s1 .45 1 1H7z"/>
        </svg>


      </button>

      {isOpen && (
        <div className="ai-chat-window">
          <div className="chat-header">
            <h3>DataNarrates AI Assistant</h3>
            <button 
              className="close-button"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div 
                key={index}
                className={`message ${msg.isUser ? 'user' : 'ai'}`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about your data..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button 
              className="send-button"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
