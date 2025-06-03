import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, MessageCircle, ArrowLeft, Database, Activity } from "lucide-react";

export const SLHAIFChatPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);

  // Mock data for system status
  const systemStats = {
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

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatHistory([...chatHistory, { role: 'user', content: message }]);
      // Here you would typically make an API call to get the AI response
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#16213e] text-white">
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a2e]/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <div className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-white animate-pulse" />
            <span className="text-xl font-bold">SLHAIF</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-20 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Molecule Visualization */}
          <div className="space-y-6">
            <div className="bg-[#1a1a2e]/50 rounded-xl border border-white/10 p-4 h-[500px]">
              <div className="w-full h-full flex items-center justify-center text-white/50">
                Molecule Visualization Window
              </div>
            </div>

            {/* Database Overview */}
            <div className="bg-[#1a1a2e]/50 rounded-xl border border-white/10 p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Database className="w-5 h-5 mr-2" />
                Database Overview
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {/* Plants Stats */}
                <div className="bg-[#16213e]/50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold mb-2">{systemStats.plants.identified}</div>
                  <div className="text-sm text-white/70">Sri Lankan Plants</div>
                  <div className="text-xs text-white/50 mt-1">
                    {systemStats.plants.percentage}% of global plants
                  </div>
                </div>
                {/* Chemicals Stats */}
                <div className="bg-[#16213e]/50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold mb-2">{systemStats.chemicals.identified}</div>
                  <div className="text-sm text-white/70">Chemicals</div>
                  <div className="text-xs text-white/50 mt-1">
                    {systemStats.chemicals.percentage}% identified
                  </div>
                </div>
                {/* Proteins Stats */}
                <div className="bg-[#16213e]/50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold mb-2">{systemStats.proteins.identified}</div>
                  <div className="text-sm text-white/70">Protein Targets</div>
                  <div className="text-xs text-white/50 mt-1">
                    {systemStats.proteins.percentage}% of known targets
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Chat Interface */}
          <div className="space-y-6">
            <div className="bg-[#1a1a2e]/50 rounded-xl border border-white/10 p-4 h-[500px] flex flex-col">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.role === 'user'
                          ? 'bg-[#16213e] text-white'
                          : 'bg-[#1a1a2e] text-white'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
              {/* Message Input */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 bg-[#16213e] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-[#16213e] hover:bg-[#1a1a2e] text-white"
                >
                  <MessageCircle className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-[#1a1a2e]/50 rounded-xl border border-white/10 p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                System Status
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#16213e]/50 rounded-lg p-4">
                  <div className="text-3xl font-bold mb-2">{systemStats.jobs.submitted}</div>
                  <div className="text-sm text-white/70">Jobs Submitted</div>
                </div>
                <div className="bg-[#16213e]/50 rounded-lg p-4">
                  <div className="text-3xl font-bold mb-2">{systemStats.jobs.completed}</div>
                  <div className="text-sm text-white/70">Jobs Completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 