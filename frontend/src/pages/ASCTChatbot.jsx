import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Heart, Shield, Users, MessageCircle, Sparkles, Zap } from 'lucide-react';

const ASCTChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Welcome to ASCT Support! I'm here to help answer your questions about our mutual financial support system for advocate families. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/chatbot/chatbot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: inputText }),
      });

      const data = await response.json();
      
      const botMessage = {
        id: Date.now() + 1,
        text: data.response || "I'm here to help with ASCT-related queries. Could you please rephrase your question?",
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: "I apologize, but I'm having trouble connecting right now. Please try again or contact our support team directly.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden relative px-12 py-12 ">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20">
        <div className="absolute inset-0" style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(124, 58, 237, 0.15) 0%, transparent 50%)`
        }}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(124, 58, 237, 0.5); }
          50% { box-shadow: 0 0 40px rgba(124, 58, 237, 0.8); }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .message-enter { animation: slideUp 0.3s ease-out; }
        .glow-border { animation: glow 2s ease-in-out infinite; }
      `}</style>

      {/* Header */}
      <div className="relative z-10 border-b border-white/10 backdrop-blur-xl bg-black/30 rounded-xl">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl blur-lg opacity-75 glow-border"></div>
                <div className="relative bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl p-4 shadow-2xl">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  ASCT.AI
                </h1>
                <p className="text-gray-300 text-lg font-medium">AI support for your queries</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-300 text-sm font-medium">AI Online</span>
              </div>
              <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            { icon: Heart, title: 'Mutual Support', desc: 'ASCT helping families through mutual cooperation and support', color: 'from-red-500 to-pink-500' },
            { icon: Shield, title: 'Trust', desc: 'Building trust in the community through seemless features', color: 'from-green-500 to-emerald-500' },
            { icon: Users, title: 'Community Sahyog', desc: 'Encouraging coomunity sahyog for our people', color: 'from-blue-500 to-cyan-500' }
          ].map((card, i) => (
            <div key={i} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`bg-gradient-to-r ${card.color} rounded-2xl p-3 shadow-2xl`}>
                    <card.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{card.title}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">{card.desc}</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Interface */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-cyan-600/30 rounded-[2rem] blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
          <div className="relative bg-black/60 backdrop-blur-2xl border border-white/20 rounded-[2rem] overflow-hidden shadow-2xl">
            
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 backdrop-blur-xl border-b border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Bot className="w-8 h-8 text-cyan-400" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">ASCT Support AI</h3>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
                  <span className="text-yellow-400 text-sm font-medium">Thinking...</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[32rem] overflow-y-auto p-8 space-y-6 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-4 message-enter ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`relative flex-shrink-0 ${
                    message.sender === 'user' ? 'order-1' : 'order-0'
                  }`}>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-500'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-6 h-6 text-white" />
                      ) : (
                        <Bot className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl blur-lg opacity-50 animate-pulse"></div>
                  </div>
                  
                  <div className={`max-w-md lg:max-w-lg ${
                    message.sender === 'user' ? 'text-right' : 'text-left'
                  }`}>
                    <div className={`relative rounded-3xl px-6 py-4 shadow-2xl backdrop-blur-xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-600/80 to-cyan-600/80 text-white border border-blue-400/30'
                        : 'bg-black/60 text-gray-100 border border-white/20'
                    }`}>
                      <p className="leading-relaxed font-medium">{message.text}</p>
                      {message.sender === 'bot' && (
                        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce"></div>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-2 px-2 font-medium">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start space-x-4 message-enter">
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-50 animate-pulse"></div>
                  </div>
                  <div className="bg-black/60 backdrop-blur-xl rounded-3xl px-6 py-4 border border-white/20 shadow-2xl">
                    <div className="flex space-x-3">
                      {[0, 1, 2].map(i => (
                        <div
                          key={i}
                          className="w-3 h-3 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-white/10 bg-black/40 backdrop-blur-xl p-6">
              <div className="flex space-x-4">
                <div className="flex-1 relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-2xl blur group-focus-within:blur-lg transition-all duration-300"></div>
                  <textarea
                    ref={inputRef}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about ASCT services, powered by AI..."
                    className="relative w-full px-6 py-4 bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl focus:outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 resize-none transition-all duration-300 text-white placeholder-gray-400 font-medium"
                    rows="2"
                    disabled={isLoading}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400 font-medium">
                    Press Enter to send
                  </div>
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isLoading}
                  className="relative bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white p-4 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-purple-500/25 transform hover:scale-110 active:scale-95 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Send className="relative w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-3 bg-black/40 backdrop-blur-xl border border-white/20 rounded-full px-8 py-4">
            <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
            <p className="text-gray-300 font-medium">
              Responses powered by AI for quick assistance. Official guidelines available in Niyamawali section.
            </p>
            <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ASCTChatbot;