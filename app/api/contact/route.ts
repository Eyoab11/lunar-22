import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { rateLimit, validateContactForm, sanitizeInput } from '../../../lib/email';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown';

    // Apply rate limiting (5 requests per 15 minutes per IP)
    if (!rateLimit(clientIP, 5, 15 * 60 * 1000)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    
    // Sanitize inputs
    const formData = {
      name: sanitizeInput(body.name || ''),
      email: sanitizeInput(body.email || ''),
      subject: sanitizeInput(body.subject || ''),
      message: sanitizeInput(body.message || '')
    };

    // Validate form data
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.errors.join(', ') },
        { status: 400 }
      );
    }

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 500 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <contact@lunar22.com>', // Hardcoded sender
      to: [process.env.To || 'info@lunar22.com'], // Hardcoded recipient
      subject: `Contact Form: ${formData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #555; margin-bottom: 5px;">From:</h3>
            <p style="margin: 0; padding: 10px; background-color: #f9f9f9; border-radius: 5px;">
              <strong>${formData.name}</strong><br>
              <a href="mailto:${formData.email}" style="color: #0066cc;">${formData.email}</a>
            </p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #555; margin-bottom: 5px;">Subject:</h3>
            <p style="margin: 0; padding: 10px; background-color: #f9f9f9; border-radius: 5px;">
              ${formData.subject}
            </p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #555; margin-bottom: 5px;">Message:</h3>
            <div style="margin: 0; padding: 15px; background-color: #f9f9f9; border-radius: 5px; white-space: pre-wrap;">
              ${formData.message}
            </div>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>This email was sent from the Lunar 22 contact form.</p>
            <p>Timestamp: ${new Date().toLocaleString()}</p>
            <p>Client IP: ${clientIP}</p>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        From: ${formData.name} (${formData.email})
        Subject: ${formData.subject}
        
        Message:
        ${formData.message}
        
        Timestamp: ${new Date().toLocaleString()}
        Client IP: ${clientIP}
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Email sent successfully',
        id: data?.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}