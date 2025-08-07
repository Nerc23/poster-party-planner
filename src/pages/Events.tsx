
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
import CategoryFilter from '@/components/CategoryFilter';
import LocationFilter from '@/components/LocationFilter';
import PriceFilter from '@/components/PriceFilter';
import SearchBar from '@/components/SearchBar';
import { getAllEvents, getEventsByPriceRange } from '@/services/eventService';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Search, Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [maxPrice, setMaxPrice] = useState(150);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
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

  // Filter by tab
  let tabFilteredEvents = filteredEvents;
  if (activeTab === 'today') {
    const today = new Date().toDateString();
    tabFilteredEvents = filteredEvents.filter(event => 
      new Date(event.date).toDateString() === today
    );
  } else if (activeTab === 'weekend') {
    const now = new Date();
    const weekend = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
      if (date.getDay() === 0 || date.getDay() === 6) {
        weekend.push(date.toDateString());
      }
    }
    tabFilteredEvents = filteredEvents.filter(event => 
      weekend.includes(new Date(event.date).toDateString())
    );
  } else if (activeTab === 'free') {
    tabFilteredEvents = filteredEvents.filter(event => 
      event.price === 'Free' || event.price === 'R0'
    );
  }

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedLocation('All');
    setMaxPrice(150);
    setSearchQuery('');
    setActiveTab('all');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-br from-event-softPurple via-white to-event-softYellow py-12 mb-8 bg-confetti">
          <div className="container mx-auto px-4 relative">
            <div className="floating-element absolute -top-4 left-1/4 opacity-20">
              <Calendar className="h-16 w-16 text-event-purple" />
            </div>
            <div className="bouncing-element absolute -bottom-6 right-1/4 opacity-20">
              <MapPin className="h-12 w-12 text-event-purple" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
              <span className="text-event-purple">South African</span> Events
            </h1>
            <p className="text-center text-gray-700 max-w-2xl mx-auto mb-6">
              Discover exciting conferences, concerts, shows, markets, and festivals throughout South Africa
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <SearchBar 
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                placeholder="Search events, locations, or descriptions..."
              />
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 pb-12">
          {/* Responsive Tabs */}
          <div className="mb-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:flex lg:justify-start">
                <TabsTrigger value="all" className="text-xs sm:text-sm">All Events</TabsTrigger>
                <TabsTrigger value="today" className="text-xs sm:text-sm">Today</TabsTrigger>
                <TabsTrigger value="weekend" className="text-xs sm:text-sm">Weekend</TabsTrigger>
                <TabsTrigger value="free" className="text-xs sm:text-sm">Free</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Desktop Filters */}
            <div className="hidden lg:block lg:col-span-1 bg-white p-6 rounded-xl border shadow-sm">
              <h3 className="font-semibold mb-4 text-lg flex items-center">
                <Search className="h-5 w-5 mr-2 text-event-purple" />
                <span>Event Filters</span>
              </h3>
              
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
                className="w-full bg-gradient-to-r from-event-purple to-event-magentaPink hover:from-event-magentaPink hover:to-event-purple"
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </div>

            {/* Mobile Filter Sheet */}
            <div className="lg:hidden mb-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters & Search
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Event Filters</SheetTitle>
                    <SheetDescription>
                      Refine your event search
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="mt-6 space-y-6">
                    <div>
                      <h4 className="font-medium mb-2">Category</h4>
                      <CategoryFilter 
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                      />
                    </div>
                    
                    <div>
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
                      className="w-full bg-gradient-to-r from-event-purple to-event-magentaPink hover:from-event-magentaPink hover:to-event-purple"
                      onClick={resetFilters}
                    >
                      Reset Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            
            <div className="lg:col-span-3">
              {tabFilteredEvents.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border">
                  <p className="text-gray-500 mb-4">
                    No events found {searchQuery ? `for "${searchQuery}"` : 'with the selected filters'}.
                  </p>
                  <Button 
                    onClick={resetFilters}
                    className="bg-gradient-to-r from-event-purple to-event-magentaPink hover:from-event-magentaPink hover:to-event-purple"
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {tabFilteredEvents.map(event => (
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
