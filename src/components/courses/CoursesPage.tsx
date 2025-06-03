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
  ChevronRight,
  ExternalLink,
  DollarSign
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const courses = [
  {
    title: "Introduction to Bioinformatics",
    description: "This is the inaugural gateway to bioinformatics: a friendly, foundational course covering DNA, sequence analysis, and database essentials. It's the perfect springboard before diving deeper into our specialized pipeline.",
    icon: BookOpen,
    color: "from-purple-600 to-blue-600",
    step: 1,
    fee: 10000,
    totalFee: 10000,
    enrollmentLink: "https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/viewform"
  },
  {
    title: "Network Pharmacology",
    description: "As the second milestone, Network Pharmacology teaches you how to map drug–target interactions on a grand scale. Explore protein networks, uncover polypharmacology strategies, and learn to repurpose existing compounds for novel therapies—like a detective of molecular webs.",
    icon: Network,
    color: "from-blue-600 to-cyan-600",
    step: 2,
    fee: 5000,
    totalFee: 15000,
    enrollmentLink: "https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/viewform"
  },
  {
    title: "Molecular Docking",
    description: "Venture into the third course to master molecular docking: predict how small molecules snugly fit into protein pockets, evaluate binding energies, and screen virtual libraries for promising drug candidates. This is your passport to structure-based design.",
    icon: Atom,
    color: "from-cyan-600 to-teal-600",
    step: 3,
    fee: 5000,
    totalFee: 20000,
    enrollmentLink: "https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/viewform"
  },
  {
    title: "Molecular Dynamics",
    description: "In the fourth stage, Molecular Dynamics lets you watch atoms dance: set up and run simulations on our servers, analyze trajectories, and uncover the hidden choreography of proteins. Students even get server access to run their own exploratory studies—real-time science in action!",
    icon: Boxes,
    color: "from-teal-600 to-green-600",
    step: 4,
    fee: 10000,
    totalFee: 30000,
    enrollmentLink: "https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/viewform"
  },
  {
    title: "Introduction to Cheminformatics",
    description: "Dive into cheminformatics in the fifth course: decode SMILES, compute molecular fingerprints, and mine chemical databases for trends. Whether you dream of QSAR models or AI-driven scaffold hops, this class teaches you to speak the language of molecules.",
    icon: FlaskConical,
    color: "from-green-600 to-emerald-600",
    step: 5,
    fee: 5000,
    totalFee: 35000,
    enrollmentLink: "https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/viewform"
  },
  {
    title: "AI and ML in Drug Discovery",
    description: "Embark on the sixth frontier: AI and ML in Drug Discovery. Learn to train neural nets on biological data, predict ADMET properties, and design de novo compounds with generative models. It's where algorithms meet molecules to spark tomorrow's breakthroughs.",
    icon: Brain,
    color: "from-emerald-600 to-purple-600",
    step: 6,
    fee: 5000,
    totalFee: 40000,
    enrollmentLink: "https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/viewform"
  },
  {
    title: "Research Project",
    description: "Culminate your journey with a hands-on Research Project: integrate all your skills into a real-world case study—be it docking pipelines, MD thermodynamics, or AI-guided leads. This capstone synthesizes theory into practice and showcases your scientific prowess.",
    icon: GraduationCap,
    color: "from-rose-600 to-orange-600",
    step: 7,
    isSpecial: true,
    fee: 10000,
    totalFee: 50000,
    enrollmentLink: "https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/viewform"
  }
];

