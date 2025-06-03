'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import '@/styles/glow.css';
import { 
  BookOpen, 
  Network, 
  Atom, 
  Boxes, 
  Brain, 
  FlaskConical,
  ArrowLeft,
  GraduationCap,
  ChevronRight,
  ExternalLink,
  DollarSign
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const courses = [
  {
    id: 1,
    title: "Network Pharmacology",
    description: "Learn about drug-target interactions and network-based drug discovery approaches.",
    icon: Network,
    side: "left",
    details: "This course covers the fundamentals of network pharmacology, including protein-protein interaction networks, drug-target networks, and their applications in drug discovery. You'll learn to analyze and interpret complex biological networks and apply this knowledge to identify novel drug targets and repurpose existing drugs."
  },
  {
    id: 2,
    title: "Molecular Dynamics",
    description: "Explore the dynamic behavior of molecules and their interactions at atomic level.",
    icon: Atom,
    side: "left",
    details: "Dive deep into molecular dynamics simulations, understanding protein-ligand interactions, and predicting binding affinities. This course provides hands-on experience with popular MD software and analysis tools, enabling you to study molecular behavior in silico."
  },
  {
    id: 3,
    title: "AI and ML in Drug Discovery",
    description: "Master artificial intelligence and machine learning techniques for drug discovery.",
    icon: Brain,
    side: "left",
    details: "Learn how to leverage artificial intelligence and machine learning in drug discovery. Topics include deep learning for molecular property prediction, generative models for drug design, and AI-driven virtual screening. Gain practical experience with state-of-the-art AI tools and frameworks."
  },
  {
    id: 4,
    title: "Bioinformatics Tools",
    description: "Master essential bioinformatics tools and techniques for drug discovery.",
    icon: FlaskConical,
    side: "right",
    details: "Comprehensive training in bioinformatics tools and databases used in drug discovery. Learn sequence analysis, structural bioinformatics, and cheminformatics approaches. Hands-on experience with popular software and databases."
  },
  {
    id: 5,
    title: "Drug Design",
    description: "Learn principles and techniques of computer-aided drug design.",
    icon: FlaskConical,
    side: "right",
    details: "Explore computer-aided drug design methods, including structure-based and ligand-based approaches. Learn about molecular docking, pharmacophore modeling, and QSAR analysis. Practical experience with industry-standard software."
  },
  {
    id: 6,
    title: "Research Project",
    description: "Apply your knowledge in a real-world drug discovery project.",
    icon: BookOpen,
    side: "right",
    details: "Work on a real drug discovery project under expert supervision. Apply all learned techniques to identify and validate novel drug targets or repurpose existing drugs. Present your findings in a professional format."
  }
];

export const CoursesPage = () => {
  const navigate = useNavigate();
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);
  const [showMobileModal, setShowMobileModal] = useState(false);

  const handleEnrollClick = (enrollmentLink: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    window.open(enrollmentLink, '_blank', 'noopener,noreferrer');
  };

  const handleCloseMobileModal = () => {
    setShowMobileModal(false);
    setSelectedCourse(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#16213e] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1a1a2e]/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#16213e]/30 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-6xl font-bold text-center text-white mb-12">
          Our Courses
        </h1>

        {/* Course Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side Courses */}
          <div className="space-y-8">
            {courses.filter(course => course.side === "left").map((course) => (
              <div key={course.id} className="relative">
                <div className="absolute -left-16 top-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e] to-[#16213e] blur-xl rounded-full animate-pulse" />
                    <span className="relative z-10 text-4xl font-bold text-white/90">
                      {course.id}
                    </span>
                  </div>
                </div>
                <div 
                  onClick={() => setSelectedCourse(course)}
                  className="bg-[#1a1a2e]/30 backdrop-blur-md rounded-2xl border border-white/10 p-6 hover:bg-[#1a1a2e]/40 transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e] to-[#16213e] blur-sm rounded-xl animate-pulse" />
                      <course.icon className="w-8 h-8 text-white relative z-10" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-white mb-2">{course.title}</h2>
                      <p className="text-lg text-white/80">{course.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side Courses */}
          <div className="space-y-8">
            {courses.filter(course => course.side === "right").map((course) => (
              <div key={course.id} className="relative">
                <div className="absolute -right-16 top-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e] to-[#16213e] blur-xl rounded-full animate-pulse" />
                    <span className="relative z-10 text-4xl font-bold text-white/90">
                      {course.id}
                    </span>
                  </div>
                </div>
                <div 
                  onClick={() => setSelectedCourse(course)}
                  className="bg-[#1a1a2e]/30 backdrop-blur-md rounded-2xl border border-white/10 p-6 hover:bg-[#1a1a2e]/40 transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e] to-[#16213e] blur-sm rounded-xl animate-pulse" />
                      <course.icon className="w-8 h-8 text-white relative z-10" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-white mb-2">{course.title}</h2>
                      <p className="text-lg text-white/80">{course.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Details Dialog */}
        <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
          <DialogContent className="bg-[#1a1a2e] border-white/10 text-white max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">
                {selectedCourse?.title}
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <p className="text-lg text-white/80">{selectedCourse?.details}</p>
              <div className="flex justify-end">
                <Button
                  onClick={(e) => handleEnrollClick(selectedCourse?.enrollmentLink || '', e)}
                  className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] hover:from-[#16213e] hover:to-[#1a1a2e] text-white"
                >
                  Enroll Now
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};