
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock, User, ArrowLeft, Share2 } from 'lucide-react';
import { getEventById, formatEventDate } from '@/services/eventService';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const event = getEventById(id || '');
  
  useEffect(() => {
    if (!event) {
      navigate('/not-found', { replace: true });
    }
  }, [event, navigate]);

  if (!event) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gray-50 py-4 border-b">
          <div className="container mx-auto px-4">
            <Button variant="ghost" size="sm" asChild className="mb-2">
              <Link to="/" className="flex items-center text-gray-600">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to events
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <Badge className="mb-4 bg-event-purple hover:bg-event-purple">
                  {event.category}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
                
                <div className="flex items-center mb-2 text-gray-600">
                  <Calendar className="h-5 w-5 mr-2 text-event-purple" />
                  <span>{formatEventDate(event.date, event.endDate)}</span>
                </div>
                
                <div className="flex items-center mb-4 text-gray-600">
                  <MapPin className="h-5 w-5 mr-2 text-event-purple" />
                  <span>{event.location}</span>
                </div>
                
                <div className="flex items-center mb-6">
                  <img 
                    src={event.organizer.imageUrl}
                    alt={event.organizer.name}
                    className="h-10 w-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-sm text-gray-500">Organized by</p>
                    <p className="font-medium">{event.organizer.name}</p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-xl overflow-hidden mb-8">
                <img 
                  src={event.imageUrl} 
                  alt={event.title}
                  className="w-full h-72 md:h-96 object-cover"
                />
              </div>
              
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-4">About this event</h2>
                <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
              </div>
            </div>
            
            <div>
              <div className="bg-white p-6 rounded-xl border shadow-sm sticky top-6">
                {event.price ? (
                  <div className="mb-6">
                    <p className="text-gray-500 text-sm">Price</p>
                    <p className="text-xl font-bold text-event-purple">{event.price}</p>
                  </div>
                ) : (
                  <div className="mb-6">
                    <p className="text-gray-500 text-sm">Price</p>
                    <p className="text-xl font-bold text-green-600">Free</p>
                  </div>
                )}
                
                <Button className="w-full mb-3 bg-event-purple hover:bg-event-darkPurple">
                  Register Now
                </Button>
                
                <Button variant="outline" className="w-full flex items-center justify-center">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Event
                </Button>
                
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold mb-3">Event Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Date and Time</p>
                        <p className="text-sm text-gray-600">
                          {formatEventDate(event.date, event.endDate)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-sm text-gray-600">{event.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <User className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Organizer</p>
                        <p className="text-sm text-gray-600">{event.organizer.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventDetails;
