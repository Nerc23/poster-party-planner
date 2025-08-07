
import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  searchQuery, 
  onSearchChange, 
  placeholder = "Search events...",
  className = ""
}) => {
  const clearSearch = () => {
    onSearchChange('');
  };

  return (
    <div className={`relative w-full ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      <Input 
        placeholder={placeholder}
        className="pl-10 pr-10 w-full"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {searchQuery && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          onClick={clearSearch}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
