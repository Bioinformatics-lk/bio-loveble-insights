
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, BookOpen, Search, FileText, Youtube, Linkedin, Twitter, Users, FlaskConical, GraduationCap, Newspaper, Briefcase, MessageCircle, Handshake, Trophy } from "lucide-react";
import { AuthModal } from "@/components/auth/AuthModal";
import { ContactModal } from "@/components/contact/ContactModal";
import { SearchBar } from "@/components/search/SearchBar";
import { supabase } from "@/integrations/supabase/client";
import { User } from '@supabase/supabase-js';

const Index = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

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

  // Animate counters
  useEffect(() => {
    const targets = { courses: 6, students: 11, projects: 10, partnerships: 4 };
    const duration = 2000;
    const increment = 50;

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/10 backdrop-blur-md border-b border-purple-300/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 ml-8">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  <FlaskConical className="text-white h-5 w-5" />
                </div>
                <span className="text-xl font-bold text-white">Bioinformatics.lk</span>
              </div>
              
              <nav className="hidden lg:flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection('team')}
                  className="text-purple-100 hover:text-white hover:bg-white/10 transition-all transform hover:scale-105 text-sm"
                >
                  Our Team
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection('research')}
                  className="text-purple-100 hover:text-white hover:bg-white/10 transition-all transform hover:scale-105 text-sm"
                >
                  Research
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection('courses')}
                  className="text-purple-100 hover:text-white hover:bg-white/10 transition-all transform hover:scale-105 text-sm"
                >
                  Our Courses
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection('news')}
                  className="text-purple-100 hover:text-white hover:bg-white/10 transition-all transform hover:scale-105 text-sm"
                >
                  News
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection('services')}
                  className="text-purple-100 hover:text-white hover:bg-white/10 transition-all transform hover:scale-105 text-sm"
                >
                  Our Services
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setContactModalOpen(true)}
                  className="text-purple-100 hover:text-white hover:bg-white/10 transition-all transform hover:scale-105 text-sm"
                >
                  Contact Us
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection('partnerships')}
                  className="text-purple-100 hover:text-white hover:bg-white/10 transition-all transform hover:scale-105 text-sm"
                >
                  Our Partnerships
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection('success-stories')}
                  className="text-purple-100 hover:text-white hover:bg-white/10 transition-all transform hover:scale-105 text-sm"
                >
                  Success Stories
                </Button>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <SearchBar />
              </div>
              
              {user ? (
                <div className="flex items-center gap-2">
                  <span className="text-purple-100 text-sm">Welcome!</span>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="border-purple-300/30 text-purple-100 hover:bg-white/10"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setAuthModalOpen(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-indigo-900/50 backdrop-blur-sm">
        <div className="absolute inset-0 bg-white/5"></div>
        
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          {/* Mobile Search Bar */}
          <div className="flex justify-center mb-8 md:hidden">
            <SearchBar />
          </div>
          
          <div className="text-center">
            <div className="text-white space-y-4 lg:space-y-6 mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold leading-tight">
                Accelerating <span className="text-purple-300">Bioinformatics</span> Innovation
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-purple-100 leading-relaxed max-w-4xl mx-auto">
                Empowering researchers and students in genomics, proteomics, and computational biology through world-class education and cutting-edge research.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg transition-all transform hover:scale-105"
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

            {/* Video Section - Hidden on mobile */}
            <div className="relative mb-12 hidden md:block">
              <div className="relative w-full max-w-4xl mx-auto h-64 md:h-80 lg:h-96 bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-2xl border-2 border-purple-300/50 overflow-hidden shadow-2xl">
                <iframe 
                  src="https://player.vimeo.com/video/1089037562?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&background=1"
                  frameBorder="0" 
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                  className="w-full h-full"
                  title="Bioinformatics Showcase"
                ></iframe>
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
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-12 md:py-20 bg-white/5 backdrop-blur-sm" id="team">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Team</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Meet our expert team of researchers and educators
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                name: "Dr. Lakmal Ranathunga",
                qualification: "PhD in Veterinary Medicine",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
              },
              {
                name: "Mrs. Saumya Poorni",
                qualification: "PhD in Aquaculture (Reading)",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
              },
              {
                name: "Mr. Anuththara Gamage",
                qualification: "B.Sc Honours, Research Scientist at Standard Seed Corporation",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
              }
            ].map((member, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white/90 transition-all transform hover:scale-105 shadow-lg">
                <CardHeader className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-gray-800">{member.name}</CardTitle>
                  <CardDescription className="text-gray-600">{member.qualification}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section className="py-12 md:py-20 bg-white/5 backdrop-blur-sm" id="research">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Research Areas</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Pioneering research in computational biology and bioinformatics applications
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white/90 transition-all transform hover:scale-105 shadow-lg">
              <div className="relative overflow-hidden">
                <img 
                  src="/lovable-uploads/7f777ef7-1b68-4be2-8518-94fbe3d1c86e.png" 
                  alt="Bioinformatics Research"
                  className="w-full h-48 object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                  <FlaskConical className="h-6 w-6 text-purple-600" />
                  Bioinformatics
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Identification of Active Compounds in Sri Lankan Medicinal Plants as Antivirals Against African Swine Fever
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white/90 transition-all transform hover:scale-105 shadow-lg">
              <div className="relative overflow-hidden">
                <img 
                  src="/lovable-uploads/9b130339-4a9e-4910-8516-0d16b6a30c73.png" 
                  alt="Cheminformatics Research"
                  className="w-full h-48 object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                  <Search className="h-6 w-6 text-purple-600" />
                  Cheminformatics
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Globally accessible comprehensive database with an AI-integrated web platform cataloging endemic medicinal plants with detailed information, their chemical structure information, molecular scaffolds, chemical classification, chemical structures, physicochemical properties, drug-likeness properties, ADMET properties, chemical descriptors, predicted viral target proteins, natural-product-inspired AI designed compounds.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white/90 transition-all transform hover:scale-105 shadow-lg">
              <div className="relative overflow-hidden">
                <img 
                  src="/lovable-uploads/b285632b-3423-4b61-b1e2-20607153ff98.png" 
                  alt="AI-driven Drug Discovery Research"
                  className="w-full h-48 object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-purple-600" />
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
      <section className="py-12 md:py-20 bg-white/5 backdrop-blur-sm" id="courses">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Courses</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Master the fundamentals and advanced concepts of bioinformatics through our comprehensive course offerings
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "Introduction to Bioinformatics",
                description: "Learn the fundamentals of biological data analysis, sequence alignment, and database searching.",
                image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop&crop=center"
              },
              {
                title: "Network Pharmacology",
                description: "Explore drug-target interactions and molecular networks in pharmaceutical research.",
                image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop&crop=center"
              },
              {
                title: "Molecular Docking",
                description: "Master computational methods for predicting molecular binding and drug design.",
                image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=250&fit=crop&crop=center"
              },
              {
                title: "Molecular Dynamics",
                description: "Simulate molecular behavior and protein folding using advanced computational techniques.",
                image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=250&fit=crop&crop=center"
              },
              {
                title: "AI and ML in Drug Discovery",
                description: "Apply machine learning and AI techniques to accelerate drug discovery processes.",
                image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop&crop=center"
              },
              {
                title: "Introduction to Cheminformatics",
                description: "Learn chemical information processing and molecular property prediction methods.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&crop=center"
              }
            ].map((course, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white/90 transition-all transform hover:scale-105 shadow-lg">
                <div className="relative overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl text-gray-800">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-sm md:text-base text-gray-600">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-colors"
                    onClick={handleLearnMore}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-12 md:py-20 bg-white/5 backdrop-blur-sm" id="services">
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
              <Card key={index} className="bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white/90 transition-all transform hover:scale-105 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl text-gray-800 text-center">
                    {service}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-colors"
                    onClick={handleLearnMore}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Partnerships Section */}
      <section className="py-12 md:py-20 bg-white/5 backdrop-blur-sm" id="partnerships">
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
                partner: "University of Peradeniya, Faculty of Agriculture, Department of Animal Science"
              },
              {
                category: "Open Source",
                partner: "Institute of Scientific Informatics, Global Chemistry Inc, U.S.A"
              },
              {
                category: "Education and Research",
                partner: "Chemo-Informatics Academy, Nigeria"
              },
              {
                category: "Industry",
                partner: "Standard Seed Corporation, Delaware, Wilmington, U.S.A"
              }
            ].map((partnership, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white/90 transition-all transform hover:scale-105 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl text-purple-600">
                    {partnership.category}
                  </CardTitle>
                  <CardDescription className="text-sm md:text-base text-gray-700">
                    {partnership.partner}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News & Updates Section */}
      <section className="py-12 md:py-20 bg-white/5 backdrop-blur-sm" id="news">
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
              <Card key={index} className="bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white/90 transition-all transform hover:scale-105 shadow-lg">
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
                  <CardDescription className="text-sm md:text-base text-gray-600">{article.preview}</CardDescription>
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
      <section className="py-12 md:py-20 bg-white/5 backdrop-blur-sm" id="success-stories">
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
              <Card key={index} className="bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white/90 transition-all transform hover:scale-105 shadow-lg">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src={story.image} 
                      alt={story.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-gray-800">{story.name}</CardTitle>
                  <CardDescription className="text-gray-600">{story.role}</CardDescription>
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
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  <FlaskConical className="text-white h-5 w-5" />
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
