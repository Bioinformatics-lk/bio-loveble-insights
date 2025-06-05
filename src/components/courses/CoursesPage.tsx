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
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  description: string;
  detailedDescription: string;
  icon: LucideIcon;
  step: number;
  color: string;
  price: string;
  totalFee: string;
  enrollmentLink: string;
  isSpecial?: boolean;
  position: 'left' | 'right';
  popupPosition: 'left' | 'right';
}

const courses: Course[] = [
  {
    id: 1,
    title: "Introduction to Bioinformatics",
    description: "Learn the fundamentals of bioinformatics and its applications in modern biology",
    detailedDescription: "This is the inaugural gateway to bioinformatics: a friendly, foundational course covering DNA, sequence analysis, and database essentials. It's the perfect springboard before diving deeper into our specialized pipeline.",
    icon: BookOpen,
    color: "from-purple-600 to-blue-600",
    step: 1,
    price: "10,000 LKR",
    totalFee: "10,000 LKR",
    position: "right",
    popupPosition: "left",
    enrollmentLink: "https://docs.google.com/forms/d/e/1FAIpQLSekt3YZxcZ-oFb0MNkIzAaAUYs1GC2RcVe72EQ4Jhe1MvM-Gw/viewform?usp=header"
  },
  {
    id: 2,
    title: "Network Pharmacology",
    description: "Understand drug-target interactions and biological networks in pharmaceutical research",
    detailedDescription: "As the second milestone, Network Pharmacology teaches you how to map drug–target interactions on a grand scale. Explore protein networks, uncover polypharmacology strategies, and learn to repurpose existing compounds for novel therapies—like a detective of molecular webs.",
    icon: Network,
    color: "from-blue-600 to-cyan-600",
    step: 2,
    price: "5,000 LKR",
    totalFee: "15,000 LKR",
    position: "left",
    popupPosition: "right",
    enrollmentLink: "https://docs.google.com/forms/d/e/1FAIpQLSekt3YZxcZ-oFb0MNkIzAaAUYs1GC2RcVe72EQ4Jhe1MvM-Gw/viewform?usp=header"
  },
  {
    id: 3,
    title: "Molecular Docking",
    description: "Master computational techniques for predicting molecular interactions",
    detailedDescription: "Venture into the third course to master molecular docking: predict how small molecules snugly fit into protein pockets, evaluate binding energies, and screen virtual libraries for promising drug candidates. This is your passport to structure-based design.",
    icon: Atom,
    color: "from-cyan-600 to-teal-600",
    step: 3,
    price: "5,000 LKR",
    totalFee: "20,000 LKR",
    position: "right",
    popupPosition: "left",
    enrollmentLink: "https://docs.google.com/forms/d/e/1FAIpQLSekt3YZxcZ-oFb0MNkIzAaAUYs1GC2RcVe72EQ4Jhe1MvM-Gw/viewform?usp=header"
  },
  {
    id: 4,
    title: "Molecular Dynamics",
    description: "Explore the simulation of atomic and molecular movements in biological systems",
    detailedDescription: "In the fourth stage, Molecular Dynamics lets you watch atoms dance: set up and run simulations on our servers, analyze trajectories, and uncover the hidden choreography of proteins. Students even get server access to run their own exploratory studies—real-time science in action!",
    icon: Boxes,
    color: "from-teal-600 to-green-600",
    step: 4,
    price: "10,000 LKR",
    totalFee: "30,000 LKR",
    position: "left",
    popupPosition: "right",
    enrollmentLink: "https://docs.google.com/forms/d/e/1FAIpQLSekt3YZxcZ-oFb0MNkIzAaAUYs1GC2RcVe72EQ4Jhe1MvM-Gw/viewform?usp=header"
  },
  {
    id: 5,
    title: "Introduction to Cheminformatics",
    description: "Learn the basics of chemical information handling and drug design",
    detailedDescription: "Dive into cheminformatics in the fifth course: decode SMILES, compute molecular fingerprints, and mine chemical databases for trends. Whether you dream of QSAR models or AI-driven scaffold hops, this class teaches you to speak the language of molecules.",
    icon: FlaskConical,
    color: "from-green-600 to-emerald-600",
    step: 5,
    price: "5,000 LKR",
    totalFee: "35,000 LKR",
    position: "right",
    popupPosition: "left",
    enrollmentLink: "https://docs.google.com/forms/d/e/1FAIpQLSekt3YZxcZ-oFb0MNkIzAaAUYs1GC2RcVe72EQ4Jhe1MvM-Gw/viewform?usp=header"
  },
  {
    id: 6,
    title: "AI and ML in Drug Discovery",
    description: "Apply artificial intelligence and machine learning in pharmaceutical research",
    detailedDescription: "Embark on the sixth frontier: AI and ML in Drug Discovery. Learn to train neural nets on biological data, predict ADMET properties, and design de novo compounds with generative models. It's where algorithms meet molecules to spark tomorrow's breakthroughs.",
    icon: Brain,
    color: "from-emerald-600 to-purple-600",
    step: 6,
    price: "5,000 LKR",
    totalFee: "40,000 LKR",
    position: "left",
    popupPosition: "right",
    enrollmentLink: "https://docs.google.com/forms/d/e/1FAIpQLSekt3YZxcZ-oFb0MNkIzAaAUYs1GC2RcVe72EQ4Jhe1MvM-Gw/viewform?usp=header"
  },
  {
    id: 7,
    title: "Research Project",
    description: "Apply your knowledge in a comprehensive research project",
    detailedDescription: "Culminate your journey with a hands-on Research Project: integrate all your skills into a real-world case study—be it docking pipelines, MD thermodynamics, or AI-guided leads. This capstone synthesizes theory into practice and showcases your scientific prowess.",
    icon: GraduationCap,
    color: "from-rose-600 to-orange-600",
    step: 7,
    isSpecial: true,
    price: "10,000 LKR",
    totalFee: "50,000 LKR",
    position: "right",
    popupPosition: "left",
    enrollmentLink: "https://docs.google.com/forms/d/e/1FAIpQLSekt3YZxcZ-oFb0MNkIzAaAUYs1GC2RcVe72EQ4Jhe1MvM-Gw/viewform?usp=header"
  }
];

