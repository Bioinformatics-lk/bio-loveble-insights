'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, 
  Network, 
  Atom, 
  Boxes, 
  Brain, 
  FlaskConical,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

const courses = [
  {
    title: "Introduction to Bioinformatics",
    description: "Learn the fundamentals of bioinformatics and its applications in modern biology",
    icon: BookOpen,
    color: "from-purple-600 to-blue-600"
  },
  {
    title: "Network Pharmacology",
    description: "Understand drug-target interactions and biological networks in pharmaceutical research",
    icon: Network,
    color: "from-blue-600 to-cyan-600"
  },
  {
    title: "Molecular Docking",
    description: "Master computational techniques for predicting molecular interactions",
    icon: Atom,
    color: "from-cyan-600 to-teal-600"
  },
  {
    title: "Molecular Dynamics",
    description: "Explore the simulation of atomic and molecular movements in biological systems",
    icon: Boxes,
    color: "from-teal-600 to-green-600"
  },
  {
    title: "AI and ML in Drug Discovery",
    description: "Apply artificial intelligence and machine learning in pharmaceutical research",
    icon: Brain,
    color: "from-green-600 to-emerald-600"
  },
  {
    title: "Introduction to Cheminformatics",
    description: "Learn the basics of chemical information handling and drug design",
    icon: FlaskConical,
    color: "from-emerald-600 to-purple-600"
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
            Available Courses
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Explore our comprehensive range of bioinformatics and computational biology courses
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {courses.map((course, index) => (
            <Card 
              key={index}
              className="hover:shadow-xl transition-all transform hover:scale-105 border-2 border-transparent hover:border-purple-600 bg-white/90 backdrop-blur-sm"
            >
              <CardHeader>
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${course.color} rounded-full flex items-center justify-center shadow-lg`}>
                  <course.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-center text-gray-600">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className={`w-full bg-gradient-to-r ${course.color} hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all`}
                  size="lg"
                >
                  Start Course
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}; 