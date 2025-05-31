
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', query);
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
