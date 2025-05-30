
import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'zoom-in';
  delay?: number;
  duration?: number;
  className?: string;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  className
}) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all ease-out';
    const durationClass = `duration-[${duration}ms]`;
    const delayClass = delay > 0 ? `delay-[${delay}ms]` : '';
    
    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          return `${baseClasses} ${durationClass} ${delayClass} opacity-0 translate-y-8`;
        case 'fade-in':
          return `${baseClasses} ${durationClass} ${delayClass} opacity-0`;
        case 'slide-left':
          return `${baseClasses} ${durationClass} ${delayClass} opacity-0 -translate-x-8`;
        case 'slide-right':
          return `${baseClasses} ${durationClass} ${delayClass} opacity-0 translate-x-8`;
        case 'zoom-in':
          return `${baseClasses} ${durationClass} ${delayClass} opacity-0 scale-95`;
        default:
          return `${baseClasses} ${durationClass} ${delayClass} opacity-0 translate-y-8`;
      }
    }
    
    return `${baseClasses} ${durationClass} ${delayClass} opacity-100 translate-y-0 translate-x-0 scale-100`;
  };

  return (
    <div ref={ref} className={cn(getAnimationClasses(), className)}>
      {children}
    </div>
  );
};
