
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowLeft, Heart, Ticket } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { getUserRegistrations, SupabaseEvent } from '@/services/supabaseEventService';
import { formatEventDate } from '@/services/eventService';
import AuthModal from '@/components/auth/AuthModal';

const MyEvents = () => {
  const { user, loading } = useAuth();
  const [events, setEvents] = useState<SupabaseEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    if (loading) return;
    
    if (!user) {
      setAuthModalOpen(true);
      setEventsLoading(false);
      return;
    }

    const fetchEvents = async () => {
      try {
        const userEvents = await getUserRegistrations();
        setEvents(userEvents);
      } catch (error) {
        console.error('Error fetching user events:', error);
      } finally {
        setEventsLoading(false);
      }
    };

    fetchEvents();
  }, [user, loading]);

  if (loading || eventsLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-event-purple"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-12 text-center">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Sign in to view your events</h1>
            <p className="text-gray-600 mb-8">Join our community to register for events and keep track of your favorites.</p>
            <Button onClick={() => setAuthModalOpen(true)} className="bg-event-purple hover:bg-event-darkPurple">
              Sign In
            </Button>
          </div>
        </main>
        <Footer />
        <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
      </div>
    );
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
        
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Events</h1>
            <p className="text-gray-600">Events you've registered for</p>
          </div>

          {events.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border">
              <Ticket className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">No events yet</h2>
              <p className="text-gray-500 mb-6">Start exploring and register for events that interest you!</p>
              <Button asChild className="bg-event-purple hover:bg-event-darkPurple">
                <Link to="/events">Browse Events</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={event.id} className="bg-white rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gray-200 relative">
                    {event.image_url ? (
                      <img 
                        src={event.image_url} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Calendar className="h-12 w-12" />
                      </div>
                    )}
                    <Badge className="absolute top-3 left-3 bg-event-purple hover:bg-event-purple">
                      {event.category}
                    </Badge>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{event.title}</h3>
                    
                    <div className="flex items-center mb-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-event-purple" />
                      <span>{formatEventDate(new Date(event.date))}</span>
                    </div>
                    
                    <div className="flex items-center mb-3 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-event-purple" />
                      <span>{event.location}, {event.city}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-event-purple">
                        {event.price === 0 ? 'Free' : `R${(event.price / 100).toFixed(2)}`}
                      </div>
                      
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/event/${event.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MyEvents;
