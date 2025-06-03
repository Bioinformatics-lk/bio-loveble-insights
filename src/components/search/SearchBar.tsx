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
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Array<{ id: string; title: string }>>([]);
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

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        performSearch(query);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleClose = () => {
    setIsExpanded(false);
    setQuery('');
    setSearchResults([]);
    if (onClose) onClose();
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isSearching) return;
    
    setIsSearching(true);
    try {
      const results = await performSearch(query);
      if (results.length > 0) {
        // Scroll to the first result
        const firstResult = document.getElementById(results[0].id);
      if (firstResult) {
          handleClose();
          setTimeout(() => {
        firstResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
        toast({
              title: "Found Results",
              description: `Scrolling to "${results[0].title}"`,
        });
          }, 100);
        }
      }
    } finally {
      setIsSearching(false);
    }
  };

  const performSearch = async (searchTerm: string): Promise<Array<{ id: string; title: string }>> => {
    const searchSections = [
      { id: 'team', title: 'Our Team', keywords: ['team', 'lakmal', 'saumya', 'anuththara', 'doctor', 'researcher'] },
      { id: 'research', title: 'Research Areas', keywords: ['research', 'bioinformatics', 'cheminformatics', 'drug', 'discovery', 'ai', 'medicinal', 'plants'] },
      { id: 'courses', title: 'Our Courses', keywords: ['courses', 'education', 'training', 'molecular', 'docking', 'dynamics', 'machine', 'learning'] },
      { id: 'services', title: 'Our Services', keywords: ['services', 'pharmacology', 'network', 'molecular', 'simulation', 'formulation'] },
      { id: 'partnerships', title: 'Our Partnerships', keywords: ['partnerships', 'university', 'peradeniya', 'global', 'chemistry', 'standard', 'seed'] },
      { id: 'news', title: 'Latest News', keywords: ['news', 'updates', 'genomics', 'lab', 'workshop', 'collaboration'] },
      { id: 'success-stories', title: 'Success Stories', keywords: ['success', 'stories', 'testimonial', 'students', 'graduates'] }
    ];

    const results: Array<{ id: string; title: string }> = [];
    const lowerQuery = searchTerm.toLowerCase();

    searchSections.forEach(section => {
      if (
        section.title.toLowerCase().includes(lowerQuery) ||
        section.keywords.some(keyword => keyword.includes(lowerQuery) || lowerQuery.includes(keyword))
      ) {
        results.push({ id: section.id, title: section.title });
      }
    });

    setSearchResults(results);
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

            {/* Search Container */}
            <div className="fixed inset-x-4 top-4 md:absolute md:inset-auto md:right-0 md:top-0 z-50">
              <motion.form
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onSubmit={handleSearch}
                className="w-full md:w-[20rem]"
              >
                <div className="relative flex items-center w-full">
                  <div className={`absolute left-4 text-[#EAE3F5]/70 transition-transform duration-300 ${isSearching ? 'animate-spin' : ''}`}>
                    <Search className="w-5 h-5" />
                  </div>
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

                {/* Search Results Dropdown */}
                {searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 right-0 mt-2 py-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-[60vh] overflow-y-auto"
                  >
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        type="button"
                        onClick={() => {
                          const element = document.getElementById(result.id);
                          if (element) {
                            handleClose();
                            setTimeout(() => {
                              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }, 100);
                          }
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors duration-200"
      >
                        <span className="text-gray-900">{result.title}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </motion.form>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
