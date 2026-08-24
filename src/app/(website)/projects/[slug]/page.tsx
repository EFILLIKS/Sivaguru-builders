import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProjects } from "@/lib/repositories/projects";
import ProjectDetailClient from "@/components/projects/ProjectDetailClient";
import { siteConfig } from "@/lib/config/site";
import { JsonLd } from "@/components/seo/JsonLd";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug || project.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const projects = await getProjects();
  const project = projects.find(
    (p) => p.slug === resolvedParams.slug || p.id === resolvedParams.slug
  );

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const slugPath = `/projects/${project.slug || project.id}`;
  const description = project.shortDescription || project.projectOverview || `View details and specifications for ${project.name} by Sivaguru Builders.`;
  const coverImageUrl = project.coverImage
    ? project.coverImage.startsWith("http")
      ? project.coverImage
      : `${siteConfig.url}${project.coverImage.startsWith("/") ? "" : "/"}${project.coverImage}`
    : `${siteConfig.url}${siteConfig.ogImage}`;

  return {
    title: `${project.name}`,
    description,
    alternates: {
      canonical: slugPath,
    },
    openGraph: {
      title: `${project.name} | Sivaguru Builders`,
      description,
      url: `${siteConfig.url}${slugPath}`,
      images: [
        {
          url: coverImageUrl,
          alt: project.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | Sivaguru Builders`,
      description,
      images: [coverImageUrl],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const projects = await getProjects();
  
  const project = projects.find(
    (p) => p.slug === resolvedParams.slug || p.id === resolvedParams.slug
  );

  if (!project) {
    notFound();
  }

  const slugPath = `/projects/${project.slug || project.id}`;

  const projectCreativeWorkSchema = {
    name: project.name,
    headline: project.name,
    description: project.shortDescription || project.projectOverview,
    url: `${siteConfig.url}${slugPath}`,
    image: project.coverImage || `${siteConfig.url}${siteConfig.ogImage}`,
    genre: project.category,
    dateCreated: project.year ? `${project.year}-01-01` : undefined,
    locationCreated: project.location
      ? {
          "@type": "Place",
          name: project.location,
        }
      : undefined,
  };

  return (
    <>
      <JsonLd type="CreativeWork" data={projectCreativeWorkSchema} />
      <ProjectDetailClient project={project} />
    </>
  );
}
