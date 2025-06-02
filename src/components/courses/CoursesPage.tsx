'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  BookOpen, 
  Network, 
  Atom, 
  Boxes, 
  Brain, 
  FlaskConical,
  ArrowLeft,
  GraduationCap,
  ChevronRight
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const courses = [
  {
    title: "Introduction to Bioinformatics",
    description: "Learn the fundamentals of bioinformatics and its applications in modern biology",
    icon: BookOpen,
    color: "from-purple-600 to-blue-600",
    step: 1
  },
  {
    title: "Network Pharmacology",
    description: "Understand drug-target interactions and biological networks in pharmaceutical research",
    icon: Network,
    color: "from-blue-600 to-cyan-600",
    step: 2
  },
  {
    title: "Molecular Docking",
    description: "Master computational techniques for predicting molecular interactions",
    icon: Atom,
    color: "from-cyan-600 to-teal-600",
    step: 3
  },
  {
    title: "Molecular Dynamics",
    description: "Explore the simulation of atomic and molecular movements in biological systems",
    icon: Boxes,
    color: "from-teal-600 to-green-600",
    step: 4
  },
  {
    title: "Introduction to Cheminformatics",
    description: "Learn the basics of chemical information handling and drug design",
    icon: FlaskConical,
    color: "from-green-600 to-emerald-600",
    step: 5
  },
  {
    title: "AI and ML in Drug Discovery",
    description: "Apply artificial intelligence and machine learning in pharmaceutical research",
    icon: Brain,
    color: "from-emerald-600 to-purple-600",
    step: 6
  },
  {
    title: "Research Project",
    description: "Apply your knowledge in a comprehensive research project",
    icon: GraduationCap,
    color: "from-rose-600 to-orange-600",
    step: 7,
    isSpecial: true
  }
];

