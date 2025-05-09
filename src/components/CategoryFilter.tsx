
import React from 'react';
import { getAllCategories } from '@/services/eventService';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  selectedCategory, 
  onSelectCategory 
}) => {
  const categories = ['All', ...getAllCategories()];
  
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          className={selectedCategory === category 
            ? "bg-event-purple hover:bg-event-darkPurple" 
            : "text-gray-700 hover:text-event-purple"}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
