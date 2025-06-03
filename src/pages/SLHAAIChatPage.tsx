import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, MessageCircle, ArrowLeft, Database, Activity } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const SLHAAIChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  // Mock data for database status
  const dbStats = {
    plants: {
      total: 2500,
      percentage: 85,
      description: "Out of the total number of known plants in the world, this number has been identified from Sri Lanka."
    },
    chemicals: {
      total: 15000,
      percentage: 70,
      description: "From the total known chemical compounds, this number has been identified so far."
    },
    proteins: {
      total: 5000,
      percentage: 65,
      description: "From the total known protein targets, this number has been identified so far."
    }
  };

  // Mock data for system status
  const systemStats = {
    jobsSubmitted: 1250,
    jobsCompleted: 1180,
    activeJobs: 70
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const newMessage: Message = {
      role: 'user',
      content: input
    };
    
    setMessages([...messages, newMessage]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        role: 'assistant',
        content: "I'm analyzing your request. Please wait while I process the information..."
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#16213e] text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a2e]/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <div className="flex items-center space-x-2">
            <Brain className="w-8 h-8 text-white animate-pulse" />
            <h1 className="text-2xl font-bold">SLHAIF Chat</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Molecule Visualization */}
          <div className="space-y-6">
            <div className="bg-[#1a1a2e]/50 rounded-lg border border-white/10 p-4 h-[500px]">
              <div className="w-full h-full flex items-center justify-center text-white/50">
                Molecule Visualization Window
              </div>
            </div>

            {/* Database Status */}
            <div className="bg-[#1a1a2e]/50 rounded-lg border border-white/10 p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Database className="w-5 h-5 mr-2" />
                Database Overview
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(dbStats).map(([key, stat]) => (
                  <div key={key} className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-2">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1a1a2e] to-[#16213e] blur-xl animate-pulse" />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1a1a2e]/50 to-[#16213e]/50 animate-pulse" />
                      <div className="relative w-full h-full flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold">{stat.total.toLocaleString()}</span>
                        <span className="text-sm text-white/70">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                      </div>
                    </div>
                    <p className="text-sm text-white/70">{stat.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Chat Interface */}
          <div className="space-y-6">
            <div className="bg-[#1a1a2e]/50 rounded-lg border border-white/10 p-4 h-[500px] flex flex-col">
              {/* Chat Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === 'user'
                            ? 'bg-[#16213e] text-white'
                            : 'bg-[#1a1a2e] text-white'
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Chat Input */}
              <div className="border-t border-white/10 p-4">
                <div className="flex space-x-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 bg-[#1a1a2e] border-white/10 text-white"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="bg-[#16213e] hover:bg-[#1a1a2e]"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-[#1a1a2e]/50 rounded-lg border border-white/10 p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                System Status
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">{systemStats.jobsSubmitted}</div>
                  <div className="text-sm text-white/70">Jobs Submitted</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{systemStats.jobsCompleted}</div>
                  <div className="text-sm text-white/70">Jobs Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{systemStats.activeJobs}</div>
                  <div className="text-sm text-white/70">Active Jobs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 