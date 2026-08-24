import { Project } from "@/types/admin";
import { initialMockProjects } from "@/lib/mock/data";
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
  return [...initialMockProjects];
}

function saveProjectsToStorage(projects: Project[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    window.dispatchEvent(new Event("projects_updated"));
  }
}

function getStoredGalleryImages(id: string, slug?: string): string[] | null {
  if (typeof window === "undefined") return null;
  try {
    const keyId = localStorage.getItem(`sivaguru_project_gallery_${id}`);
    if (keyId) {
      const parsed = JSON.parse(keyId);
      if (Array.isArray(parsed)) return parsed;
    }
    if (slug) {
      const keySlug = localStorage.getItem(`sivaguru_project_gallery_${slug}`);
      if (keySlug) {
        const parsed = JSON.parse(keySlug);
        if (Array.isArray(parsed)) return parsed;
      }
    }
  } catch (e) {
    // Ignore error
  }
  return null;
}

function saveStoredGalleryImages(id: string, slug: string | undefined, galleryImages: string[]) {
  if (typeof window === "undefined" || !galleryImages) return;
  try {
    const json = JSON.stringify(galleryImages);
    if (id) localStorage.setItem(`sivaguru_project_gallery_${id}`, json);
    if (slug) localStorage.setItem(`sivaguru_project_gallery_${slug}`, json);
  } catch (e) {
    // Ignore error
  }
}

let memoryProjects: Project[] = [...initialMockProjects];

export async function getProjects(filters?: {
  search?: string;
  status?: string;
  category?: string;
}): Promise<Project[]> {
  const localProjects = typeof window !== "undefined" ? loadProjectsFromStorage() : memoryProjects;

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
      if (!error && data && data.length > 0) {
        const mapped: Project[] = data.map((row: any) => {
          const localItem = localProjects.find((p) => p.id === row.id || p.slug === row.slug);
          const persistentGallery = getStoredGalleryImages(row.id, row.slug);

          let resolvedGallery: string[];
          if (row.gallery_images && Array.isArray(row.gallery_images) && row.gallery_images.length > 0) {
            resolvedGallery = row.gallery_images;
          } else if (persistentGallery && persistentGallery.length > 0) {
            resolvedGallery = persistentGallery;
          } else if (localItem && localItem.galleryImages && localItem.galleryImages.length > 0) {
            resolvedGallery = localItem.galleryImages;
          } else {
            resolvedGallery = [];
          }

          return {
            id: row.id,
            name: row.name_en || row.name,
            nameTa: row.name_ta,
            slug: row.slug,
            category: row.category,
            categoryTa: row.category_ta,
            location: row.location,
            locationTa: row.location_ta,
            year: row.year ? String(row.year) : "2026",
            status: row.published ? "Published" : "Draft",
            area: row.built_up_area || row.area,
            floors: row.floors ? String(row.floors) : "",
            bedrooms: row.bedrooms ? String(row.bedrooms) : "",
            shortDescription: row.short_description_en || row.short_description,
            shortDescriptionTa: row.short_description_ta,
            projectOverview: row.overview_en || row.overview,
            projectOverviewTa: row.overview_ta,
            coverImage: row.cover_image_url || row.cover_image || "",
            galleryImages: resolvedGallery,
            createdAt: row.created_at || new Date().toISOString(),
            updatedAt: row.updated_at || new Date().toISOString(),
          };
        });

        let resultsList = mapped;
        if (filters?.search) {
          const q = filters.search.toLowerCase();
          resultsList = resultsList.filter(
            (p) =>
              (p.name && p.name.toLowerCase().includes(q)) ||
              (p.nameTa && p.nameTa.toLowerCase().includes(q)) ||
              (p.location && p.location.toLowerCase().includes(q)) ||
              (p.category && p.category.toLowerCase().includes(q))
          );
        }
        return resultsList;
      }
    }
  } catch (e) {
    // Supabase DB fallback
  }

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
  const localProjects = typeof window !== "undefined" ? loadProjectsFromStorage() : memoryProjects;
  const localFound = localProjects.find((p) => p.id === id || p.slug === id);

  try {
    const supabase = createClient();
    if (supabase) {
      let query = supabase.from("projects").select("*");
      if (isUuid(id)) {
        query = query.eq("id", id);
      } else {
        query = query.eq("slug", id);
      }

      const { data, error } = await query.maybeSingle();

      if (!error && data) {
        const persistentGallery = getStoredGalleryImages(data.id, data.slug);
        let resolvedGallery: string[];

        if (data.gallery_images && Array.isArray(data.gallery_images) && data.gallery_images.length > 0) {
          resolvedGallery = data.gallery_images;
        } else if (persistentGallery && persistentGallery.length > 0) {
          resolvedGallery = persistentGallery;
        } else if (localFound && localFound.galleryImages && localFound.galleryImages.length > 0) {
          resolvedGallery = localFound.galleryImages;
        } else {
          resolvedGallery = [];
        }

        return {
          id: data.id,
          name: data.name_en || data.name,
          nameTa: data.name_ta,
          slug: data.slug,
          category: data.category,
          categoryTa: data.category_ta,
          location: data.location,
          locationTa: data.location_ta,
          year: data.year ? String(data.year) : "2026",
          status: data.published ? "Published" : "Draft",
          area: data.built_up_area || data.area,
          floors: data.floors ? String(data.floors) : "",
          bedrooms: data.bedrooms ? String(data.bedrooms) : "",
          shortDescription: data.short_description_en || data.short_description,
          shortDescriptionTa: data.short_description_ta,
          projectOverview: data.overview_en || data.overview,
          projectOverviewTa: data.overview_ta,
          coverImage: data.cover_image_url || data.cover_image || "",
          galleryImages: resolvedGallery,
          createdAt: data.created_at || new Date().toISOString(),
          updatedAt: data.updated_at || new Date().toISOString(),
        };
      }
    }
  } catch (e) {
    // Fallback to local storage query
  }

  return localFound || null;
}

