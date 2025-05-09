
import React, { useState } from 'react';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllEvents, formatEventDate } from '@/services/eventService';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Flag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const events = getAllEvents();
  
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
                    className="rounded-md border"
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
                    <Link to={`/event/${event.id}`} key={event.id}>
                      <Card className="border shadow-sm hover:shadow-md transition-shadow p-4 bg-white">
                        <div className="flex gap-4">
                          <img 
                            src={event.imageUrl}
                            alt={event.title}
                            className="h-20 w-20 rounded-md object-cover"
                          />
                          <div className="flex-grow">
                            <div className="flex justify-between items-start">
                              <h3 className="font-bold">{event.title}</h3>
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
                            {event.specialOffer && (
                              <div className="flex items-center mt-1">
                                <Flag className="h-3.5 w-3.5 text-amber-500 mr-1" />
                                <span className="text-xs text-amber-600">{event.specialOffer}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    </Link>
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
