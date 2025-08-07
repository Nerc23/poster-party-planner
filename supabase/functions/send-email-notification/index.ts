
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

interface EmailRequest {
  to: string
  subject: string
  html: string
  eventTitle?: string
  eventDate?: string
  eventLocation?: string
}

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  try {
    const { to, subject, html, eventTitle, eventDate, eventLocation }: EmailRequest = await req.json()

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set')
      return new Response('Email service not configured', { status: 500 })
    }

    // Default email template for event notifications
    let emailContent = html
    if (eventTitle && eventDate && eventLocation) {
      emailContent = `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <div style="background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">South African Events</h1>
          </div>
          
          <div style="padding: 30px; background-color: #f9fafb;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">Event Registration Confirmation</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #8B5CF6;">
              <h3 style="color: #8B5CF6; margin-top: 0;">${eventTitle}</h3>
              <p style="margin: 10px 0;"><strong>Date:</strong> ${eventDate}</p>
              <p style="margin: 10px 0;"><strong>Location:</strong> ${eventLocation}</p>
            </div>
            
            <p style="margin-top: 20px;">You have successfully registered for this event. We look forward to seeing you there!</p>
            
            <div style="margin-top: 30px; text-align: center;">
              <a href="https://your-app-domain.com/my-events" 
                 style="background: #8B5CF6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                View My Events
              </a>
            </div>
          </div>
          
          <div style="padding: 20px; text-align: center; color: #6b7280; font-size: 14px;">
            <p>Thank you for using South African Events!</p>
          </div>
        </div>
      `
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'South African Events <noreply@yourdomain.com>',
        to: [to],
        subject: subject,
        html: emailContent,
      }),
    })

    if (!res.ok) {
      const error = await res.text()
      console.error('Resend API error:', error)
      return new Response(`Failed to send email: ${error}`, { status: 500 })
    }

    const data = await res.json()
    console.log('Email sent successfully:', data)

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in send-email-notification function:', error)
    return new Response(`Internal Server Error: ${error.message}`, { status: 500 })
  }
})
