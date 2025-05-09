
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Calendar className="h-6 w-6 text-event-purple" />
          <span className="font-bold text-xl text-gray-900">EventsHub</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-event-purple transition-colors">
            Home
          </Link>
          <Link to="/events" className="text-gray-700 hover:text-event-purple transition-colors">
            Events
          </Link>
          <Link to="/calendar" className="text-gray-700 hover:text-event-purple transition-colors">
            Calendar
          </Link>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>
          <Button className="bg-event-purple hover:bg-event-darkPurple text-white hidden md:flex">
            Create Event
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
