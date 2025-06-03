import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, ArrowLeft } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface SystemStats {
  plants: { total: number; identified: number };
  chemicals: { total: number; identified: number };
  proteins: { total: number; identified: number };
  jobs: { submitted: number; completed: number };
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  
  // Example system stats
  const systemStats: SystemStats = {
    plants: { total: 500000, identified: 1200 },
    chemicals: { total: 1000000, identified: 5000 },
    proteins: { total: 200000, identified: 3000 },
    jobs: { submitted: 150, completed: 142 }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#170056] via-[#410056] to-[#54366B]">
      {/* Header */}
      <header className="bg-[#000A33]/80 backdrop-blur-sm border-b border-[#EAE3F5]/20 p-4">
        <div className="container mx-auto flex items-center">
          <button 
            onClick={() => window.history.back()}
            className="text-[#EAE3F5] hover:text-white transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-[#EAE3F5] text-xl font-bold ml-4">SLHAIF Chat Interface</h1>
        </div>
      </header>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Visualization Window */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Window */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-[#EAE3F5]/20 h-[600px] p-4">
              <div className="text-[#EAE3F5] text-center">
                Visualization Window
              </div>
            </div>

            {/* Database Stats */}
            <div className="grid grid-cols-3 gap-4">
              {/* Plants Stats */}
              <div className="relative bg-white/10 backdrop-blur-sm rounded-xl border border-[#EAE3F5]/20 p-4">
                <div className="text-[#EAE3F5] text-center">
                  <div className="text-sm opacity-80">Sri Lankan Plants</div>
                  <div className="text-2xl font-bold">{systemStats.plants.identified}</div>
                  <div className="text-xs opacity-60">out of {systemStats.plants.total}</div>
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#EAE3F5"
                      strokeWidth="2"
                      strokeOpacity="0.2"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#EAE3F5"
                      strokeWidth="2"
                      strokeDasharray={`${(systemStats.plants.identified / systemStats.plants.total) * 283} 283`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                </div>
              </div>

              {/* Chemicals Stats */}
              <div className="relative bg-white/10 backdrop-blur-sm rounded-xl border border-[#EAE3F5]/20 p-4">
                <div className="text-[#EAE3F5] text-center">
                  <div className="text-sm opacity-80">Chemicals</div>
                  <div className="text-2xl font-bold">{systemStats.chemicals.identified}</div>
                  <div className="text-xs opacity-60">out of {systemStats.chemicals.total}</div>
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#EAE3F5"
                      strokeWidth="2"
                      strokeOpacity="0.2"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#EAE3F5"
                      strokeWidth="2"
                      strokeDasharray={`${(systemStats.chemicals.identified / systemStats.chemicals.total) * 283} 283`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                </div>
              </div>

              {/* Proteins Stats */}
              <div className="relative bg-white/10 backdrop-blur-sm rounded-xl border border-[#EAE3F5]/20 p-4">
                <div className="text-[#EAE3F5] text-center">
                  <div className="text-sm opacity-80">Protein Targets</div>
                  <div className="text-2xl font-bold">{systemStats.proteins.identified}</div>
                  <div className="text-xs opacity-60">out of {systemStats.proteins.total}</div>
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#EAE3F5"
                      strokeWidth="2"
                      strokeOpacity="0.2"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#EAE3F5"
                      strokeWidth="2"
                      strokeDasharray={`${(systemStats.proteins.identified / systemStats.proteins.total) * 283} 283`}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Chat Interface */}
          <div className="space-y-6">
            {/* Chat Window */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-[#EAE3F5]/20 h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-[#EAE3F5]/20">
                <h2 className="text-[#EAE3F5] font-bold">SLHAIF</h2>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-[#410056] text-white'
                          : 'bg-white/10 text-[#EAE3F5]'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-[#EAE3F5]/20">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-white/10 text-[#EAE3F5] placeholder-[#EAE3F5]/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#54366B]"
                  />
                  <button
                    type="submit"
                    className="bg-[#410056] text-white p-2 rounded-lg hover:bg-[#54366B] transition-colors"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </div>

            {/* System Status */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-[#EAE3F5]/20 p-4">
              <h3 className="text-[#EAE3F5] font-bold mb-4">System Status</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-[#EAE3F5]">
                  <span>Jobs Submitted:</span>
                  <span>{systemStats.jobs.submitted}</span>
                </div>
                <div className="flex justify-between text-[#EAE3F5]">
                  <span>Jobs Completed:</span>
                  <span>{systemStats.jobs.completed}</span>
                </div>
                <div className="w-full bg-[#EAE3F5]/20 rounded-full h-2 mt-2">
                  <div
                    className="bg-[#410056] h-2 rounded-full"
                    style={{
                      width: `${(systemStats.jobs.completed / systemStats.jobs.submitted) * 100}%`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage; 