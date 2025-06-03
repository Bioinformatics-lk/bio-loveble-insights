import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, BookOpen, Network, Atom, FlaskConical, FileText, Beaker, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SLHAIFButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const agents = [
    { id: 'literature', title: 'Literature Search Agent', icon: BookOpen },
    { id: 'network', title: 'Network Pharmacology Agent', icon: Network },
    { id: 'docking', title: 'Molecular Docking Agent', icon: Atom },
    { id: 'dynamics', title: 'Molecular Dynamics Agent', icon: FlaskConical },
    { id: 'manuscript', title: 'Manuscript Writing Agent', icon: FileText },
    { id: 'formulation', title: 'Formulation Development Agent', icon: Beaker }
  ];

  // Calculate positions for half-circle layout
  const getAgentPosition = (index: number, total: number) => {
    const radius = 300; // Increased radius for better spacing
    // Calculate angle in the range of 0 to 180 degrees (π radians)
    const angle = (Math.PI / (total - 1)) * index;
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle)
    };
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto my-8">
      {/* Main SLHAIF Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative z-20 mx-auto block px-8 py-4 rounded-xl bg-gradient-to-r from-[#170056] to-[#410056] text-[#EAE3F5] font-bold text-xl border-2 border-[#54366B] shadow-lg hover:shadow-xl transition-all duration-300 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
        <div className="relative flex items-center justify-center gap-2">
          <Brain className="w-6 h-6 text-[#EAE3F5] animate-pulse" />
          <span>SLHAIF</span>
        </div>
      </motion.button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 md:inset-10 bg-gradient-to-br from-[#170056] to-[#410056] rounded-2xl z-50 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Content Container */}
              <div className="w-full h-full p-8 flex flex-col items-center justify-center">
                {/* Brain Icon at Bottom Center */}
                <div className="relative w-full h-[600px]">
                  {/* Brain Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-gradient-to-r from-[#54366B] to-[#363B6B] flex items-center justify-center"
                  >
                    <Brain className="w-12 h-12 text-white animate-pulse" />
                    {/* Pulsing Ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-purple-400/50 animate-ping" />
                  </motion.div>

                  {/* Agents Layout */}
                  {agents.map((agent, index) => {
                    const position = getAgentPosition(index, agents.length);
                    return (
                      <motion.div
                        key={agent.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="absolute"
                        style={{
                          left: `calc(50% + ${position.x}px)`,
                          bottom: `${position.y + 60}px`, // Add offset for brain icon
                          transform: 'translate(-50%, 50%)'
                        }}
                      >
                        {/* Connector Line */}
                        <div className="absolute left-1/2 bottom-0 w-px h-24 overflow-hidden">
                          <motion.div
                            className="w-full h-full bg-gradient-to-b from-[#54366B] to-transparent"
                            initial={{ height: 0 }}
                            animate={{ height: '100%' }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            <motion.div
                              animate={{
                                y: ["-100%", "100%"]
                              }}
                              transition={{
                                repeat: Infinity,
                                duration: 2,
                                ease: "linear"
                              }}
                              className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400 to-transparent"
                            />
                          </motion.div>
                        </div>

                        {/* Agent Button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-48 px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-[#54366B] shadow-lg hover:shadow-xl transition-all duration-300 text-[#EAE3F5] group"
                          onClick={() => navigate(`/ai-agents/${agent.id}`)}
                        >
                          <div className="flex items-center gap-2">
                            <agent.icon className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
                            <span className="text-sm font-medium">{agent.title}</span>
                          </div>
                        </motion.button>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Chat Button */}
                <motion.button
                  onClick={() => navigate('/chat')}
                  className="mt-8 px-8 py-4 rounded-xl bg-gradient-to-r from-[#54366B] to-[#363B6B] text-[#EAE3F5] font-bold shadow-lg hover:shadow-xl transition-all duration-300 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    Chat with our AI system
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}; 