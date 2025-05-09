
import { format, addDays } from "date-fns";

export interface Event {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  date: Date;
  endDate?: Date;
  location: string;
  imageUrl: string;
  category: string;
  organizer: {
    name: string;
    imageUrl: string;
  };
  price?: string;
  isFeatured: boolean;
}

// Mock data
const events: Event[] = [
  {
    id: "1",
    title: "Summer Music Festival",
    description: "Join us for the annual summer music festival featuring top artists from around the world. Experience live music, food stalls, and an amazing atmosphere in the heart of the city. This year's lineup includes internationally renowned DJs and bands that will keep you dancing all weekend long. Bring your friends and make unforgettable memories!",
    shortDescription: "Annual music festival featuring top artists from around the world.",
    date: new Date(2025, 5, 15, 18, 0),
    endDate: new Date(2025, 5, 17, 23, 0),
    location: "Central Park",
    imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "Music",
    organizer: {
      name: "City Events Ltd",
      imageUrl: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    price: "$50",
    isFeatured: true
  },
  {
    id: "2",
    title: "Tech Conference 2025",
    description: "The biggest tech conference of the year is back! Network with industry leaders, attend cutting-edge workshops, and discover the latest innovations in technology. This two-day event will feature keynote speeches, panel discussions, and hands-on demonstrations of emerging technologies. Don't miss this opportunity to advance your career and connect with like-minded professionals.",
    shortDescription: "Network with industry leaders and discover the latest innovations in technology.",
    date: new Date(2025, 6, 10, 9, 0),
    endDate: new Date(2025, 6, 11, 17, 0),
    location: "Convention Center",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "Technology",
    organizer: {
      name: "TechEvents Inc",
      imageUrl: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    price: "$150",
    isFeatured: true
  },
  {
    id: "3",
    title: "Art Exhibition: Modern Masters",
    description: "Experience a breathtaking exhibition of contemporary art from the most innovative artists of our time. This curated collection showcases diverse mediums, styles, and perspectives that challenge and inspire. Walk through thoughtfully designed galleries and immerse yourself in the creative visions of today's most influential artists. Audio guides and expert docents are available to enhance your experience.",
    shortDescription: "Exhibition of contemporary art from the most innovative artists of our time.",
    date: new Date(2025, 7, 5, 10, 0),
    endDate: new Date(2025, 8, 30, 18, 0),
    location: "Modern Art Gallery",
    imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
    category: "Art",
    organizer: {
      name: "City Art Foundation",
      imageUrl: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    price: "$20",
    isFeatured: false
  },
  {
    id: "4",
    title: "Food & Wine Festival",
    description: "Indulge in culinary delights at our annual Food & Wine Festival. Sample dishes from top local restaurants, taste premium wines, and enjoy cooking demonstrations from celebrity chefs. This gastronomic celebration brings together food enthusiasts and culinary professionals for a weekend of flavors, aromas, and culinary innovation. VIP tickets include access to exclusive tasting sessions and chef meet-and-greets.",
    shortDescription: "Sample dishes from top local restaurants and taste premium wines.",
    date: new Date(2025, 8, 20, 12, 0),
    endDate: new Date(2025, 8, 21, 22, 0),
    location: "Waterfront Plaza",
    imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Food & Drink",
    organizer: {
      name: "Gourmet Events",
      imageUrl: "https://randomuser.me/api/portraits/men/76.jpg"
    },
    price: "$35",
    isFeatured: true
  },
  {
    id: "5",
    title: "Marathon for Charity",
    description: "Run for a cause in our annual charity marathon. Join thousands of participants and help raise funds for children's education. Whether you're a seasoned runner or a first-timer, there are routes for all fitness levels, including a 5K fun run, 10K race, and full marathon. Every step you take helps provide educational resources to underprivileged children in our community.",
    shortDescription: "Join thousands of participants and help raise funds for children's education.",
    date: new Date(2025, 9, 12, 7, 0),
    location: "City Streets",
    imageUrl: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80",
    category: "Sports",
    organizer: {
      name: "Run For Good Foundation",
      imageUrl: "https://randomuser.me/api/portraits/women/15.jpg"
    },
    price: "$25",
    isFeatured: false
  },
  {
    id: "6",
    title: "Business Networking Breakfast",
    description: "Start your day with purposeful connections at our monthly Business Networking Breakfast. Meet professionals from various industries, share ideas, and explore potential collaborations over a delicious breakfast. The event includes a short keynote speech from a successful entrepreneur, followed by structured networking activities designed to maximize meaningful interactions.",
    shortDescription: "Meet professionals from various industries and explore potential collaborations.",
    date: new Date(2025, 5, 25, 8, 0),
    location: "Grand Hotel Conference Room",
    imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    category: "Business",
    organizer: {
      name: "Business Connect",
      imageUrl: "https://randomuser.me/api/portraits/men/55.jpg"
    },
    price: "$15",
    isFeatured: false
  }
];

// Get all events
export const getAllEvents = (): Event[] => {
  return [...events];
};

// Get event by ID
export const getEventById = (id: string): Event | undefined => {
  return events.find(event => event.id === id);
};

// Get featured events
export const getFeaturedEvents = (): Event[] => {
  return events.filter(event => event.isFeatured);
};

// Get events by category
export const getEventsByCategory = (category: string): Event[] => {
  return events.filter(event => event.category === category);
};

// Get all categories
export const getAllCategories = (): string[] => {
  const categories = new Set<string>();
  events.forEach(event => categories.add(event.category));
  return Array.from(categories);
};

// Format date utility function
export const formatEventDate = (date: Date, endDate?: Date): string => {
  const baseFormat = "MMM d, yyyy";
  const timeFormat = "h:mm a";
  
  if (endDate) {
    if (date.toDateString() === endDate.toDateString()) {
      // Same day event
      return `${format(date, baseFormat)} · ${format(date, timeFormat)} - ${format(endDate, timeFormat)}`;
    } else {
      // Multi-day event
      return `${format(date, baseFormat)} - ${format(endDate, baseFormat)}`;
    }
  }
  
  return format(date, `${baseFormat} · ${timeFormat}`);
};
