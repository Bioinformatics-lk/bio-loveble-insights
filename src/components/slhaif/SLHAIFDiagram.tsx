import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const agents = [
  { id: 1, name: 'Literature Search Agent' },
  { id: 2, name: 'Network Pharmacology Agent' },
  { id: 3, name: 'Molecular Docking Agent' },
  { id: 4, name: 'Molecular Dynamics Agent' },
  { id: 5, name: 'Manuscript Writing Agent' },
  { id: 6, name: 'Formulation Development Agent' }
];

export const SLHAIFDiagram = () => {
  return (
    <div className="w-full py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main SLHAIF Button */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative flex flex-col items-center"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-[#170056] via-[#410056] to-[#54366B] text-white rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 font-bold text-xl mb-16">
            SLHAIF
            <div className="text-sm font-normal opacity-80">
              Sri Lankan Herbal Artificial Intelligence Factory
            </div>
          </button>

          {/* Connecting Lines Container */}
          <div className="absolute top-20 w-full">
            <svg className="w-full h-[400px]" viewBox="0 0 800 400">
              {/* Animated gradient for lines */}
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#170056">
                    <animate
                      attributeName="offset"
                      values="0;1;0"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </stop>
                  <stop offset="100%" stopColor="#54366B">
                    <animate
                      attributeName="offset"
                      values="1;2;1"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </stop>
                </linearGradient>
              </defs>

              {/* Generate connecting lines */}
              {agents.map((agent, index) => {
                const angle = (Math.PI / (agents.length - 1)) * index;
                const x2 = 400 + Math.cos(angle) * 300;
                const y2 = 200 + Math.sin(angle) * 150;

                return (
                  <motion.line
                    key={agent.id}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    x1="400"
                    y1="0"
                    x2={x2}
                    y2={y2}
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    className="animate-pulse"
                  />
                );
              })}
            </svg>
          </div>

          {/* Agent Buttons Container */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-48">
            {agents.map((agent, index) => (
              <motion.button
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-[#54366B]/30 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-[#EAE3F5]"
              >
                {agent.name}
              </motion.button>
            ))}
          </div>

          {/* Chat Button */}
          <Link href="/chat">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="mt-12 px-8 py-4 bg-gradient-to-r from-[#410056] to-[#54366B] text-white rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 font-bold text-lg"
            >
              Chat with our AI System
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}; 