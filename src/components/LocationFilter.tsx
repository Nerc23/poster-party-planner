
import React from 'react';
import { getAllCities } from '@/services/eventService';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface LocationFilterProps {
  selectedLocation: string;
  onSelectLocation: (location: string) => void;
}

const LocationFilter: React.FC<LocationFilterProps> = ({ 
  selectedLocation, 
  onSelectLocation 
}) => {
  const locations = ['All', ...getAllCities()];
  
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {locations.map((location) => (
        <Button
          key={location}
          variant={selectedLocation === location ? "default" : "outline"}
          size="sm"
          className={selectedLocation === location 
            ? "bg-event-purple hover:bg-event-darkPurple" 
            : "text-gray-700 hover:text-event-purple"}
          onClick={() => onSelectLocation(location)}
        >
          {location === 'All' ? location : (
            <>
              <MapPin className="h-3.5 w-3.5 mr-1" />
              {location}
            </>
          )}
        </Button>
      ))}
    </div>
  );
};

export default LocationFilter;
