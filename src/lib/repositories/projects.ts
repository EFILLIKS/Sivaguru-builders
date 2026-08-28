import { Project } from "@/types/admin";
import { createClient } from "@/lib/supabase/client";

const STORAGE_KEY = "sivaguru_projects_v1";


function isUuid(str: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
}

function loadProjectsFromStorage(): Project[] {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse projects from storage:", e);
      }
    }
  }
  return [];
}

function saveProjectsToStorage(projects: Project[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    window.dispatchEvent(new Event("projects_updated"));
  }
}

let memoryProjects: Project[] = [];


function mapDbRowToProject(row: any): Project {
  return {
    id: row.id,
    name: row.name_en || row.name || "",
    nameTa: row.name_ta || "",
    slug: row.slug || row.id,
    category: row.category || "Residential",
    categoryTa: row.category_ta || "",
    location: row.location || "",
    locationTa: row.location_ta || "",
    year: row.year ? String(row.year) : "2026",
    status: row.published !== undefined ? (row.published ? "Published" : "Draft") : (row.status || "Published"),
    area: row.built_up_area || row.area || "",
    areaTa: row.built_up_area_ta || "",
    floors: row.floors ? String(row.floors) : "",
    floorsTa: row.floors_ta || "",
    bedrooms: row.bedrooms ? String(row.bedrooms) : "",
    bedroomsTa: row.bedrooms_ta || "",
    shortDescription: row.short_description_en || row.short_description || "",
    shortDescriptionTa: row.short_description_ta || "",
    projectOverview: row.overview_en || row.overview || "",
    projectOverviewTa: row.overview_ta || "",
    coverImage: row.cover_image_url || row.cover_image || "",
    galleryImages: Array.isArray(row.gallery_images) ? row.gallery_images : [],
    createdAt: row.created_at || new Date().toISOString(),
    updatedAt: row.updated_at || new Date().toISOString(),
  };
}

export async function getProjects(filters?: {
  search?: string;
  status?: string;
  category?: string;
}): Promise<Project[]> {
  try {
    const supabase = createClient();
    if (supabase) {
      let query = supabase.from("projects").select("*").order("created_at", { ascending: false });

      if (filters?.status && filters.status !== "all") {
        query = query.eq("published", filters.status === "Published");
      }
      if (filters?.category && filters.category !== "all") {
        query = query.ilike("category", `%${filters.category}%`);
      }

      const { data, error } = await query;
      if (!error && data) {
        let mapped = data.map(mapDbRowToProject);

        if (filters?.search) {
          const q = filters.search.toLowerCase();
          mapped = mapped.filter(
            (p) =>
              (p.name && p.name.toLowerCase().includes(q)) ||
              (p.nameTa && p.nameTa.toLowerCase().includes(q)) ||
              (p.location && p.location.toLowerCase().includes(q)) ||
              (p.category && p.category.toLowerCase().includes(q))
          );
        }
        return mapped;
      }
    }
  } catch (e) {
    console.error("Supabase getProjects error:", e);
  }


  // Fallback to local storage only if Supabase returns 0 records or is unreachable
  const localProjects = typeof window !== "undefined" ? loadProjectsFromStorage() : memoryProjects;
  let results = [...localProjects];

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.nameTa && p.nameTa.toLowerCase().includes(q)) ||
        (p.location && p.location.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q)
    );
  }

  if (filters?.status && filters.status !== "all") {
    results = results.filter((p) => p.status === filters.status);
  }

  if (filters?.category && filters.category !== "all") {
    const catQuery = filters.category.toLowerCase();
    results = results.filter(
      (p) =>
        p.category.toLowerCase() === catQuery ||
        p.category.toLowerCase().includes(catQuery)
    );
  }

  return results;
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const supabase = createClient();
    if (supabase) {
      let query = supabase.from("projects").select("*");
      if (isUuid(id)) {
        query = query.eq("id", id);
      } else {
        query = query.or(`id.eq.${id},slug.eq.${id}`);
      }

      const { data, error } = await query.maybeSingle();
      if (!error && data) {
        return mapDbRowToProject(data);
      }
    }
  } catch (e) {
    console.error("Supabase getProjectById error:", e);
  }

  const localProjects = typeof window !== "undefined" ? loadProjectsFromStorage() : memoryProjects;
  return localProjects.find((p) => p.id === id || p.slug === id) || null;
}

