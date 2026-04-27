import React, { useState, useEffect, useRef } from 'react';
import '../assets/css/chatbot.css';

import chatbotIcon from '../assets/img/customer-service-support-svgrepo-com.svg';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hey! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto-open logic
  useEffect(() => {
    const hasBeenOpened = sessionStorage.getItem('dm_chatbot_auto_opened');

    if (!hasBeenOpened) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('dm_chatbot_auto_opened', 'true');
      }, 1500); // Wait 1.5 seconds after load
      return () => clearTimeout(timer);
    }
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error('Failed to connect to AI');

      // Setup for streaming
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';

      // Add a placeholder message for the assistant
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        assistantContent += chunk;

        // Update the last message (the assistant's) with the new chunk
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: assistantContent };
          return updated;
        });
      }
    } catch (err) {
      console.error("Chat Error:", err);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting to the brain. Please check the server." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessage = (content) => {
    if (!content) return null;
    
    // Split content into lines to handle bullets and line breaks
    return content.split('\n').map((line, index) => {
      let formattedLine = line.trim();
      if (!formattedLine) return <div key={index} className="dm-line-break" />;

      // Handle bullets: * or - 
      const isBullet = /^[*-]\s/.test(formattedLine);
      if (isBullet) {
        formattedLine = formattedLine.replace(/^[*-]\s+/, '');
      }

      // Convert **text** to <strong>text</strong> and strip any stray single *
      const parts = formattedLine.split(/(\*\*.*?\*\*)/g);
      const renderedLine = parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        // Remove stray asterisks from non-bold parts
        return part.replace(/\*/g, '');
      });

      return (
        <div key={index} className={isBullet ? 'dm-li' : 'dm-line'}>
          {isBullet && <span className="dm-bullet-point">•</span>}
          <span className="dm-text-part">{renderedLine}</span>
        </div>
      );
    });
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="dm-chatbot-root">
      {/* Toggle */}
      <button
        type="button"
        className={`dm-launcher ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
          <img src={chatbotIcon} alt="Chatbot Icon" className="dm-launcher-icon" />
        )}
      </button>

      {/* Window */}
      <div className={`dm-chatbox ${isOpen ? 'show' : ''}`}>
        <div className="dm-header">
          <div className="dm-header-bot">
            <img src={chatbotIcon} alt="Bot" />
          </div>
          <div className="dm-header-text">
            <strong>DataMarketics Intelligence</strong>
            <span>Online support</span>
          </div>
          <button type="button" className="dm-close" onClick={() => setIsOpen(false)}>×</button>
        </div>

        <div className="dm-messages">
          {messages.length === 0 ? (
            <div className="dm-empty">
              <div className="dm-empty-bot">
                <img src={chatbotIcon} alt="Bot Logo" />
              </div>
              <p>Welcome! How can I assist you with Data Intelligence today?</p>
            </div>
          ) : (
            messages.map((m, index) => (
              <div key={index} className={`dm-msg ${m.role === 'user' ? 'u' : 'a'}`}>
                <div className="dm-bubble">{formatMessage(m.content)}</div>
              </div>
            ))
          )}
          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <div className="dm-msg a">
              <div className="dm-bubble dm-typing">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="dm-input-row">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your question..."
            disabled={isLoading}
          />
          <button type="submit" disabled={!input.trim() || isLoading}>Send</button>
        </form>
      </div>
    </div>
  );
}