export const CoursesPage = () => {
  const navigate = useNavigate();
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  const handleEnrollClick = (enrollmentLink: string) => {
    window.open(enrollmentLink, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 relative overflow-hidden">
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
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-[2px]" />
      </div>

      {/* Back Button */}
      <div className="sticky top-4 left-4 z-50 container mx-auto px-4">
        <Button
          onClick={() => navigate('/')}
          variant="ghost"
          className="bg-white/10 hover:bg-white/20 text-white border border-white/20 shadow-sm hover:shadow flex items-center space-x-2 transition-all duration-300"
          size="sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </Button>
      </div>

      <main className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Course Pipeline
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
            Follow our structured learning path from fundamentals to advanced research
          </p>
        </div>

        {/* Course Pipeline - Desktop */}
        <div className="hidden lg:flex justify-center">
          <div className="relative max-w-4xl w-full">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/20" />
            
            {courses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex items-start mb-16 ${
                  course.title === "Network Pharmacology" ||
                  course.title === "AI and ML in Drug Discovery" ||
                  course.title === "Molecular Dynamics"
                    ? 'flex-row pl-8'
                    : index % 2 === 0 ? 'justify-end pr-8' : 'flex-row-reverse pl-8'
                } relative`}
              >
                {/* Connecting Line */}
                <div 
                  className={`absolute top-1/2 ${
                    course.title === "Network Pharmacology" ||
                    course.title === "AI and ML in Drug Discovery" ||
                    course.title === "Molecular Dynamics"
                      ? 'left-0 right-auto'
                      : index % 2 === 0 ? 'right-0 left-auto' : 'left-0 right-auto'
                  } w-8 h-0.5 bg-white/20`}
                />
                
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

                {/* Course Card with Details Popup */}
                <motion.div
                  className="w-[calc(50%-2rem)] relative"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className={`
                      transform transition-all duration-300 cursor-pointer
                      border-2 ${hoveredStep === course.step ? 'border-white/40' : 'border-white/10'}
                      ${course.isSpecial ? 'bg-gradient-to-br from-rose-500/20 to-orange-500/20' : 'bg-white/10'}
                      backdrop-blur-sm relative z-10
                    `}
                    onClick={() => setSelectedCourse(selectedCourse === course.step ? null : course.step)}
                    onMouseEnter={() => setHoveredStep(course.step)}
                    onMouseLeave={() => setHoveredStep(null)}
                  >
                    <div className="p-6">
                      <div className="flex flex-col items-center text-center space-y-4">
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
                        <div>
                          <h3 className={`
                            text-lg font-semibold text-white
                            ${course.isSpecial ? 'text-white' : ''}
                          `}>
                            {course.title}
                          </h3>
                          <p className={`
                            text-sm mt-2
                            ${course.isSpecial ? 'text-white/90' : 'text-white/70'}
                          `}>
                            {course.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Course Details Popup */}
                  <AnimatePresence>
                    {selectedCourse === course.step && (
                      <motion.div
                        initial={{ opacity: 0, x: course.title === "Network Pharmacology" ||
                                                course.title === "AI and ML in Drug Discovery" ||
                                                course.title === "Molecular Dynamics" ? 100 : -100,
                                  scaleX: 0 }}
                        animate={{ opacity: 1, x: 0, scaleX: 1 }}
                        exit={{ opacity: 0, x: course.title === "Network Pharmacology" ||
                                              course.title === "AI and ML in Drug Discovery" ||
                                              course.title === "Molecular Dynamics" ? 100 : -100,
                               scaleX: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className={`
                          absolute top-1/2 -translate-y-1/2
                          ${course.title === "Network Pharmacology" ||
                            course.title === "AI and ML in Drug Discovery" ||
                            course.title === "Molecular Dynamics"
                            ? 'left-full ml-8'
                            : 'right-full mr-8'}
                          w-72 bg-white/10 backdrop-blur-md
                          border-2 border-white/20 rounded-lg shadow-xl
                          p-4 z-20
                        `}
                      >
                        {/* Animated Connector */}
                        <motion.div 
                          className={`
                            absolute top-1/2 -translate-y-1/2
                            ${course.title === "Network Pharmacology" ||
                              course.title === "AI and ML in Drug Discovery" ||
                              course.title === "Molecular Dynamics"
                              ? 'right-full mr-2'
                              : 'left-full ml-2'}
                            h-0.5 bg-gradient-to-r ${course.color}
                          `}
                          initial={{ width: 0 }}
                          animate={{ width: "2rem" }}
                          transition={{ delay: 0.2, duration: 0.3 }}
                        />
                        
                        {/* Popup Content */}
                        <div className="flex flex-col space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-white font-semibold">Course Fee</span>
                              <span className="text-white">{course.fee.toLocaleString()} LKR</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-white font-semibold">Total up to here</span>
                              <span className="text-white">{course.totalFee.toLocaleString()} LKR</span>
                            </div>
                          </div>
                          <Button
                            onClick={() => handleEnrollClick(course.enrollmentLink)}
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                          >
                            Enroll Now
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Mobile Course Details Popup */}
                <AnimatePresence>
                  {selectedCourse === course.step && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="lg:hidden absolute left-0 right-0 top-full mt-2 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-lg shadow-xl p-4 z-20"
                    >
                      {/* Connecting Line for Mobile */}
                      <div className="absolute top-0 left-6 h-2 border-l-2 border-white/20 -translate-y-full" />
                      
                      <div className="flex flex-col space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-semibold">Course Fee</span>
                          <span className="text-white flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {course.fee.toLocaleString()} LKR
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white font-semibold">Total up to here</span>
                          <span className="text-white flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {course.totalFee.toLocaleString()} LKR
                          </span>
                        </div>
                        <Button
                          onClick={() => handleEnrollClick(course.enrollmentLink)}
                          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                        >
                          Enroll Now
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Course Pipeline - Mobile */}
        <div className="lg:hidden space-y-4">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <Card 
                className={`
                  transform transition-all duration-300
                  border-2 border-white/10 hover:border-white/30
                  ${course.isSpecial ? 'bg-gradient-to-br from-rose-500/20 to-orange-500/20' : 'bg-white/10'}
                  backdrop-blur-sm p-4
                `}
                onClick={() => setSelectedCourse(selectedCourse === course.step ? null : course.step)}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex flex-col items-center space-y-2">
                    {/* Step Number */}
                    <div className={`
                      w-8 h-8 rounded-full bg-gradient-to-r ${course.color}
                      flex items-center justify-center text-white font-bold text-sm shadow-lg
                    `}>
                      {course.step}
                    </div>
                    {/* Icon */}
                    <div className={`
                      w-8 h-8 rounded-full bg-gradient-to-r ${course.color}
                      flex items-center justify-center shadow-lg
                      ${course.isSpecial ? 'animate-pulse' : ''}
                    `}>
                      <course.icon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  {/* Text Content */}
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-white">
                      {course.title}
                    </h3>
                    <p className="text-xs text-white/70 mt-1">
                      {course.description}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-white/70 mt-2" />
                </div>
              </Card>

              {/* Mobile Course Details Popup */}
              <AnimatePresence>
                {selectedCourse === course.step && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="lg:hidden absolute left-0 right-0 top-full mt-2 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-lg shadow-xl p-4 z-20"
                  >
                    {/* Connecting Line for Mobile */}
                    <div className="absolute top-0 left-6 h-2 border-l-2 border-white/20 -translate-y-full" />
                    
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-semibold">Course Fee</span>
                        <span className="text-white flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {course.fee.toLocaleString()} LKR
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white font-semibold">Total up to here</span>
                        <span className="text-white flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {course.totalFee.toLocaleString()} LKR
                        </span>
                      </div>
                      <Button
                        onClick={() => handleEnrollClick(course.enrollmentLink)}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                      >
                        Enroll Now
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Connecting Line */}
              {index < courses.length - 1 && (
                <div className="absolute left-6 top-full h-4 border-l-2 border-white/20" />
              )}
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}; 