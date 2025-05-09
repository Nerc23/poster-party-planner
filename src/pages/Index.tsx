
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import EventCard from '@/components/EventCard';
import CategoryFilter from '@/components/CategoryFilter';
import { getAllEvents, getFeaturedEvents, getEventsByCategory } from '@/services/eventService';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const featuredEvents = getFeaturedEvents();
  
  const filteredEvents = selectedCategory === 'All' 
    ? getAllEvents().slice(0, 6)
    : getEventsByCategory(selectedCategory).slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        
        <section className="container mx-auto px-4 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Events</h2>
            <Link to="/events" className="text-event-purple hover:underline flex items-center">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
        
        <section className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
          </div>
          
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          
          {filteredEvents.length > 0 && (
            <div className="text-center">
              <Button 
                variant="outline" 
                className="border-event-purple text-event-purple hover:bg-event-softPurple"
                asChild
              >
                <Link to="/events">View All Events</Link>
              </Button>
            </div>
          )}
          
          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No events found in this category.</p>
              <Button 
                onClick={() => setSelectedCategory('All')}
                className="bg-event-purple hover:bg-event-darkPurple"
              >
                View All Categories
              </Button>
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
