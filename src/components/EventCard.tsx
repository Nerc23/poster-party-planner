
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import { Event, formatEventDate } from '@/services/eventService';
import { Badge } from '@/components/ui/badge';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Link to={`/event/${event.id}`} className="event-card animate-fade-in">
      <div className="relative">
        <img 
          src={event.imageUrl} 
          alt={event.title}
          className="event-card-image rounded-t-lg h-44 w-full object-cover"
        />
        <Badge className="absolute top-3 right-3 bg-event-purple hover:bg-event-purple">
          {event.category}
        </Badge>
        
        {event.specialOffer && (
          <Badge className="absolute bottom-3 left-3 bg-amber-500 hover:bg-amber-500 text-xs">
            Special: {event.specialOffer}
          </Badge>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-1">{event.title}</h3>
        
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="truncate">{formatEventDate(event.date, event.endDate)}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="truncate">{event.location}, {event.city}</span>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {event.shortDescription}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src={event.organizer.imageUrl}
              alt={event.organizer.name}
              className="h-6 w-6 rounded-full mr-2"
            />
            <span className="text-xs text-gray-500">{event.organizer.name}</span>
          </div>
          {event.price && (
            <span className="text-sm font-semibold text-event-purple">
              {event.price === 'Free' ? 
                <span className="text-green-600">Free</span> : 
                event.price
              }
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
