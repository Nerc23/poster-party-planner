
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock, User, ArrowLeft, Share2, Ticket, Bell, BellOff } from 'lucide-react';
import { getEventById, formatEventDate } from '@/services/eventService';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const event = getEventById(id || '');
  const [hasReminder, setHasReminder] = useState(false);
  
  useEffect(() => {
    if (!event) {
      navigate('/not-found', { replace: true });
    }
  }, [event, navigate]);

  if (!event) {
    return null;
  }
  
  // Function to toggle reminder
  const toggleReminder = () => {
    setHasReminder(!hasReminder);
    
    if (!hasReminder) {
      toast({
        title: "Reminder set!",
        description: "We'll notify you before this event starts.",
      });
    } else {
      toast({
        title: "Reminder removed",
        description: "You won't receive notifications for this event.",
      });
    }
  };

  // Function to share event
  const shareEvent = () => {
    // Create the share URL for the current event
    const shareUrl = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Check out this event: ${event.title}`,
        url: shareUrl,
      })
      .then(() => {
        toast({
          title: "Shared successfully!",
          description: "The event has been shared.",
        });
      })
      .catch(error => {
        console.error('Error sharing:', error);
        // Fallback to clipboard
        copyToClipboard(shareUrl);
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      copyToClipboard(shareUrl);
    }
  };

  // Helper function to copy link to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          title: "Link copied!",
          description: "Event link copied to clipboard.",
        });
      },
      (err) => {
        console.error('Could not copy text: ', err);
        toast({
          title: "Copy failed",
          description: "Could not copy the event link.",
          variant: "destructive",
        });
      }
    );
  };
  
  // Function to redirect to ticket purchase
  const buyTickets = () => {
    // For demonstration, we'll redirect to Computicket
    window.open('https://www.computicket.com/', '_blank');
    
    toast({
      title: "Redirecting to Computicket",
      description: "You'll be able to purchase tickets for this event.",
    });
  };

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
                  <span>{event.location}, {event.city}</span>
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
                {event.specialOffer && (
                  <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-amber-700 text-sm font-medium">Special Offer</p>
                    <p className="text-amber-800">{event.specialOffer}</p>
                  </div>
                )}
                
                {event.price ? (
                  <div className="mb-6">
                    <p className="text-gray-500 text-sm">Price</p>
                    <div className="flex items-center">
                      <Ticket className="h-5 w-5 mr-2 text-event-purple" />
                      <p className="text-xl font-bold text-event-purple">{event.price}</p>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6">
                    <p className="text-gray-500 text-sm">Price</p>
                    <div className="flex items-center">
                      <Ticket className="h-5 w-5 mr-2 text-green-600" />
                      <p className="text-xl font-bold text-green-600">Free</p>
                    </div>
                  </div>
                )}
                
                {event.category === 'Sports' || event.price !== 'Free' ? (
                  <Button 
                    className="w-full mb-3 bg-event-purple hover:bg-event-darkPurple"
                    onClick={buyTickets}
                  >
                    Buy Tickets on Computicket
                  </Button>
                ) : (
                  <Button className="w-full mb-3 bg-event-purple hover:bg-event-darkPurple">
                    Register Now
                  </Button>
                )}
                
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-center"
                    onClick={toggleReminder}
                  >
                    {hasReminder ? (
                      <>
                        <BellOff className="h-4 w-4 mr-2" />
                        Remove Reminder
                      </>
                    ) : (
                      <>
                        <Bell className="h-4 w-4 mr-2" />
                        Set Reminder
                      </>
                    )}
                  </Button>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="flex items-center justify-center">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Event
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72">
                      <div className="space-y-4">
                        <h4 className="font-medium text-center">Share this event</h4>
                        <div className="flex items-center space-x-2">
                          <Input 
                            readOnly 
                            value={window.location.href} 
                            className="text-xs"
                          />
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={shareEvent}
                          >
                            Copy
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                
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
                        <p className="text-sm text-gray-600">{event.location}, {event.city}</p>
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