function getSupabaseErrorMessage(error: unknown): string {
  if (!error) {
    return "Unknown Supabase error";
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "object" && error !== null) {
    const e = error as Record<string, unknown>;

    const parts = [
      typeof e.message === "string" ? e.message : null,
      typeof e.details === "string" ? e.details : null,
      typeof e.hint === "string" ? e.hint : null,
      typeof e.code === "string" ? `code=${e.code}` : null,
      typeof e.status === "number" ? `status=${e.status}` : null,
    ].filter(Boolean);

    if (parts.length > 0) {
      return parts.join(" | ");
    }
  }

  return String(error);
}

function isRealSupabaseError(error: any): boolean {
  if (!error) return false;
  if (typeof error === "object" && error !== null) {
    if (error.message || error.code || error.details || error.hint || error.status) {
      return true;
    }
    if (Object.keys(error).length === 0) {
      return false;
    }
  }
  return Boolean(error);
}

export async function createProject(data: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<Project> {
  try {
    const supabase = createClient();
    if (supabase) {
      const { data: authData, error: authError } = await supabase.auth.getUser();
      console.log("SUPABASE AUTH USER:", authData?.user ? authData.user.id : "NO AUTH USER");
      if (authError && isRealSupabaseError(authError)) {
        console.log("SUPABASE AUTH ERROR:", getSupabaseErrorMessage(authError));
      }

      const payload = {
        slug: data.slug || `proj-${Date.now()}`,
        name_en: data.name || "Untitled Project",
        name_ta: data.nameTa || data.name || "Untitled Project",
        category: data.category || "Residential",
        service: data.category || "Residential",
        location: data.location || "",
        location_ta: data.locationTa || "",
        year: data.year ? parseInt(String(data.year)) || 2026 : 2026,
        built_up_area: data.area || null,
        floors: data.floors ? parseInt(String(data.floors)) || null : null,
        bedrooms: data.bedrooms ? parseInt(String(data.bedrooms)) || null : null,
        short_description_en: data.shortDescription || "",
        short_description_ta: data.shortDescriptionTa || "",
        overview_en: data.projectOverview || "",
        overview_ta: data.projectOverviewTa || "",
        cover_image_url: data.coverImage || "/images/house-image.jpg",
        cover_image_public_id: data.coverImage || "/images/house-image.jpg",
        gallery_images: data.galleryImages || [],
        published: data.status === "Published",
      };

      console.log("PROJECT INSERT PAYLOAD:", JSON.stringify(payload, null, 2));

      const { data: insertedRows, error: insertError } = await supabase
        .from("projects")
        .insert(payload)
        .select();

      const errorMessage = insertError && isRealSupabaseError(insertError) ? getSupabaseErrorMessage(insertError) : null;
      console.log("PROJECT INSERT ERROR:", errorMessage || "NONE");
      console.log("PROJECT INSERT SUCCESS:", !errorMessage && insertedRows && insertedRows.length > 0);
      console.log("PROJECT INSERT ROW COUNT:", insertedRows?.length ?? 0);

      if (errorMessage) {
        console.error("SUPABASE ERROR MESSAGE:", errorMessage);
        throw new Error(errorMessage);
      }

      if (insertedRows && insertedRows.length > 0) {
        return mapDbRowToProject(insertedRows[0]);
      }
    }
  } catch (e: any) {
    console.error("createProject caught error:", e);
    throw e;
  }

  const createdId = `proj-${Date.now()}`;
  const newProject: Project = {
    ...data,
    id: createdId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const currentProjects = typeof window !== "undefined" ? loadProjectsFromStorage() : memoryProjects;
  const updatedProjects = [newProject, ...currentProjects];
  saveProjectsToStorage(updatedProjects);
  return newProject;
}

export async function updateProject(id: string, data: Partial<Omit<Project, "id" | "createdAt">>): Promise<Project | null> {
  try {
    const supabase = createClient();
    if (supabase) {
      const payload: any = {
        updated_at: new Date().toISOString(),
      };
      if (data.name !== undefined) payload.name_en = data.name;
      if (data.nameTa !== undefined) payload.name_ta = data.nameTa;
      if (data.slug !== undefined) payload.slug = data.slug;
      if (data.category !== undefined) {
        payload.category = data.category;
        payload.service = data.category;
      }
      if (data.location !== undefined) payload.location = data.location;
      if (data.locationTa !== undefined) payload.location_ta = data.locationTa;
      if (data.area !== undefined) payload.built_up_area = data.area || null;
      if (data.shortDescription !== undefined) payload.short_description_en = data.shortDescription;
      if (data.shortDescriptionTa !== undefined) payload.short_description_ta = data.shortDescriptionTa;
      if (data.projectOverview !== undefined) payload.overview_en = data.projectOverview;
      if (data.projectOverviewTa !== undefined) payload.overview_ta = data.projectOverviewTa;
      if (data.status !== undefined) payload.published = data.status === "Published";
      if (data.year !== undefined) payload.year = parseInt(String(data.year)) || 2026;
      if (data.floors !== undefined) {
        const parsed = parseInt(String(data.floors));
        payload.floors = isNaN(parsed) ? null : parsed;
      }
      if (data.bedrooms !== undefined) {
        const parsed = parseInt(String(data.bedrooms));
        payload.bedrooms = isNaN(parsed) ? null : parsed;
      }
      if (data.coverImage !== undefined) {
        payload.cover_image_url = data.coverImage || "/images/house-image.jpg";
        payload.cover_image_public_id = data.coverImage || "/images/house-image.jpg";
      }
      if (data.galleryImages !== undefined) {
        payload.gallery_images = data.galleryImages;
      }

      console.log("PROJECT UPDATE PAYLOAD:", JSON.stringify(payload, null, 2));

      let query = supabase.from("projects").update(payload);
      if (isUuid(id)) {
        query = query.eq("id", id);
      } else {
        query = query.or(`id.eq.${id},slug.eq.${id}`);
      }

      const { data: updatedRows, error: updateError } = await query.select();

      const errorMessage = updateError && isRealSupabaseError(updateError) ? getSupabaseErrorMessage(updateError) : null;
      console.log("PROJECT UPDATE ERROR:", errorMessage || "NONE");

      if (errorMessage) {
        console.error("SUPABASE UPDATE ERROR MESSAGE:", errorMessage);
        throw new Error(errorMessage);
      }

      if (updatedRows && updatedRows.length > 0) {
        return mapDbRowToProject(updatedRows[0]);
      }

      if (!updatedRows || updatedRows.length === 0) {
        const insertPayload = {
          slug: data.slug || id,
          name_en: data.name || "Untitled Project",
          name_ta: data.nameTa || data.name || "Untitled Project",
          category: data.category || "Residential",
          service: data.category || "Residential",
          location: data.location || "",
          location_ta: data.locationTa || "",
          year: data.year ? parseInt(String(data.year)) || 2026 : 2026,
          built_up_area: data.area || null,
          floors: data.floors ? parseInt(String(data.floors)) || null : null,
          bedrooms: data.bedrooms ? parseInt(String(data.bedrooms)) || null : null,
          short_description_en: data.shortDescription || "",
          short_description_ta: data.shortDescriptionTa || "",
          overview_en: data.projectOverview || "",
          overview_ta: data.projectOverviewTa || "",
          cover_image_url: data.coverImage || "/images/house-image.jpg",
          cover_image_public_id: data.coverImage || "/images/house-image.jpg",
          gallery_images: data.galleryImages || [],
          published: data.status === "Published",
        };

        const { data: fallbackRows, error: fallbackError } = await supabase
          .from("projects")
          .insert(insertPayload)
          .select();

        const fallbackErrorMessage = fallbackError && isRealSupabaseError(fallbackError) ? getSupabaseErrorMessage(fallbackError) : null;
        if (fallbackErrorMessage) {
          console.error("SUPABASE FALLBACK INSERT ERROR MESSAGE:", fallbackErrorMessage);
          throw new Error(fallbackErrorMessage);
        }

        if (fallbackRows && fallbackRows.length > 0) {
          return mapDbRowToProject(fallbackRows[0]);
        }
      }
    }
  } catch (e: any) {
    console.error("updateProject caught error:", e);
    throw e;
  }

  const currentProjects = typeof window !== "undefined" ? loadProjectsFromStorage() : memoryProjects;
  let index = currentProjects.findIndex((p) => p.id === id || p.slug === id || (data.slug && p.slug === data.slug));
  if (index !== -1) {
    const updated: Project = {
      ...currentProjects[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    currentProjects[index] = updated;
    saveProjectsToStorage(currentProjects);
    return updated;
  }
  return null;
}

export async function deleteProject(id: string): Promise<boolean> {
  try {
    const supabase = createClient();
    if (supabase) {
      let query = supabase.from("projects").delete();
      if (isUuid(id)) {
        query = query.eq("id", id);
      } else {
        query = query.or(`id.eq.${id},slug.eq.${id}`);
      }
      const { error } = await query;
      if (!error) {
        return true;
      }
    }
  } catch (e) {
    console.error("Supabase deleteProject exception:", e);
  }

  const currentProjects = typeof window !== "undefined" ? loadProjectsFromStorage() : memoryProjects;
  const initialLen = currentProjects.length;
  const filtered = currentProjects.filter((p) => p.id !== id && p.slug !== id);

  if (filtered.length < initialLen) {
    saveProjectsToStorage(filtered);
    return true;
  }
  return false;
}
