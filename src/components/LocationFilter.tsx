
import React from 'react';
import { getAllCities } from '@/services/eventService';
import { Button } from '@/components/ui/button';
import { MapPin, Map, Compass } from 'lucide-react';

interface LocationFilterProps {
  selectedLocation: string;
  onSelectLocation: (location: string) => void;
}

const LocationFilter: React.FC<LocationFilterProps> = ({ 
  selectedLocation, 
  onSelectLocation 
}) => {
  const locations = ['All', ...getAllCities()];
  
  // Get color based on location name for a fun look
  const getButtonColor = (location: string) => {
    const colors = [
      'bg-event-softPurple text-event-purple',
      'bg-event-softGreen text-green-600',
      'bg-event-softBlue text-blue-600',
      'bg-event-softPeach text-orange-700',
      'bg-event-softYellow text-amber-700',
      'bg-event-softPink text-pink-600',
    ];
    
    if (location === 'All') return '';
    
    // Generate a consistent color based on the location name
    const index = location.charCodeAt(0) % colors.length;
    return colors[index];
  };
  
  return (
    <div>
      <div className="flex items-center mb-2 text-sm text-event-purple">
        <Compass className="h-4 w-4 mr-1" />
        <span>Discover events across South Africa</span>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {locations.map((location) => (
          <Button
            key={location}
            variant={selectedLocation === location ? "default" : "outline"}
            size="sm"
            className={`transition-all duration-300 ${selectedLocation === location 
              ? "bg-event-purple hover:bg-event-darkPurple animate-scale-in" 
              : `text-gray-700 hover:text-event-purple ${getButtonColor(location)}`}`}
            onClick={() => onSelectLocation(location)}
          >
            {location === 'All' ? (
              <>
                <Map className="h-3.5 w-3.5 mr-1" />
                All Locations
              </>
            ) : (
              <>
                <MapPin className="h-3.5 w-3.5 mr-1" />
                {location}
              </>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LocationFilter;
