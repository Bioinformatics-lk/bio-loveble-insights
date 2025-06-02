import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const HeroPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 relative overflow-hidden"
    >
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {/* Top Left Image */}
        <div 
          className="absolute top-0 left-0 w-1/2 h-1/2 bg-contain bg-no-repeat opacity-40"
          style={{ backgroundImage: 'url("/lovable-uploads/P1.png")' }}
        />
        {/* Top Right Image */}
        <div 
          className="absolute top-0 right-0 w-1/2 h-1/2 bg-contain bg-no-repeat opacity-40"
          style={{ backgroundImage: 'url("/lovable-uploads/P2.png")' }}
        />
        {/* Bottom Left Image */}
        <div 
          className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-contain bg-no-repeat opacity-40"
          style={{ backgroundImage: 'url("/lovable-uploads/P3.png")' }}
        />
        {/* Bottom Right Image */}
        <div 
          className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-contain bg-no-repeat opacity-40"
          style={{ backgroundImage: 'url("/lovable-uploads/P4.png")' }}
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-[2px]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 h-screen flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Bioinformatics.lk
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12">
            Explore the intersection of biology and technology through our comprehensive courses and expert-led training programs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => navigate("/login")}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
              >
                Sign In
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/20 px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
              >
                Learn More
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid md:grid-cols-3 gap-8 mt-24"
        >
          {[
            {
              title: "Expert-Led Courses",
              description: "Learn from industry professionals and experienced researchers"
            },
            {
              title: "Hands-on Practice",
              description: "Apply your knowledge with real-world bioinformatics projects"
            },
            {
              title: "Career Growth",
              description: "Develop skills that are in high demand in the biotech industry"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
            >
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}; 