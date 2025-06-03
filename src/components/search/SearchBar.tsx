import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface SearchBarProps {
  onClose?: () => void;
}

export const SearchBar = ({ onClose }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isExpanded) {
        e.preventDefault();
        setIsExpanded(true);
      } else if (e.key === 'Escape' && isExpanded) {
        handleClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(e.target as Node) && isExpanded) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleClose = () => {
    setIsExpanded(false);
    setQuery('');
    if (onClose) onClose();
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const results = performSearch(query);
    
    if (results.length > 0) {
      toast({
        title: "Search Results",
        description: `Found ${results.length} results for "${query}"`,
      });
      handleClose();
    } else {
      toast({
        title: "No Results",
        description: `No results found for "${query}"`,
        variant: "destructive",
      });
    }
  };

  const performSearch = (searchTerm: string): string[] => {
    const searchSections = [
      { id: 'team', keywords: ['team', 'lakmal', 'saumya', 'anuththara', 'doctor', 'researcher'] },
      { id: 'research', keywords: ['research', 'bioinformatics', 'cheminformatics', 'drug', 'discovery', 'ai', 'medicinal', 'plants'] },
      { id: 'courses', keywords: ['courses', 'education', 'training', 'molecular', 'docking', 'dynamics', 'machine', 'learning'] },
      { id: 'services', keywords: ['services', 'pharmacology', 'network', 'molecular', 'simulation', 'formulation'] },
      { id: 'partnerships', keywords: ['partnerships', 'university', 'peradeniya', 'global', 'chemistry', 'standard', 'seed'] },
      { id: 'news', keywords: ['news', 'updates', 'genomics', 'lab', 'workshop', 'collaboration'] },
      { id: 'success-stories', keywords: ['success', 'stories', 'testimonial', 'students', 'graduates'] }
    ];

    const results: string[] = [];
    const lowerQuery = searchTerm.toLowerCase();

    searchSections.forEach(section => {
      if (section.keywords.some(keyword => keyword.includes(lowerQuery) || lowerQuery.includes(keyword))) {
        results.push(section.id);
      }
    });

    return results;
  };

  return (
    <div ref={searchBarRef} className="relative">
      {/* Search Icon Button */}
      <motion.button
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(true)}
        className="relative w-12 h-12 rounded-full bg-gradient-to-r from-[#170056] to-[#410056] flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300 group"
        aria-label="Open search"
      >
        <Search className="w-5 h-5 text-[#EAE3F5] group-hover:animate-pulse" />
      </motion.button>

      {/* Expanded Search Bar */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Mobile Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-40"
              onClick={handleClose}
            />

            {/* Search Form */}
            <motion.form
              initial={{ 
                opacity: 0,
                scale: 0.95,
                y: -10,
                x: typeof window !== 'undefined' && window.innerWidth < 768 ? '-50%' : 0
              }}
              animate={{ 
                opacity: 1,
                scale: 1,
                y: 0,
                x: typeof window !== 'undefined' && window.innerWidth < 768 ? '-50%' : 0
              }}
              exit={{ 
                opacity: 0,
                scale: 0.95,
                y: -10,
                x: typeof window !== 'undefined' && window.innerWidth < 768 ? '-50%' : 0
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onSubmit={handleSearch}
              className={`
                absolute right-0 top-0
                md:right-0 md:top-0
                z-50
                ${typeof window !== 'undefined' && window.innerWidth < 768 ? 
                  'fixed left-1/2 w-[90vw] max-w-[90vw]' : 
                  'w-[20rem]'
                }
              `}
            >
              <div className="relative flex items-center w-full">
                <Search className="absolute left-4 text-[#EAE3F5]/70 w-5 h-5" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search courses, topics, or research..."
                  className="w-full h-12 pl-12 pr-12 rounded-full bg-gradient-to-r from-[#170056] to-[#410056] text-[#EAE3F5] placeholder-[#EAE3F5]/50 border border-[#54366B] focus:border-[#363B6B] focus:ring-2 focus:ring-[#54366B] focus:ring-opacity-50 shadow-lg transition-all duration-300"
                  aria-label="Search input"
                />
                <button
                  type="button"
                  onClick={handleClose}
                  className="absolute right-4 text-[#EAE3F5]/70 hover:text-[#EAE3F5] transition-colors duration-200"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.form>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
