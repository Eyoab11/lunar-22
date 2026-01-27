// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(identifier: string, limit: number = 5, windowMs: number = 15 * 60 * 1000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export function validateContactForm(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || data.name.length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.push('Please provide a valid email address');
  }

  if (!data.subject || data.subject.length < 3) {
    errors.push('Subject must be at least 3 characters long');
  }

  if (!data.message || data.message.length < 10) {
    errors.push('Message must be at least 10 characters long');
  }

  // Check for maximum lengths
  if (data.name.length > 100) {
    errors.push('Name must be less than 100 characters');
  }

  if (data.subject.length > 200) {
    errors.push('Subject must be less than 200 characters');
  }

  if (data.message.length > 2000) {
    errors.push('Message must be less than 2000 characters');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}