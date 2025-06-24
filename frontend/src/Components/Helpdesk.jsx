import React, { useEffect, useRef, useState } from "react";
import InteractiveNeuralVortex from "./ui/InteractiveNeuralVortex";
import io from "socket.io-client";
import axios from "axios";
import { useSelector } from "react-redux";
import { ArrowLeft, Send, Headphones, MessageCircle, User, Bot, Zap, Circle, CheckCircle2, Clock, Wifi } from "lucide-react";
import { useNavigate } from "react-router-dom";

const socket = io(`${process.env.REACT_APP_ASCT_BASE_API_URL}`, {
  withCredentials: true,
});

const HelpDesk = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userDetails);
  const userId = user.mobile;
  const adminId = "admin";
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.emit("register", { userId });

    axios
      .get(`${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/helpdesk/messages/${userId}`)
      .then((res) => setMessages(res.data))
      .catch(() => setConnectionStatus('error'));

    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('connect', () => setConnectionStatus('connected'));
    socket.on('disconnect', () => setConnectionStatus('disconnected'));

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() === "") return;

    const newMessage = {
      from: userId,
      to: adminId,
      message: input.trim(),
    };

    socket.emit("send_message", newMessage);
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  const getConnectionIcon = () => {
    switch(connectionStatus) {
      case 'connected': return <CheckCircle2 className="w-3 h-3 text-emerald-400" />;
      case 'disconnected': return <Clock className="w-3 h-3 text-amber-400" />;
      default: return <Circle className="w-3 h-3 text-red-400" />;
    }
  };

  const getConnectionText = () => {
    switch(connectionStatus) {
      case 'connected': return 'Connected';
      case 'disconnected': return 'Reconnecting...';
      default: return 'Connection Error';
    }
  };

  return (
    <InteractiveNeuralVortex>
      {/* Floating geometric shapes */}
      {/* Modern Navigation */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          className="group flex items-center gap-3 px-4 py-3 bg-blue-500 backdrop-blur-xl rounded-2xl border border-gray-200/50 hover:bg-green-600 transition-all duration-300 hover:scale-125 shadow-lg hover:shadow-xl"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5 text-white group-hover:text-white transition-colors" />
          <span className="text-sm font-medium text-white hidden sm:block">Back</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="flex items-center justify-center p-4 pt-1">
        <div className="md:w-[74%] w-[90%] h-[85vh] relative">
          
          {/* Main Chat Interface */}
          <div className="h-full bg-transparent backdrop-blur-xl rounded-3xl border border-white/50 overflow-hidden flex flex-col">
            
            {/* Modern Header */}
            <div className="relative p-6 bg-gradient-to-r bg-transparent backdrop-blur-md text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Animated Support Icon */}
                  <div className="relative">
                    <div className="w-14 h-14 bg-transparent backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                      <Headphones className="w-7 h-7 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-white animate-pulse"></div>
                  </div>

                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">Support Center</h1>
                    <p className="text-gray-300 text-sm flex items-center gap-2 mt-1">
                      <Zap className="w-4 h-4 text-cyan-400" />
                      Real-time assistance
                    </p>
                  </div>
                </div>

                {/* Connection Status */}
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl border border-white/20">
                  {getConnectionIcon()}
                  <span className="text-xs font-medium">{getConnectionText()}</span>
                </div>
              </div>

              {/* Decorative line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400"></div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b bg-transparent backdrop-blur-xl">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  {/* Welcome Animation */}
                  <div className="relative mb-8">
                    <div className="w-28 h-28 bg-gradient-to-br from-cyan-100 to-blue-200 rounded-3xl flex items-center justify-center shadow-lg">
                      <MessageCircle className="w-14 h-14 text-gray-600" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/50 to-blue-300/50 rounded-3xl animate-ping opacity-75"></div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">How can we help you today?</h3>
                  <p className="text-gray-600 max-w-md leading-relaxed">
                    Our support team is ready to assist you. Start typing your message below to begin the conversation.
                  </p>
                  
                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-3 mt-8 w-full max-w-sm">
                    <div className="p-4 bg-transpaernt backdrop-blur-md rounded-2xl border border-gray-200/50 hover:bg-white/80 transition-all cursor-pointer group">
                      <div className="text-center">
                        <div className="w-8 h-8 bg-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                          <Zap className="w-4 h-4 text-cyan-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-700">Quick Help</p>
                      </div>
                    </div>
                    <div className="p-4 bg-transparent backdrop-blur-md rounded-2xl border border-gray-200/50 hover:bg-white/80 transition-all cursor-pointer group">
                      <div className="text-center">
                        <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                          <Wifi className="w-4 h-4 text-emerald-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-700">Technical</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-4 ${msg.from === userId ? "flex-row-reverse" : ""} opacity-0 animate-fadeInUp`}
                      style={{ animationDelay: `${idx * 150}ms`, animationFillMode: 'forwards' }}
                    >
                      {/* Avatar */}
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md ${
                        msg.from === userId 
                          ? "bg-gradient-to-br from-gray-600 to-gray-800" 
                          : "bg-gradient-to-br from-cyan-400 to-blue-500"
                      }`}>
                        {msg.from === userId ? 
                          <User className="w-5 h-5 text-white" /> : 
                          <Bot className="w-5 h-5 text-white" />
                        }
                      </div>

                      {/* Message Bubble */}
                      <div className="max-w-md">
                        <div
                          className={`px-5 py-3 rounded-2xl text-sm font-medium shadow-lg transition-all duration-300 hover:shadow-xl ${
                            msg.from === userId
                              ? "bg-gray-800 text-white rounded-br-md"
                              : "bg-white text-gray-800 border border-gray-200/50 rounded-bl-md"
                          }`}
                        >
                          {msg.message}
                        </div>
                        <div className={`text-xs text-gray-500 mt-1 px-1 ${msg.from === userId ? "text-right" : "text-left"}`}>
                          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Modern Input Area */}
            <div className="p-6 bg-transparent backdrop-blur-sm border-t border-gray-200/50">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Type your message here..."
                    className="w-full bg-white border border-gray-300/50 rounded-2xl px-6 py-4 pr-16 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 shadow-sm"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  />
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="absolute right-16 top-1/2 transform -translate-y-1/2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Send Button */}
                <button
                  onClick={sendMessage}
                  className="group relative p-4 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Send className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </div>

              {/* Status Bar */}
              <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
                <span>Press Enter to send your message</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span>Support team online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out;
        }
      `}</style>
    </InteractiveNeuralVortex>
  );
};

export default HelpDesk;