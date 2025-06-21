import React, { useState } from 'react';
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
  X,
  Clock,
  Users,
  BarChart3
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const courses = [
  {
    title: "Introduction to Bioinformatics",
    description: "Learn the fundamentals of bioinformatics and computational biology",
    detailedDescription: "Start your journey with Introduction to Bioinformatics, where you'll learn the essential tools and concepts that bridge biology and computer science. This foundational course covers molecular biology basics, statistical analysis, and programming fundamentals that will serve as the cornerstone for all advanced studies.",
    icon: BookOpen,
    color: "from-purple-600 to-blue-600",
    step: 1,
    price: "10,000 LKR",
    totalFee: "10,000 LKR",
    enrollmentLink: "https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/viewform",
    duration: "4 weeks",
    level: "Beginner",
    maxStudents: 25,
    prerequisites: "Basic high school biology and mathematics",
    outcomes: [
      "Understand fundamental biological concepts",
      "Master basic statistical analysis", 
      "Learn Python programming",
      "Gain database management skills"
    ]
  },
  {
    title: "Network Pharmacology",
    description: "Understand drug-target interactions and biological networks in pharmaceutical research",
    detailedDescription: "As the second milestone, Network Pharmacology teaches you how to map drug–target interactions on a grand scale. Explore protein networks, uncover polypharmacology strategies, and learn to repurpose existing compounds for novel therapies—like a detective of molecular webs.",
    icon: Network,
    color: "from-blue-600 to-cyan-600",
    step: 2,
    price: "5,000 LKR",
    totalFee: "15,000 LKR",
    enrollmentLink: "https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/viewform",
    duration: "6 weeks",
    level: "Intermediate",
    maxStudents: 20,
    prerequisites: "Introduction to Bioinformatics course or equivalent knowledge",
    outcomes: [
      "Analyze drug-target interactions",
      "Understand biological networks",
      "Apply polypharmacology strategies",
      "Repurpose existing compounds"
    ]
  },
  {
    title: "Molecular Docking",
    description: "Master computational techniques for predicting molecular interactions",
    detailedDescription: "Venture into the third course to master molecular docking: predict how small molecules snugly fit into protein pockets, evaluate binding energies, and screen virtual libraries for promising drug candidates. This is your passport to structure-based design.",
    icon: Atom,
    color: "from-cyan-600 to-teal-600",
    step: 3,
    price: "5,000 LKR",
    totalFee: "20,000 LKR",
    enrollmentLink: "https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/viewform",
    duration: "5 weeks",
    level: "Intermediate",
    maxStudents: 18,
    prerequisites: "Network Pharmacology course or strong chemistry background",
    outcomes: [
      "Predict molecular interactions",
      "Evaluate binding energies",
      "Screen virtual libraries",
      "Apply structure-based design"
    ]
  },
  {
    title: "Molecular Dynamics",
    description: "Explore the simulation of atomic and molecular movements in biological systems",
    detailedDescription: "In the fourth stage, Molecular Dynamics lets you watch atoms dance: set up and run simulations on our servers, analyze trajectories, and uncover the hidden choreography of proteins. Students even get server access to run their own exploratory studies—real-time science in action!",
    icon: Boxes,
    color: "from-teal-600 to-green-600",
    step: 4,
    price: "10,000 LKR",
    totalFee: "30,000 LKR",
    enrollmentLink: "https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/viewform",
    duration: "6 weeks",
    level: "Advanced",
    maxStudents: 15,
    prerequisites: "Molecular Docking course or equivalent experience",
    outcomes: [
      "Set up molecular simulations",
      "Analyze protein trajectories",
      "Access computational servers",
      "Conduct exploratory studies"
    ]
  },
  {
    title: "Introduction to Cheminformatics",
    description: "Learn the basics of chemical information handling and drug design",
    detailedDescription: "Dive into cheminformatics in the fifth course: decode SMILES, compute molecular fingerprints, and mine chemical databases for trends. Whether you dream of QSAR models or AI-driven scaffold hops, this class teaches you to speak the language of molecules.",
    icon: FlaskConical,
    color: "from-green-600 to-emerald-600",
    step: 5,
    price: "5,000 LKR",
    totalFee: "35,000 LKR",
    enrollmentLink: "https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/viewform",
    duration: "5 weeks",
    level: "Intermediate",
    maxStudents: 18,
    prerequisites: "Molecular Dynamics course or strong chemistry background",
    outcomes: [
      "Decode SMILES notation",
      "Compute molecular fingerprints",
      "Mine chemical databases",
      "Build QSAR models"
    ]
  },
  {
    title: "AI and ML in Drug Discovery",
    description: "Apply artificial intelligence and machine learning in pharmaceutical research",
    detailedDescription: "Embark on the sixth frontier: AI and ML in Drug Discovery. Learn to train neural nets on biological data, predict ADMET properties, and design de novo compounds with generative models. It's where algorithms meet molecules to spark tomorrow's breakthroughs.",
    icon: Brain,
    color: "from-emerald-600 to-purple-600",
    step: 6,
    price: "5,000 LKR",
    totalFee: "40,000 LKR",
    enrollmentLink: "https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/viewform",
    duration: "8 weeks",
    level: "Advanced",
    maxStudents: 12,
    prerequisites: "Cheminformatics course or strong AI background",
    outcomes: [
      "Train neural networks on biological data",
      "Predict ADMET properties",
      "Design de novo compounds",
      "Apply generative models"
    ]
  },
  {
    title: "Research Project",
    description: "Apply your knowledge in a comprehensive research project",
    detailedDescription: "Culminate your journey with a hands-on Research Project: integrate all your skills into a real-world case study—be it docking pipelines, MD thermodynamics, or AI-guided leads. This capstone synthesizes theory into practice and showcases your scientific prowess.",
    icon: GraduationCap,
    color: "from-rose-600 to-orange-600",
    step: 7,
    isSpecial: true,
    price: "10,000 LKR",
    totalFee: "50,000 LKR",
    enrollmentLink: "https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/viewform",
    duration: "12 weeks",
    level: "Advanced",
    maxStudents: 10,
    prerequisites: "All previous courses or equivalent experience",
    outcomes: [
      "Integrate all learned skills",
      "Conduct real-world research",
      "Present scientific findings",
      "Publish research results"
    ]
  }
];

