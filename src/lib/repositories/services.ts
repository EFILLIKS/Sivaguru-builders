import { ServiceItem } from "@/types/admin";
import { initialMockServices } from "@/lib/mock/data";
import { createClient } from "@/lib/supabase/client";

const STORAGE_KEY = "sivaguru_services_v1";

function loadServices(): ServiceItem[] {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse services from storage:", e);
      }
    }
  }
  return [...initialMockServices];
}

function saveServices(items: ServiceItem[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("services_updated"));
  }
}

let memoryServices: ServiceItem[] = [...initialMockServices];

export async function getServices(): Promise<ServiceItem[]> {
  try {
    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase.from("services").select("*").order("sort_order", { ascending: true });
      if (!error && data && data.length > 0) {
        const mapped: ServiceItem[] = data.map((row: any, idx: number) => {
          const slug = (row.slug || "").toLowerCase();
          const fallbackImg = slug.includes("commercial")
            ? "/services/commercial.jpg"
            : slug.includes("interior")
            ? "/services/interior.jpg"
            : slug.includes("reconstruct")
            ? "/services/reconstruct.jpg"
            : "/services/residential.jpg";

          return {
            id: row.id,
            title: row.title_en || row.title,
            titleTa: row.title_ta,
            slug: row.slug,
            description: row.description_en || row.description,
            descriptionTa: row.description_ta,
            iconName: row.icon || "Home",
            image: row.image_url || row.image || fallbackImg,
            displayOrder: row.sort_order ?? idx + 1,
            published: row.published ?? true,
          };
        });

        // Also sync local storage so fallback matches DB
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(mapped));
        }

        return mapped;
      }
    }
  } catch (e) {
    // DB query fallback
  }

  const items = typeof window !== "undefined" ? loadServices() : memoryServices;
  return [...items].sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getServiceById(id: string): Promise<ServiceItem | null> {
  const items = await getServices();
  return items.find((s) => s.id === id || s.slug === id) || null;
}

export async function createService(data: Omit<ServiceItem, "id">): Promise<ServiceItem> {
  let createdId = `serv-${Date.now()}`;
  try {
    const supabase = createClient();
    if (supabase) {
      const { data: inserted, error } = await supabase
        .from("services")
        .insert({
          slug: data.slug || `serv-${Date.now()}`,
          title_en: data.title,
          title_ta: data.titleTa || data.title,
          description_en: data.description,
          description_ta: data.descriptionTa || data.description,
          image_url: data.image,
          icon: data.iconName,
          sort_order: data.displayOrder,
          published: data.published,
        })
        .select()
        .single();

      if (!error && inserted) {
        createdId = inserted.id;
      }
    }
  } catch (e) {
    console.warn("Supabase insert service fallback to storage:", e);
  }

  const items = typeof window !== "undefined" ? loadServices() : memoryServices;
  const newService: ServiceItem = {
    ...data,
    id: createdId,
  };
  const updated = [...items, newService];
  if (typeof window !== "undefined") {
    saveServices(updated);
  } else {
    memoryServices = updated;
  }
  return newService;
}

export async function updateService(id: string, data: Partial<Omit<ServiceItem, "id">>): Promise<ServiceItem | null> {
  try {
    const supabase = createClient();
    if (supabase) {
      // 1. Update by UUID / ID
      const { data: updatedRow, error } = await supabase
        .from("services")
        .update({
          title_en: data.title,
          title_ta: data.titleTa,
          description_en: data.description,
          description_ta: data.descriptionTa,
          image_url: data.image,
          icon: data.iconName,
          published: data.published,
        })
        .eq("id", id)
        .select();

      // 2. If no row updated by ID, match by slug in Supabase DB
      if (!error && (!updatedRow || updatedRow.length === 0) && (data.slug || data.title)) {
        const slugQuery = data.slug || data.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        await supabase
          .from("services")
          .update({
            title_en: data.title,
            title_ta: data.titleTa,
            description_en: data.description,
            description_ta: data.descriptionTa,
            image_url: data.image,
            icon: data.iconName,
            published: data.published,
          })
          .eq("slug", slugQuery);
      }
    }
  } catch (e) {
    console.warn("Supabase update service fallback to storage:", e);
  }

  const items = typeof window !== "undefined" ? loadServices() : memoryServices;
  const index = items.findIndex((s) => s.id === id || s.slug === id || (data.slug && s.slug === data.slug));

  if (index !== -1) {
    items[index] = { ...items[index], ...data };
    if (typeof window !== "undefined") {
      saveServices(items);
    } else {
      memoryServices = items;
    }
    return items[index];
  }
  return null;
}

export async function deleteService(id: string): Promise<boolean> {
  try {
    const supabase = createClient();
    if (supabase) {
      await supabase.from("services").delete().eq("id", id);
    }
  } catch (e) {
    console.warn("Supabase delete service fallback to storage:", e);
  }

  const items = typeof window !== "undefined" ? loadServices() : memoryServices;
  const initialLen = items.length;
  const filtered = items.filter((s) => s.id !== id && s.slug !== id);

  if (filtered.length < initialLen) {
    if (typeof window !== "undefined") {
      saveServices(filtered);
    } else {
      memoryServices = filtered;
    }
    return true;
  }
  return false;
}
