import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, BookOpen, Network, Atom, FlaskConical, FileText, Beaker } from 'lucide-react';
import { useRouter } from 'next/router';

export const SLHAIFButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const agents = [
    { id: 'literature', title: 'Literature Search Agent', icon: BookOpen },
    { id: 'network', title: 'Network Pharmacology Agent', icon: Network },
    { id: 'docking', title: 'Molecular Docking Agent', icon: Atom },
    { id: 'dynamics', title: 'Molecular Dynamics Agent', icon: FlaskConical },
    { id: 'manuscript', title: 'Manuscript Writing Agent', icon: FileText },
    { id: 'formulation', title: 'Formulation Development Agent', icon: Beaker }
  ];

  // Calculate positions for desktop octopus layout
  const getAgentPosition = (index: number, total: number) => {
    const radius = 200;
    const angle = (Math.PI / (total - 1)) * index - Math.PI / 2;
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle) + radius
    };
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto my-8">
      {/* Main SLHAIF Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          relative z-20 mx-auto block
          px-8 py-4 rounded-xl
          bg-gradient-to-r from-[#170056] to-[#410056]
          text-[#EAE3F5] font-bold text-xl
          border-2 border-[#54366B]
          shadow-lg hover:shadow-xl
          transition-all duration-300
          group
          ${isExpanded ? 'mb-48 md:mb-96' : 'mb-8'}
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
        <div className="relative flex items-center justify-center gap-2">
          <Brain className="w-6 h-6 text-[#EAE3F5] animate-pulse" />
          <span>SLHAIF</span>
        </div>
      </motion.button>

      {/* Agents Layout */}
      <AnimatePresence>
        {isExpanded && (
          <div className="absolute left-0 right-0 z-10">
            {/* Desktop Layout */}
            <div className="hidden md:block">
              {agents.map((agent, index) => {
                const position = getAgentPosition(index, agents.length);
                return (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      x: position.x,
                      top: position.y
                    }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="absolute left-1/2 -translate-x-1/2 w-48"
                    style={{
                      transform: `translate(${position.x}px, ${position.y}px)`
                    }}
                  >
                    {/* Connector Line */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full h-24 w-px">
                      <div className="h-full w-full bg-gradient-to-b from-[#54366B] to-transparent relative overflow-hidden">
                        <motion.div
                          animate={{
                            y: ["-100%", "100%"],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: "linear",
                          }}
                          className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400 to-transparent"
                        />
                      </div>
                    </div>

                    {/* Agent Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-[#54366B] shadow-lg hover:shadow-xl transition-all duration-300 text-[#EAE3F5] group"
                      onClick={() => router.push(`/ai-agents/${agent.id}`)}
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

            {/* Mobile Layout */}
            <div className="md:hidden space-y-2">
              {agents.map((agent, index) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Connector Line */}
                  <div className="absolute left-4 top-0 bottom-0 w-px">
                    <div className="h-full w-full bg-gradient-to-b from-[#54366B] to-transparent relative overflow-hidden">
                      <motion.div
                        animate={{
                          y: ["-100%", "100%"],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                          ease: "linear",
                        }}
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400 to-transparent"
                      />
                    </div>
                  </div>

                  {/* Agent Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full pl-8 pr-4 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-[#54366B] shadow-lg hover:shadow-xl transition-all duration-300 text-[#EAE3F5] group"
                    onClick={() => router.push(`/ai-agents/${agent.id}`)}
                  >
                    <div className="flex items-center gap-2">
                      <agent.icon className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
                      <span className="text-sm font-medium">{agent.title}</span>
                    </div>
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Chat Button */}
      <motion.button
        onClick={() => router.push('/chat')}
        className={`
          relative z-20 mx-auto block
          px-8 py-4 rounded-xl
          bg-gradient-to-r from-[#54366B] to-[#363B6B]
          text-[#EAE3F5] font-bold
          shadow-lg hover:shadow-xl
          transition-all duration-300
          group
          ${isExpanded ? 'mt-4' : 'mt-0'}
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
        <div className="relative">
          Chat with our AI system
        </div>
      </motion.button>
    </div>
  );
}; 