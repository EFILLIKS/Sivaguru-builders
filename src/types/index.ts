import type { Database } from './database.types';

export type Locale = 'en' | 'ta';

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Project = Database['public']['Tables']['projects']['Row'];
export type ProjectImage = Database['public']['Tables']['project_images']['Row'];
export type Service = Database['public']['Tables']['services']['Row'];
export type FAQ = Database['public']['Tables']['faqs']['Row'];
export type ContactEnquiry = Database['public']['Tables']['contact_enquiries']['Row'];
export type SiteSettings = Database['public']['Tables']['site_settings']['Row'];

export interface ProjectWithImages extends Project {
  images?: ProjectImage[];
}

export type LocalizedField<T extends Record<string, unknown>, K extends string> =
  `${K}_${Locale}` extends keyof T ? T[`${K}_${Locale}`] : T[`${K}_en`];
