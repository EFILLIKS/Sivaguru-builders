import { SiteSettings, UserProfile } from "@/types/admin";
import { createClient } from "@/lib/supabase/client";

const SETTINGS_KEY = "sivaguru_settings_v1";
const PROFILE_KEY = "sivaguru_profile_v1";

const defaultSettings: SiteSettings = {
  companyName: "Sivaguru Builders",
  phone: "+91 7358640561",
  whatsapp: "+91 7358640561",
  email: "sivagurubuilders2022@gmail.com",
  address: "Andavar Street, Kattuputhur, Trichy - 621207, Tamil Nadu",
  googleMapsUrl: "https://maps.google.com",
  instagramUrl: "https://instagram.com/sivagurubuilders",
  facebookUrl: "https://facebook.com/sivagurubuilders",
  defaultSeoTitle: "Sivaguru Builders | Architecture, Construction & Interior Design in Tamil Nadu",
  defaultSeoDescription: "Sivaguru Builders offers premium architectural design, custom residential & commercial construction, and luxury interior design across Trichy & Tamil Nadu.",
};

const defaultProfile: UserProfile = {
  id: "admin-1",
  name: "Sivaguru Admin",
  email: "sivagurubuilders2022@gmail.com",
  role: "admin",
};

function loadSettings(): SiteSettings {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse settings from storage:", e);
      }
    }
  }
  return { ...defaultSettings };
}

function saveSettings(settings: SiteSettings) {
  if (typeof window !== "undefined") {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    window.dispatchEvent(new Event("settings_updated"));
  }
}

function loadProfile(): UserProfile {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(PROFILE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse profile from storage:", e);
      }
    }
  }
  return { ...defaultProfile };
}

function saveProfile(profile: UserProfile) {
  if (typeof window !== "undefined") {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    window.dispatchEvent(new Event("profile_updated"));
  }
}

let memorySettings: SiteSettings = { ...defaultSettings };
let memoryProfile: UserProfile = { ...defaultProfile };

export async function getSettings(): Promise<SiteSettings> {
  try {
    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase.from("site_settings").select("*").limit(1).single();
      if (!error && data) {
        return {
          companyName: data.company_name || defaultSettings.companyName,
          phone: data.phone || defaultSettings.phone,
          whatsapp: data.whatsapp || defaultSettings.whatsapp,
          email: data.email || defaultSettings.email,
          address: data.address || defaultSettings.address,
          instagramUrl: data.instagram || defaultSettings.instagramUrl,
          facebookUrl: data.facebook || defaultSettings.facebookUrl,
          googleMapsUrl: data.google_maps_url || defaultSettings.googleMapsUrl,
          defaultSeoTitle: defaultSettings.defaultSeoTitle,
          defaultSeoDescription: defaultSettings.defaultSeoDescription,
        };
      }
    }
  } catch (e) {
    // DB query fallback
  }

  return typeof window !== "undefined" ? loadSettings() : { ...memorySettings };
}


export async function updateSettings(data: Partial<SiteSettings>): Promise<SiteSettings> {
  try {
    const supabase = createClient();
    if (supabase) {
      await supabase
        .from("site_settings")
        .update({
          company_name: data.companyName,
          phone: data.phone,
          whatsapp: data.whatsapp,
          email: data.email,
          address: data.address,
          google_maps_url: data.googleMapsUrl,
          instagram: data.instagramUrl,
          facebook: data.facebookUrl,
        })
        .neq("id", "00000000-0000-0000-0000-000000000000");
    }
  } catch (e) {
    console.warn("Supabase update settings fallback to storage:", e);
  }

  const current = typeof window !== "undefined" ? loadSettings() : memorySettings;
  const updated = { ...current, ...data };
  if (typeof window !== "undefined") {
    saveSettings(updated);
  } else {
    memorySettings = updated;
  }
  return updated;
}

export async function getProfile(): Promise<UserProfile> {
  try {
    const supabase = createClient();
    if (supabase) {
      const { data: userRes } = await supabase.auth.getUser();
      if (userRes?.user) {
        return {
          id: userRes.user.id,
          name: userRes.user.user_metadata?.name || "Sivaguru Admin",
          email: userRes.user.email || "admin@sivagurubuilders.com",
          role: "admin",
        };
      }
    }
  } catch (e) {
    // DB query fallback
  }

  return typeof window !== "undefined" ? loadProfile() : { ...memoryProfile };
}

export async function updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
  try {
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.updateUser({
        data: { name: data.name },
      });
    }
  } catch (e) {
    console.warn("Supabase update profile fallback to storage:", e);
  }

  const current = typeof window !== "undefined" ? loadProfile() : memoryProfile;
  const updated = { ...current, ...data };
  if (typeof window !== "undefined") {
    saveProfile(updated);
  } else {
    memoryProfile = updated;
  }
  return updated;
}
