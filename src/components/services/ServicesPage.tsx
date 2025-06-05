'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import '@/styles/glow.css';
import { 
  Search,
  Network, 
  Atom, 
  Boxes, 
  Brain, 
  FlaskConical,
  ArrowLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

const services = [
  {
    title: "Literature Search",
    description: "A comprehensive review of scientific publications to gather existing knowledge, identify research gaps, and support hypothesis development in drug discovery and formulation research",
    icon: Search,
    color: "from-purple-600 to-blue-600",
    step: 1,
    position: "right",
    popupPosition: "left",
  },
  {
    title: "Network Pharmacology",
    description: "Analyzes complex biological networks and drug-target interactions to uncover multi-target effects and systemic mechanisms, providing insights into polypharmacology and personalized medicine strategies",
    icon: Network,
    color: "from-blue-600 to-cyan-600",
    step: 2,
    position: "left",
    popupPosition: "right",
  },
  {
    title: "Molecular Docking",
    description: "Predicts the preferred orientation of a small molecule when bound to a target protein, aiding in virtual screening and rational drug design by evaluating binding affinities and interactions",
    icon: Atom,
    color: "from-cyan-600 to-teal-600",
    step: 3,
    position: "right",
    popupPosition: "left",
  },
  {
    title: "Molecular Dynamics",
    description: "Simulates the physical movements of atoms and molecules over time, allowing researchers to study conformational changes, stability, and interactions of biomolecules at the atomic level",
    icon: Boxes,
    color: "from-teal-600 to-green-600",
    step: 4,
    position: "left",
    popupPosition: "right",
  },
  {
    title: "AI and ML in Drug Discovery",
    description: "Utilizes artificial intelligence and machine learning algorithms to accelerate drug discovery processes, predict bioactivity, optimize lead compounds, and uncover novel therapeutic opportunities",
    icon: Brain,
    color: "from-green-600 to-emerald-600",
    step: 5,
    position: "right",
    popupPosition: "left",
  },
  {
    title: "Drug Formulation Development",
    description: "Involves designing and optimizing pharmaceutical formulations to ensure drug stability, efficacy, safety, and controlled release, tailored for specific delivery methods and patient needs",
    icon: FlaskConical,
    color: "from-emerald-600 to-purple-600",
    step: 6,
    position: "left",
    popupPosition: "right",
  }
];

export const ServicesPage = () => {
  const navigate = useNavigate();
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [showMobileModal, setShowMobileModal] = useState(false);

  const handleCloseMobileModal = () => {
    setShowMobileModal(false);
    setSelectedService(null);
  };

  const handleRequestService = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSejWIeW3ETbj5Ogf1lxElT1_4JhQm_JNRVCV2W8-S2Svl5Cmw/viewform?usp=header', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#363B6B] to-[#000A33] relative overflow-hidden">
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
            Our Services
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
            Comprehensive bioinformatics and computational biology services for drug discovery and development
          </p>
        </div>

        {/* Mobile Service Details Modal */}
        <AnimatePresence>
          {selectedService !== null && showMobileModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
              onClick={handleCloseMobileModal}
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
                className="w-full max-w-md bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-lg shadow-xl p-6 relative"
                onClick={(e) => e.stopPropagation()}
              >
                {services.find(s => s.step === selectedService) && (
                  <div className="flex flex-col space-y-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-2xl font-bold text-white">
                        {services.find(s => s.step === selectedService)?.title}
                      </h3>
                      <button
                        onClick={handleCloseMobileModal}
                        className="text-white/70 hover:text-white transition-colors duration-200"
                        aria-label="Close modal"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-white/90 text-base leading-relaxed">
                      {services.find(s => s.step === selectedService)?.description}
                    </p>
                    <Button 
                      onClick={handleRequestService}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white mt-6 py-3"
                    >
                      Request Service
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Service Pipeline - Mobile */}
        <div className="lg:hidden space-y-4">
          {services.map((service, index) => (
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
                  bg-white/10 backdrop-blur-sm p-4
                `}
                onClick={() => {
                  setSelectedService(service.step);
                  setShowMobileModal(true);
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex flex-col items-center space-y-2">
                    {/* Step Number */}
                    <div className={`
                      w-8 h-8 rounded-full bg-gradient-to-r ${service.color}
                      flex items-center justify-center text-white font-bold text-sm shadow-lg
                    `}>
                      {service.step}
                    </div>
                    {/* Icon */}
                    <div className={`
                      w-8 h-8 rounded-full bg-gradient-to-r ${service.color}
                      flex items-center justify-center shadow-lg
                    `}>
                      <service.icon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  {/* Text Content */}
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-white">
                      {service.title}
                    </h3>
                    <p className="text-xs text-white/70 mt-1">
                      {service.description}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-white/70 mt-2" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Desktop Service Pipeline */}
        <div className="hidden lg:flex justify-center">
          <div className="relative max-w-4xl w-full">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/20" />
            
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: service.position === 'left' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex items-start mb-16 ${
                  service.position === 'left' ? 'justify-start pl-8' : 'flex-row-reverse pl-8'
                } relative`}
              >
                {/* Timeline Node */}
                <div 
                  className={`
                    absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
                    w-6 h-6 rounded-full bg-gradient-to-r ${service.color}
                    ${hoveredStep === service.step ? 'scale-150' : 'scale-100'}
                    transition-transform duration-300
                    shadow-lg z-10
                  `}
                />

                {/* Service Card */}
                <motion.div
                  className={`w-[calc(50%-2rem)] relative ${
                    service.position === 'left' ? 'text-left' : 'text-left'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className={`
                      transform transition-all duration-300 cursor-pointer
                      border-2 ${selectedService === service.step ? 'border-white/40' : hoveredStep === service.step ? 'border-white/30' : 'border-white/10'}
                      bg-white/10 backdrop-blur-sm relative z-10
                      ${service.position === 'left' ? 'mr-auto' : 'ml-auto'}
                      ${selectedService === service.step ? 'ring-2 ring-white/30' : ''}
                    `}
                    onClick={() => {
                      setSelectedService(selectedService === service.step ? null : service.step);
                      if (window.innerWidth < 1024) { // lg breakpoint
                        setShowMobileModal(true);
                      }
                    }}
                    onMouseEnter={() => setHoveredStep(service.step)}
                    onMouseLeave={() => setHoveredStep(null)}
                  >
                    <div className="p-6">
                      <div className={`flex flex-col items-center text-center space-y-4 ${
                        service.position === 'left' ? 'items-start' : 'items-start'
                      }`}>
                        {/* Step Number */}
                        <div className={`
                          w-12 h-12 rounded-full bg-gradient-to-r ${service.color}
                          flex items-center justify-center text-white font-bold text-xl
                          shadow-lg mb-2
                        `}>
                          {service.step}
                        </div>
                        {/* Icon */}
                        <div className={`
                          w-16 h-16 rounded-full bg-gradient-to-r ${service.color}
                          flex items-center justify-center shadow-lg
                        `}>
                          <service.icon className="h-8 w-8 text-white" />
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="cursor-pointer"
                        >
                          <h3 className={`
                            text-lg font-semibold
                            ${selectedService === service.step ? 'text-white !important' : 'text-white/70'}
                            transition-all duration-300
                            ${selectedService === service.step ? 'scale-110' : ''}
                          `}>
                            {service.title}
                          </h3>
                          <p className="text-sm mt-2 text-white/70 transition-colors duration-300">
                            {service.description}
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

        {/* Desktop Service Details Modal */}
        <AnimatePresence>
          {selectedService !== null && !showMobileModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="hidden lg:flex fixed inset-0 bg-black/60 backdrop-blur-sm z-50 items-center justify-center p-4 overflow-y-auto"
              onClick={() => setSelectedService(null)}
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
                {services.find(s => s.step === selectedService) && (
                  <div className="flex flex-col space-y-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`
                          w-16 h-16 rounded-full bg-gradient-to-r ${services.find(s => s.step === selectedService)?.color}
                          flex items-center justify-center shadow-lg
                        `}>
                          {(() => {
                            const Icon = services.find(s => s.step === selectedService)?.icon;
                            return Icon ? <Icon className="h-8 w-8 text-white" /> : null;
                          })()}
                        </div>
                        <h3 className="text-2xl font-bold text-white">
                          {services.find(s => s.step === selectedService)?.title}
                        </h3>
                      </div>
                      <button
                        onClick={() => setSelectedService(null)}
                        className="text-white/70 hover:text-white transition-colors duration-200"
                        aria-label="Close modal"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-lg leading-relaxed text-white/90">
                      {services.find(s => s.step === selectedService)?.description}
                    </p>
                    <Button 
                      onClick={handleRequestService}
                      className="w-full mt-4 py-6 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                    >
                      Request Service
                      <ExternalLink className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fiverr Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
            <img 
              src="/lovable-uploads/pngwing.com.png" 
              alt="Fiverr" 
              className="w-8 h-8 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <span className="text-white text-lg font-medium">
              We are available on Fiverr
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}; 