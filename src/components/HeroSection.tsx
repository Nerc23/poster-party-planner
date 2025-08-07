
import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getAllCities } from '@/services/eventService';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeroSectionProps {
  onLocationSelect: (location: string) => void;
  onSearch?: (query: string, location: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  onLocationSelect, 
  onSearch 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Select location');
  const cities = getAllCities();

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm, selectedLocation === 'Select location' ? 'All' : selectedLocation);
    }
  };

  const handleLocationSelect = (city: string) => {
    setSelectedLocation(city);
    onLocationSelect(city);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-event-softPurple to-event-lightPurple py-20 px-4 mb-12">
      <div className="container mx-auto max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Discover Amazing Events Near You
        </h1>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Find local events, food markets, and activities that match your interests
        </p>
        
        <div className="flex flex-col sm:flex-row items-center max-w-lg mx-auto gap-2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Search events..." 
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto flex justify-between min-w-[160px]">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="truncate">{selectedLocation}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52">
              <DropdownMenuItem onClick={() => handleLocationSelect('All')}>
                All Locations
              </DropdownMenuItem>
              {cities.map((city) => (
                <DropdownMenuItem key={city} onClick={() => handleLocationSelect(city)}>
                  {city}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            className="w-full sm:w-auto bg-event-purple hover:bg-event-darkPurple text-white min-w-[120px]"
            onClick={handleSearch}
          >
            Find Events
          </Button>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
    </div>
  );
};

export default HeroSection;
