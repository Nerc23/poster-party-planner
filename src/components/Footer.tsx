
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Mail, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Calendar className="h-6 w-6 text-event-purple" />
              <span className="font-bold text-xl text-gray-900">EventsHub</span>
            </Link>
            <p className="text-gray-600 text-sm">
              Discover and join amazing events happening around you.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-500 hover:text-event-purple">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-event-purple">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-event-purple">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-event-purple">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Discover</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link to="/events" className="hover:text-event-purple">All Events</Link>
              </li>
              <li>
                <Link to="/calendar" className="hover:text-event-purple">Calendar</Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-event-purple">Categories</Link>
              </li>
              <li>
                <Link to="/venues" className="hover:text-event-purple">Venues</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Organize</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link to="/create-event" className="hover:text-event-purple">Create Event</Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-event-purple">Pricing</Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-event-purple">Resources</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-event-purple">FAQs</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link to="/about" className="hover:text-event-purple">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-event-purple">Contact</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-event-purple">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-event-purple">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} EventsHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
