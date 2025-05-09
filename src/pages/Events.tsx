
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
import CategoryFilter from '@/components/CategoryFilter';
import LocationFilter from '@/components/LocationFilter';
import PriceFilter from '@/components/PriceFilter';
import { getAllEvents, getEventsByPriceRange } from '@/services/eventService';
import { Button } from '@/components/ui/button';

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [maxPrice, setMaxPrice] = useState(150);
  
  // Apply all filters
  let filteredEvents = getAllEvents();
  
  if (selectedCategory !== 'All') {
    filteredEvents = filteredEvents.filter(event => event.category === selectedCategory);
  }
  
  if (selectedLocation !== 'All') {
    filteredEvents = filteredEvents.filter(event => event.city === selectedLocation);
  }
  
  filteredEvents = getEventsByPriceRange(maxPrice).filter(event => {
    if (selectedCategory !== 'All' && event.category !== selectedCategory) return false;
    if (selectedLocation !== 'All' && event.city !== selectedLocation) return false;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-event-softPurple py-12 mb-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-center">All Events</h1>
          </div>
        </div>
        
        <div className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1 bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="font-semibold mb-4 text-lg">Filters</h3>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">Category</h4>
                <CategoryFilter 
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">Location</h4>
                <LocationFilter 
                  selectedLocation={selectedLocation}
                  onSelectLocation={setSelectedLocation}
                />
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Price Range</h4>
                <PriceFilter 
                  maxPrice={maxPrice}
                  onChangePrice={setMaxPrice}
                />
              </div>
              
              <Button 
                className="w-full bg-event-purple hover:bg-event-darkPurple"
                onClick={() => {
                  // Reset filters
                  setSelectedCategory('All');
                  setSelectedLocation('All');
                  setMaxPrice(150);
                }}
              >
                Reset Filters
              </Button>
            </div>
            
            <div className="md:col-span-3">
              {filteredEvents.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border">
                  <p className="text-gray-500 mb-4">No events found with the selected filters.</p>
                  <Button 
                    onClick={() => {
                      setSelectedCategory('All');
                      setSelectedLocation('All');
                      setMaxPrice(150);
                    }}
                    className="bg-event-purple hover:bg-event-darkPurple"
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;
