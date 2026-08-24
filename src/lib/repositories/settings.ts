import { SiteSettings, UserProfile } from "@/types/admin";
import { initialMockSettings, initialMockProfile } from "@/lib/mock/data";
import { createClient } from "@/lib/supabase/client";

const SETTINGS_KEY = "sivaguru_settings_v1";
const PROFILE_KEY = "sivaguru_profile_v1";

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
  return { ...initialMockSettings };
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
  return { ...initialMockProfile };
}

function saveProfile(profile: UserProfile) {
  if (typeof window !== "undefined") {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    window.dispatchEvent(new Event("profile_updated"));
  }
}

let memorySettings: SiteSettings = { ...initialMockSettings };
let memoryProfile: UserProfile = { ...initialMockProfile };

export async function getSettings(): Promise<SiteSettings> {
  try {
    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase.from("site_settings").select("*").limit(1).single();
      if (!error && data) {
        return {
          companyName: data.company_name || initialMockSettings.companyName,
          phone: data.phone || initialMockSettings.phone,
          whatsapp: data.whatsapp || initialMockSettings.whatsapp,
          email: data.email || initialMockSettings.email,
          address: data.address || initialMockSettings.address,
          instagramUrl: data.instagram || initialMockSettings.instagramUrl,
          facebookUrl: data.facebook || initialMockSettings.facebookUrl,
          googleMapsUrl: data.google_maps_url || initialMockSettings.googleMapsUrl,
          defaultSeoTitle: initialMockSettings.defaultSeoTitle,
          defaultSeoDescription: initialMockSettings.defaultSeoDescription,
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
