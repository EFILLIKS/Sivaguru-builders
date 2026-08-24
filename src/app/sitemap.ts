import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/repositories/projects";
import { siteConfig } from "@/lib/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url.replace(/\/+$/, "");

  // 1. Static Core Public Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/works`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // 2. Dynamic Published Project Routes
  try {
    const publishedProjects = await getProjects({ status: "Published" });

    const projectRoutes: MetadataRoute.Sitemap = publishedProjects
      .filter((project) => project.slug || project.id)
      .map((project) => {
        const slug = project.slug || project.id;
        const lastModDate = project.updatedAt
          ? new Date(project.updatedAt)
          : project.createdAt
          ? new Date(project.createdAt)
          : new Date();

        return {
          url: `${baseUrl}/projects/${slug}`,
          lastModified: lastModDate,
          changeFrequency: "monthly",
          priority: 0.7,
        };
      });

    return [...staticRoutes, ...projectRoutes];
  } catch (error) {
    console.error("Error generating dynamic sitemap routes:", error);
    return staticRoutes;
  }
}
