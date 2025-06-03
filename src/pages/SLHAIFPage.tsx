import { motion, useAnimation, Variants } from "framer-motion";
import { Brain, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Topic {
  id: string;
  title: string;
}

const topics: Topic[] = [
  { id: "literature", title: "Literature Search Agent" },
  { id: "network", title: "Network Pharmacology Agent" },
  { id: "docking", title: "Molecular Docking Agent" },
  { id: "dynamics", title: "Molecular Dynamics Agent" },
  { id: "manuscript", title: "Manuscript Writing Agent" },
  { id: "formulation", title: "Formulation Development Agent" },
];

const brainVariants: Variants = {
  initial: { scale: 1, opacity: 1 },
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

const connectionVariants: Variants = {
  animate: {
    opacity: [0.3, 0.7, 0.3],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const SLHAIFPage = () => {
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const calculatePosition = (index: number) => {
    const isMobile = windowSize.width < 768;
    // Brain center coordinates
    const containerHeight = isMobile ? 400 : 600;
    const containerWidth = windowSize.width;
    const brainSize = isMobile ? 120 : 160;
    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;
    // Radius from the center of the brain to the topic
    const radius = isMobile ? 120 : 200;
    // Semi-circle angles
    const totalAngle = Math.PI;
    const startAngle = Math.PI;
    const angle = startAngle + (totalAngle / (topics.length - 1)) * index;
    // Position relative to the brain center
    return {
      x: centerX + radius * Math.cos(angle) - (isMobile ? 60 : 100),
      y: centerY + radius * Math.sin(angle) - (isMobile ? 30 : 40),
    };
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

        {/* Topic Boxes + Brain Symbol */}
        <div className="relative mx-auto" style={{height: windowSize.width < 768 ? 400 : 600, maxWidth: '100%'}}>
          {/* Brain Symbol at center */}
          <motion.div
            className="absolute left-1/2 top-1/2 z-10"
            style={{
              width: windowSize.width < 768 ? 120 : 160,
              height: windowSize.width < 768 ? 120 : 160,
              transform: `translate(-50%, -50%)`,
            }}
            variants={brainVariants}
            initial="initial"
            animate="pulse"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#54366B] to-[#363B6B] blur-xl transform-gpu" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#54366B]/50 to-[#363B6B]/50 animate-pulse transform-gpu" />
            <motion.div className="relative z-10 w-full h-full flex items-center justify-center">
              <Brain className={windowSize.width < 768 ? "w-16 h-16" : "w-24 h-24"} style={{color: 'white', filter: 'brightness(1.5) drop-shadow(0 0 20px rgba(255,255,255,0.8))'}} />
            </motion.div>
          </motion.div>
          {/* Topics around the brain */}
          {topics.map((topic, index) => {
            const position = calculatePosition(index);
            return (
              <motion.div
                key={topic.id}
                className="absolute"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  x: position.x,
                  y: position.y,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{ scale: 1.05 }}
                style={{zIndex: 5}}
              >
                <div className="bg-white/10 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-center min-w-[120px] max-w-[180px]">
                  <p className="text-white font-medium text-xs md:text-base whitespace-normal">
                    {topic.title}
                  </p>
                </div>
              </motion.div>
            );
          })}
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
            <span className="hidden md:inline">Chat with our AI system</span>
            <span className="md:hidden">Chat</span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}; 