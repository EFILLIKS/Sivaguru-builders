"use client";

import React from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Add New Project"
        description="Fill all project specifications, descriptions, and media assets."
        breadcrumbs={[
          { label: "Projects", href: "/admin/projects" },
          { label: "New Project" },
        ]}
      />

      <ProjectForm />
    </div>
  );
}
