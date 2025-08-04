
import { format, addDays } from "date-fns";

export interface Event {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  date: Date;
  endDate?: Date;
  location: string;
  city: string; // Added city for better location filtering
  imageUrl: string;
  category: string;
  organizer: {
    name: string;
    imageUrl: string;
  };
  price?: string;
  specialOffer?: string; // Added for special offers
  isFeatured: boolean;
}

// Mock data with authentic South African events
const events: Event[] = [
  {
    id: "1",
    title: "Cape Town Jazz Festival",
    description: "Africa's biggest jazz gathering returns to Cape Town! Experience world-class jazz performances from local and international artists at the Cape Town International Convention Centre. This two-day festival celebrates the rich heritage of jazz music with performances spanning traditional, contemporary, and fusion styles. Food stalls featuring local cuisine and craft vendors make this a complete cultural experience.",
    shortDescription: "Africa's biggest jazz gathering with world-class local and international artists.",
    date: new Date(2025, 2, 29, 18, 0),
    endDate: new Date(2025, 2, 30, 23, 0),
    location: "Cape Town International Convention Centre",
    city: "Cape Town",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Jazz Festival",
    organizer: {
      name: "Cape Town Jazz Events",
      imageUrl: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    price: "R450",
    specialOffer: "Early bird tickets 25% off",
    isFeatured: true
  },
  {
    id: "2",
    title: "Neighbourgoods Market Johannesburg",
    description: "The original artisanal food and craft market in Johannesburg's trendy Braamfontein district. Every Saturday, local vendors showcase fresh produce, artisanal foods, handmade crafts, and vintage finds. Enjoy live acoustic music while sampling local delicacies like boerewors rolls, koeksisters, and craft beer. A perfect family-friendly experience that celebrates local entrepreneurship.",
    shortDescription: "Artisanal food and craft market in trendy Braamfontein every Saturday.",
    date: new Date(2025, 1, 15, 9, 0),
    endDate: new Date(2025, 1, 15, 15, 0),
    location: "44 Juta Street, Braamfontein",
    city: "Johannesburg",
    imageUrl: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Food Market",
    organizer: {
      name: "Neighbourgoods Collective",
      imageUrl: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    price: "Free",
    specialOffer: "Free parking on weekends",
    isFeatured: true
  },
  {
    id: "3",
    title: "AfricaCom Technology Summit",
    description: "The continent's largest tech conference bringing together industry leaders, entrepreneurs, and innovators from across Africa. Three days of keynote speeches, panel discussions, product launches, and networking opportunities focusing on digital transformation, fintech, AI, and startup ecosystems. Connect with investors, discover emerging technologies, and explore business opportunities across African markets.",
    shortDescription: "Africa's largest tech conference with industry leaders and innovation showcases.",
    date: new Date(2025, 10, 12, 8, 30),
    endDate: new Date(2025, 10, 14, 17, 0),
    location: "Cape Town International Convention Centre",
    city: "Cape Town",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Summit",
    organizer: {
      name: "AfricaCom Events",
      imageUrl: "https://randomuser.me/api/portraits/men/85.jpg"
    },
    price: "R2800",
    specialOffer: "Student tickets available at 50% off",
    isFeatured: true
  },
  {
    id: "4",
    title: "Mining Indaba Summit",
    description: "Africa's premier mining investment conference attracting global mining executives, investors, and government officials. The three-day summit covers mining investment opportunities, regulatory developments, sustainability initiatives, and technological innovations in the African mining sector. Network with industry leaders while exploring partnerships and investment opportunities.",
    shortDescription: "Premier African mining investment conference with global industry leaders.",
    date: new Date(2025, 1, 3, 8, 0),
    endDate: new Date(2025, 1, 5, 18, 0),
    location: "Cape Town International Convention Centre",
    city: "Cape Town",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Summit",
    organizer: {
      name: "Mining Indaba Organization",
      imageUrl: "https://randomuser.me/api/portraits/men/92.jpg"
    },
    price: "R4500",
    specialOffer: "Early registration discounts available",
    isFeatured: true
  },
  {
    id: "5",
    title: "Johannesburg Business Networking Breakfast",
    description: "Monthly networking breakfast bringing together entrepreneurs, business owners, and professionals from various industries in Johannesburg. Enjoy a continental breakfast while making valuable business connections, sharing insights, and exploring collaboration opportunities. Guest speakers share success stories and industry trends. Perfect for expanding your professional network in a relaxed environment.",
    shortDescription: "Monthly breakfast networking for Johannesburg business professionals and entrepreneurs.",
    date: new Date(2025, 1, 20, 7, 30),
    endDate: new Date(2025, 1, 20, 9, 30),
    location: "Sandton Convention Centre",
    city: "Johannesburg",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Networking Event",
    organizer: {
      name: "Johannesburg Business Network",
      imageUrl: "https://randomuser.me/api/portraits/women/71.jpg"
    },
    price: "R180",
    specialOffer: "First-time attendees get complimentary breakfast",
    isFeatured: false
  },
  {
    id: "6",
    title: "Women in Tech Networking Evening",
    description: "An inspiring evening celebrating women in technology across South Africa. Join female entrepreneurs, developers, executives, and students for networking, mentorship opportunities, and career development discussions. Panel discussions cover breaking barriers in tech, leadership strategies, and building supportive communities. Light refreshments and door prizes included.",
    shortDescription: "Networking evening celebrating and supporting women in South African tech industry.",
    date: new Date(2025, 2, 8, 17, 30),
    endDate: new Date(2025, 2, 8, 20, 30),
    location: "The Forum Company Sandton",
    city: "Johannesburg",
    imageUrl: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80",
    category: "Networking Event",
    organizer: {
      name: "Women in Tech SA",
      imageUrl: "https://randomuser.me/api/portraits/women/63.jpg"
    },
    price: "R120",
    specialOffer: "Students attend free with valid ID",
    isFeatured: true
  },
  {
    id: "7",
    title: "Hermanus Whale Festival",
    description: "Celebrate the annual return of Southern Right whales to Hermanus Bay! This three-day festival combines whale watching with live music, local food stalls, craft markets, and environmental education. Watch whales from the cliff paths, enjoy traditional South African braai, and experience local wines from the nearby Hemel-en-Aarde Valley. Family activities include face painting and educational talks about marine conservation.",
    shortDescription: "Three-day whale watching festival with music, food, and family activities.",
    date: new Date(2025, 8, 26, 10, 0),
    endDate: new Date(2025, 8, 28, 18, 0),
    location: "Hermanus Cliff Path & Town Centre",
    city: "Hermanus",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Festival",
    organizer: {
      name: "Hermanus Tourism Board",
      imageUrl: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    price: "R80",
    specialOffer: "Children under 12 enter free",
    isFeatured: false
  },
  {
    id: "8",
    title: "Durban Curry Festival",
    description: "Celebrate Durban's rich Indian heritage at the annual Curry Festival! Sample authentic curries, bunny chow, samoosas, and traditional Indian sweets from local restaurants and home cooks. Live Bollywood performances, traditional dance, and cooking demonstrations showcase the vibrant culture. This weekend festival at the Durban beachfront is a feast for all senses.",
    shortDescription: "Authentic Indian cuisine festival celebrating Durban's rich cultural heritage.",
    date: new Date(2025, 3, 12, 11, 0),
    endDate: new Date(2025, 3, 13, 20, 0),
    location: "North Beach Amphitheatre",
    city: "Durban",
    imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Food Festival",
    organizer: {
      name: "Durban Indian Cultural Society",
      imageUrl: "https://randomuser.me/api/portraits/men/76.jpg"
    },
    price: "R120",
    specialOffer: "Family packages available",
    isFeatured: true
  },
  {
    id: "9",
    title: "Parkrun Fun Day - Johannesburg",
    description: "Join thousands of runners, walkers, and families for a fun-filled Saturday morning at Delta Park. This weekly 5km event welcomes all fitness levels and ages. After the run, enjoy a community braai, kids' activities, fitness demonstrations, and local vendors selling healthy snacks and sports gear. Free participation with optional donations to local charities.",
    shortDescription: "Weekly 5km community run with family activities and community braai.",
    date: new Date(2025, 1, 22, 8, 0),
    endDate: new Date(2025, 1, 22, 11, 0),
    location: "Delta Park",
    city: "Johannesburg",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Fun Day",
    organizer: {
      name: "Parkrun South Africa",
      imageUrl: "https://randomuser.me/api/portraits/women/15.jpg"
    },
    price: "Free",
    specialOffer: "Free healthy breakfast for first-timers",
    isFeatured: false
  },
  {
    id: "10",
    title: "Stellenbosch Wine & Food Festival",
    description: "Experience the best of South African wine country at this premier wine and food festival. Sample award-winning wines from local vineyards, enjoy gourmet food pairings, and attend masterclasses led by renowned sommeliers. Live jazz music, vineyard tours, and stunning mountain views create the perfect backdrop for this sophisticated celebration of local terroir.",
    shortDescription: "Premier wine festival featuring award-winning local wines and gourmet food pairings.",
    date: new Date(2025, 1, 14, 12, 0),
    endDate: new Date(2025, 1, 16, 18, 0),
    location: "Stellenbosch University Botanical Garden",
    city: "Stellenbosch",
    imageUrl: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Wine Festival",
    organizer: {
      name: "Stellenbosch Wine Route",
      imageUrl: "https://randomuser.me/api/portraits/men/55.jpg"
    },
    price: "R280",
    specialOffer: "Wine club members get 20% off",
    isFeatured: true
  },
  {
    id: "11",
    title: "Cape Town Startup Networking Mixer",
    description: "Connect with Cape Town's vibrant startup ecosystem at this monthly networking mixer. Meet founders, investors, developers, and service providers while enjoying craft cocktails and gourmet canapés. Pitch sessions, mentor meetings, and informal networking create opportunities for collaborations, funding, and partnerships. Special focus on fintech, healthtech, and cleantech startups.",
    shortDescription: "Monthly startup networking mixer connecting Cape Town's entrepreneurial community.",
    date: new Date(2025, 2, 25, 18, 0),
    endDate: new Date(2025, 2, 25, 21, 0),
    location: "Workshop17 V&A Waterfront",
    city: "Cape Town",
    imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Networking Event",
    organizer: {
      name: "Cape Town Startup Community",
      imageUrl: "https://randomuser.me/api/portraits/men/39.jpg"
    },
    price: "R150",
    specialOffer: "Startup founders attend free with pitch deck",
    isFeatured: false
  },
  {
    id: "12",
    title: "Knysna Forest Marathon",
    description: "Run through the breathtaking indigenous forests of Knysna in this challenging but rewarding marathon. Choose from 21km, 42km, or 10km routes that wind through ancient yellowwood trees, across wooden bridges, and offer spectacular views of the Knysna Heads. Post-race celebrations include local craft beer, boerewors rolls, and live acoustic music.",
    shortDescription: "Scenic forest marathon through Knysna's ancient indigenous forests.",
    date: new Date(2025, 6, 12, 6, 30),
    location: "Knysna Forest",
    city: "Knysna",
    imageUrl: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Sports Event",
    organizer: {
      name: "Garden Route Athletics",
      imageUrl: "https://randomuser.me/api/portraits/women/28.jpg"
    },
    price: "R180",
    specialOffer: "Early entry includes technical t-shirt",
    isFeatured: false
  },
  {
    id: "13",
    title: "Bloemfontein Cherry Festival",
    description: "Celebrate spring's arrival with the annual Cherry Festival in the City of Roses. Japanese cherry blossoms create a pink canopy over food stalls, craft vendors, and live performances. Family activities include cherry pit spitting contests, traditional games, and cultural performances. Sample local delicacies while enjoying the spectacular cherry blossom scenery.",
    shortDescription: "Spring festival celebrating cherry blossoms with food, crafts, and family activities.",
    date: new Date(2025, 8, 15, 9, 0),
    endDate: new Date(2025, 8, 17, 17, 0),
    location: "King's Park & Botanical Gardens",
    city: "Bloemfontein",
    imageUrl: "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixlib=rb-4.0.3&auto=format&fit=crop&w=1476&q=80",
    category: "Festival",
    organizer: {
      name: "Bloemfontein Tourism",
      imageUrl: "https://randomuser.me/api/portraits/men/67.jpg"
    },
    price: "R65",
    specialOffer: "Student discounts available",
    isFeatured: false
  },
  {
    id: "14",
    title: "Soweto Street Festival",
    description: "Experience the vibrant energy of Soweto at this annual street festival celebrating local culture, music, and entrepreneurship. Street food vendors serve authentic township cuisine, local musicians perform on multiple stages, and artists showcase traditional and contemporary African art. Dance workshops, storytelling sessions, and historical tours make this an immersive cultural experience.",
    shortDescription: "Vibrant street festival celebrating Soweto's culture, music, and local entrepreneurship.",
    date: new Date(2025, 4, 24, 10, 0),
    endDate: new Date(2025, 4, 25, 22, 0),
    location: "Vilakazi Street",
    city: "Johannesburg",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Street Festival",
    organizer: {
      name: "Soweto Cultural Initiative",
      imageUrl: "https://randomuser.me/api/portraits/women/52.jpg"
    },
    price: "R50",
    specialOffer: "Local residents get free entry",
    isFeatured: true
  },
  {
    id: "15",
    title: "Cradle Moon Lakeside Family Picnic",
    description: "Pack your blankets and baskets for a perfect family picnic by the tranquil Cradle Moon Lake. This monthly gathering features live acoustic music, children's entertainment, pony rides, and traditional games like three-legged races and egg-and-spoon races. Food vendors offer picnic essentials, or bring your own feast to enjoy under the African sun.",
    shortDescription: "Monthly family picnic by the lake with live music and children's activities.",
    date: new Date(2025, 2, 16, 11, 0),
    endDate: new Date(2025, 2, 16, 16, 0),
    location: "Cradle Moon Lodge",
    city: "Johannesburg",
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Picnic Event",
    organizer: {
      name: "Cradle Moon Family Events",
      imageUrl: "https://randomuser.me/api/portraits/men/43.jpg"
    },
    price: "R40",
    specialOffer: "Bring your own picnic basket and get R10 off",
    isFeatured: false
  },
  {
    id: "16",
    title: "Port Elizabeth Jazz & Heritage Festival",
    description: "Celebrate the rich musical heritage of the Eastern Cape with three days of jazz, gospel, and traditional music performances. Local and visiting musicians perform on multiple stages throughout the historic city center. Traditional food stalls serve vetkoek, koeksisters, and other local favorites while craft vendors display Xhosa beadwork and pottery.",
    shortDescription: "Three-day jazz and heritage festival celebrating Eastern Cape's musical traditions.",
    date: new Date(2025, 5, 20, 17, 0),
    endDate: new Date(2025, 5, 22, 23, 0),
    location: "St George's Park & City Centre",
    city: "Port Elizabeth",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Jazz Festival",
    organizer: {
      name: "Eastern Cape Arts Council",
      imageUrl: "https://randomuser.me/api/portraits/women/35.jpg"
    },
    price: "R150",
    isFeatured: true
  },
  {
    id: "17",
    title: "Pretoria Jacaranda Festival Concert",
    description: "Experience Pretoria's famous jacaranda season with an outdoor concert series in the purple-lined streets. Local orchestras, choirs, and contemporary artists perform under the blooming jacaranda canopy. Food trucks serve gourmet meals while families enjoy the spectacular natural beauty and live music in South Africa's administrative capital.",
    shortDescription: "Outdoor concert series during jacaranda season with orchestras and contemporary artists.",
    date: new Date(2025, 9, 10, 18, 0),
    endDate: new Date(2025, 9, 12, 21, 0),
    location: "Union Buildings Gardens",
    city: "Pretoria",
    imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Concert",
    organizer: {
      name: "Pretoria Music Society",
      imageUrl: "https://randomuser.me/api/portraits/men/58.jpg"
    },
    price: "R95",
    specialOffer: "Season passes available",
    isFeatured: false
  },
  {
    id: "18",
    title: "Fintech Innovation Summit Johannesburg",
    description: "Explore the future of financial technology at Africa's premier fintech summit. Leading industry experts, startups, and established financial institutions gather to discuss digital payments, blockchain, cryptocurrency, and financial inclusion. Workshops, pitch competitions, and networking sessions provide opportunities to connect with innovators shaping Africa's financial landscape.",
    shortDescription: "Premier African fintech summit exploring digital payments and financial innovation.",
    date: new Date(2025, 4, 15, 9, 0),
    endDate: new Date(2025, 4, 16, 17, 0),
    location: "Sandton Convention Centre",
    city: "Johannesburg",
    imageUrl: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Summit",
    organizer: {
      name: "Fintech Africa",
      imageUrl: "https://randomuser.me/api/portraits/women/81.jpg"
    },
    price: "R1800",
    specialOffer: "Early bird pricing until end of February",
    isFeatured: true
  },
  {
    id: "19",
    title: "Durban Professional Women's Network Lunch",
    description: "Join successful businesswomen from across KwaZulu-Natal for an inspiring lunch focused on professional development and networking. Guest speakers share insights on leadership, work-life balance, and career advancement. The event includes structured networking sessions, mentorship opportunities, and discussions on supporting women in business across various industries.",
    shortDescription: "Professional development lunch for businesswomen in KwaZulu-Natal region.",
    date: new Date(2025, 3, 18, 12, 0),
    endDate: new Date(2025, 3, 18, 15, 0),
    location: "Hilton Durban Hotel",
    city: "Durban",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80",
    category: "Networking Event",
    organizer: {
      name: "Professional Women KZN",
      imageUrl: "https://randomuser.me/api/portraits/women/94.jpg"
    },
    price: "R280",
    specialOffer: "Group bookings of 4+ receive 15% discount",
    isFeatured: false
  },
  {
    id: "20",
    title: "Renewable Energy Summit Cape Town",
    description: "Leading summit on renewable energy solutions across Africa, bringing together government officials, investors, and clean energy companies. Explore solar, wind, and hydroelectric opportunities while discussing policy frameworks and investment strategies. Technical sessions cover grid integration, energy storage, and sustainable development goals across the continent.",
    shortDescription: "Premier renewable energy summit focusing on African clean energy opportunities.",
    date: new Date(2025, 5, 8, 8, 30),
    endDate: new Date(2025, 5, 10, 17, 30),
    location: "Cape Town International Convention Centre",
    city: "Cape Town",
    imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    category: "Summit",
    organizer: {
      name: "African Energy Association",
      imageUrl: "https://randomuser.me/api/portraits/men/77.jpg"
    },
    price: "R3200",
    specialOffer: "Government and NGO representatives get 30% off",
    isFeatured: true
  }
];

// Get all events
export const getAllEvents = (): Event[] => {
  return [...events];
};

export const getEventById = (id: string): Event | undefined => {
  return events.find(event => event.id === id);
};

export const getFeaturedEvents = (): Event[] => {
  return events.filter(event => event.isFeatured);
};

export const getEventsByCategory = (category: string): Event[] => {
  return category === 'All' 
    ? getAllEvents()
    : events.filter(event => event.category === category);
};

export const getEventsByLocation = (city: string): Event[] => {
  return city === 'All' 
    ? getAllEvents()
    : events.filter(event => event.city.toLowerCase() === city.toLowerCase());
};

export const getEventsByPriceRange = (maxPrice: number): Event[] => {
  return events.filter(event => {
    if (event.price === 'Free') return true;
    if (!event.price) return false;
    
    const numericPrice = parseFloat(event.price.replace(/[^\d.]/g, ''));
    return !isNaN(numericPrice) && numericPrice <= maxPrice;
  });
};

export const getAllCategories = (): string[] => {
  const categories = new Set<string>();
  events.forEach(event => categories.add(event.category));
  return Array.from(categories);
};

export const getAllCities = (): string[] => {
  const cities = new Set<string>();
  events.forEach(event => event.city && cities.add(event.city));
  return Array.from(cities);
};

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