export const CoursesPage = () => {
  const navigate = useNavigate();
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [showMobileModal, setShowMobileModal] = useState(false);

  const handleEnrollClick = (enrollmentLink: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    window.open(enrollmentLink, '_blank', 'noopener,noreferrer');
  };

  const handleCloseMobileModal = () => {
    setShowMobileModal(false);
    setSelectedCourse(null);
  };

  const handleCardClick = (course: Course) => {
    setSelectedCourse(course.step);
    setShowMobileModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#363B6B] to-[#000A33] relative overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src="/images/background-pattern.png"
          alt="Background Pattern"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-10"
        />
        <img
          src="/images/background-shape.png"
          alt="Background Shape"
          className="absolute bottom-0 right-0 w-1/2 h-1/2 object-contain opacity-20"
        />
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-50 bg-white/10 backdrop-blur-md p-2 rounded-full hover:bg-white/20 transition-all"
      >
        <ArrowLeft className="w-6 h-6 text-white" />
      </button>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
          Our Courses
        </h1>

        {/* Mobile View */}
        <div className="md:hidden space-y-6 relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FF6B6B] via-[#4ECDC4] to-[#45B7D1]"></div>
          
          {courses.map((course, index) => (
            <div key={course.id} className="relative">
              {/* Timeline Node */}
              <div className="absolute left-6 top-6 w-4 h-4 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] border-2 border-white transform -translate-x-1/2 z-10"></div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 ml-12 border border-white/20 hover:border-white/40 transition-all"
                onClick={() => handleCardClick(course)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4] flex items-center justify-center text-white text-xl font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{course.title}</h3>
                </div>
                <p className="text-gray-300">{course.description}</p>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden lg:flex justify-center">
          <div className="relative max-w-4xl w-full">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/20" />
            
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, x: course.position === 'left' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex items-start mb-16 ${
                  course.position === 'left' ? 'justify-start pl-8' : 'flex-row-reverse pl-8'
                } relative`}
              >
                {/* Timeline Node */}
                <div 
                  className={`
                    absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
                    w-6 h-6 rounded-full bg-gradient-to-r ${course.color}
                    ${hoveredStep === course.step ? 'scale-150' : 'scale-100'}
                    transition-transform duration-300
                    shadow-lg z-10
                  `}
                />

                {/* Course Card */}
                <motion.div
                  className={`w-[calc(50%-2rem)] relative ${
                    course.position === 'left' ? 'text-left' : 'text-left'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className={`
                      transform transition-all duration-300 cursor-pointer
                      border-2 ${selectedCourse === course.step ? 'border-white/40' : hoveredStep === course.step ? 'border-white/30' : 'border-white/10'}
                      ${course.isSpecial ? 'bg-gradient-to-br from-rose-500/20 to-orange-500/20' : 'bg-white/10'}
                      backdrop-blur-sm relative z-10
                      ${course.position === 'left' ? 'mr-auto' : 'ml-auto'}
                      ${selectedCourse === course.step ? 'ring-2 ring-white/30' : ''}
                    `}
                    onClick={() => handleCardClick(course)}
                    onMouseEnter={() => setHoveredStep(course.step)}
                    onMouseLeave={() => setHoveredStep(null)}
                  >
                    <div className="p-6">
                      <div className={`flex flex-col items-center text-center space-y-4 ${
                        course.position === 'left' ? 'items-start' : 'items-start'
                      }`}>
                        {/* Step Number */}
                        <div className={`
                          w-12 h-12 rounded-full bg-gradient-to-r ${course.color}
                          flex items-center justify-center text-white font-bold text-xl
                          shadow-lg mb-2
                        `}>
                          {course.step}
                        </div>
                        {/* Icon */}
                        <div className={`
                          w-16 h-16 rounded-full bg-gradient-to-r ${course.color}
                          flex items-center justify-center shadow-lg
                          ${course.isSpecial ? 'animate-pulse' : ''}
                        `}>
                          <course.icon className="h-8 w-8 text-white" />
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="cursor-pointer"
                        >
                          <h3 className={`
                            text-lg font-semibold
                            ${selectedCourse === course.step ? 'text-white !important' : course.isSpecial ? 'text-black' : 'text-white/70'}
                            transition-all duration-300
                            ${selectedCourse === course.step ? 'scale-110' : ''}
                          `}>
                            {course.title}
                          </h3>
                          <p className={`
                            text-sm mt-2
                            ${course.isSpecial ? 'text-black/90' : 'text-white/70'}
                            transition-colors duration-300
                          `}>
                            {course.description}
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop Course Details Modal */}
        <AnimatePresence>
          {selectedCourse !== null && !showMobileModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="hidden lg:flex fixed inset-0 bg-black/60 backdrop-blur-sm z-50 items-center justify-center p-4 overflow-y-auto"
              onClick={() => setSelectedCourse(null)}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  duration: 0.4
                }}
                className="w-full max-w-2xl bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-lg shadow-xl p-8 relative"
                onClick={(e) => e.stopPropagation()}
              >
                {courses.find(c => c.step === selectedCourse) && (
                  <div className="flex flex-col space-y-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`
                          w-16 h-16 rounded-full bg-gradient-to-r ${courses.find(c => c.step === selectedCourse)?.color}
                          flex items-center justify-center shadow-lg
                          ${courses.find(c => c.step === selectedCourse)?.isSpecial ? 'animate-pulse' : ''}
                        `}>
                          {(() => {
                            const Icon = courses.find(c => c.step === selectedCourse)?.icon;
                            return Icon ? <Icon className="h-8 w-8 text-white" /> : null;
                          })()}
                        </div>
                        <h3 className="text-2xl font-bold text-white">
                          {courses.find(c => c.step === selectedCourse)?.title}
                        </h3>
                      </div>
                      <button
                        onClick={() => setSelectedCourse(null)}
                        className="text-white/70 hover:text-white transition-colors duration-200"
                        aria-label="Close modal"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-lg leading-relaxed text-white/90">
                      {courses.find(c => c.step === selectedCourse)?.detailedDescription}
                    </p>
                    <div className="flex items-center justify-between text-lg">
                      <span className="text-white/70">Course Fee:</span>
                      <span className="text-white font-semibold">
                        {courses.find(c => c.step === selectedCourse)?.price}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-lg">
                      <span className="text-white/70">Total Fee to Here:</span>
                      <span className="text-white font-semibold">
                        {courses.find(c => c.step === selectedCourse)?.totalFee}
                      </span>
                    </div>
                    <Button
                      onClick={(e) => handleEnrollClick(courses.find(c => c.step === selectedCourse)?.enrollmentLink || '', e)}
                      className={`w-full mt-4 py-6 text-lg ${
                        courses.find(c => c.step === selectedCourse)?.isSpecial 
                          ? 'bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-700 hover:to-orange-700 text-white' 
                          : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'
                      }`}
                    >
                      Enroll Now
                      <ExternalLink className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};