
import React, { useState } from 'react';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllEvents, formatEventDate } from '@/services/eventService';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Flag, Share2, Bell, BellOff, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const events = getAllEvents();
  const [reminders, setReminders] = useState<Record<string, boolean>>({});
  
  // Group events by date for easier lookup
  const eventsByDate: Record<string, typeof events> = {};
  events.forEach(event => {
    const dateKey = format(event.date, 'yyyy-MM-dd');
    if (!eventsByDate[dateKey]) {
      eventsByDate[dateKey] = [];
    }
    eventsByDate[dateKey].push(event);
  });
  
  // Get events for the selected date
  const selectedDateKey = date ? format(date, 'yyyy-MM-dd') : '';
  const selectedDateEvents = eventsByDate[selectedDateKey] || [];
  
  // Function to highlight dates with events
  const isDayWithEvent = (day: Date) => {
    const dayKey = format(day, 'yyyy-MM-dd');
    return !!eventsByDate[dayKey];
  };

  // Function to toggle reminder for an event
  const toggleReminder = (eventId: string) => {
    setReminders(prev => {
      const newReminders = { ...prev };
      newReminders[eventId] = !prev[eventId];
      
      if (newReminders[eventId]) {
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
      
      return newReminders;
    });
  };

  // Function to share event
  const shareEvent = (event: any) => {
    // Create the share URL for the current event
    const shareUrl = `${window.location.origin}/event/${event.id}`;
    
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
  const buyTickets = (event: any) => {
    // For demonstration, we'll redirect to Computicket
    // In a real application, you might have specific URLs for each event
    window.open('https://www.computicket.com/', '_blank');
    
    toast({
      title: "Redirecting to ticket vendor",
      description: "You'll be able to purchase tickets for this event.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-br from-event-softPurple to-event-softPeach py-12 mb-8 bg-confetti">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Event Calendar</h1>
            <p className="text-center text-gray-700">Find amazing events happening in South Africa</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-5">
              <Card className="border shadow-md p-4">
                <CardContent className="pt-4">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border pointer-events-auto"
                    modifiers={{
                      eventDay: (date) => isDayWithEvent(date),
                    }}
                    modifiersStyles={{
                      eventDay: { 
                        backgroundColor: '#E5DEFF',
                        fontWeight: 'bold',
                        borderRadius: '50%',
                      }
                    }}
                  />
                  <div className="mt-4 flex items-center">
                    <div className="w-4 h-4 bg-event-softPurple rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Days with events</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border shadow-md p-4 mt-6">
                <CardContent className="pt-4">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Bell className="h-5 w-5 mr-2 text-event-purple" />
                    My Event Reminders
                  </h3>
                  
                  {Object.keys(reminders).length === 0 ? (
                    <p className="text-gray-500 text-sm">No event reminders set. Click the bell icon on any event to set a reminder.</p>
                  ) : (
                    <div className="space-y-3">
                      {Object.entries(reminders).filter(([_, isSet]) => isSet).map(([eventId]) => {
                        const event = getAllEvents().find(e => e.id === eventId);
                        if (!event) return null;
                        
                        return (
                          <div key={eventId} className="flex items-center justify-between p-2 border rounded-md">
                            <div>
                              <p className="font-medium">{event.title}</p>
                              <p className="text-xs text-gray-500">{formatEventDate(event.date)}</p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-500 hover:text-red-700 hover:bg-red-50" 
                              onClick={() => toggleReminder(eventId)}
                            >
                              <BellOff className="h-4 w-4" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-7">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <CalendarIcon className="mr-2 h-6 w-6 text-event-purple" />
                {date ? format(date, 'MMMM d, yyyy') : 'Select a date'}
              </h2>
              
              {selectedDateEvents.length === 0 ? (
                <Card className="border shadow-sm p-8 text-center bg-white">
                  <p className="text-gray-500 mb-3">No events scheduled for this date.</p>
                  <p className="text-sm text-gray-400">Try selecting a different date or check out our <Link to="/events" className="text-event-purple hover:underline">events page</Link>.</p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {selectedDateEvents.map((event) => (
                    <Card key={event.id} className="border shadow-sm hover:shadow-md transition-shadow p-4 bg-white">
                      <div className="flex gap-4">
                        <img 
                          src={event.imageUrl}
                          alt={event.title}
                          className="h-20 w-20 rounded-md object-cover"
                        />
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <Link to={`/event/${event.id}`} className="hover:underline">
                              <h3 className="font-bold">{event.title}</h3>
                            </Link>
                            <Badge className={`
                              ${event.category === 'Music' ? 'bg-event-softPurple text-event-purple' : ''}
                              ${event.category === 'Food Market' ? 'bg-event-softGreen text-green-600' : ''}
                              ${event.category === 'Technology' ? 'bg-event-softBlue text-blue-600' : ''}
                              ${event.category === 'Art' ? 'bg-event-softPink text-pink-600' : ''}
                              ${event.category === 'Sports' ? 'bg-event-softOrange text-orange-600' : ''}
                              ${event.category === 'Business' ? 'bg-gray-100 text-gray-700' : ''}
                            `}>
                              {event.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{formatEventDate(event.date, event.endDate)}</p>
                          <p className="text-sm text-gray-500 mt-1">{event.location}, {event.city}</p>
                          
                          {event.price && (
                            <p className="text-sm font-medium mt-1">
                              {event.price === 'Free' ? 
                                <span className="text-green-600">Free</span> : 
                                <span className="text-event-purple">{event.price}</span>
                              }
                            </p>
                          )}
                          
                          <div className="flex items-center gap-2 mt-3">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs" 
                              onClick={() => toggleReminder(event.id)}
                            >
                              {reminders[event.id] ? (
                                <>
                                  <BellOff className="h-3.5 w-3.5 mr-1" />
                                  Remove Reminder
                                </>
                              ) : (
                                <>
                                  <Bell className="h-3.5 w-3.5 mr-1" />
                                  Set Reminder
                                </>
                              )}
                            </Button>
                            
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="outline" size="sm" className="text-xs">
                                  <Share2 className="h-3.5 w-3.5 mr-1" />
                                  Share
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-72" align="center">
                                <div className="space-y-4">
                                  <h4 className="font-medium text-center">Share this event</h4>
                                  <div className="flex items-center space-x-2">
                                    <Input 
                                      readOnly 
                                      value={`${window.location.origin}/event/${event.id}`} 
                                      className="text-xs"
                                    />
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      onClick={() => shareEvent(event)}
                                    >
                                      Copy
                                    </Button>
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                            
                            {event.category === 'Sports' && (
                              <Button 
                                variant="default" 
                                size="sm" 
                                className="text-xs bg-event-purple hover:bg-event-darkPurple"
                                onClick={() => buyTickets(event)}
                              >
                                <Ticket className="h-3.5 w-3.5 mr-1" />
                                Buy Tickets
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
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

export default Calendar;
