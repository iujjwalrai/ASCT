import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Bot, Sparkles, Zap } from 'lucide-react';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [pulseAnimation, setPulseAnimation] = useState(true);

  useEffect(() => {
    // Add pulse animation every 10 seconds to grab attention
    const interval = setInterval(() => {
      setPulseAnimation(true);
      setTimeout(() => setPulseAnimation(false), 2000);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleChatbotClick = () => {
    window.location.href = '/chatbot';
  };

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  if (!isVisible) return null;

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(124, 58, 237, 0.6); }
          50% { box-shadow: 0 0 40px rgba(124, 58, 237, 1); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideDown {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(100%); opacity: 0; }
        }
        .float-animation { animation: float 3s ease-in-out infinite; }
        .pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .slide-up { animation: slideUp 0.3s ease-out; }
        .slide-down { animation: slideDown 0.3s ease-in; }
      `}</style>

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Expanded Widget */}
        {isOpen && (
          <div className="mb-4 slide-up">
            <div className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-80 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">ASCT.AI</h3>
                    <p className="text-gray-300 text-sm">Support Assistant</p>
                  </div>
                </div>
                <button
                  onClick={toggleWidget}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    <span className="text-white font-medium text-sm">Quick Support</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Get instant AI-powered assistance for ASCT services, donations, and support queries.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-900/50 to-blue-900/50 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="w-4 h-4 text-green-400" />
                    <span className="text-white font-medium text-sm">24/7 Available</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Our AI assistant is always ready to help advocate families with their needs.
                  </p>
                </div>

                <button
                  onClick={handleChatbotClick}
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Start Chatting
                </button>

                <p className="text-xs text-gray-400 text-center">
                  AI responses for instant support. Official rules in Niyamawali section.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Floating Button */}
        <div className="relative">
          {/* Attention Ring */}
          {pulseAnimation && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 pulse-glow"></div>
          )}
          
          {/* Main Button */}
          <button
            onClick={toggleWidget}
            className={`relative bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
              pulseAnimation ? 'float-animation' : ''
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full blur-lg opacity-75"></div>
            <div className="relative">
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <MessageCircle className="w-6 h-6" />
              )}
            </div>
          </button>

          {/* Notification Badge */}
          {!isOpen && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce">
              AI
            </div>
          )}
        </div>

        {/* Quick Access Tooltip */}
        {!isOpen && (
          <div className="absolute bottom-full right-0 mb-2 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-black/90 backdrop-blur-xl text-white text-sm px-3 py-2 rounded-lg border border-white/20 whitespace-nowrap">
              Need help? Chat with ASCT.AI
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatbotWidget;