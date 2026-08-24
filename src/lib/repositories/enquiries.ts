import { EnquiryItem, EnquiryStatus } from "@/types/admin";
import { initialMockEnquiries } from "@/lib/mock/data";
import { createClient } from "@/lib/supabase/client";

const STORAGE_KEY = "sivaguru_enquiries_v1";

function loadEnquiries(): EnquiryItem[] {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse enquiries from storage:", e);
      }
    }
  }
  return [...initialMockEnquiries];
}

function saveEnquiries(items: EnquiryItem[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("enquiries_updated"));
  }
}

let memoryEnquiries: EnquiryItem[] = [...initialMockEnquiries];

export async function getEnquiries(filters?: {
  search?: string;
  status?: string;
}): Promise<EnquiryItem[]> {
  try {
    const supabase = createClient();
    if (supabase) {
      let query = supabase.from("contact_enquiries").select("*").order("created_at", { ascending: false });
      if (filters?.status && filters.status !== "all") {
        query = query.eq("status", filters.status.toLowerCase());
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        const mapped: EnquiryItem[] = data.map((row: any) => ({
          id: row.id,
          name: row.name,
          email: row.email,
          phone: row.phone,
          service: row.service || "General Inquiry",
          message: row.message,
          status: (row.status ? row.status.charAt(0).toUpperCase() + row.status.slice(1) : "New") as EnquiryStatus,
          createdAt: row.created_at || new Date().toISOString(),
        }));
        let resultsList = mapped;
        if (filters?.search) {
          const q = filters.search.toLowerCase();
          resultsList = resultsList.filter(
            (e) =>
              (e.name && e.name.toLowerCase().includes(q)) ||
              (e.email && e.email.toLowerCase().includes(q)) ||
              (e.phone && e.phone.toLowerCase().includes(q)) ||
              (e.service && e.service.toLowerCase().includes(q)) ||
              (e.message && e.message.toLowerCase().includes(q))
          );
        }
        return resultsList;
      }
    }
  } catch (e) {
    // DB query fallback
  }

  const items = typeof window !== "undefined" ? loadEnquiries() : memoryEnquiries;
  let results = [...items];

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    results = results.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        e.phone.toLowerCase().includes(q) ||
        e.service.toLowerCase().includes(q)
    );
  }

  if (filters?.status && filters.status !== "all") {
    results = results.filter((e) => e.status === filters.status);
  }

  return results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function createEnquiry(data: Omit<EnquiryItem, "id" | "createdAt" | "status">): Promise<EnquiryItem> {
  try {
    const supabase = createClient();
    if (supabase) {
      await supabase.from("contact_enquiries").insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: data.service,
        message: data.message,
        status: "new",
      });
    }
  } catch (e) {
    console.warn("Supabase insert enquiry fallback to storage:", e);
  }

  const items = typeof window !== "undefined" ? loadEnquiries() : memoryEnquiries;
  const newEnquiry: EnquiryItem = {
    ...data,
    id: `enq-${Date.now()}`,
    status: "New",
    createdAt: new Date().toISOString(),
  };

  const updated = [newEnquiry, ...items];
  if (typeof window !== "undefined") {
    saveEnquiries(updated);
  } else {
    memoryEnquiries = updated;
  }
  return newEnquiry;
}

export async function updateEnquiryStatus(id: string, status: EnquiryStatus): Promise<EnquiryItem | null> {
  try {
    const supabase = createClient();
    if (supabase) {
      await supabase.from("contact_enquiries").update({ status: status.toLowerCase() }).eq("id", id);
    }
  } catch (e) {
    console.warn("Supabase update enquiry status fallback to storage:", e);
  }

  const items = typeof window !== "undefined" ? loadEnquiries() : memoryEnquiries;
  const index = items.findIndex((e) => e.id === id);
  if (index === -1) return null;

  items[index] = { ...items[index], status };
  if (typeof window !== "undefined") {
    saveEnquiries(items);
  } else {
    memoryEnquiries = items;
  }
  return items[index];
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  try {
    const supabase = createClient();
    if (supabase) {
      await supabase.from("contact_enquiries").delete().eq("id", id);
    }
  } catch (e) {
    console.warn("Supabase delete enquiry fallback to storage:", e);
  }

  const items = typeof window !== "undefined" ? loadEnquiries() : memoryEnquiries;
  const initialLen = items.length;
  const filtered = items.filter((e) => e.id !== id);

  if (filtered.length < initialLen) {
    if (typeof window !== "undefined") {
      saveEnquiries(filtered);
    } else {
      memoryEnquiries = filtered;
    }
    return true;
  }
  return false;
}
