import { FAQItem } from "@/types/admin";
import { createClient } from "@/lib/supabase/client";

const STORAGE_KEY = "sivaguru_faqs_v1";

function loadFAQs(): FAQItem[] {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse FAQs from storage:", e);
      }
    }
  }
  return [];
}

function saveFAQs(items: FAQItem[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("faqs_updated"));
  }
}

let memoryFAQs: FAQItem[] = [];

export async function getFAQs(): Promise<FAQItem[]> {
  try {
    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase.from("faqs").select("*").order("sort_order", { ascending: true });
      if (!error && data) {
        const mapped: FAQItem[] = data.map((row: any, idx: number) => ({
          id: row.id,
          question: row.question_en || row.question,
          answer: row.answer_en || row.answer,
          displayOrder: row.sort_order ?? idx + 1,
          published: row.published ?? true,
        }));
        return mapped;
      }
    }
  } catch (e) {
    // DB query fallback
  }

  const items = typeof window !== "undefined" ? loadFAQs() : memoryFAQs;
  return [...items].sort((a, b) => a.displayOrder - b.displayOrder);
}


export async function createFAQ(data: Omit<FAQItem, "id">): Promise<FAQItem> {
  try {
    const supabase = createClient();
    if (supabase) {
      await supabase.from("faqs").insert({
        question_en: data.question,
        question_ta: data.question,
        answer_en: data.answer,
        answer_ta: data.answer,
        sort_order: data.displayOrder,
        published: data.published,
      });
    }
  } catch (e) {
    console.warn("Supabase insert FAQ fallback to storage:", e);
  }

  const items = typeof window !== "undefined" ? loadFAQs() : memoryFAQs;
  const newFAQ: FAQItem = {
    ...data,
    id: `faq-${Date.now()}`,
  };
  const updated = [...items, newFAQ];
  if (typeof window !== "undefined") {
    saveFAQs(updated);
  } else {
    memoryFAQs = updated;
  }
  return newFAQ;
}

export async function updateFAQ(id: string, data: Partial<Omit<FAQItem, "id">>): Promise<FAQItem | null> {
  try {
    const supabase = createClient();
    if (supabase) {
      await supabase
        .from("faqs")
        .update({
          question_en: data.question,
          answer_en: data.answer,
          published: data.published,
        })
        .eq("id", id);
    }
  } catch (e) {
    console.warn("Supabase update FAQ fallback to storage:", e);
  }

  const items = typeof window !== "undefined" ? loadFAQs() : memoryFAQs;
  const index = items.findIndex((f) => f.id === id);
  if (index === -1) return null;

  items[index] = { ...items[index], ...data };
  if (typeof window !== "undefined") {
    saveFAQs(items);
  } else {
    memoryFAQs = items;
  }
  return items[index];
}

export async function deleteFAQ(id: string): Promise<boolean> {
  try {
    const supabase = createClient();
    if (supabase) {
      await supabase.from("faqs").delete().eq("id", id);
    }
  } catch (e) {
    console.warn("Supabase delete FAQ fallback to storage:", e);
  }

  const items = typeof window !== "undefined" ? loadFAQs() : memoryFAQs;
  const initialLen = items.length;
  const filtered = items.filter((f) => f.id !== id);

  if (filtered.length < initialLen) {
    if (typeof window !== "undefined") {
      saveFAQs(filtered);
    } else {
      memoryFAQs = filtered;
    }
    return true;
  }
  return false;
}
