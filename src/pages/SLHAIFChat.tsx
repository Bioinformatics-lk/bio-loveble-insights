import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface SystemStats {
  plantsIdentified: number;
  totalPlants: number;
  chemicalsIdentified: number;
  totalChemicals: number;
  proteinsIdentified: number;
  totalProteins: number;
  jobsSubmitted: number;
  jobsRunning: number;
  jobsCompleted: number;
}

const SLHAIFChat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock system stats
  const systemStats: SystemStats = {
    plantsIdentified: 350,
    totalPlants: 8000,
    chemicalsIdentified: 1200,
    totalChemicals: 5000,
    proteinsIdentified: 800,
    totalProteins: 2000,
    jobsSubmitted: 125,
    jobsRunning: 3,
    jobsCompleted: 122
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsProcessing(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm analyzing your request about Sri Lankan herbal medicine. This is a simulated response for the SLHAIF system. In a real implementation, this would be connected to our comprehensive database of 8,000+ medicinal plants and their compounds.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000A33] to-[#363B6B] text-white">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/slhaif')}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              SLHAIF Chat Interface
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - AI Response Viewer */}
          <div className="bg-[#170056]/20 backdrop-blur-sm rounded-xl border border-purple-400/20 shadow-xl p-6 min-h-[600px] flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-purple-400/20 scrollbar-track-transparent pr-4">
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl ${
                    message.sender === 'user' 
                      ? 'bg-[#54366B] ml-auto' 
                      : 'bg-[#363B6B] mr-auto'
                  } max-w-[80%] shadow-lg`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <span className="text-xs text-white/50 mt-2 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about Sri Lankan herbal medicine..."
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-purple-400/20 focus:border-purple-400/40 focus:ring-2 focus:ring-purple-400/20 transition-all placeholder-white/50"
                  disabled={isProcessing}
                />
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg ${
                    isProcessing 
                      ? 'bg-purple-400/20 cursor-not-allowed' 
                      : 'bg-purple-400/40 hover:bg-purple-400/60'
                  } transition-colors`}
                >
                  {isProcessing ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Side - System Dashboard */}
          <div className="space-y-8">
            {/* Database Stats */}
            <div className="bg-[#170056]/20 backdrop-blur-sm rounded-xl border border-purple-400/20 shadow-xl p-6">
              <h2 className="text-xl font-bold mb-6">Database Statistics</h2>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-2">
                    <CircularProgressbar
                      value={(systemStats.plantsIdentified / systemStats.totalPlants) * 100}
                      text={`${systemStats.plantsIdentified}`}
                      styles={buildStyles({
                        textColor: '#fff',
                        pathColor: '#9333ea',
                        trailColor: 'rgba(255,255,255,0.1)',
                        textSize: '22px'
                      })}
                    />
                  </div>
                  <p className="text-sm text-white/70">Sri Lankan Plants</p>
                  <p className="text-xs text-white/50">of {systemStats.totalPlants} total</p>
                </div>

                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-2">
                    <CircularProgressbar
                      value={(systemStats.chemicalsIdentified / systemStats.totalChemicals) * 100}
                      text={`${systemStats.chemicalsIdentified}`}
                      styles={buildStyles({
                        textColor: '#fff',
                        pathColor: '#e879f9',
                        trailColor: 'rgba(255,255,255,0.1)',
                        textSize: '22px'
                      })}
                    />
                  </div>
                  <p className="text-sm text-white/70">Chemicals Identified</p>
                  <p className="text-xs text-white/50">of {systemStats.totalChemicals} total</p>
                </div>

                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-2">
                    <CircularProgressbar
                      value={(systemStats.proteinsIdentified / systemStats.totalProteins) * 100}
                      text={`${systemStats.proteinsIdentified}`}
                      styles={buildStyles({
                        textColor: '#fff',
                        pathColor: '#c084fc',
                        trailColor: 'rgba(255,255,255,0.1)',
                        textSize: '22px'
                      })}
                    />
                  </div>
                  <p className="text-sm text-white/70">Proteins Mapped</p>
                  <p className="text-xs text-white/50">of {systemStats.totalProteins} total</p>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-[#170056]/20 backdrop-blur-sm rounded-xl border border-purple-400/20 shadow-xl p-6">
              <h2 className="text-xl font-bold mb-6">System Status</h2>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-2">
                    <CircularProgressbarWithChildren
                      value={100}
                      styles={buildStyles({
                        pathColor: '#22c55e',
                        trailColor: 'rgba(255,255,255,0.1)'
                      })}
                    >
                      <div className="text-2xl font-bold">{systemStats.jobsSubmitted}</div>
                    </CircularProgressbarWithChildren>
                  </div>
                  <p className="text-sm text-white/70">Jobs Submitted</p>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-2">
                    <CircularProgressbarWithChildren
                      value={100}
                      styles={buildStyles({
                        pathColor: '#eab308',
                        trailColor: 'rgba(255,255,255,0.1)'
                      })}
                    >
                      <div className="text-2xl font-bold animate-pulse">
                        {systemStats.jobsRunning}
                      </div>
                    </CircularProgressbarWithChildren>
                  </div>
                  <p className="text-sm text-white/70">Jobs Running</p>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-2">
                    <CircularProgressbarWithChildren
                      value={100}
                      styles={buildStyles({
                        pathColor: '#22c55e',
                        trailColor: 'rgba(255,255,255,0.1)'
                      })}
                    >
                      <div className="text-2xl font-bold">{systemStats.jobsCompleted}</div>
                    </CircularProgressbarWithChildren>
                  </div>
                  <p className="text-sm text-white/70">Jobs Completed</p>
                </div>
              </div>
            </div>

            {/* Description Panel */}
            <div className="bg-[#170056]/20 backdrop-blur-sm rounded-xl border border-purple-400/20 shadow-xl p-6">
              <p className="text-sm text-white/70 leading-relaxed">
                Out of ~8000 global medicinal plants, SLHAIF has mapped 350 unique Sri Lankan species. 
                Our system continuously analyzes compounds, protein targets, and potential therapeutic applications 
                through our integrated AI agents.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SLHAIFChat; 