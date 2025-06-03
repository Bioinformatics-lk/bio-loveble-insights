import { motion, useAnimation, Variants } from "framer-motion";
import { Brain, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Topic {
  id: string;
  title: string;
  position: { x: number; y: number };
}

const topics: Topic[] = [
  { id: "literature", title: "Literature Search Agent", position: { x: 0, y: 0 } },
  { id: "network", title: "Network Pharmacology Agent", position: { x: 0, y: 0 } },
  { id: "docking", title: "Molecular Docking Agent", position: { x: 0, y: 0 } },
  { id: "dynamics", title: "Molecular Dynamics Agent", position: { x: 0, y: 0 } },
  { id: "manuscript", title: "Manuscript Writing Agent", position: { x: 0, y: 0 } },
  { id: "formulation", title: "Formulation Development Agent", position: { x: 0, y: 0 } },
];

const brainVariants: Variants = {
  initial: {
    scale: 1,
    opacity: 1,
  },
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const topicVariants: Variants = {
  pulse: {
    scale: [1, 1.02, 1],
    opacity: [0.9, 1, 0.9],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const connectionVariants: Variants = {
  animate: {
    opacity: [0.3, 0.7, 0.3],
    pathLength: [0.3, 0.6, 0.3],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const SLHAIFPage = () => {
  const navigate = useNavigate();
  const [draggedTopic, setDraggedTopic] = useState<string | null>(null);
  const brainControls = useAnimation();
  const [positions, setPositions] = useState<{ [key: string]: { x: number; y: number } }>({});

  useEffect(() => {
    // Calculate initial positions in a semi-circle
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const radius = Math.min(window.innerWidth, window.innerHeight) * 0.3;
    
    const newPositions = topics.reduce((acc, topic, index) => {
      const angle = (Math.PI / (topics.length - 1)) * index;
      const x = centerX + radius * Math.cos(angle) - 100;
      const y = centerY + radius * Math.sin(angle) * 0.5;
      acc[topic.id] = { x, y };
      return acc;
    }, {} as { [key: string]: { x: number; y: number } });

    setPositions(newPositions);
  }, []);

  const handleDragStart = (topicId: string) => {
    setDraggedTopic(topicId);
    brainControls.start({
      scale: 1.1,
      transition: { duration: 0.2 },
    });
  };

  const handleDragEnd = () => {
    setDraggedTopic(null);
    brainControls.start({
      scale: 1,
      transition: { duration: 0.2 },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#170056] via-[#410056] to-[#54366B] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#54366B]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#170056]/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="absolute top-4 left-4 text-white hover:bg-white/10"
        >
          ← Back
        </Button>

        {/* SLHAIF Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center text-white mb-12 mt-8"
        >
          SLHAIF
          <span className="block text-lg md:text-xl text-white/80 mt-2">
            Sri Lanka's First Herbal Artificial Intelligence Factory
          </span>
        </motion.h1>

        {/* Brain Symbol */}
        <motion.div
          className="relative w-40 h-40 mx-auto mb-16"
          variants={brainVariants}
          initial="initial"
          animate="pulse"
          whileDrag={{ scale: 1.1 }}
        >
          {/* Glowing circle behind brain */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#54366B] to-[#363B6B] blur-xl transform-gpu" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#54366B]/50 to-[#363B6B]/50 animate-pulse transform-gpu" />
          
          {/* Brain icon */}
          <motion.div className="relative z-10 w-full h-full flex items-center justify-center">
            <Brain className="w-24 h-24 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] filter brightness-150" />
          </motion.div>
        </motion.div>

        {/* Topic Boxes */}
        <div className="relative">
          {topics.map((topic) => (
            <motion.div
              key={topic.id}
              className="absolute"
              initial={false}
              animate={{
                x: positions[topic.id]?.x || 0,
                y: positions[topic.id]?.y || 0,
                ...topicVariants.pulse,
              }}
              drag
              dragMomentum={false}
              onDragStart={() => handleDragStart(topic.id)}
              onDragEnd={handleDragEnd}
              whileHover={{ scale: 1.05 }}
            >
              {/* Connection Line */}
              <motion.svg
                className="absolute top-1/2 left-1/2 w-full h-full pointer-events-none"
                style={{
                  zIndex: -1,
                  width: "100px",
                  height: "100px",
                }}
                variants={connectionVariants}
                animate="animate"
              >
                <motion.line
                  x1="0"
                  y1="0"
                  x2="100"
                  y2="0"
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  className="animate-pulse"
                />
              </motion.svg>

              {/* Topic Box */}
              <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 cursor-grab active:cursor-grabbing">
                <p className="text-white font-medium text-sm md:text-base whitespace-nowrap">
                  {topic.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chat Button */}
        <motion.div
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#363B6B] to-[#000A33] hover:from-[#000A33] hover:to-[#363B6B] text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all transform-gpu hover:scale-105"
          >
            <MessageCircle className="w-6 h-6 mr-2" />
            Chat with our AI system
          </Button>
        </motion.div>
      </div>
    </div>
  );
}; 