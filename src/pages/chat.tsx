import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Brain } from 'lucide-react';

interface StatusWidget {
  label: string;
  current: number;
  total: number;
  color: string;
}

interface SystemStatus {
  label: string;
  value: number;
  total: number;
}

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([]);

  const statusWidgets: StatusWidget[] = [
    { label: 'Plants Identified', current: 2150, total: 10000, color: 'from-green-500 to-emerald-600' },
    { label: 'Chemicals Identified', current: 3500, total: 15000, color: 'from-blue-500 to-indigo-600' },
    { label: 'Protein Targets Identified', current: 1200, total: 5000, color: 'from-purple-500 to-violet-600' }
  ];

  const systemStatus: SystemStatus[] = [
    { label: 'Jobs Submitted', value: 42, total: 42 },
    { label: 'Jobs Completed', value: 27, total: 42 }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setMessages(prev => [...prev, { text: message, isUser: true }]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "I'm processing your request. Please wait while I analyze the data...", 
        isUser: false 
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#170056] via-[#410056] to-[#54366B] text-[#EAE3F5]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Visualization Area */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-[70%] bg-black/20 backdrop-blur-md rounded-xl p-6 border border-[#54366B] shadow-xl"
          >
            <div className="aspect-video bg-black/30 rounded-lg flex items-center justify-center">
              <p className="text-[#EAE3F5] text-lg">Visualization Area</p>
            </div>
          </motion.div>

          {/* Right Side - Chat Interface */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-[30%] flex flex-col bg-black/20 backdrop-blur-md rounded-xl border border-[#54366B] shadow-xl overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-black/30 p-4 flex items-center gap-3 border-b border-[#54366B]">
              <Brain className="w-6 h-6 text-[#EAE3F5]" />
              <h2 className="text-[#EAE3F5] font-bold">SLHAIF</h2>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto max-h-[500px] space-y-4 bg-black/10">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`
                    max-w-[80%] rounded-xl px-4 py-2 
                    ${msg.isUser ? 
                      'bg-[#54366B] text-[#EAE3F5]' : 
                      'bg-black/30 text-[#EAE3F5]'
                    }
                  `}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="bg-black/30 p-4 flex gap-2 border-t border-[#54366B]">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-black/20 rounded-lg px-4 py-2 text-[#EAE3F5] placeholder-[#EAE3F5]/50 focus:outline-none focus:ring-2 focus:ring-[#54366B] border border-[#54366B]"
              />
              <button
                type="submit"
                className="bg-[#54366B] p-2 rounded-lg text-[#EAE3F5] hover:bg-[#410056] transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          {/* Database Status */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className="text-[#EAE3F5] text-xl font-bold mb-4">Database Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {statusWidgets.map((widget, index) => (
                <motion.div
                  key={widget.label}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  className="relative bg-black/20 backdrop-blur-md rounded-xl p-4 border border-[#54366B]"
                >
                  <div className="w-32 h-32 mx-auto">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#54366B"
                        strokeWidth="8"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke={`url(#gradient-${index})`}
                        strokeWidth="8"
                        strokeDasharray={`${(widget.current / widget.total) * 283} 283`}
                        transform="rotate(-90 50 50)"
                      />
                      <defs>
                        <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" className={`stop-color-start ${widget.color}`} />
                          <stop offset="100%" className={`stop-color-end ${widget.color}`} />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-[#EAE3F5]">
                      <span className="text-2xl font-bold">{widget.current}</span>
                      <span className="text-sm">of {widget.total}+</span>
                    </div>
                  </div>
                  <p className="text-center text-[#EAE3F5] mt-2">{widget.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* System Status */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className="text-[#EAE3F5] text-xl font-bold mb-4">System Status</h3>
            <div className="space-y-4">
              {systemStatus.map((status, index) => (
                <motion.div
                  key={status.label}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-black/20 backdrop-blur-md rounded-lg p-4 border border-[#54366B]"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#EAE3F5]">{status.label}</span>
                    <span className="text-[#EAE3F5] font-bold">
                      {status.value} / {status.total}
                    </span>
                  </div>
                  <div className="h-2 bg-[#000A33]/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(status.value / status.total) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Chat; 