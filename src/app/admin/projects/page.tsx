"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit3, Trash2, Globe, FileText } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { SearchInput, FilterDropdown } from "@/components/admin/SearchInput";
import { DataTable, Column } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { DeleteDialog } from "@/components/admin/ConfirmDialog";
import { LoadingState, EmptyState } from "@/components/admin/LoadingState";
import { Button } from "@/components/ui/Button";
import { getProjects, updateProject, deleteProject } from "@/lib/repositories/projects";
import { Project } from "@/types/admin";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchProjectsList = async () => {
    setLoading(true);
    try {
      const data = await getProjects({
        search,
        status: statusFilter,
        category: categoryFilter,
      });
      setProjects(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectsList();
  }, [search, statusFilter, categoryFilter]);

  const handleToggleStatus = async (project: Project) => {
    const nextStatus = project.status === "Published" ? "Draft" : "Published";
    await updateProject(project.id, { status: nextStatus });
    fetchProjectsList();
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await deleteProject(deleteId);
      setDeleteId(null);
      fetchProjectsList();
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: Column<Project>[] = [
    {
      header: "Project",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-gray-200 shrink-0 bg-gray-100">
            <Image src={row.coverImage} alt={row.name} fill sizes="48px" className="object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900">{row.name}</span>
            <span className="text-xs text-gray-500">{row.location}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Category",
      accessorKey: "category",
    },
    {
      header: "Year",
      accessorKey: "year",
    },
    {
      header: "Status",
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: "Updated",
      cell: (row) => new Date(row.updatedAt).toLocaleDateString(),
    },
    {
      header: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleToggleStatus(row)}
            title={row.status === "Published" ? "Unpublish Project" : "Publish Project"}
            className="p-1.5 text-gray-500 hover:text-[#F47920] hover:bg-gray-100 rounded-lg transition-colors"
          >
            {row.status === "Published" ? <FileText className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
          </button>
          <Link
            href={`/admin/projects/${row.id}/edit`}
            className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Edit Project"
          >
            <Edit3 className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setDeleteId(row.id)}
            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Delete Project"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Project Management"
        description="Create, publish, edit, and organize portfolio projects."
        breadcrumbs={[{ label: "Projects" }]}
        actions={
          <Link href="/admin/projects/new">
            <Button className="px-4 py-2 bg-[#F47920] text-white text-xs uppercase font-semibold rounded-xl flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Project
            </Button>
          </Link>
        }
      />

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-xs">
        <SearchInput
          value={search}
          onSearchChange={setSearch}
          placeholder="Search by name, location..."
        />

        <div className="flex items-center gap-3">
          <FilterDropdown
            label="Status"
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { label: "All Statuses", value: "all" },
              { label: "Published", value: "Published" },
              { label: "Draft", value: "Draft" },
            ]}
          />

          <FilterDropdown
            label="Category"
            value={categoryFilter}
            onChange={setCategoryFilter}
            options={[
              { label: "All Categories", value: "all" },
              { label: "Architecture", value: "Architecture" },
              { label: "Residential", value: "Residential" },
              { label: "Commercial", value: "Commercial" },
              { label: "Interior", value: "Interior" },
              { label: "Reconstruct", value: "Reconstruct" },
            ]}
          />
        </div>
      </div>

      {/* Table / Card List */}
      {loading ? (
        <LoadingState message="Loading projects list..." />
      ) : (
        <DataTable
          columns={columns}
          data={projects}
          keyExtractor={(p) => p.id}
          emptyState={
            <EmptyState
              title="No Projects Found"
              description="Get started by creating your first portfolio project."
              actionText="Add New Project"
              onAction={() => (window.location.href = "/admin/projects/new")}
            />
          }
          mobileCardRender={(p) => (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-gray-200 shrink-0">
                    <Image src={p.coverImage} alt={p.name} fill sizes="48px" className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{p.name}</h4>
                    <p className="text-xs text-gray-500">{p.category} · {p.location}</p>
                  </div>
                </div>
                <StatusBadge status={p.status} />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  onClick={() => handleToggleStatus(p)}
                  className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg"
                >
                  {p.status === "Published" ? "Unpublish" : "Publish"}
                </button>
                <Link
                  href={`/admin/projects/${p.id}/edit`}
                  className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg"
                >
                  Edit
                </Link>
                <button
                  onClick={() => setDeleteId(p.id)}
                  className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Project?"
        description="Are you sure you want to delete this project? It will be removed from the portfolio list."
        isLoading={isDeleting}
      />
    </div>
  );
}
