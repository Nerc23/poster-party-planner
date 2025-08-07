
-- Create events table to store real event data
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  date TIMESTAMPTZ NOT NULL,
  location TEXT NOT NULL,
  city TEXT NOT NULL,
  category TEXT NOT NULL,
  price INTEGER DEFAULT 0, -- Price in cents (0 for free events)
  image_url TEXT,
  organizer_name TEXT NOT NULL,
  organizer_email TEXT NOT NULL,
  capacity INTEGER,
  registered_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'completed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  interests TEXT[], -- Array of event categories they're interested in
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create event registrations table
CREATE TABLE public.event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  registration_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  status TEXT DEFAULT 'registered' CHECK (status IN ('registered', 'cancelled', 'attended')),
  UNIQUE(user_id, event_id)
);

-- Enable Row Level Security
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for events table
CREATE POLICY "Everyone can view active events" 
  ON public.events FOR SELECT 
  USING (status = 'active');

CREATE POLICY "Authenticated users can create events" 
  ON public.events FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Users can update their own events" 
  ON public.events FOR UPDATE 
  TO authenticated 
  USING (organizer_email = auth.jwt() ->> 'email');

-- RLS Policies for profiles table
CREATE POLICY "Users can view all profiles" 
  ON public.profiles FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR ALL 
  TO authenticated 
  USING (auth.uid() = id);

-- RLS Policies for event_registrations table
CREATE POLICY "Users can view their own registrations" 
  ON public.event_registrations FOR SELECT 
  TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can register for events" 
  ON public.event_registrations FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can cancel their own registrations" 
  ON public.event_registrations FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = user_id);

-- Create function to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.email
  );
  RETURN new;
END;
$$;

-- Create trigger to auto-create profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert some sample events
INSERT INTO public.events (title, description, date, location, city, category, price, organizer_name, organizer_email) VALUES
('Cape Town Tech Summit 2025', 'Annual technology conference featuring the latest in AI and blockchain', '2025-03-15 09:00:00+02', 'Cape Town International Convention Centre', 'Cape Town', 'Technology', 15000, 'Tech Events SA', 'info@techevents.co.za'),
('Johannesburg Music Festival', 'Three-day music festival featuring local and international artists', '2025-04-20 18:00:00+02', 'FNB Stadium', 'Johannesburg', 'Music', 8500, 'Music Fest Organizers', 'events@musicfest.co.za'),
('Durban Food & Wine Fair', 'Celebrate South African cuisine and wines', '2025-05-10 10:00:00+02', 'Durban Exhibition Centre', 'Durban', 'Food & Drink', 5000, 'Culinary Events', 'hello@culinaryevents.co.za'),
('Cape Town Startup Networking', 'Connect with fellow entrepreneurs and investors', '2025-02-28 17:30:00+02', 'Workshop17 V&A Waterfront', 'Cape Town', 'Business', 0, 'Startup Community', 'network@startupct.com'),
('Pretoria Art Exhibition', 'Contemporary South African art showcase', '2025-03-05 12:00:00+02', 'Pretoria Art Museum', 'Pretoria', 'Arts & Culture', 2500, 'Art Gallery SA', 'curator@artgallery.co.za');
