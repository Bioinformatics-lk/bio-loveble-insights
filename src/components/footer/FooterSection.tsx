import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, ExternalLink } from 'lucide-react';

const FooterSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const photos = [
    '/lovable-uploads/Photo 01.jpg',
    '/lovable-uploads/Photo 02.jpg',
    '/lovable-uploads/Photo 03.jpg',
    '/lovable-uploads/Photo 04.jpg',
    '/lovable-uploads/Photo 05.jpg',
    '/lovable-uploads/Photo 06.jpg',
    '/lovable-uploads/Photo 07.jpg',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-20 bg-[#170056]">
      <div className="container mx-auto px-4 relative z-10">
        {/* Topic Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Be a Part of the Future with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-5xl md:text-6xl">
              Bioinformatics.lk
            </span>
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Are you interested in joining a team where innovation happens?
          </p>
          <Button 
            className="bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] hover:from-[#FF5252] hover:to-[#45B7D1] text-white px-8 py-6 text-lg"
            onClick={() => window.location.href = '#team'}
          >
            Our Team
          </Button>
        </div>

        {/* Photo Slideshow */}
        <div className="relative h-[400px] md:h-[500px] mb-16 overflow-hidden rounded-2xl">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSlide}
              src={photos[currentSlide]}
              alt={`Slide ${currentSlide + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
          
          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {photos.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index ? 'bg-white scale-125' : 'bg-white/50'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-16">
          <img 
            src="/lovable-uploads/76f3562a-0d90-4bbc-a1b8-640acc56da80.png" 
            alt="Bioinformatics.lk Logo" 
            className="w-24 h-24 object-contain"
          />
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-semibold text-white mb-4">Our Labs</h3>
            <p className="text-purple-100">Explore our state-of-the-art research facilities</p>
          </div>
          <div className="text-center md:text-right">
            <h3 className="text-2xl font-semibold text-white mb-4">Academy</h3>
            <p className="text-purple-100">Join our educational programs and workshops</p>
          </div>
        </div>

        {/* Connect With Us */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-semibold text-white mb-6">Connect With Us</h3>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <a href="mailto:info@bioinformatics.lk" className="flex items-center gap-2 text-purple-100 hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
              info@bioinformatics.lk
            </a>
            <a href="tel:+94112345678" className="flex items-center gap-2 text-purple-100 hover:text-white transition-colors">
              <Phone className="w-5 h-5" />
              +94 11 234 5678
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-purple-100/70 border-t border-purple-100/20 pt-8">
          <p>© 2024 Bioinformatics.lk. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterSection; 