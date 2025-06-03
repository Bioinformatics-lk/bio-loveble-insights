import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
  className?: string;
  onClose?: () => void;
}

export const SearchBar = ({ className, onClose }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    
    try {
      // Animate search icon
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Perform site-wide search
      const searchResults = performSiteSearch(query);
      
      if (searchResults.length > 0) {
        // Scroll to first result
        const firstResult = document.getElementById(searchResults[0]);
        if (firstResult) {
          firstResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
          toast({
            title: "Search Results",
            description: `Found ${searchResults.length} result(s) for "${query}"`,
          });
        }
      } else {
        toast({
          title: "No Results",
          description: `No results found for "${query}"`,
          variant: "destructive",
        });
      }
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && onClose) {
      onClose();
    }
  };

  const performSiteSearch = (searchTerm: string): string[] => {
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
    <AnimatePresence>
      <motion.form
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.2 }}
        onSubmit={handleSearch}
        className="relative flex w-full max-w-md group"
      >
        <div className="relative flex-1">
          <div 
            className={`
              absolute left-3 top-1/2 -translate-y-1/2 
              text-[#EAE3F5]/70 transition-all duration-300
              group-focus-within:scale-110 group-focus-within:text-[#EAE3F5]
              ${isSearching ? 'text-[#EAE3F5]' : ''}
            `}
          >
            <motion.div
              animate={isSearching ? {
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              } : {}}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <Search className="h-5 w-5" />
            </motion.div>
          </div>
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search courses, research..."
            className={`
              w-full pl-11 pr-4 py-3 rounded-full
              bg-gradient-to-r from-[#000A33]/40 to-[#363B6B]/40
              border border-[#EAE3F5]/20
              text-[#EAE3F5] placeholder:text-[#EAE3F5]/50
              backdrop-blur-lg
              transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-[#54366B]/50
              hover:border-[#EAE3F5]/30 hover:shadow-lg hover:shadow-[#54366B]/20
              focus:border-[#EAE3F5]/40 focus:shadow-lg focus:shadow-[#54366B]/20
              group-hover:border-[#EAE3F5]/30
              md:text-sm
              ${className}
            `}
          />
        </div>
        {query && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#EAE3F5]/70 hover:text-[#EAE3F5] transition-colors"
          >
            <X className="h-5 w-5" />
          </motion.button>
        )}
      </motion.form>
    </AnimatePresence>
  );
};
