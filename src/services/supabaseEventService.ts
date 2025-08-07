
import { supabase } from '@/integrations/supabase/client';

export interface SupabaseEvent {
  id: string;
  title: string;
  description: string | null;
  date: string;
  location: string;
  city: string;
  category: string;
  price: number;
  image_url: string | null;
  organizer_name: string;
  organizer_email: string;
  capacity: number | null;
  registered_count: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface EventRegistration {
  id: string;
  user_id: string;
  event_id: string;
  registration_date: string;
  status: string;
}

// Get all events from Supabase
export const getSupabaseEvents = async (): Promise<SupabaseEvent[]> => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'active')
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }

  return data || [];
};

// Get events by category
export const getEventsByCategory = async (category: string): Promise<SupabaseEvent[]> => {
  if (category === 'All') {
    return getSupabaseEvents();
  }

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'active')
    .eq('category', category)
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching events by category:', error);
    return [];
  }

  return data || [];
};

// Get events by city
export const getEventsByCity = async (city: string): Promise<SupabaseEvent[]> => {
  if (city === 'All') {
    return getSupabaseEvents();
  }

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'active')
    .eq('city', city)
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching events by city:', error);
    return [];
  }

  return data || [];
};

// Get single event by ID
export const getSupabaseEventById = async (id: string): Promise<SupabaseEvent | null> => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .eq('status', 'active')
    .single();

  if (error) {
    console.error('Error fetching event:', error);
    return null;
  }

  return data;
};

// Register for an event
export const registerForEvent = async (eventId: string): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('You must be logged in to register for events');
  }

  const { error } = await supabase
    .from('event_registrations')
    .insert({
      user_id: user.id,
      event_id: eventId,
    });

  if (error) {
    console.error('Error registering for event:', error);
    return false;
  }

  // Update registered count
  await supabase.rpc('increment_registration_count', { event_id: eventId });

  return true;
};

// Check if user is registered for an event
export const isUserRegistered = async (eventId: string): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return false;
  }

  const { data, error } = await supabase
    .from('event_registrations')
    .select('id')
    .eq('user_id', user.id)
    .eq('event_id', eventId)
    .eq('status', 'registered')
    .single();

  return !error && !!data;
};

// Get user's registered events
export const getUserRegistrations = async (): Promise<SupabaseEvent[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from('event_registrations')
    .select(`
      events (*)
    `)
    .eq('user_id', user.id)
    .eq('status', 'registered');

  if (error) {
    console.error('Error fetching user registrations:', error);
    return [];
  }

  return data?.map(reg => (reg as any).events).filter(Boolean) || [];
};

// Create new event
export const createEvent = async (eventData: Partial<SupabaseEvent>): Promise<SupabaseEvent | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('You must be logged in to create events');
  }

  const { data, error } = await supabase
    .from('events')
    .insert({
      ...eventData,
      organizer_email: user.email,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating event:', error);
    return null;
  }

  return data;
};
