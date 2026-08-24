export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = 'admin' | 'editor';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: UserRole;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          slug: string;
          name_en: string;
          name_ta: string;
          category: string;
          service: string;
          location: string;
          year: number;
          status: string;
          built_up_area: string | null;
          plot_area: string | null;
          floors: number | null;
          bedrooms: number | null;
          short_description_en: string;
          short_description_ta: string;
          overview_en: string;
          overview_ta: string;
          design_description_en: string | null;
          design_description_ta: string | null;
          construction_description_en: string | null;
          construction_description_ta: string | null;
          interior_description_en: string | null;
          interior_description_ta: string | null;
          key_features_en: string[];
          key_features_ta: string[];
          map_url: string | null;
          latitude: number | null;
          longitude: number | null;
          cover_image_url: string;
          cover_image_public_id: string;
          seo_title_en: string | null;
          seo_title_ta: string | null;
          seo_description_en: string | null;
          seo_description_ta: string | null;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name_en: string;
          name_ta: string;
          category: string;
          service: string;
          location: string;
          year: number;
          status?: string;
          built_up_area?: string | null;
          plot_area?: string | null;
          floors?: number | null;
          bedrooms?: number | null;
          short_description_en: string;
          short_description_ta: string;
          overview_en: string;
          overview_ta: string;
          design_description_en?: string | null;
          design_description_ta?: string | null;
          construction_description_en?: string | null;
          construction_description_ta?: string | null;
          interior_description_en?: string | null;
          interior_description_ta?: string | null;
          key_features_en?: string[];
          key_features_ta?: string[];
          map_url?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          cover_image_url: string;
          cover_image_public_id: string;
          seo_title_en?: string | null;
          seo_title_ta?: string | null;
          seo_description_en?: string | null;
          seo_description_ta?: string | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name_en?: string;
          name_ta?: string;
          category?: string;
          service?: string;
          location?: string;
          year?: number;
          status?: string;
          built_up_area?: string | null;
          plot_area?: string | null;
          floors?: number | null;
          bedrooms?: number | null;
          short_description_en?: string;
          short_description_ta?: string;
          overview_en?: string;
          overview_ta?: string;
          design_description_en?: string | null;
          design_description_ta?: string | null;
          construction_description_en?: string | null;
          construction_description_ta?: string | null;
          interior_description_en?: string | null;
          interior_description_ta?: string | null;
          key_features_en?: string[];
          key_features_ta?: string[];
          map_url?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          cover_image_url?: string;
          cover_image_public_id?: string;
          seo_title_en?: string | null;
          seo_title_ta?: string | null;
          seo_description_en?: string | null;
          seo_description_ta?: string | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      project_images: {
        Row: {
          id: string;
          project_id: string;
          cloudinary_public_id: string;
          cloudinary_secure_url: string;
          alt_en: string;
          alt_ta: string;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          cloudinary_public_id: string;
          cloudinary_secure_url: string;
          alt_en?: string;
          alt_ta?: string;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          cloudinary_public_id?: string;
          cloudinary_secure_url?: string;
          alt_en?: string;
          alt_ta?: string;
          sort_order?: number;
          created_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          slug: string;
          title_en: string;
          title_ta: string;
          description_en: string;
          description_ta: string;
          image_url: string | null;
          icon: string | null;
          sort_order: number;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title_en: string;
          title_ta: string;
          description_en: string;
          description_ta: string;
          image_url?: string | null;
          icon?: string | null;
          sort_order?: number;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title_en?: string;
          title_ta?: string;
          description_en?: string;
          description_ta?: string;
          image_url?: string | null;
          icon?: string | null;
          sort_order?: number;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      faqs: {
        Row: {
          id: string;
          question_en: string;
          question_ta: string;
          answer_en: string;
          answer_ta: string;
          sort_order: number;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          question_en: string;
          question_ta: string;
          answer_en: string;
          answer_ta: string;
          sort_order?: number;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          question_en?: string;
          question_ta?: string;
          answer_en?: string;
          answer_ta?: string;
          sort_order?: number;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      contact_enquiries: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          message: string;
          service: string | null;
          project_id: string | null;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          message: string;
          service?: string | null;
          project_id?: string | null;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          message?: string;
          service?: string | null;
          project_id?: string | null;
          status?: string;
          created_at?: string;
        };
      };
      site_settings: {
        Row: {
          id: string;
          company_name: string;
          phone: string;
          whatsapp: string | null;
          email: string;
          address: string;
          google_maps_url: string | null;
          instagram: string | null;
          facebook: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company_name?: string;
          phone: string;
          whatsapp?: string | null;
          email: string;
          address: string;
          google_maps_url?: string | null;
          instagram?: string | null;
          facebook?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company_name?: string;
          phone?: string;
          whatsapp?: string | null;
          email?: string;
          address?: string;
          google_maps_url?: string | null;
          instagram?: string | null;
          facebook?: string | null;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      is_admin_or_editor: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: {
      user_role: UserRole;
    };
  };
}
