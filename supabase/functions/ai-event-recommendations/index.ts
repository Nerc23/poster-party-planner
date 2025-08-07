
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')

interface RecommendationRequest {
  userId: string
  location?: string
  interests?: string[]
  pastEvents?: string[]
}

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  try {
    const { userId, location, interests, pastEvents }: RecommendationRequest = await req.json()

    if (!OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not set')
      return new Response('AI service not configured', { status: 500 })
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Fetch available events
    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'active')
      .gte('date', new Date().toISOString())

    if (error) {
      console.error('Error fetching events:', error)
      return new Response('Failed to fetch events', { status: 500 })
    }

    // Create context for AI recommendation
    const eventContext = events?.map(event => ({
      id: event.id,
      title: event.title,
      category: event.category,
      city: event.city,
      description: event.description?.substring(0, 200) || '',
      date: event.date,
    })) || []

    const prompt = `
      As an AI event recommendation assistant for South African events, analyze the following:
      
      User Profile:
      - Location: ${location || 'Not specified'}
      - Interests: ${interests?.join(', ') || 'Not specified'}
      - Past Events: ${pastEvents?.join(', ') || 'None'}
      
      Available Events:
      ${JSON.stringify(eventContext, null, 2)}
      
      Based on this information, recommend the top 5 most relevant events for this user.
      Consider:
      1. Geographic proximity to user's location
      2. Alignment with user's stated interests
      3. Diversity of recommendations (don't recommend only one type)
      4. Past event preferences
      
      Respond with a JSON array containing event IDs and brief explanations:
      [
        {
          "eventId": "uuid",
          "reason": "Brief explanation why this event is recommended"
        }
      ]
    `

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an expert event recommendation system for South African events. Respond only with valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('OpenAI API error:', error)
      return new Response(`Failed to get recommendations: ${error}`, { status: 500 })
    }

    const aiResponse = await response.json()
    const recommendationsText = aiResponse.choices[0].message.content

    let recommendations
    try {
      recommendations = JSON.parse(recommendationsText)
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError)
      return new Response('Invalid AI response format', { status: 500 })
    }

    // Fetch full event details for recommended events
    const recommendedEventIds = recommendations.map((r: any) => r.eventId)
    const { data: recommendedEvents, error: fetchError } = await supabase
      .from('events')
      .select('*')
      .in('id', recommendedEventIds)

    if (fetchError) {
      console.error('Error fetching recommended events:', fetchError)
      return new Response('Failed to fetch event details', { status: 500 })
    }

    // Combine recommendations with event details
    const enrichedRecommendations = recommendations.map((rec: any) => {
      const event = recommendedEvents?.find(e => e.id === rec.eventId)
      return {
        ...rec,
        event: event || null
      }
    }).filter((rec: any) => rec.event !== null)

    return new Response(JSON.stringify({ 
      recommendations: enrichedRecommendations,
      total: enrichedRecommendations.length 
    }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in ai-event-recommendations function:', error)
    return new Response(`Internal Server Error: ${error.message}`, { status: 500 })
  }
})
