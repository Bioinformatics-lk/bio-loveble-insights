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
        navigate('/dashboard');
      }, 300); // Match this with the exit animation duration
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        bg-[#A25FFF] transition-opacity duration-300
        ${isExiting ? 'opacity-0' : 'opacity-100'}
      `}
    >
      <h1 
        className={`
          text-4xl md:text-6xl font-bold text-white
          animate-text-breathe
          relative
          before:absolute before:inset-0
          before:bg-gradient-to-r before:from-purple-300 before:via-pink-300 before:to-sky-300
          before:animate-gradient-flow before:bg-clip-text before:text-transparent
          before:content-['Bioinformatics.lk']
          after:absolute after:inset-0
          after:bg-gradient-to-r after:from-sky-300 after:via-emerald-300 after:to-purple-300
          after:animate-gradient-flow-reverse after:bg-clip-text after:text-transparent
          after:content-['Bioinformatics.lk']
          [&>span]:relative [&>span]:z-10
          [&>span]:bg-gradient-to-r [&>span]:from-white [&>span]:to-white
          [&>span]:bg-clip-text [&>span]:text-transparent
          [&>span]:animate-text-shimmer
        `}
      >
        <span>Bioinformatics.lk</span>
      </h1>
    </div>
  );
}; 