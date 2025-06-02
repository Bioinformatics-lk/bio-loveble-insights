import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Search, Menu, X, Play, Users, Award, Calendar, Phone, Mail, MapPin, ChevronRight, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth/AuthModal';
import { ContactModal } from '@/components/contact/ContactModal';
import UserDashboard from '@/components/dashboard/UserDashboard';
import { useMediaQuery } from 'react-responsive';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    // Check if user is logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // If user is logged in, show dashboard
  if (user) {
    return <UserDashboard />;
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const handleLogin = () => {
    setShowAuthModal(true);
  };

  const handleSignup = () => {
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      {/* Background images with reduced opacity */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
        <img src="/lovable-uploads/e278cf89-1409-4a6a-9fc0-72a0d940ceba.png" alt="" className="absolute left-10 top-64 w-32 h-32 object-contain" />
        <img src="/lovable-uploads/84227a92-d6f9-4c5c-9a93-d1233db16dfc.png" alt="" className="absolute right-20 top-96 w-40 h-40 object-contain" />
        <img src="/lovable-uploads/f4204e37-de38-48dd-864e-2dfa047f879d.png" alt="" className="absolute left-32 top-[600px] w-36 h-36 object-contain" />
        <img src="/lovable-uploads/bdc6c566-3485-4804-b36e-f8bc050977ac.png" alt="" className="absolute right-16 top-[800px] w-44 h-44 object-contain" />
        <img src="/lovable-uploads/e278cf89-1409-4a6a-9fc0-72a0d940ceba.png" alt="" className="absolute left-20 top-[1000px] w-38 h-38 object-contain" />
        <img src="/lovable-uploads/84227a92-d6f9-4c5c-9a93-d1233db16dfc.png" alt="" className="absolute right-24 top-[1200px] w-42 h-42 object-contain" />
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white min-h-screen flex flex-col relative z-10">
        {/* Header */}
        <header className="relative z-20 p-4 lg:p-6">
          <div className="container mx-auto flex items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/76f3562a-0d90-4bbc-a1b8-640acc56da80.png" 
                alt="Logo" 
                className="w-12 h-12 object-contain"
              />
              <span className="text-xl font-bold text-white">ioinformatics.lk</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#home" className="hover:text-pink-300 transition-colors">Home</a>
              <a href="#about" className="hover:text-pink-300 transition-colors">About Us</a>
              <a href="#courses" className="hover:text-pink-300 transition-colors">Courses</a>
              <a href="#research" className="hover:text-pink-300 transition-colors">Research</a>
              <a href="#partnerships" className="hover:text-pink-300 transition-colors">Partnerships</a>
              <a href="#news" className="hover:text-pink-300 transition-colors">News</a>
              <a href="#team" className="hover:text-pink-300 transition-colors">Team</a>
              <button 
                onClick={() => setShowContactModal(true)}
                className="hover:text-pink-300 transition-colors"
              >
                Contact
              </button>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="search-icon-container">
                <button 
                  onClick={() => setIsSearchVisible(!isSearchVisible)}
                  className="search-icon-button"
                >
                  <Search className="w-5 h-5" />
                </button>
                {(isMobile || isSearchVisible) && (
                  <div className="search-overlay">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Search..."
                        className="px-3 py-1 bg-white/20 border border-white/30 rounded-full text-white placeholder-white/70 focus:outline-none focus:bg-white/30"
                      />
                      <button 
                        onClick={toggleSearch}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Auth Buttons */}
              <div className="hidden lg:flex items-center space-x-2">
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-purple-900" onClick={handleLogin}>
                  Login
                </Button>
                <Button className="bg-pink-600 hover:bg-pink-700 text-white" onClick={handleSignup}>
                  Sign Up
                </Button>
              </div>

              {/* Mobile Menu Toggle */}
              <button 
                onClick={toggleMenu}
                className="lg:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-purple-900/95 backdrop-blur-sm border-t border-white/20">
              <nav className="container mx-auto py-4 flex flex-col space-y-4">
                <a href="#home" className="hover:text-pink-300 transition-colors">Home</a>
                <a href="#about" className="hover:text-pink-300 transition-colors">About Us</a>
                <a href="#courses" className="hover:text-pink-300 transition-colors">Courses</a>
                <a href="#research" className="hover:text-pink-300 transition-colors">Research</a>
                <a href="#partnerships" className="hover:text-pink-300 transition-colors">Partnerships</a>
                <a href="#news" className="hover:text-pink-300 transition-colors">News</a>
                <a href="#team" className="hover:text-pink-300 transition-colors">Team</a>
                <button 
                  onClick={() => setShowContactModal(true)}
                  className="hover:text-pink-300 transition-colors text-left"
                >
                  Contact
                </button>
                <div className="flex flex-col space-y-2 pt-4 border-t border-white/20">
                  <Button variant="outline" className="text-white border-white hover:bg-white hover:text-purple-900" onClick={handleLogin}>
                    Login
                  </Button>
                  <Button className="bg-pink-600 hover:bg-pink-700 text-white" onClick={handleSignup}>
                    Sign Up
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </header>

        {/* Hero Content */}
        <div className="flex-1 flex items-center justify-center px-4 lg:px-6">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Advancing
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"> Bioinformatics </span>
              Through Innovation
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              Empowering researchers and students with cutting-edge computational biology tools, 
              comprehensive courses, and collaborative research opportunities.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 text-lg">
                <Play className="w-5 h-5 mr-2" />
                View Courses
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-purple-900 px-8 py-3 text-lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="relative z-10 bg-white/10 backdrop-blur-sm">
          <div className="container mx-auto px-4 lg:px-6 py-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-pink-400 mb-2">06</div>
                <div className="text-gray-200">Courses</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-purple-400 mb-2">500+</div>
                <div className="text-gray-200">Students</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-blue-400 mb-2">50+</div>
                <div className="text-gray-200">Research Projects</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-green-400 mb-2">05</div>
                <div className="text-gray-200">Partnerships</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-white relative z-10">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">About Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are a leading bioinformatics research and education platform, dedicated to advancing 
              computational biology through innovative research, comprehensive education, and collaborative partnerships.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Expert Faculty</h3>
              <p className="text-gray-600">
                Our team consists of world-renowned researchers and educators with extensive experience 
                in bioinformatics, computational biology, and related fields.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Award-Winning Research</h3>
              <p className="text-gray-600">
                Our research has been recognized globally with numerous awards and publications 
                in top-tier journals, contributing to breakthrough discoveries in the field.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Flexible Learning</h3>
              <p className="text-gray-600">
                Our comprehensive course offerings are designed to accommodate learners at all levels, 
                from beginners to advanced researchers, with flexible scheduling options.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Courses Section */}
      <section id="courses" className="py-20 bg-gray-50 relative z-10">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Our Courses</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive bioinformatics education designed to equip you with the skills needed 
              for modern computational biology research and applications.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Course 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                <img src="/lovable-uploads/4e188a16-d71f-4a8b-a106-11f470010a4f.png" alt="Introduction to Bioinformatics" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Introduction to Bioinformatics</h3>
                <p className="text-gray-600 mb-4">Learn the fundamentals of biological data analysis, sequence alignment, and database searching.</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-green-600">$299</span>
                  <span className="text-sm text-gray-500">6 weeks</span>
                </div>
                <Button className="w-full bg-pink-600 hover:bg-pink-700">Enroll Now</Button>
              </div>
            </div>

            {/* Course 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-green-400 to-blue-600 flex items-center justify-center">
                <img src="/lovable-uploads/d1b14824-ca0c-46d3-b10a-1c79874bc655.png" alt="Network Pharmacology" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Network Pharmacology</h3>
                <p className="text-gray-600 mb-4">Explore drug-target interactions and molecular networks in pharmaceutical research.</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-green-600">$399</span>
                  <span className="text-sm text-gray-500">8 weeks</span>
                </div>
                <Button className="w-full bg-pink-600 hover:bg-pink-700">Enroll Now</Button>
              </div>
            </div>

            {/* Course 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center">
                <img src="/lovable-uploads/2b975c3d-b2b0-487e-a418-c7c4853ddbaa.png" alt="Molecular Docking" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Molecular Docking</h3>
                <p className="text-gray-600 mb-4">Master computational methods for predicting molecular binding and drug design.</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-green-600">$349</span>
                  <span className="text-sm text-gray-500">7 weeks</span>
                </div>
                <Button className="w-full bg-pink-600 hover:bg-pink-700">Enroll Now</Button>
              </div>
            </div>

            {/* Course 4 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-red-400 to-orange-600 flex items-center justify-center">
                <img src="/lovable-uploads/78d5a7b4-78cf-48e5-a432-8686026b08b6.png" alt="Molecular Dynamics" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Molecular Dynamics</h3>
                <p className="text-gray-600 mb-4">Simulate molecular behavior and protein folding using advanced computational techniques.</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-green-600">$449</span>
                  <span className="text-sm text-gray-500">10 weeks</span>
                </div>
                <Button className="w-full bg-pink-600 hover:bg-pink-700">Enroll Now</Button>
              </div>
            </div>

            {/* Course 5 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-teal-400 to-cyan-600 flex items-center justify-center">
                <img src="/lovable-uploads/a574e257-4cfe-41e2-8a21-472924163bf2.png" alt="AI and ML in Drug Discovery" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">AI and ML in Drug Discovery</h3>
                <p className="text-gray-600 mb-4">Apply machine learning and AI techniques to accelerate drug discovery processes.</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-green-600">$499</span>
                  <span className="text-sm text-gray-500">12 weeks</span>
                </div>
                <Button className="w-full bg-pink-600 hover:bg-pink-700">Enroll Now</Button>
              </div>
            </div>

            {/* Course 6 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center">
                <img src="/lovable-uploads/98298637-f3f3-4bba-b8ca-01d994276f78.png" alt="Introduction to Cheminformatics" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Introduction to Cheminformatics</h3>
                <p className="text-gray-600 mb-4">Learn chemical information processing and molecular property prediction methods.</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-green-600">$329</span>
                  <span className="text-sm text-gray-500">6 weeks</span>
                </div>
                <Button className="w-full bg-pink-600 hover:bg-pink-700">Enroll Now</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Areas Section */}
      <section id="research" className="py-20 bg-white relative z-10">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Research Areas</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our cutting-edge research spans multiple domains of computational biology and bioinformatics.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-pink-200 transition-colors">
                <div className="w-12 h-12 bg-pink-600 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-[#A00098] transition-colors cursor-pointer">Bioinformatics</h3>
              <p className="text-gray-600">
                Advanced algorithms and tools for biological sequence analysis, genome annotation, and comparative genomics.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                <div className="w-12 h-12 bg-purple-600 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-[#A00098] transition-colors cursor-pointer">Cheminformatics</h3>
              <p className="text-gray-600">
                Computational methods for chemical information processing, molecular property prediction, and drug design.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <div className="w-12 h-12 bg-blue-600 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-[#A00098] transition-colors cursor-pointer">AI-driven Drug Discovery</h3>
              <p className="text-gray-600">
                Machine learning and AI applications in pharmaceutical research, virtual screening, and lead optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Partnerships Section */}
      <section id="partnerships" className="py-20 bg-gray-50 relative z-10">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Our Partnerships</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Collaborating with leading institutions and organizations worldwide to advance bioinformatics research and education.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Academics */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="/lovable-uploads/5bcc7c6f-2e42-4e80-ad6f-750db87e9fc4.png" 
                  alt="Faculty of Agriculture" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#A50053] transition-colors cursor-pointer">Academics</h3>
                <p className="text-gray-600">University of Peradeniya, Faculty of Agriculture, Department of Animal Science</p>
              </div>
            </div>

            {/* Open Source - Institute */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="/lovable-uploads/1953afc8-f585-4e96-a138-a7ae2375e033.png" 
                  alt="Institute of Scientific Informatics" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#A50053] transition-colors cursor-pointer">Open Source</h3>
                <p className="text-gray-600">Institute of Scientific Informatics</p>
              </div>
            </div>

            {/* Open Source - Global Chemistry */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="/lovable-uploads/6f7f0e18-e58a-4be0-b4d9-8266695b8a5e.png" 
                  alt="Global Chemistry" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#A50053] transition-colors cursor-pointer">Open Source</h3>
                <p className="text-gray-600">Global Chemistry Inc, U.S.A.</p>
              </div>
            </div>

            {/* Education and Research - Chemo-Informatics */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="/lovable-uploads/2e7cdf35-206d-4ea5-9a42-57a8463de5da.png" 
                  alt="Chemoinformatics" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#A50053] transition-colors cursor-pointer">Education and Research</h3>
                <p className="text-gray-600">Chemo-Informatics Academy, Nigeria</p>
              </div>
            </div>

            {/* Industry */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="/lovable-uploads/f819fa08-d68c-4051-aaf6-9400fcbd120f.png" 
                  alt="Standard Seed Corporation" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#A50053] transition-colors cursor-pointer">Industry</h3>
                <p className="text-gray-600">Standard Seed Corporation, Delaware, Wilmington, U.S.A.</p>
              </div>
            </div>

            {/* Education and Research - Agriculture.lk */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="/lovable-uploads/e25ed7e5-cc9e-43d9-ade7-050b1de6cd89.png" 
                  alt="Agriculture" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#A00063] transition-colors cursor-pointer">
                  <a href="https://agriculture.lk/" target="_blank" rel="noopener noreferrer" className="hover:text-[#A00063]">
                    Education and Research
                  </a>
                </h3>
                <p className="text-gray-600">Agriculture.lk</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News & Updates Section */}
      <section id="news" className="py-20 bg-white relative z-10">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Latest News & Updates</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with our latest research findings, student achievements, and institutional developments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-gray-200 overflow-hidden">
                <img 
                  src="/lovable-uploads/b6881a52-3aa0-4dfb-95bf-1061d262f01c.png" 
                  alt="Kasuni" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-pink-600 mb-2">December 15, 2024</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Our Student's Achievement in the Graphical Abstract Competition 2024</h3>
                <p className="text-gray-600 mb-4">Congratulations to our student for the outstanding performance in the international competition.</p>
                <a href="#" className="text-pink-600 hover:text-pink-700 font-medium flex items-center">
                  Read More <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-gray-200 overflow-hidden">
                <img 
                  src="/lovable-uploads/b6abe787-a4b1-469e-ace7-f3ba7c44eb36.png" 
                  alt="Poorni" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-pink-600 mb-2">December 10, 2024</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Outstanding Poster Presentation Award at ICIET 2024</h3>
                <p className="text-gray-600 mb-4">Our research team received recognition for their innovative work in computational biology.</p>
                <a href="#" className="text-pink-600 hover:text-pink-700 font-medium flex items-center">
                  Read More <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-gray-200 overflow-hidden">
                <img 
                  src="/lovable-uploads/090ca63b-e20f-49b9-92ec-c62c30fc0854.png" 
                  alt="news 03" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-pink-600 mb-2">December 5, 2024</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Research Collaboration Announced</h3>
                <p className="text-gray-600 mb-4">New partnership established with international research institutions for advancing drug discovery.</p>
                <a href="#" className="text-pink-600 hover:text-pink-700 font-medium flex items-center">
                  Read More <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-gray-50 relative z-10">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our alumni and current students about their journey and achievements in bioinformatics.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <img 
                  src="/lovable-uploads/8b62e48b-7183-478c-9e5a-6c7a4ede3d57.png" 
                  alt="Saumya Poorni" 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-lg font-bold text-gray-800">Saumya Poorni</h4>
                  <p className="text-gray-600">PhD Candidate</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The comprehensive curriculum and hands-on research opportunities have been instrumental 
                in shaping my career in computational biology. The faculty's guidance and the collaborative 
                environment have exceeded my expectations."
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <img 
                  src="/lovable-uploads/1caec919-8f0b-4d2b-b62e-0c2a086ec756.png" 
                  alt="Kasuni Karunarathne" 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-lg font-bold text-gray-800">Kasuni Karunarathne</h4>
                  <p className="text-gray-600">Research Scientist</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The practical approach to learning bioinformatics tools and techniques has prepared me 
                well for my current role in pharmaceutical research. The skills I gained here are directly 
                applicable to real-world challenges."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section id="team" className="py-20 bg-white relative z-10">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet our distinguished faculty and research team members who are driving innovation in bioinformatics.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <img src="/lovable-uploads/519715ae-248a-4c05-8f22-8c0b2b40e239.png" alt="Dr. Sarah Johnson" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">Dr. Sarah Johnson</h4>
              <p className="text-gray-600 mb-4">Director & Principal Investigator</p>
              <Button size="sm" variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50">
                View Profile
              </Button>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <img src="/lovable-uploads/4717a1d7-6c8d-411e-a4ec-d38407bc3bf5.png" alt="Dr. Michael Chen" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">Dr. Michael Chen</h4>
              <p className="text-gray-600 mb-4">Senior Research Scientist</p>
              <Button size="sm" variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50">
                View Profile
              </Button>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <img src="/lovable-uploads/88dcbdd5-4666-4c05-9ee8-93493283d085.png" alt="Dr. Emily Rodriguez" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">Dr. Emily Rodriguez</h4>
              <p className="text-gray-600 mb-4">Computational Biologist</p>
              <Button size="sm" variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50">
                View Profile
              </Button>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <img src="/lovable-uploads/7f777ef7-1b68-4be2-8518-94fbe3d1c86e.png" alt="Dr. David Kumar" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">Dr. David Kumar</h4>
              <p className="text-gray-600 mb-4">Machine Learning Specialist</p>
              <Button size="sm" variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50">
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 relative z-10">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <img 
                  src="/lovable-uploads/76f3562a-0d90-4bbc-a1b8-640acc56da80.png" 
                  alt="Logo" 
                  className="w-8 h-8"
                />
                <span className="text-xl font-bold">ioinformatics.lk</span>
              </div>
              <p className="text-gray-300 mb-6">
                Advancing bioinformatics research and education through innovation, collaboration, and excellence.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#courses" className="text-gray-300 hover:text-white transition-colors">Courses</a></li>
                <li><a href="#research" className="text-gray-300 hover:text-white transition-colors">Research</a></li>
                <li><a href="#partnerships" className="text-gray-300 hover:text-white transition-colors">Partnerships</a></li>
                <li><a href="#team" className="text-gray-300 hover:text-white transition-colors">Team</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Publications</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Downloads</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-pink-400" />
                  <span className="text-gray-300">+94 11 234 5678</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-pink-400" />
                  <span className="text-gray-300">info@ioinformatics.lk</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-pink-400" />
                  <span className="text-gray-300">Colombo, Sri Lanka</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-300">
              © 2024 ioinformatics.lk. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
      <ContactModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />
    </div>
  );
};

export default Index;
