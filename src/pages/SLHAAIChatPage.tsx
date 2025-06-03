import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, MessageCircle, Send, Database, Activity } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock data for demonstration
const mockData = {
  plants: {
    total: 2500,
    identified: 1800,
    percentage: 72
  },
  chemicals: {
    total: 50000,
    identified: 35000,
    percentage: 70
  },
  proteins: {
    total: 20000,
    identified: 15000,
    percentage: 75
  },
  jobs: {
    submitted: 1250,
    completed: 1180,
    inProgress: 70
  }
};

// Status Circle Component
const StatusCircle = ({ title, value, total, percentage }: { title: string; value: number; total: number; percentage: number }) => (
  <div className="relative bg-[#1a1a2e]/30 backdrop-blur-md rounded-2xl p-4 border border-white/10">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-white/80 text-sm font-medium">{title}</h3>
      <span className="text-white/60 text-xs">{percentage}%</span>
    </div>
    <div className="relative w-32 h-32 mx-auto">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#1a1a2e"
          strokeWidth="8"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#4CAF50"
          strokeWidth="8"
          strokeDasharray={`${percentage * 2.83} 283`}
          transform="rotate(-90 50 50)"
          className="transition-all duration-1000 ease-in-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white">{value.toLocaleString()}</span>
        <span className="text-xs text-white/60">of {total.toLocaleString()}</span>
      </div>
    </div>
  </div>
);

// Chat Message Component
const ChatMessage = ({ message, isUser }: { message: string; isUser: boolean }) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
    <div className={`max-w-[80%] rounded-2xl p-4 ${
      isUser 
        ? 'bg-[#1a1a2e] text-white' 
        : 'bg-[#16213e] text-white'
    }`}>
      <p className="text-sm">{message}</p>
    </div>
  </div>
);

export const SLHAAIChatPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { message: "Hello! I'm SLHAIF AI. How can I help you today?", isUser: false },
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setChatHistory([...chatHistory, { message, isUser: true }]);
    setMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        message: "I'm analyzing your request. Please wait while I process the information.", 
        isUser: false 
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#16213e] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1a1a2e]/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#16213e]/30 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-4">
        {/* Back Button */}
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="absolute top-4 left-4 text-white hover:bg-white/10 z-50"
        >
          ← Back
        </Button>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16">
          {/* Left Side - Molecule Visualization */}
          <div className="space-y-6">
            <div className="bg-[#1a1a2e]/30 backdrop-blur-md rounded-2xl border border-white/10 h-[500px] p-4">
              <h2 className="text-white text-lg font-semibold mb-4">Molecule Visualization</h2>
              <div className="w-full h-full bg-[#16213e]/50 rounded-xl flex items-center justify-center">
                <span className="text-white/60">3D Molecule Viewer</span>
              </div>
            </div>

            {/* Database Status */}
            <div className="bg-[#1a1a2e]/30 backdrop-blur-md rounded-2xl border border-white/10 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Database className="w-5 h-5 text-white/80" />
                <h2 className="text-white text-lg font-semibold">Database Status</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatusCircle
                  title="Sri Lankan Plants"
                  value={mockData.plants.identified}
                  total={mockData.plants.total}
                  percentage={mockData.plants.percentage}
                />
                <StatusCircle
                  title="Chemicals Identified"
                  value={mockData.chemicals.identified}
                  total={mockData.chemicals.total}
                  percentage={mockData.chemicals.percentage}
                />
                <StatusCircle
                  title="Protein Targets"
                  value={mockData.proteins.identified}
                  total={mockData.proteins.total}
                  percentage={mockData.proteins.percentage}
                />
              </div>
            </div>
          </div>

          {/* Right Side - Chat Interface */}
          <div className="space-y-6">
            <div className="bg-[#1a1a2e]/30 backdrop-blur-md rounded-2xl border border-white/10 h-[500px] flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-white/10 flex items-center gap-3">
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1a1a2e] to-[#16213e] blur-sm animate-pulse" />
                  <Brain className="w-8 h-8 text-white relative z-10" />
                </div>
                <h2 className="text-white text-lg font-semibold">SLHAIF Chat</h2>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatHistory.map((chat, index) => (
                  <ChatMessage key={index} {...chat} />
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 bg-[#16213e] border-white/10 text-white placeholder:text-white/40"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="bg-[#1a1a2e] hover:bg-[#16213e] text-white"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-[#1a1a2e]/30 backdrop-blur-md rounded-2xl border border-white/10 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-white/80" />
                <h2 className="text-white text-lg font-semibold">System Status</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#16213e]/50 rounded-xl p-4">
                  <h3 className="text-white/60 text-sm mb-2">Jobs Submitted</h3>
                  <p className="text-2xl font-bold text-white">{mockData.jobs.submitted}</p>
                </div>
                <div className="bg-[#16213e]/50 rounded-xl p-4">
                  <h3 className="text-white/60 text-sm mb-2">Jobs Completed</h3>
                  <p className="text-2xl font-bold text-white">{mockData.jobs.completed}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 