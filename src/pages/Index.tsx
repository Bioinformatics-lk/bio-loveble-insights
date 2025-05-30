
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, BookOpen, Search, FileText, Youtube, Linkedin, Twitter } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Bioinformatics.lk</span>
            </div>
            
            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Home</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">About</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Courses</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Research</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">News</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</a>
            </nav>

            {/* CTA Button */}
            <Button className="hidden md:inline-flex bg-blue-600 hover:bg-blue-700">
              Get Started
            </Button>

            {/* Mobile Menu Button */}
            <button className="md:hidden">
              <ChevronDown className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Accelerating <span className="bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">Bioinformatics</span> Innovation
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                Empowering researchers and students in genomics, proteomics, and computational biology through world-class education and cutting-edge research.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 text-lg">
                  Explore Courses
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg">
                  View Research
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-3xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop&crop=center" 
                  alt="Bioinformatics visualization" 
                  className="w-full h-full object-cover rounded-3xl opacity-80"
                />
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-cyan-400/30 rounded-full backdrop-blur-sm animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-400/30 rounded-full backdrop-blur-sm animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
                Advancing Sri Lankan <span className="text-blue-600">Bioinformatics</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Bioinformatics.lk is Sri Lanka's premier platform for bioinformatics education and research. 
                We bridge the gap between traditional biology and modern computational methods, providing 
                comprehensive training and fostering innovative research in genomics, proteomics, and 
                artificial intelligence applications in life sciences.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">500+</div>
                  <div className="text-gray-600">Students Trained</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">25+</div>
                  <div className="text-gray-600">Research Projects</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=600&h=400&fit=crop&crop=center" 
                alt="Research and innovation" 
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Courses</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {course.level}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">Duration: {course.duration}</span>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Research Highlights Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4">
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
                <div className="inline-flex items-center justify-center w-20 h-20 bg-cyan-500/20 rounded-full mb-6 group-hover:bg-cyan-500/30 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-blue-100 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest News & Updates</h2>
            <p className="text-xl text-gray-600">Stay informed about the latest developments in bioinformatics</p>
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
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="text-sm text-blue-600 font-medium mb-2">{article.date}</div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </CardTitle>
                  <CardDescription>{article.preview}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button variant="link" className="p-0 text-blue-600 hover:text-blue-800">
                    Read More →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">B</span>
                </div>
                <span className="text-xl font-bold">Bioinformatics.lk</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Advancing bioinformatics education and research in Sri Lanka through innovative programs and cutting-edge technology.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Courses</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Research</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Publications</a></li>
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Programs</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Certificate Courses</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Workshops</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Research Projects</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Collaborations</a></li>
              </ul>
            </div>

            {/* Contact & Social */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="space-y-4">
                <p className="text-gray-400">
                  Email: info@bioinformatics.lk<br />
                  Phone: +94 11 234 5678
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
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
