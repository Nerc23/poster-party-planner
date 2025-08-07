
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import EventCard from '@/components/EventCard';
import CategoryFilter from '@/components/CategoryFilter';
import LocationFilter from '@/components/LocationFilter';
import PriceFilter from '@/components/PriceFilter';
import { 
  getAllEvents, 
  getFeaturedEvents,
  getEventsByPriceRange
} from '@/services/eventService';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [maxPrice, setMaxPrice] = useState(150);
  const [searchQuery, setSearchQuery] = useState('');
  
  const featuredEvents = getFeaturedEvents();
  
  // Apply all filters
  let filteredEvents = getAllEvents();
  
  // Apply search filter
  if (searchQuery.trim()) {
    filteredEvents = filteredEvents.filter(event => 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.city.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  if (selectedCategory !== 'All') {
    filteredEvents = filteredEvents.filter(event => event.category === selectedCategory);
  }
  
  if (selectedLocation !== 'All') {
    filteredEvents = filteredEvents.filter(event => event.city === selectedLocation);
  }
  
  filteredEvents = getEventsByPriceRange(maxPrice).filter(event => {
    if (searchQuery.trim()) {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.city.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;
    }
    if (selectedCategory !== 'All' && event.category !== selectedCategory) return false;
    if (selectedLocation !== 'All' && event.city !== selectedLocation) return false;
    return true;
  });
  
  // Special food market section
  const foodMarketEvents = getAllEvents().filter(event => event.category === 'Food Market');

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedLocation('All');
    setMaxPrice(150);
    setSearchQuery('');
  };

  const handleHeroSearch = (query: string, location: string) => {
    setSearchQuery(query);
    if (location !== 'All') {
      setSelectedLocation(location);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection 
          onLocationSelect={setSelectedLocation}
          onSearch={handleHeroSearch}
        />
        
        <section className="container mx-auto px-4 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Events</h2>
            <Button variant="link" asChild className="text-event-purple hover:text-event-darkPurple">
              <Link to="/events" className="flex items-center">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
        
        <section className="container mx-auto px-4 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Food Markets</h2>
            <Button variant="link" asChild className="text-event-purple hover:text-event-darkPurple">
              <Link to="/events" className="flex items-center">
                View all markets <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodMarketEvents.slice(0, 6).map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
        
        <section className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Find Your Perfect Event</h2>
          </div>
          
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
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">Price Range</h4>
                <PriceFilter 
                  maxPrice={maxPrice}
                  onChangePrice={setMaxPrice}
                />
              </div>
              
              <Button 
                className="w-full bg-event-purple hover:bg-event-darkPurple"
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </div>
            
            <div className="md:col-span-3">
              {filteredEvents.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border">
                  <p className="text-gray-500 mb-4">
                    No events found {searchQuery ? `for "${searchQuery}"` : 'with the selected filters'}.
                  </p>
                  <Button 
                    onClick={resetFilters}
                    className="bg-event-purple hover:bg-event-darkPurple"
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {filteredEvents.slice(0, 6).map(event => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                  
                  {filteredEvents.length > 6 && (
                    <div className="text-center">
                      <Button 
                        variant="outline" 
                        className="border-event-purple text-event-purple hover:bg-event-softPurple"
                        asChild
                      >
                        <Link to="/events">View More Events</Link>
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
