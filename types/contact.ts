export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

export interface ContactApiResponse {
  message?: string;
  error?: string;
  id?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}