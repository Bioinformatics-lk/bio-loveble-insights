
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
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
    <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-md">
      <Input
        type="text"
        placeholder="Search courses, research, services..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-white/10 border-purple-300/30 text-white placeholder:text-purple-200/70 backdrop-blur-sm"
      />
      <Button
        type="submit"
        size="icon"
        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
      >
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
};
