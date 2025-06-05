import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, BookOpen, Search, FileText, Youtube, Linkedin, Twitter, Users, FlaskConical, GraduationCap, Newspaper, Briefcase, MessageCircle, Handshake, Trophy, ExternalLink, Dna, Atom, Brain, Network, Computer, Menu, X } from "lucide-react";
import { AuthModal } from "@/components/auth/AuthModal";
import { ContactModal } from "@/components/contact/ContactModal";
import { SearchBar } from "@/components/search/SearchBar";

const Index = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Counter animation states
  const [counters, setCounters] = useState({
    courses: 0,
    students: 0,
    projects: 0,
    partnerships: 0
  });

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animate counters with 3x slower speed
  useEffect(() => {
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

  const webPhotos = [
    '/lovable-uploads/Photo 01.jpg',
    '/lovable-uploads/Photo 03.jpg',
    '/lovable-uploads/Photo 04.jpg',
    '/lovable-uploads/Photo 06.jpg',
    '/lovable-uploads/Photo 09.jpg',
  ];

  const mobilePhotos = [
    '/lovable-uploads/Photo 01.jpg',
    '/lovable-uploads/Photo 02.jpg',
    '/lovable-uploads/Photo 03.jpg',
    '/lovable-uploads/Photo 04.jpg',
    '/lovable-uploads/Photo 05.jpg',
    '/lovable-uploads/Photo 06.jpg',
    '/lovable-uploads/Photo 07.jpg',
    '/lovable-uploads/Photo 08.jpg',
    '/lovable-uploads/Photo 09.jpg',
  ];

  const photos = isMobile ? mobilePhotos : webPhotos;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [photos.length]);

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
                  Bioinformatics.lk
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

        {/* Team Section */}
        <section id="team" className="relative py-20 bg-gradient-to-br from-[#000A33] to-[#363B6B] overflow-hidden">
          {/* Background Shapes */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#54366B]/20 blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#000A33]/40 blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#363B6B]/20 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Topic Section */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Be a Part of the Future
              </h2>
              <p className="text-xl text-purple-100 mb-8">
                Are you interested in joining a team where innovation happens?
              </p>
            </div>

            {/* Photo Slideshow */}
            <div className="relative h-[500px] md:h-[600px] mb-16 overflow-hidden rounded-3xl shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent z-10"></div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                >
                  <div className="relative w-full h-full">
                    <img
                      src={photos[currentSlide]}
                      alt={`Slide ${currentSlide + 1}`}
                      className="absolute inset-0 w-full h-full object-contain md:object-cover md:object-center"
                      style={{
                        objectPosition: isMobile ? 'center' : 'center 20%'
                      }}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slide Navigation */}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                <div className="flex items-center justify-between">
                  {/* Slide Indicators */}
                  <div className="flex space-x-3">
                    {photos.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          currentSlide === index 
                            ? 'bg-white scale-125' 
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Slide Controls */}
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setCurrentSlide((prev) => (prev - 1 + photos.length) % photos.length)}
                      className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
                    >
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setCurrentSlide((prev) => (prev + 1) % photos.length)}
                      className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
                    >
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Slide Counter */}
              <div className="absolute top-6 right-6 z-20 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-white text-sm font-medium">
                  {currentSlide + 1} / {photos.length}
                </span>
              </div>
            </div>

            {/* Team Introduction */}
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                Meet our expert team of researchers and educators
              </h3>
            </div>

            {/* Team Cards */}
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  name: "Dr. Lakmal Ranathunga",
                  qualification: "PhD in Veterinary Medicine",
                  image: "/lovable-uploads/99dec8fe-51c3-46ea-af63-6bd557692e29.png",
                  url: "https://agri.pdn.ac.lk/ansc/staff/academic_staff_detail/35"
                },
                {
                  name: "Mrs. Saumya Poorni",
                  qualification: "PhD in Aquaculture (Reading)",
                  image: "/lovable-uploads/a0ce1ac5-e01f-4cc3-a67a-42a5bc885eda.png",
                  url: "https://www.linkedin.com/in/saumya-poorni-73009a314/"
                },
                {
                  name: "Mr. Anuththara Gamage",
                  qualification: "B.Sc Honours, Research Scientist at Standard Seed Corporation",
                  image: "/lovable-uploads/b42b66f6-f7c5-4932-af71-ccf28ed41fbf.png",
                  url: "https://www.linkedin.com/in/anu-gamage-62192b201/"
                }
              ].map((member, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-md border-2 border-white/20 hover:border-white/40 transition-all transform hover:scale-105">
                  <CardHeader className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/20">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle 
                      className="text-white cursor-pointer hover:text-[#4ECDC4] transition-all flex items-center justify-center gap-2"
                      onClick={() => handleTeamMemberClick(member.url)}
                    >
                      {member.name}
                      <ExternalLink className="h-4 w-4" />
                    </CardTitle>
                    <CardDescription className="text-purple-100">{member.qualification}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-purple-100">Expert in bioinformatics and computational biology.</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Research Section */}
        <section id="research" className="py-20 bg-[#1a0b2e]/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Our Research</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Research Cards */}
              <Card className="bg-[#1a0b2e]/20 backdrop-blur-md border-[#2d1b69] hover:bg-[#2d1b69]/30 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white">AI in Drug Discovery</CardTitle>
                  <CardDescription className="text-purple-200">Machine Learning</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-100">Exploring the applications of AI in pharmaceutical research.</p>
                </CardContent>
              </Card>
              {/* Add more research cards */}
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section id="courses" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Our Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Course Cards */}
              <Card className="bg-[#1a0b2e]/20 backdrop-blur-md border-[#2d1b69] hover:bg-[#2d1b69]/30 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white">Bioinformatics Fundamentals</CardTitle>
                  <CardDescription className="text-purple-200">Beginner Level</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-100">Learn the basics of bioinformatics and computational biology.</p>
                </CardContent>
              </Card>
              {/* Add more course cards */}
            </div>
          </div>
        </section>

        {/* News Section */}
        <section id="news" className="py-20 bg-[#1a0b2e]/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Latest News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* News Cards */}
              <Card className="bg-[#1a0b2e]/20 backdrop-blur-md border-[#2d1b69] hover:bg-[#2d1b69]/30 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white">New Research Grant</CardTitle>
                  <CardDescription className="text-purple-200">Funding</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-100">We've received a major grant for our AI research project.</p>
                </CardContent>
              </Card>
              {/* Add more news cards */}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service Cards */}
              <Card className="bg-[#1a0b2e]/20 backdrop-blur-md border-[#2d1b69] hover:bg-[#2d1b69]/30 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white">Data Analysis</CardTitle>
                  <CardDescription className="text-purple-200">Bioinformatics</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-100">Professional bioinformatics data analysis services.</p>
                </CardContent>
              </Card>
              {/* Add more service cards */}
            </div>
          </div>
        </section>

        {/* Partnerships Section */}
        <section id="partnerships" className="py-20 bg-[#1a0b2e]/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Our Partnerships</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Partnership Cards */}
              <Card className="bg-[#1a0b2e]/20 backdrop-blur-md border-[#2d1b69] hover:bg-[#2d1b69]/30 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white">University of Colombo</CardTitle>
                  <CardDescription className="text-purple-200">Academic Partner</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-100">Collaborating on research and education initiatives.</p>
                </CardContent>
              </Card>
              {/* Add more partnership cards */}
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section id="success-stories" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Success Story Cards */}
              <Card className="bg-[#1a0b2e]/20 backdrop-blur-md border-[#2d1b69] hover:bg-[#2d1b69]/30 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white">Student Success</CardTitle>
                  <CardDescription className="text-purple-200">Graduate Story</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-100">How our courses helped launch a successful career in bioinformatics.</p>
                </CardContent>
              </Card>
              {/* Add more success story cards */}
            </div>
          </div>
        </section>
      </div>

      {/* Modals */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </div>
  );
};

export default Index; 