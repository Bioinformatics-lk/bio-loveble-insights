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
  ArrowRight,
  ChevronRight
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

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
    title: "AI and ML in Drug Discovery",
    description: "Apply artificial intelligence and machine learning in pharmaceutical research",
    icon: Brain,
    color: "from-green-600 to-emerald-600",
    step: 5
  },
  {
    title: "Introduction to Cheminformatics",
    description: "Learn the basics of chemical information handling and drug design",
    icon: FlaskConical,
    color: "from-emerald-600 to-purple-600",
    step: 6
  }
];

export const CoursesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 relative">
      {/* DNA/RNA Background Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `url('/dna-pattern.svg'), url('/rna-pattern.svg')`,
          backgroundBlendMode: 'overlay',
          backgroundSize: 'contain',
          backgroundRepeat: 'repeat'
        }}
      />

      {/* Back Button */}
      <div className="sticky top-4 left-4 z-50 container mx-auto px-4">
        <Button
          onClick={() => navigate('/')}
          variant="ghost"
          className="bg-white/90 hover:bg-white shadow-sm hover:shadow flex items-center space-x-2"
          size="sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </Button>
      </div>

      <main className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Course Pipeline
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Follow our structured learning path from fundamentals to advanced topics
          </p>
        </div>

        {/* Pipeline Layout - Desktop */}
        <div className="hidden lg:flex flex-col items-center space-y-8">
          <div className="w-full max-w-6xl">
            {courses.map((course, index) => (
              <div key={index} className="relative">
                {/* Course Card */}
                <div className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-8`}>
                  <Card 
                    className={`w-[500px] hover:shadow-xl transition-all transform hover:scale-105 border-2 border-transparent hover:border-purple-600 bg-white/90 backdrop-blur-sm p-6 cursor-pointer
                      ${index % 2 === 0 ? 'ml-0' : 'mr-0'}`}
                  >
                    <div className="flex items-center space-x-4">
                      {/* Step Number */}
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${course.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                        {course.step}
                      </div>
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${course.color} flex items-center justify-center shadow-lg`}>
                        <course.icon className="h-6 w-6 text-white" />
                      </div>
                      {/* Text Content */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-600">{course.description}</p>
                      </div>
                      <ChevronRight className="h-6 w-6 text-purple-600" />
                    </div>
                  </Card>
                </div>
                
                {/* Connecting Line */}
                {index < courses.length - 1 && (
                  <div className={`absolute ${index % 2 === 0 ? 'right-1/2' : 'left-1/2'} top-full w-1/2 h-8 border-r-4 border-b-4 border-purple-300/50 rounded-br-3xl`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pipeline Layout - Mobile */}
        <div className="lg:hidden space-y-4">
          {courses.map((course, index) => (
            <div key={index} className="relative">
              <Card 
                className="hover:shadow-xl transition-all transform hover:scale-105 border-2 border-transparent hover:border-purple-600 bg-white/90 backdrop-blur-sm p-4 cursor-pointer"
              >
                <div className="flex items-start space-x-4">
                  {/* Step Number and Icon */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${course.color} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                      {course.step}
                    </div>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${course.color} flex items-center justify-center shadow-lg`}>
                      <course.icon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  {/* Text Content */}
                  <div className="flex-1">
                    <h3 className="text-base font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-600">{course.description}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-purple-600 mt-2" />
                </div>
              </Card>
              {/* Connecting Line */}
              {index < courses.length - 1 && (
                <div className="absolute left-6 top-full h-4 border-l-2 border-purple-300/50" />
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}; 