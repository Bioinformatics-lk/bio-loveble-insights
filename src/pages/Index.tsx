import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, BookOpen, Search, FileText, Youtube, Linkedin, Twitter, Dna } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header - Schrodinger Style */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-[#003057] to-[#00AEEF] rounded-full flex items-center justify-center">
                <Dna className="text-white h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-[#003057]">Bioinformatics.lk</span>
            </div>
            
            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-[#222222] hover:text-[#00AEEF] transition-colors font-medium">Home</a>
              <a href="#" className="text-[#222222] hover:text-[#00AEEF] transition-colors font-medium">About</a>
              <a href="#" className="text-[#222222] hover:text-[#00AEEF] transition-colors font-medium">Courses</a>
              <a href="#" className="text-[#222222] hover:text-[#00AEEF] transition-colors font-medium">Research</a>
              <a href="#" className="text-[#222222] hover:text-[#00AEEF] transition-colors font-medium">News</a>
              <a href="#" className="text-[#222222] hover:text-[#00AEEF] transition-colors font-medium">Contact</a>
            </nav>

            {/* CTA Button */}
            <Button className="hidden md:inline-flex bg-[#00AEEF] hover:bg-[#003057] transition-colors">
              Get Started
            </Button>

            {/* Mobile Menu Button */}
            <button className="md:hidden">
              <ChevronDown className="h-6 w-6 text-[#003057]" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section - Schrodinger Inspired */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#003057] to-[#00AEEF]">
        {/* Animated Molecular Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 animate-spin">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="20" cy="20" r="4" fill="white" className="animate-pulse" />
              <circle cx="50" cy="30" r="3" fill="white" className="animate-pulse delay-300" />
              <circle cx="80" cy="20" r="4" fill="white" className="animate-pulse delay-700" />
              <circle cx="30" cy="60" r="3" fill="white" className="animate-pulse delay-500" />
              <circle cx="70" cy="70" r="4" fill="white" className="animate-pulse delay-200" />
              <line x1="20" y1="20" x2="50" y2="30" stroke="white" strokeWidth="1" />
              <line x1="50" y1="30" x2="80" y2="20" stroke="white" strokeWidth="1" />
              <line x1="20" y1="20" x2="30" y2="60" stroke="white" strokeWidth="1" />
              <line x1="50" y1="30" x2="70" y2="70" stroke="white" strokeWidth="1" />
            </svg>
          </div>
          <div className="absolute top-40 right-20 w-24 h-24 animate-spin" style={{animationDirection: 'reverse', animationDuration: '20s'}}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="30" cy="30" r="5" fill="white" className="animate-pulse delay-100" />
              <circle cx="70" cy="30" r="4" fill="white" className="animate-pulse delay-400" />
              <circle cx="50" cy="70" r="5" fill="white" className="animate-pulse delay-600" />
              <line x1="30" y1="30" x2="70" y2="30" stroke="white" strokeWidth="1" />
              <line x1="30" y1="30" x2="50" y2="70" stroke="white" strokeWidth="1" />
              <line x1="70" y1="30" x2="50" y2="70" stroke="white" strokeWidth="1" />
            </svg>
          </div>
        </div>
        
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Accelerating <span className="text-[#00AEEF]">Bioinformatics</span> Innovation
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                Empowering researchers and students in genomics, proteomics, and computational biology through world-class education and cutting-edge research.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-[#00AEEF] hover:bg-white hover:text-[#003057] text-white px-8 py-4 text-lg transition-all">
                  Explore Courses
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#003057] px-8 py-4 text-lg transition-all">
                  View Research
                </Button>
              </div>
            </div>
            <div className="relative">
              {/* Video Showcase Window */}
              <div className="w-full h-96 bg-white/10 rounded-3xl backdrop-blur-sm border border-white/20 flex items-center justify-center relative overflow-hidden">
                {/* Vimeo Video Embed */}
                <div className="w-full h-full rounded-3xl overflow-hidden">
                  <iframe 
                    src="https://player.vimeo.com/video/1089032788?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&background=1"
                    frameBorder="0" 
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                    className="w-full h-full object-cover"
                    title="Bioinformatics Showcase"
                  ></iframe>
                </div>
              </div>
              {/* Floating molecular elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#00AEEF]/30 rounded-full backdrop-blur-sm animate-pulse flex items-center justify-center">
                <Dna className="text-white h-8 w-8" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/30 rounded-full backdrop-blur-sm animate-pulse delay-1000 flex items-center justify-center">
                <Search className="text-white h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section - Schrodinger Colors */}
      <section className="py-20 bg-[#F4F4F4]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-[#003057]">
                Advancing Sri Lankan <span className="text-[#00AEEF]">Bioinformatics</span>
              </h2>
              <p className="text-lg text-[#222222] leading-relaxed">
                Bioinformatics.lk is Sri Lanka's premier platform for bioinformatics education and research. 
                We bridge the gap between traditional biology and modern computational methods, providing 
                comprehensive training and fostering innovative research in genomics, proteomics, and 
                artificial intelligence applications in life sciences.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#00AEEF]">500+</div>
                  <div className="text-[#222222]">Students Trained</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#00AEEF]">25+</div>
                  <div className="text-[#222222]">Research Projects</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=600&h=400&fit=crop&crop=center" 
                alt="Research and innovation" 
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              {/* Protein overlay */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-[#003057]/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg viewBox="0 0 40 40" className="w-8 h-8 text-[#00AEEF] animate-spin" style={{animationDuration: '8s'}}>
                  <circle cx="20" cy="10" r="3" fill="currentColor" />
                  <circle cx="30" cy="20" r="3" fill="currentColor" />
                  <circle cx="20" cy="30" r="3" fill="currentColor" />
                  <circle cx="10" cy="20" r="3" fill="currentColor" />
                  <line x1="20" y1="10" x2="30" y2="20" stroke="currentColor" strokeWidth="1" />
                  <line x1="30" y1="20" x2="20" y2="30" stroke="currentColor" strokeWidth="1" />
                  <line x1="20" y1="30" x2="10" y2="20" stroke="currentColor" strokeWidth="1" />
                  <line x1="10" y1="20" x2="20" y2="10" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#003057] mb-4">Featured Courses</h2>
            <p className="text-xl text-[#222222] max-w-3xl mx-auto">
              Master the fundamentals and advanced concepts of bioinformatics through our comprehensive course offerings
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Introduction to Bioinformatics",
                description: "Learn the fundamentals of biological data analysis, sequence alignment, and database searching.",
                image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop&crop=center",
                duration: "8 weeks",
                level: "Beginner"
              },
              {
                title: "Genomics & Next-Gen Sequencing",
                description: "Explore genome assembly, variant calling, and RNA-seq analysis using modern tools.",
                image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=250&fit=crop&crop=center",
                duration: "10 weeks",
                level: "Intermediate"
              },
              {
                title: "AI in Drug Discovery",
                description: "Apply machine learning and AI techniques to accelerate drug discovery processes.",
                image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop&crop=center",
                duration: "12 weeks",
                level: "Advanced"
              }
            ].map((course, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-[#00AEEF]">
                <div className="relative overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-[#003057] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {course.level}
                  </div>
                  {/* Molecular icon overlay */}
                  <div className="absolute bottom-4 left-4 w-8 h-8 bg-[#00AEEF]/80 rounded-full flex items-center justify-center">
                    <Dna className="h-4 w-4 text-white" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-[#00AEEF] transition-colors text-[#003057]">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-[#222222]">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-[#222222]">Duration: {course.duration}</span>
                  </div>
                  <Button className="w-full bg-[#00AEEF] hover:bg-[#003057] transition-colors">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Research Highlights Section */}
      <section className="py-20 bg-[#003057] text-white relative overflow-hidden">
        {/* Background molecular pattern */}
        <div className="absolute inset-0 opacity-5">
          {Array.from({length: 12}).map((_, i) => (
            <div 
              key={i}
              className="absolute animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: '3s'
              }}
            >
              <Dna className="h-8 w-8" />
            </div>
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Research Initiatives</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Pioneering research in computational biology and bioinformatics applications
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="h-12 w-12" />,
                title: "Genomics Research",
                description: "Advanced genome analysis and population genetics studies focusing on South Asian populations."
              },
              {
                icon: <BookOpen className="h-12 w-12" />,
                title: "AI in Biology", 
                description: "Developing machine learning models for protein structure prediction and drug target identification."
              },
              {
                icon: <FileText className="h-12 w-12" />,
                title: "Drug Discovery",
                description: "Computational approaches to identify novel therapeutic compounds and biomarkers."
              }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-[#00AEEF]/20 rounded-full mb-6 group-hover:bg-[#00AEEF]/30 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#00AEEF]">{item.title}</h3>
                <p className="text-blue-100 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-[#F4F4F4]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#003057] mb-4">Latest News & Updates</h2>
            <p className="text-xl text-[#222222]">Stay informed about the latest developments in bioinformatics</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
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
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:border-[#00AEEF] border-2">
                <div className="relative overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="text-sm text-[#00AEEF] font-medium mb-2">{article.date}</div>
                  <CardTitle className="text-xl group-hover:text-[#00AEEF] transition-colors text-[#003057]">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-[#222222]">{article.preview}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button variant="link" className="p-0 text-[#00AEEF] hover:text-[#003057]">
                    Read More →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#222222] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-[#003057] to-[#00AEEF] rounded-full flex items-center justify-center">
                  <Dna className="text-white h-5 w-5" />
                </div>
                <span className="text-xl font-bold">Bioinformatics.lk</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Advancing bioinformatics education and research in Sri Lanka through innovative programs and cutting-edge technology.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#00AEEF]">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-[#00AEEF] transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#00AEEF] transition-colors">Courses</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#00AEEF] transition-colors">Research</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#00AEEF] transition-colors">Publications</a></li>
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#00AEEF]">Programs</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-[#00AEEF] transition-colors">Certificate Courses</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#00AEEF] transition-colors">Workshops</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#00AEEF] transition-colors">Research Projects</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#00AEEF] transition-colors">Collaborations</a></li>
              </ul>
            </div>

            {/* Contact & Social */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#00AEEF]">Connect With Us</h3>
              <div className="space-y-4">
                <p className="text-gray-400">
                  Email: info@bioinformatics.lk<br />
                  Phone: +94 11 234 5678
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-[#003057] rounded-full flex items-center justify-center hover:bg-[#00AEEF] transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-[#003057] rounded-full flex items-center justify-center hover:bg-[#00AEEF] transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-[#003057] rounded-full flex items-center justify-center hover:bg-[#00AEEF] transition-colors">
                    <Youtube className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Bioinformatics.lk. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
