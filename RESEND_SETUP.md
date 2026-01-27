# Resend Email Integration Setup

This guide will help you set up Resend email service for the contact form.

## 1. Create a Resend Account

1. Go to [resend.com](https://resend.com) and sign up for an account
2. Verify your email address
3. Complete the onboarding process

## 2. Get Your API Key

1. In your Resend dashboard, go to **API Keys**
2. Click **Create API Key**
3. Give it a name (e.g., "Lunar 22 Contact Form")
4. Select the appropriate permissions (Send access is sufficient)
5. Copy the generated API key

## 3. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your Resend API key:
   ```env
   RESEND_API_KEY=re_your_actual_api_key_here
   ```

That's it! The contact form will use:
- **From email**: `onboarding@resend.dev` (Resend's default)
- **To email**: `contact@lunar22.com` (hardcoded in the API)

## 4. Domain Setup (Optional but Recommended)

For production use, you should verify your domain:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `yourdomain.com`)
4. Follow the DNS verification steps
5. Once verified, update `RESEND_FROM_EMAIL` to use your domain

## 5. Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/contact` page
3. Fill out and submit the contact form
4. Check your email (specified in `CONTACT_EMAIL`) for the message

## Features Included

- ✅ Form validation (client and server-side)
- ✅ Rate limiting (5 requests per 15 minutes per IP)
- ✅ Input sanitization
- ✅ Loading states and error handling
- ✅ Responsive design
- ✅ HTML and text email formats
- ✅ Professional email templates

## Rate Limiting

The contact form includes basic rate limiting:
- 5 submissions per IP address every 15 minutes
- For production, consider using Redis or a database for more robust rate limiting

## Security Features

- Input sanitization to prevent XSS
- Email validation
- Rate limiting to prevent spam
- Server-side validation
- CSRF protection (built into Next.js)

## Troubleshooting

### "Email service is not configured" error
- Make sure `RESEND_API_KEY` is set in your `.env.local` file
- Restart your development server after adding environment variables

### Emails not being received
- Check your spam folder
- Emails will be sent to `contact@lunar22.com` (hardcoded)
- Check Resend dashboard for delivery logs

### Rate limiting issues during testing
- Wait 15 minutes between test submissions
- Or restart your development server to reset the in-memory rate limit

## Production Deployment

When deploying to production:

1. Set `RESEND_API_KEY` environment variable in your hosting platform
2. Update the hardcoded email addresses in `/app/api/contact/route.ts` if needed:
   - Change `from: 'onboarding@resend.dev'` to your verified domain email
   - Change `to: ['contact@lunar22.com']` to your actual contact email
3. Consider implementing database-backed rate limiting
4. Monitor email delivery in Resend dashboard