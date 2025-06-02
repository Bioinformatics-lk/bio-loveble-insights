import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginTransition = () => {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Start exit animation after 2 seconds
    const timer = setTimeout(() => {
      setIsExiting(true);
      // Navigate after exit animation completes
      setTimeout(() => {
        navigate('/');
      }, 300); // Match this with the exit animation duration
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className={`
        fixed inset-0 z-[9999] flex items-center justify-center
        bg-[#A25FFF] transition-all duration-300 ease-in-out
        ${isExiting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}
      `}
    >
      <div className="relative">
        {/* Glow Effect */}
        <div 
          className={`
            absolute inset-0 blur-2xl opacity-50
            bg-gradient-to-r from-purple-400 via-pink-300 to-blue-400
            animate-glow-pulse
          `}
          aria-hidden="true"
        />
        
        {/* Main Text with Multiple Layers for Rich Animation */}
        <h1 
          className={`
            text-5xl md:text-7xl font-bold
            animate-float
            relative
          `}
        >
          {/* Base Layer - Solid Color */}
          <span className="absolute inset-0 text-white/50">
            Bioinformatics.lk
          </span>

          {/* Gradient Layer 1 - Slow */}
          <span 
            className="
              absolute inset-0
              bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200
              bg-clip-text text-transparent
              animate-gradient-slow
              [background-size:400%]
            "
          >
            Bioinformatics.lk
          </span>

          {/* Gradient Layer 2 - Medium */}
          <span 
            className="
              absolute inset-0
              bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200
              bg-clip-text text-transparent
              animate-gradient-medium
              [background-size:400%]
              opacity-75
            "
          >
            Bioinformatics.lk
          </span>

          {/* Gradient Layer 3 - Fast */}
          <span 
            className="
              relative
              bg-gradient-to-r from-white via-purple-100 to-blue-100
              bg-clip-text text-transparent
              animate-gradient-fast
              [background-size:400%]
              opacity-90
            "
          >
            Bioinformatics.lk
          </span>
        </h1>
      </div>
    </div>
  );
}; 