export const CoursesPage = () => {
  const navigate = useNavigate();
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [showFullModal, setShowFullModal] = useState(false);

  const handleEnrollClick = (enrollmentLink: string) => {
    window.open(enrollmentLink, '_blank');
  };

  const handleCourseClick = (courseStep: number) => {
    setSelectedCourse(courseStep);
    setShowFullModal(true);
  };

  const handleCloseModal = () => {
    setShowFullModal(false);
    setSelectedCourse(null);
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
          className="bg-white/10 hover:bg-white/20 text-white border border-white/20 shadow-sm hover:shadow flex items-center space-x-2 transition-all duration-200"
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

        {/* Course Pipeline - Mobile */}
        <div className="lg:hidden space-y-4">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="relative"
            >
              <Card 
                className={`
                  transform transition-all duration-200
                  border-2 border-white/10 hover:border-white/30
                  ${course.isSpecial ? 'bg-gradient-to-br from-rose-500/20 to-orange-500/20' : 'bg-white/10'}
                  backdrop-blur-sm p-4 cursor-pointer
                `}
                onClick={() => handleCourseClick(course.step)}
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
            </motion.div>
          ))}
        </div>

        {/* Desktop Course Pipeline */}
        <div className="hidden lg:flex justify-center">
          <div className="relative max-w-4xl w-full">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/20" />
            
            {courses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`flex items-start mb-16 ${
                  course.title === "Network Pharmacology" ||
                  course.title === "AI and ML in Drug Discovery" ||
                  course.title === "Molecular Dynamics"
                    ? 'flex-row pl-8'
                    : index % 2 === 0 ? 'justify-end pr-8' : 'flex-row-reverse pl-8'
                } relative`}
              >
                {/* Timeline Node */}
                <div 
                  className={`
                    absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
                    w-6 h-6 rounded-full bg-gradient-to-r ${course.color}
                    ${hoveredStep === course.step ? 'scale-150' : 'scale-100'}
                    transition-transform duration-200
                    shadow-lg z-10
                  `}
                />

                {/* Course Card */}
                <motion.div
                  className="w-[calc(50%-2rem)] relative"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className={`
                      transform transition-all duration-200 cursor-pointer
                      border-2 ${hoveredStep === course.step ? 'border-white/40' : 'border-white/10'}
                      ${course.isSpecial ? 'bg-gradient-to-br from-rose-500/20 to-orange-500/20' : 'bg-white/10'}
                      backdrop-blur-sm relative z-10
                    `}
                    onClick={() => handleCourseClick(course.step)}
                    onMouseEnter={() => setHoveredStep(course.step)}
                    onMouseLeave={() => setHoveredStep(null)}
                  >
                    {/* Card Content */}
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
                        <div className="cursor-pointer">
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
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Full Screen Course Details Modal */}
                  <AnimatePresence>
          {selectedCourse !== null && showFullModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
              onClick={handleCloseModal}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
              
              {/* Modal content */}
                      <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                        transition={{ 
                          type: "spring",
                  stiffness: 300,
                  damping: 30,
                  duration: 0.3
                        }}
                className="relative bg-gradient-to-br from-[#4d2884]/95 to-[#2e0669]/95 backdrop-blur-md border-2 border-white/30 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={handleCloseModal}
                  className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10 bg-white/10 hover:bg-white/20 rounded-full p-2"
                >
                  <X className="h-6 w-6" />
                </button>

                {/* Modal content */}
                <div className="p-8">
                  {(() => {
                    const course = courses.find(c => c.step === selectedCourse);
                    if (!course) return null;

                    return (
                      <>
                        {/* Header Section */}
                        <div className="text-center mb-8">
                          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            {course.title}
                          </h2>
                          <p className="text-white/80 text-lg leading-relaxed max-w-3xl mx-auto">
                            {course.detailedDescription}
                          </p>
                        </div>

                        {/* Course Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <Clock className="h-6 w-6 text-purple-400" />
                            <div>
                              <p className="text-white/70 text-sm">Duration</p>
                              <p className="text-white font-semibold">{course.duration}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <BarChart3 className="h-6 w-6 text-blue-400" />
                            <div>
                              <p className="text-white/70 text-sm">Level</p>
                              <p className="text-white font-semibold">{course.level}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <Users className="h-6 w-6 text-green-400" />
                            <div>
                              <p className="text-white/70 text-sm">Max Students</p>
                              <p className="text-white font-semibold">{course.maxStudents}</p>
                            </div>
                          </div>
                        </div>

                        {/* Two Column Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          {/* Left Column */}
                          <div className="space-y-6">
                            {/* Prerequisites */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                              <h3 className="text-white font-semibold text-lg mb-3">Prerequisites</h3>
                              <p className="text-white/90">{course.prerequisites}</p>
                            </div>

                            {/* Learning Outcomes */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                              <h3 className="text-white font-semibold text-lg mb-4">Learning Outcomes</h3>
                              <div className="space-y-3">
                                {course.outcomes.map((outcome, index) => (
                                  <div key={index} className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-white/90 text-sm">{outcome}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Right Column */}
                          <div className="space-y-6">
                            {/* Pricing Info */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                              <h3 className="text-white font-semibold text-lg mb-4">Pricing</h3>
                              <div className="space-y-3">
                                <div className="flex justify-between items-center">
                            <span className="text-white/70">Course Fee:</span>
                            <span className="text-white font-semibold">{course.price}</span>
                          </div>
                                <div className="flex justify-between items-center">
                            <span className="text-white/70">Total Fee to Here:</span>
                            <span className="text-white font-semibold">{course.totalFee}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Enroll button */}
                        <div className="mt-8 text-center">
                          <Button
                            onClick={() => handleEnrollClick(course.enrollmentLink)}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 text-lg"
                          >
                            Enroll Now
                            <ExternalLink className="w-5 h-5 ml-2" />
                          </Button>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
      </main>
    </div>
  );
};