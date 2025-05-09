
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-event-softPurple to-event-lightPurple py-20 px-4 mb-12">
      <div className="container mx-auto max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Discover Amazing Events Near You
        </h1>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Find and join exciting events, workshops, and meetups that match your interests
        </p>
        
        <div className="flex flex-col sm:flex-row items-center max-w-lg mx-auto gap-2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Search events..." 
              className="pl-10 w-full"
            />
          </div>
          <Button className="w-full sm:w-auto bg-event-purple hover:bg-event-darkPurple text-white">
            Find Events
          </Button>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
    </div>
  );
};

export default HeroSection;
