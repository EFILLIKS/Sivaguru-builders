"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/admin/PageHeader";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { getProjectById } from "@/lib/repositories/projects";
import { Project } from "@/types/admin";
import { LoadingState, ErrorState } from "@/components/admin/LoadingState";

export default function EditProjectPage() {
  const params = useParams();
  const id = params?.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      if (!id) return;
      setLoading(true);
      try {
        const data = await getProjectById(id);
        setProject(data);
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [id]);

  if (loading) {
    return <LoadingState message="Loading project details..." />;
  }

  if (!project) {
    return (
      <ErrorState
        title="Project Not Found"
        message="The project you are looking for does not exist or has been removed."
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Edit Project: ${project.name}`}
        description="Update specifications, gallery images, descriptions, or status."
        breadcrumbs={[
          { label: "Projects", href: "/admin/projects" },
          { label: "Edit" },
        ]}
      />

      <ProjectForm initialData={project} isEdit={true} />
    </div>
  );
}
