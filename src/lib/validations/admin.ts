import { z } from "zod";

export const ProjectSchema = z.object({
  name: z.string().optional(),
  nameTa: z.string().optional(),
  slug: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  categoryTa: z.string().optional(),
  location: z.string().optional(),
  locationTa: z.string().optional(),
  year: z.string().optional(),
  status: z.enum(["Published", "Draft"]),
  area: z.string().optional(),
  areaTa: z.string().optional(),
  floors: z.string().optional(),
  floorsTa: z.string().optional(),
  bedrooms: z.string().optional(),
  bedroomsTa: z.string().optional(),
  shortDescription: z.string().optional(),
  shortDescriptionTa: z.string().optional(),
  projectOverview: z.string().optional(),
  projectOverviewTa: z.string().optional(),
  designDescription: z.string().optional(),
  designDescriptionTa: z.string().optional(),
  constructionDescription: z.string().optional(),
  constructionDescriptionTa: z.string().optional(),
  interiorDescription: z.string().optional(),
  interiorDescriptionTa: z.string().optional(),
  keyFeatures: z.array(z.string()).optional(),
  googleMapsUrl: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  coverImage: z.string().optional(),
  galleryImages: z.array(z.string()).default([]),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export type ProjectFormValues = z.infer<typeof ProjectSchema>;

export const ServiceSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().min(2, "Slug is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  iconName: z.string().min(1, "Icon is required"),
  image: z.string().min(1, "Image is required"),
  displayOrder: z.number().int().min(1),
  published: z.boolean().default(true),
});

export type ServiceFormValues = z.infer<typeof ServiceSchema>;

export const FAQSchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters"),
  answer: z.string().min(10, "Answer must be at least 10 characters"),
  displayOrder: z.number().int().min(1),
  published: z.boolean().default(true),
});

export type FAQFormValues = z.infer<typeof FAQSchema>;

export const SettingsSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  phone: z.string().min(5, "Phone number is required"),
  whatsapp: z.string().min(5, "WhatsApp number is required"),
  email: z.string().email("Enter a valid email address"),
  address: z.string().min(5, "Address is required"),
  instagramUrl: z.string().optional(),
  facebookUrl: z.string().optional(),
  googleMapsUrl: z.string().optional(),
  defaultSeoTitle: z.string().optional(),
  defaultSeoDescription: z.string().optional(),
});

export type SettingsFormValues = z.infer<typeof SettingsSchema>;

export const ProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
});

export type ProfileFormValues = z.infer<typeof ProfileSchema>;

export const LoginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof LoginSchema>;