export async function createProject(data: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<Project> {
  let createdId = `proj-${Date.now()}`;
  const gallery = data.galleryImages || [];

  try {
    const supabase = createClient();
    if (supabase) {
      const { data: inserted, error } = await supabase
        .from("projects")
        .insert({
          slug: data.slug || `proj-${Date.now()}`,
          name_en: data.name,
          name_ta: data.nameTa || data.name,
          category: data.category,
          service: data.category,
          location: data.location,
          year: data.year ? parseInt(data.year) : 2026,
          status: data.status,
          built_up_area: data.area,
          short_description_en: data.shortDescription,
          short_description_ta: data.shortDescriptionTa || data.shortDescription,
          overview_en: data.projectOverview,
          overview_ta: data.projectOverviewTa || data.projectOverview,
          cover_image_url: data.coverImage,
          cover_image_public_id: data.coverImage,
          gallery_images: gallery,
          published: data.status === "Published",
        })
        .select()
        .single();

      if (!error && inserted) {
        createdId = inserted.id;
      }
    }
  } catch (e) {
    console.warn("Supabase insert fallback to local storage:", e);
  }

  saveStoredGalleryImages(createdId, data.slug, gallery);

  const currentProjects = typeof window !== "undefined" ? loadProjectsFromStorage() : memoryProjects;

  const newProject: Project = {
    ...data,
    id: createdId,
    galleryImages: gallery,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const updatedProjects = [newProject, ...currentProjects];

  if (typeof window !== "undefined") {
    saveProjectsToStorage(updatedProjects);
  } else {
    memoryProjects = updatedProjects;
  }

  return newProject;
}

export async function updateProject(id: string, data: Partial<Omit<Project, "id" | "createdAt">>): Promise<Project | null> {
  const gallery = data.galleryImages;
  if (gallery) {
    saveStoredGalleryImages(id, data.slug, gallery);
  }

  try {
    const supabase = createClient();
    if (supabase) {
      const payload: any = {
        name_en: data.name,
        name_ta: data.nameTa,
        category: data.category,
        location: data.location,
        built_up_area: data.area,
        short_description_en: data.shortDescription,
        short_description_ta: data.shortDescriptionTa,
        overview_en: data.projectOverview,
        overview_ta: data.projectOverviewTa,
        published: data.status === "Published",
      };

      if (data.coverImage) {
        payload.cover_image_url = data.coverImage;
      }
      if (gallery !== undefined) {
        payload.gallery_images = gallery;
      }

      let query = supabase.from("projects").update(payload);

      if (isUuid(id)) {
        query = query.eq("id", id);
      } else {
        query = query.eq("slug", data.slug || id);
      }

      const { data: updatedRow, error } = await query.select();

      if (error) {
        console.error("Supabase update error:", error);
      } else {
        console.log("Supabase update success for:", id, updatedRow);
      }
    }
  } catch (e) {
    console.warn("Supabase update fallback to local storage:", e);
  }

  const currentProjects = typeof window !== "undefined" ? loadProjectsFromStorage() : memoryProjects;
  const index = currentProjects.findIndex((p) => p.id === id || p.slug === id || (data.slug && p.slug === data.slug));

  if (index !== -1) {
    const updated: Project = {
      ...currentProjects[index],
      ...data,
      galleryImages: gallery !== undefined ? gallery : currentProjects[index].galleryImages,
      updatedAt: new Date().toISOString(),
    };

    currentProjects[index] = updated;

    if (typeof window !== "undefined") {
      saveProjectsToStorage(currentProjects);
    } else {
      memoryProjects = currentProjects;
    }

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
        query = query.eq("slug", id);
      }
      await query;
    }
  } catch (e) {
    console.warn("Supabase delete fallback to local storage:", e);
  }

  if (typeof window !== "undefined") {
    localStorage.removeItem(`sivaguru_project_gallery_${id}`);
  }

  const currentProjects = typeof window !== "undefined" ? loadProjectsFromStorage() : memoryProjects;
  const initialLen = currentProjects.length;
  const filtered = currentProjects.filter((p) => p.id !== id && p.slug !== id);

  if (filtered.length < initialLen) {
    if (typeof window !== "undefined") {
      saveProjectsToStorage(filtered);
    } else {
      memoryProjects = filtered;
    }
    return true;
  }
  return false;
}