export const CoursesPage = () => {
  const navigate = useNavigate();
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setIsPageVisible(true);
  }, []);

  const handleNavigateBack = () => {
    setIsNavigating(true);
    setIsPageVisible(false);
    setTimeout(() => {
      navigate('/');
    }, 300);
  };

  return (
    <div className={`
      min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 
      relative overflow-hidden transition-all duration-500 ease-in-out
      ${isPageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
    `}>
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
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-purple-900/50 backdrop-blur-[2px]" />
      </div>

      {/* Back Button */}
      <div className="sticky top-4 left-4 z-50 container mx-auto px-4">
        <Button
          onClick={handleNavigateBack}
          variant="ghost"
          disabled={isNavigating}
          className={`
            bg-slate-800/90 hover:bg-slate-700 text-gray-200 
            border border-purple-800 shadow-lg hover:shadow-purple-900/20 
            flex items-center space-x-2 transition-all duration-300 
            transform hover:scale-105 hover:-translate-x-1
            ${isNavigating ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          size="sm"
        >
          <ArrowLeft className={`h-4 w-4 transition-transform duration-300 ${isNavigating ? 'translate-x-2' : ''}`} />
          <span>{isNavigating ? 'Going back...' : 'Back to Dashboard'}</span>
        </Button>
      </div>

      <main className={`
        container mx-auto px-4 py-16 relative z-10 
        transition-all duration-500 ease-in-out
        ${isNavigating ? 'opacity-0 -translate-x-10' : 'opacity-100 translate-x-0'}
      `}>
        {/* Header */}
        <div className="text-center mb-12 transition-all duration-500 ease-in-out transform">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Course Pipeline
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Follow our structured learning path from fundamentals to advanced research
          </p>
        </div>

        {/* Course Pipeline - Desktop */}
        <div className="hidden lg:flex flex-col items-center space-y-12 max-w-4xl mx-auto">
          {courses.map((course, index) => (
            <div 
              key={index} 
              className={`
                relative w-full transform transition-all duration-500 ease-in-out
                ${isPageVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
                ${isNavigating ? 'opacity-0 -translate-x-10' : ''}
              `}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Connecting Line */}
              {index < courses.length - 1 && (
                <div className={`
                  absolute left-[120px] top-full h-12 w-1
                  transition-all duration-300 ease-in-out
                  ${hoveredStep === course.step ? 'bg-purple-400' : 'bg-gradient-to-b from-blue-600 to-transparent'}
                `} />
              )}
              
              {/* Course Card */}
              <Card 
                className={`
                  transform transition-all duration-300 cursor-pointer
                  hover:scale-105 hover:shadow-xl border-2
                  ${hoveredStep === course.step ? 'border-purple-600 shadow-lg' : 'border-transparent shadow'}
                  ${course.isSpecial ? 'bg-gradient-to-br from-slate-900 to-purple-900' : 'bg-slate-900/90'}
                  backdrop-blur-sm p-6 relative z-10
                `}
                onMouseEnter={() => setHoveredStep(course.step)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <div className="flex items-center space-x-6">
                  <div className="flex flex-col items-center space-y-2">
                    {/* Step Number */}
                    <div className={`
                      w-12 h-12 rounded-full bg-gradient-to-r 
                      ${course.isSpecial ? 'from-purple-600 to-blue-600' : course.color}
                      flex items-center justify-center text-white font-bold text-xl
                      shadow-lg shadow-purple-900/20
                    `}>
                      {course.step}
                    </div>
                    {/* Icon */}
                    <div className={`
                      w-16 h-16 rounded-full bg-gradient-to-r 
                      ${course.isSpecial ? 'from-purple-600 to-blue-600' : course.color}
                      flex items-center justify-center shadow-lg shadow-purple-900/20
                      ${course.isSpecial ? 'animate-pulse' : ''}
                    `}>
                      <course.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className={`
                      text-2xl font-semibold bg-gradient-to-r
                      ${course.isSpecial ? 'from-purple-400 to-blue-400' : 'from-blue-400 to-purple-400'}
                      bg-clip-text text-transparent mb-2
                    `}>
                      {course.title}
                    </h3>
                    <p className="text-gray-300">{course.description}</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Course Pipeline - Mobile */}
        <div className="lg:hidden space-y-4">
          {courses.map((course, index) => (
            <div 
              key={index} 
              className={`
                relative transform transition-all duration-500 ease-in-out
                ${isPageVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
                ${isNavigating ? 'opacity-0 -translate-x-10' : ''}
              `}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <Card 
                className={`
                  transform transition-all duration-300
                  hover:scale-102 hover:shadow-lg border-2
                  ${course.isSpecial ? 'bg-gradient-to-br from-slate-900 to-purple-900 border-purple-800' : 'bg-slate-900/90 border-transparent'}
                  backdrop-blur-sm p-4 hover:border-purple-600
                `}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex flex-col items-center space-y-2">
                    {/* Step Number */}
                    <div className={`
                      w-8 h-8 rounded-full bg-gradient-to-r 
                      ${course.isSpecial ? 'from-purple-600 to-blue-600' : course.color}
                      flex items-center justify-center text-white font-bold text-sm 
                      shadow-lg shadow-purple-900/20
                    `}>
                      {course.step}
                    </div>
                    {/* Icon */}
                    <div className={`
                      w-8 h-8 rounded-full bg-gradient-to-r 
                      ${course.isSpecial ? 'from-purple-600 to-blue-600' : course.color}
                      flex items-center justify-center shadow-lg shadow-purple-900/20
                      ${course.isSpecial ? 'animate-pulse' : ''}
                    `}>
                      <course.icon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  {/* Text Content */}
                  <div className="flex-1">
                    <h3 className={`
                      text-base font-semibold bg-gradient-to-r
                      ${course.isSpecial ? 'from-purple-400 to-blue-400' : 'from-blue-400 to-purple-400'}
                      bg-clip-text text-transparent
                    `}>
                      {course.title}
                    </h3>
                    <p className="text-gray-300 text-sm mt-1">{course.description}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-purple-400 mt-2" />
                </div>
              </Card>
              {/* Connecting Line */}
              {index < courses.length - 1 && (
                <div className={`
                  absolute left-6 top-full h-4 border-l-2
                  transition-colors duration-300
                  ${hoveredStep === course.step ? 'border-purple-400' : 'border-blue-800/50'}
                `} />
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}; 