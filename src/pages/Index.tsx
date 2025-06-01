
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, BookOpen, Search, FileText, Youtube, Linkedin, Twitter, Users, FlaskConical, GraduationCap, Newspaper, Briefcase, MessageCircle, Handshake, Trophy, ExternalLink, Dna, Molecule, HumanBrain } from "lucide-react";
import { AuthModal } from "@/components/auth/AuthModal";
import { ContactModal } from "@/components/contact/ContactModal";
import { SearchBar } from "@/components/search/SearchBar";
import { UserDashboard } from "@/components/dashboard/UserDashboard";
import { supabase } from "@/integrations/supabase/client";
import { User } from '@supabase/supabase-js';

const Index = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Counter animation states
  const [counters, setCounters] = useState({
    courses: 0,
    students: 0,
    projects: 0,
    partnerships: 0
  });

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Handle scroll for header color change
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate counters with 3x slower speed
  useEffect(() => {
    const targets = { courses: 11, students: 10, projects: 5, partnerships: 4 };
    const duration = 9000; // 3x slower than before (was 6000, now 9000)
    const increment = 225; // 3x slower (was 150, now 225)

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
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

  // If user is logged in, show dashboard
  if (user) {
    return <UserDashboard user={user} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 border-gray-300/30' 
          : 'bg-white/10 border-purple-300/30'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8 flex-1">
              <div className="flex items-center space-x-2 ml-16">
                <div className="w-8 h-8 flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/ab0b32e6-1d9c-493d-a917-e4007b0b8309.png" 
                    alt="Bioinformatics.lk" 
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <span className={`text-xl font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                }`}>
                  Bioinformatics.lk
                </span>
              </div>
              
              <nav className="hidden lg:flex items-center space-x-8 ml-8">
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection('team')}
                  className={`transition-all transform hover:scale-105 text-sm ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100' 
                      : 'text-purple-100 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Our Team
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection('research')}
                  className={`transition-all transform hover:scale-105 text-sm ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100' 
                      : 'text-purple-100 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Research
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection('courses')}
                  className={`transition-all transform hover:scale-105 text-sm ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100' 
                      : 'text-purple-100 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Our Courses
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection('news')}
                  className={`transition-all transform hover:scale-105 text-sm ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100' 
                      : 'text-purple-100 hover:text-white hover:bg-white/10'
                  }`}
                >
                  News
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection('services')}
                  className={`transition-all transform hover:scale-105 text-sm ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100' 
                      : 'text-purple-100 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Our Services
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setContactModalOpen(true)}
                  className={`transition-all transform hover:scale-105 text-sm ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100' 
                      : 'text-purple-100 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Contact Us
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection('partnerships')}
                  className={`transition-all transform hover:scale-105 text-sm ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100' 
                      : 'text-purple-100 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Our Partnerships
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection('success-stories')}
                  className={`transition-all transform hover:scale-105 text-sm ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100' 
                      : 'text-purple-100 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Success Stories
                </Button>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              {searchOpen && (
                <div className="hidden md:block">
                  <SearchBar />
                </div>
              )}
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(!searchOpen)}
                className={`transition-all ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100' 
                    : 'text-white hover:text-white hover:bg-white/10'
                }`}
              >
                <Search className="h-6 w-6" />
              </Button>
              
              <Button
                onClick={() => setAuthModalOpen(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white transition-all transform hover:scale-105"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-indigo-900/50 backdrop-blur-sm">
        <div className="absolute inset-0 bg-white/5"></div>
        
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          {/* Mobile Search Bar */}
          {searchOpen && (
            <div className="flex justify-center mb-8 md:hidden">
              <SearchBar />
            </div>
          )}
          
          {/* Main Hero Content - Split Layout */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
            {/* Left Side - Text Content */}
            <div className="text-white space-y-4 lg:space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold leading-tight text-left">
                Accelerating <span className="text-purple-300">Bioinformatics</span> Innovation
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-purple-100 leading-relaxed text-left">
                Empowering researchers and students in genomics, proteomics, and computational biology through world-class education and cutting-edge research.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-start">
                <Button 
                  size="lg" 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg transition-all transform hover:scale-105"
                  onClick={() => scrollToSection('courses')}
                >
                  Explore Courses
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-purple-300/30 text-black bg-white/90 hover:bg-white hover:text-black px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg transition-all transform hover:scale-105 font-semibold"
                  onClick={() => scrollToSection('research')}
                >
                  View Research
                </Button>
              </div>
            </div>

            {/* Right Side - Video */}
            <div className="relative hidden lg:block">
              <div className="relative w-full h-64 md:h-80 lg:h-96 bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-2xl border-2 border-purple-300/50 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10"></div>
                <iframe 
                  src="https://player.vimeo.com/video/1089037562?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&background=1"
                  frameBorder="0" 
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                  className="w-full h-full relative z-10"
                  title="Bioinformatics Showcase"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Counters Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{counters.courses.toString().padStart(2, '0')}</div>
              <div className="text-purple-200 text-sm md:text-base">Number of Courses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{counters.students.toString().padStart(2, '0')}</div>
              <div className="text-purple-200 text-sm md:text-base">Students Enrolled</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{counters.projects.toString().padStart(2, '0')}</div>
              <div className="text-purple-200 text-sm md:text-base">Research Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{counters.partnerships.toString().padStart(2, '0')}</div>
              <div className="text-purple-200 text-sm md:text-base">Partnerships</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-12 md:py-20 bg-white" id="team">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <div className="inline-block bg-[#AFA9FF] px-6 py-3 rounded-lg mb-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Team</h2>
            </div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Meet our expert team of researchers and educators
            </p>
          </div>
          
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
              <Card key={index} className="bg-white border-2 border-transparent bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:shadow-lg transition-all transform hover:scale-105 shadow-md">
                <CardHeader className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-600 to-purple-600">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle 
                    className="text-black cursor-pointer hover:text-[#190EA8] hover:font-bold hover:underline transition-all flex items-center justify-center gap-2"
                    onClick={() => handleTeamMemberClick(member.url)}
                  >
                    {member.name}
                    <ExternalLink className="h-4 w-4" />
                  </CardTitle>
                  <CardDescription className="text-gray-700">{member.qualification}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section className="py-12 md:py-20 bg-white" id="research">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <div className="inline-block bg-[#EEBBFF] px-6 py-3 rounded-lg mb-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Research Areas</h2>
            </div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Pioneering research in bioinformatics, cheminformatics, computational chemistry and AI-driven drug discovery applications
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <Card className="bg-white border-2 border-transparent bg-gradient-to-r from-blue-600/10 to-purple-600/10 hover:bg-white/90 transition-all transform hover:scale-105 shadow-lg">
              <div className="relative overflow-hidden">
                <img 
                  src="/lovable-uploads/7f777ef7-1b68-4be2-8518-94fbe3d1c86e.png" 
                  alt="Bioinformatics Research"
                  className="w-full h-48 object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                  <Dna className="h-6 w-6 text-purple-600" />
                  Bioinformatics
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Identification of Active Compounds in Sri Lankan Medicinal Plants as Antivirals Against African Swine Fever
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border-2 border-transparent bg-gradient-to-r from-blue-600/10 to-purple-600/10 hover:bg-white/90 transition-all transform hover:scale-105 shadow-lg">
              <div className="relative overflow-hidden">
                <img 
                  src="/lovable-uploads/9b130339-4a9e-4910-8516-0d16b6a30c73.png" 
                  alt="Cheminformatics Research"
                  className="w-full h-48 object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                  <Molecule className="h-6 w-6 text-purple-600" />
                  Cheminformatics
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Development of globally accessible comprehensive database with an AI-integrated web platform cataloging endemic medicinal plants with detailed information.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border-2 border-transparent bg-gradient-to-r from-blue-600/10 to-purple-600/10 hover:bg-white/90 transition-all transform hover:scale-105 shadow-lg">
              <div className="relative overflow-hidden">
                <img 
                  src="/lovable-uploads/b285632b-3423-4b61-b1e2-20607153ff98.png" 
                  alt="AI-driven Drug Discovery Research"
                  className="w-full h-48 object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                  <HumanBrain className="h-6 w-6 text-purple-600" />
                  AI-driven Drug Discovery
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Discovery of Antiviral Compounds from Sri Lankan Medicinal Plants and Deep Learning Based De Novo Design and Bioactivity Prediction of Natural-Product-Inspired Inhibitors Against Livestock and Aquaculture Viral Diseases.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Courses Section */}
      <section className="py-12 md:py-20 bg-white" id="courses">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <div className="inline-block bg-[#BBF7FF] px-6 py-3 rounded-lg mb-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Courses</h2>
            </div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Unlock the power of bioinformatics, cheminformatics, computational chemistry, and AI in drug discovery with our dynamic and comprehensive course offerings, designed to empower you with both foundational and advanced insights
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "Introduction to Bioinformatics",
                description: "Learn the fundamentals of biological data analysis, sequence alignment, and database searching.",
                image: "/lovable-uploads/4e188a16-d71f-4a8b-a106-11f470010a4f.png"
              },
              {
                title: "Network Pharmacology",
                description: "Explore drug-target interactions and molecular networks in pharmaceutical research.",
                image: "/lovable-uploads/d1b14824-ca0c-46d3-b10a-1c79874bc655.png"
              },
              {
                title: "Molecular Docking",
                description: "Master computational methods for predicting molecular binding and drug design.",
                image: "/lovable-uploads/2b975c3d-b2b0-487e-a418-c7c4853ddbaa.png"
              },
              {
                title: "Molecular Dynamics",
                description: "Simulate molecular behavior and protein folding using advanced computational techniques.",
                image: "/lovable-uploads/78d5a7b4-78cf-48e5-a432-8686026b08b6.png"
              },
              {
                title: "AI and ML in Drug Discovery",
                description: "Apply machine learning and AI techniques to accelerate drug discovery processes.",
                image: "/lovable-uploads/a574e257-4cfe-41e2-8a21-472924163bf2.png"
              },
              {
                title: "Introduction to Cheminformatics",
                description: "Learn chemical information processing and molecular property prediction methods.",
                image: "/lovable-uploads/98298637-f3f3-4bba-b8ca-01d994276f78.png"
              }
            ].map((course, index) => (
              <Card 
                key={index} 
                className="bg-white border-2 border-transparent bg-gradient-to-r from-blue-600/10 to-purple-600/10 hover:shadow-lg transition-all transform hover:scale-105 shadow-md cursor-pointer"
                onClick={handleLearnMore}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl text-black hover:text-[#0090A3] transition-all">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-sm md:text-base text-gray-700">
                    {course.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-12 md:py-20 bg-white" id="services">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Professional bioinformatics and computational biology services
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              "Network Pharmacology",
              "Molecular Docking", 
              "Molecular Dynamics Simulation",
              "AI and ML in Drug Discovery",
              "Research Article Writing",
              "Drug Formulation Development"
            ].map((service, index) => (
              <Card 
                key={index} 
                className="bg-white border-2 border-transparent bg-gradient-to-r from-blue-600/10 to-purple-600/10 hover:shadow-lg transition-all transform hover:scale-105 shadow-md cursor-pointer"
                onClick={handleLearnMore}
              >
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent text-center hover:from-purple-700 hover:to-blue-700 transition-all">
                    {service}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Partnerships Section */}
      <section className="py-12 md:py-20 bg-white" id="partnerships">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Partnerships</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Collaborating with leading institutions worldwide
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {[
              {
                category: "Academics",
                partner: "University of Peradeniya, Faculty of Agriculture, Department of Animal Science",
                url: "https://agri.pdn.ac.lk/ansc/"
              },
              {
                category: "Open Source",
                partners: [
                  { name: "Institute of Scientific Informatics", url: "https://www.linkedin.com/company/institute-of-scientific-informatics/?viewAsMember=true" },
                  { name: "Global Chemistry Inc, U.S.A", url: "https://globalchemistry.org/" }
                ]
              },
              {
                category: "Education and Research",
                partner: "Chemo-Informatics Academy, Nigeria",
                url: "https://www.linkedin.com/company/chemoinformatics-academy/posts/?feedView=all"
              },
              {
                category: "Industry",
                partner: "Standard Seed Corporation, Delaware, Wilmington, U.S.A",
                url: "https://standardseedai.com/"
              }
            ].map((partnership, index) => (
              <Card key={index} className="bg-white border-2 border-transparent bg-gradient-to-r from-blue-600/10 to-purple-600/10 hover:shadow-lg transition-all transform hover:scale-105 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl text-purple-600">
                    {partnership.category}
                  </CardTitle>
                  {partnership.partners ? (
                    <div className="space-y-2">
                      {partnership.partners.map((partner, partnerIndex) => (
                        <CardDescription 
                          key={partnerIndex} 
                          className="text-sm md:text-base text-gray-700 border-l-2 border-purple-300 pl-3 cursor-pointer hover:text-purple-600 hover:underline transition-all"
                          onClick={() => handlePartnershipClick(partner.url)}
                        >
                          {partner.name}
                        </CardDescription>
                      ))}
                    </div>
                  ) : (
                    <CardDescription 
                      className="text-sm md:text-base text-gray-700 cursor-pointer hover:text-purple-600 hover:underline transition-all"
                      onClick={() => handlePartnershipClick(partnership.url!)}
                    >
                      {partnership.partner}
                    </CardDescription>
                  )}
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News & Updates Section */}
      <section className="py-12 md:py-20 bg-white" id="news">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Latest News & Updates</h2>
            <p className="text-lg md:text-xl text-gray-600">Stay informed about the latest developments in bioinformatics</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                date: "Dec 15, 2024",
                title: "New Genomics Lab Launched",
                preview: "State-of-the-art computational genomics facility opens to support advanced research projects.",
                image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop&crop=center"
              },
              {
                date: "Dec 10, 2024", 
                title: "AI Workshop Series Begins",
                preview: "Comprehensive workshop series on artificial intelligence applications in biological research.",
                image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop&crop=center"
              },
              {
                date: "Dec 5, 2024",
                title: "Research Collaboration Announced",
                preview: "Partnership with international institutions to advance bioinformatics research capabilities.",
                image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop&crop=center"
              }
            ].map((article, index) => (
              <Card key={index} className="bg-white border-2 border-transparent bg-gradient-to-r from-blue-600/10 to-purple-600/10 hover:shadow-lg transition-all transform hover:scale-105 shadow-md">
                <div className="relative overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="text-sm text-purple-600 font-medium mb-2">{article.date}</div>
                  <CardTitle className="text-lg md:text-xl text-gray-800">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-sm md:text-base text-gray-700">{article.preview}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button variant="link" className="p-0 text-purple-600 hover:text-purple-800">
                    Read More →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-12 md:py-20 bg-white" id="success-stories">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Success Stories</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our students and their achievements
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "PhD Student",
                testimonial: "The bioinformatics course transformed my research approach. The practical skills I gained have been invaluable in my PhD work.",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
              },
              {
                name: "Michael Chen",
                role: "Research Scientist",
                testimonial: "Excellent instruction in molecular docking. The knowledge helped me secure a position at a leading pharmaceutical company.",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
              },
              {
                name: "Emily Rodriguez",
                role: "Biotech Startup Founder",
                testimonial: "The AI in drug discovery course gave me the foundation to start my own biotech company. Highly recommended!",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
              }
            ].map((story, index) => (
              <Card key={index} className="bg-white border-2 border-transparent bg-gradient-to-r from-blue-600/10 to-purple-600/10 hover:shadow-lg transition-all transform hover:scale-105 shadow-md">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-600 to-purple-600">
                    <img 
                      src={story.image} 
                      alt={story.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-purple-600">{story.name}</CardTitle>
                  <CardDescription className="text-gray-700">{story.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm italic">"{story.testimonial}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-indigo-900/50 backdrop-blur-sm text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 lg:gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/ab0b32e6-1d9c-493d-a917-e4007b0b8309.png" 
                    alt="Bioinformatics.lk" 
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <span className="text-xl font-bold">Bioinformatics.lk</span>
              </div>
              <p className="text-purple-200 leading-relaxed text-sm md:text-base">
                Advancing bioinformatics education and research in Sri Lanka through innovative programs and cutting-edge technology.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-300">Quick Links</h3>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('team')} className="text-purple-200 hover:text-white transition-colors text-sm md:text-base">Our Team</button></li>
                <li><button onClick={() => scrollToSection('research')} className="text-purple-200 hover:text-white transition-colors text-sm md:text-base">Research</button></li>
                <li><button onClick={() => scrollToSection('courses')} className="text-purple-200 hover:text-white transition-colors text-sm md:text-base">Courses</button></li>
                <li><button onClick={() => scrollToSection('services')} className="text-purple-200 hover:text-white transition-colors text-sm md:text-base">Services</button></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-300">Programs</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-purple-200 hover:text-white transition-colors text-sm md:text-base">Certificate Courses</a></li>
                <li><a href="#" className="text-purple-200 hover:text-white transition-colors text-sm md:text-base">Workshops</a></li>
                <li><a href="#" className="text-purple-200 hover:text-white transition-colors text-sm md:text-base">Research Projects</a></li>
                <li><a href="#" className="text-purple-200 hover:text-white transition-colors text-sm md:text-base">Collaborations</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-300">Connect With Us</h3>
              <div className="space-y-4">
                <p className="text-purple-200 text-sm md:text-base">
                  Email: info@bioinformatics.lk<br />
                  Phone: +94 11 234 5678
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-purple-600/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-purple-600/50 transition-colors border border-purple-300/30">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-purple-600/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-purple-600/50 transition-colors border border-purple-300/30">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-purple-600/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-purple-600/50 transition-colors border border-purple-300/30">
                    <Youtube className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-purple-300/30 mt-8 lg:mt-12 pt-6 lg:pt-8 text-center text-purple-200">
            <p className="text-sm md:text-base">&copy; 2024 Bioinformatics.lk. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </div>
  );
};

export default Index;
