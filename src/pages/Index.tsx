import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, BookOpen, Search, FileText, Youtube, Linkedin, Twitter, Users, FlaskConical, GraduationCap, Newspaper, Briefcase, MessageCircle, Handshake, Trophy, ExternalLink, Dna, Atom, Brain, Network, Computer, Menu, X } from "lucide-react";
import { AuthModal } from "@/components/auth/AuthModal";
import { ContactModal } from "@/components/contact/ContactModal";
import { SearchBar } from "@/components/search/SearchBar";
import { motion } from 'framer-motion';

const Index = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Counter animation states
  const [counters, setCounters] = useState({
    courses: 0,
    students: 0,
    projects: 0,
    partnerships: 0
  });

  // Animate counters with 3x slower speed
  React.useEffect(() => {
    const targets = { courses: 6, students: 10, projects: 5, partnerships: 5 };
    const duration = 9000;
    const increment = 225;

    const timer = setInterval(() => {
      setCounters(prev => {
        const newCounters = { ...prev };
        let allComplete = true;

        Object.keys(targets).forEach(key => {
          if (newCounters[key as keyof typeof newCounters] < targets[key as keyof typeof targets]) {
            newCounters[key as keyof typeof newCounters] = Math.min(
              newCounters[key as keyof typeof newCounters] + 1,
              targets[key as keyof typeof targets]
            );
            allComplete = false;
          }
        });

        if (allComplete) {
          clearInterval(timer);
        }

        return newCounters;
      });
    }, increment);

    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLearnMore = () => {
    setAuthModalOpen(true);
  };

  const handleTeamMemberClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handlePartnershipClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#170056] via-[#410056] to-[#54366B] relative">
      <style>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .delay-200 { transition-delay: 200ms; }
        .delay-400 { transition-delay: 400ms; }
        .delay-600 { transition-delay: 600ms; }
      `}</style>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/lovable-uploads/Background.png')] bg-cover bg-center opacity-20"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold text-white mb-8"
              >
                Welcome to Bioinformatics.lk
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-purple-100 mb-12"
              >
                Your gateway to cutting-edge bioinformatics education and services
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Button
                  onClick={() => setAuthModalOpen(true)}
                  className="bg-white text-purple-900 hover:bg-purple-100 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Started
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Navigation Header */}
        <header className="sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo and Brand Name - Left Side */}
              <div className="flex items-center">
                <div className="w-8 h-8 flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/76f3562a-0d90-4bbc-a1b8-640acc56da80.png" 
                    alt="Bioinformatics.lk" 
                    className="w-8 h-8 object-contain transition-all duration-300"
                  />
                </div>
                <span className="text-xl font-bold transition-colors duration-300 ml-0.5">
                  ioinformatics.lk
                </span>
              </div>

              {/* Mobile Menu Button */}
              <div className="flex items-center md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="transition-all w-12 h-12"
                >
                  {mobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
                </Button>
              </div>

              {/* Navigation Links - Center */}
              <nav className="hidden lg:flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection('team')}
                  className="transition-all transform hover:scale-105 text-sm"
                >
                  Our Team
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection('research')}
                  className="transition-all transform hover:scale-105 text-sm"
                >
                  Research
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection('courses')}
                  className="transition-all transform hover:scale-105 text-sm"
                >
                  Our Courses
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection('news')}
                  className="transition-all transform hover:scale-105 text-sm"
                >
                  News
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection('services')}
                  className="transition-all transform hover:scale-105 text-sm"
                >
                  Our Services
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setContactModalOpen(true)}
                  className="transition-all transform hover:scale-105 text-sm"
                >
                  Contact Us
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection('partnerships')}
                  className="transition-all transform hover:scale-105 text-sm"
                >
                  Our Partnerships
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection('success-stories')}
                  className="transition-all transform hover:scale-105 text-sm"
                >
                  Success Stories
                </Button>
              </nav>

              {/* Right Side - Search and Login */}
              <div className="flex items-center gap-4">
                {/* Search Bar */}
                <SearchBar onClose={() => setSearchOpen(false)} />
                
                <Button
                  onClick={() => setAuthModalOpen(true)}
                  className="bg-[#54366B] hover:bg-[#410056] text-[#EAE3F5] border border-[#EAE3F5]/20 transition-all transform hover:scale-105 shadow-lg rounded-full"
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-[#170056]/95 backdrop-blur-md">
            <div className="container mx-auto px-4 py-8">
              <div className="flex justify-end mb-8">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white hover:bg-white/10"
                >
                  <X className="h-8 w-8" />
                </Button>
              </div>
              <nav className="flex flex-col space-y-4">
                <Button
                  variant="ghost"
                  onClick={() => {
                    scrollToSection('team');
                    setMobileMenuOpen(false);
                  }}
                  className="text-white hover:bg-white/10 text-lg py-6"
                >
                  Our Team
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    scrollToSection('research');
                    setMobileMenuOpen(false);
                  }}
                  className="text-white hover:bg-white/10 text-lg py-6"
                >
                  Research
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    scrollToSection('courses');
                    setMobileMenuOpen(false);
                  }}
                  className="text-white hover:bg-white/10 text-lg py-6"
                >
                  Our Courses
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    scrollToSection('news');
                    setMobileMenuOpen(false);
                  }}
                  className="text-white hover:bg-white/10 text-lg py-6"
                >
                  News
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    scrollToSection('services');
                    setMobileMenuOpen(false);
                  }}
                  className="text-white hover:bg-white/10 text-lg py-6"
                >
                  Our Services
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setContactModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="text-white hover:bg-white/10 text-lg py-6"
                >
                  Contact Us
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    scrollToSection('partnerships');
                    setMobileMenuOpen(false);
                  }}
                  className="text-white hover:bg-white/10 text-lg py-6"
                >
                  Our Partnerships
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    scrollToSection('success-stories');
                    setMobileMenuOpen(false);
                  }}
                  className="text-white hover:bg-white/10 text-lg py-6"
                >
                  Success Stories
                </Button>
              </nav>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </div>
  );
};

export default Index; 