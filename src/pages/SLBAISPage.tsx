import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Brain, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

const slbailTopics = [
  {
    id: 'ai-agents',
    title: 'AI Agents',
    description: 'Advanced artificial intelligence systems for automated research and analysis. Explore cutting-edge AI technologies for drug discovery and computational biology.',
    image: '/lovable-uploads/slbail01.png',
    color: 'from-purple-600 to-blue-600'
  },
  {
    id: 'bioinformatics',
    title: 'Bioinformatics and Cheminformatics',
    description: 'Computational analysis of biological and chemical data for drug discovery. Integrate molecular biology with computational methods.',
    image: '/lovable-uploads/slbail02.png',
    color: 'from-blue-600 to-cyan-600'
  },
  {
    id: 'computational-chemistry',
    title: 'Computational Chemistry',
    description: 'Molecular modeling and simulation for chemical research and development. Advanced computational techniques for molecular analysis.',
    image: '/lovable-uploads/slbail03.png',
    color: 'from-cyan-600 to-teal-600'
  },
  {
    id: 'cmpaat-database',
    title: 'CMPAAT Botanical Database',
    description: 'Comprehensive database of medicinal plants and their therapeutic properties. Access extensive botanical and pharmacological data.',
    image: '/lovable-uploads/slbail04.png',
    color: 'from-teal-600 to-green-600'
  }
];

export const SLBAISPage = () => {
  const navigate = useNavigate();
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0612] via-[#1a0b2e] to-[#2d1b69] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-[#1a0b2e]/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-[#2d1b69]/30 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
            className="absolute top-4 left-4 text-white hover:bg-white/10 z-50"
        >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
        </Button>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mr-4">
                <Brain className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider">
                SLBAIL
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
              Sri Lanka's First Bioinformatics and Artificial Intelligence Laboratory
            </p>
            <p className="text-lg text-white/60 mt-4 max-w-2xl mx-auto">
              Advancing research through cutting-edge computational biology and AI technologies
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {slbailTopics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredTopic(topic.id)}
              onMouseLeave={() => setHoveredTopic(null)}
            >
              <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a0b2e]/50 to-[#2d1b69]/50 border-2 border-white/20 shadow-2xl transition-all duration-300 group-hover:border-white/40 group-hover:shadow-2xl">
                
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 transform scale-110 group-hover:scale-100"
                  style={{ backgroundImage: `url(${topic.image})` }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
                
                <AnimatePresence>
                  {hoveredTopic !== topic.id && (
                    <motion.div
                      initial={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="absolute inset-0 flex flex-col justify-end p-6 text-white"
                    >
                      <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${topic.color} text-white text-sm font-semibold mb-4 w-fit shadow-lg`}>
                        {topic.title}
                      </div>
                      
                      <p className="text-white text-lg leading-relaxed mb-4 font-medium">
                        {topic.description}
                      </p>
                      
                      <div className="flex items-center text-white/80 text-sm font-medium">
                        <div className="w-3 h-3 bg-white/80 rounded-full mr-3 animate-pulse"></div>
                        Hover to explore image
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <AnimatePresence>
                  {hoveredTopic === topic.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div 
                        className="w-full h-full bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${topic.image})` }}
                      />
                      
                      <div className="absolute inset-0 bg-black/10" />
                      
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${topic.color} text-white font-bold shadow-xl backdrop-blur-sm`}>
                          {topic.title}
                        </div>
                      </div>
                      
                      <div className="absolute top-4 right-4">
                        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
          </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Research Excellence
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              SLBAIL combines cutting-edge computational methods with traditional research approaches 
              to advance our understanding of biological systems and accelerate drug discovery processes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">AI-Powered Research</h3>
                <p className="text-white/70 text-sm">Advanced machine learning algorithms for data analysis</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">Collaborative Platform</h3>
                <p className="text-white/70 text-sm">Multi-disciplinary research collaboration</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">Innovation Hub</h3>
                <p className="text-white/70 text-sm">Pioneering new approaches in bioinformatics</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 text-center"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Chat with our AI system
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
