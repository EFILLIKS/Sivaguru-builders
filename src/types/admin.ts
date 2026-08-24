export type ProjectCategory =
  | "Architecture"
  | "Residential"
  | "Commercial"
  | "Interior"
  | "Interior Design"
  | "Reconstruct"
  | (string & {});

export type ProjectStatus = "Published" | "Draft";

export interface Project {
  id: string;
  name: string;
  nameTa?: string;
  slug: string;
  category: ProjectCategory;
  categoryTa?: string;
  location?: string;
  locationTa?: string;
  year?: string;
  status: ProjectStatus;
  area?: string;
  areaTa?: string;
  floors?: string;
  floorsTa?: string;
  bedrooms?: string;
  bedroomsTa?: string;
  shortDescription?: string;
  shortDescriptionTa?: string;
  projectOverview?: string;
  projectOverviewTa?: string;
  designDescription?: string;
  designDescriptionTa?: string;
  constructionDescription?: string;
  constructionDescriptionTa?: string;
  interiorDescription?: string;
  interiorDescriptionTa?: string;
  keyFeatures?: string[];
  googleMapsUrl?: string;
  latitude?: string;
  longitude?: string;
  coverImage: string;
  galleryImages: string[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  titleTa?: string;
  slug: string;
  description: string;
  descriptionTa?: string;
  iconName: string;
  image: string;
  displayOrder: number;
  published: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  displayOrder: number;
  published: boolean;
}

export type EnquiryStatus = "New" | "Contacted" | "Closed";

export interface EnquiryItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  projectType?: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
}

export interface SiteSettings {
  companyName: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  instagramUrl: string;
  facebookUrl: string;
  googleMapsUrl: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor";
  avatarUrl?: string;
}
