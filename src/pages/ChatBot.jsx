import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot, Sparkles, RefreshCw } from 'lucide-react';

const ThreeDotsIcon = ({ size = 32, color = '#ffffff' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className="dm-launcher-icon"
  >
    <circle cx="5" cy="12" r="2.6" fill={color} />
    <circle cx="12" cy="12" r="2.6" fill={color} />
    <circle cx="19" cy="12" r="2.6" fill={color} />
  </svg>
);
import '../assets/css/chatbot.css';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Greetings! I am the Data Marketics Intelligence Assistant. How can I help you accelerate your B2B growth today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recentShown, setRecentShown] = useState([]); // Ring buffer for dedup
  const [suggestions, setSuggestions] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);

  const messagesEndRef = useRef(null);

  // Tooltip shows after a brief delay when the chat is closed, then auto-hides
  useEffect(() => {
    if (!isOpen) {
      const showTimer = setTimeout(() => setShowTooltip(true), 1500);
      const hideTimer = setTimeout(() => setShowTooltip(false), 7500);
      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    } else {
      setShowTooltip(false);
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e, forcedQuery = null) => {
    if (e) e.preventDefault();
    const query = forcedQuery || input;
    if (!query.trim() || isLoading) return;

    const userMessage = { role: 'user', content: query };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setSuggestions([]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMessage],
          exclude: recentShown 
        }),
      });

      if (!response.ok) throw new Error('Failed to connect');

      const data = await response.json();
      
      // Update ring buffer with the matched question if confident
      if (data.matches && data.matches.length > 0) {
        const topMatch = data.matches[0].question;
        setRecentShown(prev => {
          const next = [topMatch, ...prev.filter(p => p !== topMatch)];
          return next.slice(0, 3);
        });

        // Set suggestions from other matches
        if (data.matches.length > 1) {
          setSuggestions(data.matches.slice(1).map(m => m.question));
        }
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch (err) {
      console.error("Chat Error:", err);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having a bit of trouble connecting to my database. Please try again or contact support@datamarketics.com." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (q) => {
    handleSubmit(null, q);
  };

  const resetChat = () => {
    setMessages([{ role: 'assistant', content: 'Fresh start! How can I help you now?' }]);
    setRecentShown([]);
    setSuggestions([]);
  };

  const formatMessage = (content) => {
    if (!content) return null;
    return content.split('\n').map((line, index) => {
      let formattedLine = line.trim();
      if (!formattedLine) return <div key={index} className="dm-line-break" />;
      
      const isBullet = /^[*-]\s/.test(formattedLine);
      if (isBullet) formattedLine = formattedLine.replace(/^[*-]\s+/, '');

      const parts = formattedLine.split(/(\*\*.*?\*\*)/g);
      const renderedLine = parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
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

  return (
    <div className="dm-chatbot-root">
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { duration: 0.3 }
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="dm-chat-tooltip"
            onClick={() => setShowTooltip(false)}
            role="button"
            aria-label="Dismiss greeting"
          >
            <div className="dm-tooltip-content">
               Hi! How can I help you today?
               <button
                 type="button"
                 className="dm-tooltip-close"
                 onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
                 aria-label="Close greeting"
               >
                 <X size={12} strokeWidth={2.8} />
               </button>
               <motion.div
                 animate={{ opacity: [0.4, 1, 0.4] }}
                 transition={{ repeat: Infinity, duration: 2 }}
                 className="dm-tooltip-pulse"
               />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`dm-launcher ${isOpen ? 'open' : ''}`}
        onClick={toggleChat}
      >
        {isOpen ? <X size={28} /> : <Bot size={32} strokeWidth={2.2} className="dm-launcher-icon" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="dm-chatbox show"
          >
            <div className="dm-header">
              <div className="dm-header-bot">
                <div className="dm-bot-avatar">
                   <Bot size={28} strokeWidth={2.2} />
                   <div className="dm-online-indicator" />
                </div>
              </div>
              <div className="dm-header-text">
                <strong>Data Marketics AI</strong>
                <span>Data Marketics Intelligence Assistant</span>
              </div>
              <div className="dm-header-actions">
                <button onClick={resetChat} title="Reset Chat" className="dm-header-btn">
                  <RefreshCw size={16} />
                </button>
                <button onClick={() => setIsOpen(false)} className="dm-header-btn">
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="dm-messages">
              {messages.map((m, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={index}
                  className={`dm-msg ${m.role === 'user' ? 'u' : 'a'}`}
                >
                  <div className="dm-bubble">
                    {formatMessage(m.content)}
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <div className="dm-msg a">
                  <div className="dm-bubble dm-typing">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              )}

              {suggestions.length > 0 && !isLoading && (
                <div className="dm-suggestions">
                   <p className="dm-suggestion-label"><Sparkles size={12} /> Related questions:</p>
                   <div className="dm-suggestion-list">
                     {suggestions.map((s, i) => (
                       <button key={i} onClick={() => handleSuggestionClick(s)} className="dm-suggestion-item">
                         {s}
                       </button>
                     ))}
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="dm-input-row">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our data services..."
                disabled={isLoading}
              />
              <button type="submit" disabled={!input.trim() || isLoading} className="dm-send-btn">
                <Send size={18} />
              </button>
            </form>
            <div className="dm-footer-brand">
              Powered by Data Marketics
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

