import { z } from 'zod';

export const contactEnquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[0-9+\s-]{10,15}$/, 'Please enter a valid phone number'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  service: z.string().optional().nullable(),
  project_id: z.string().uuid().optional().nullable(),
});

export type ContactEnquiryInput = z.infer<typeof contactEnquirySchema>;
