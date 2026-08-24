"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FolderKanban,
  CheckCircle2,
  FileClock,
  MessageSquare,
  Plus,
  ArrowRight,
  Eye,
} from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatCard } from "@/components/admin/StatCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/Button";
import { getProjects } from "@/lib/repositories/projects";
import { getEnquiries } from "@/lib/repositories/enquiries";
import { Project, EnquiryItem } from "@/types/admin";
import { LoadingState } from "@/components/admin/LoadingState";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Auth Check: Redirect to login if browser/tab was closed or unauthenticated
    if (typeof window !== "undefined") {
      const hasCookie = document.cookie.includes("admin_session=true");
      const hasStorage = sessionStorage.getItem("admin_session") === "true";
      if (!hasCookie || !hasStorage) {
        router.replace("/admin/login");
        return;
      }
    }

    async function loadDashboardData() {
      try {
        const [projData, enqData] = await Promise.all([
          getProjects(),
          getEnquiries(),
        ]);
        setProjects(projData);
        setEnquiries(enqData);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, [router]);

  if (loading) {
    return <LoadingState message="Loading dashboard statistics..." />;
  }

  const publishedCount = projects.filter((p) => p.status === "Published").length;
  const draftCount = projects.filter((p) => p.status === "Draft").length;
  const newEnquiryCount = enquiries.filter((e) => e.status === "New").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <PageHeader
        title="Admin Dashboard"
        description="Overview of Sivaguru Builders portfolio, leads, and website operations."
        actions={
          <Link href="/admin/projects/new">
            <Button className="bg-[#F47920] hover:bg-[#e06810] text-white flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add New Project
            </Button>
          </Link>
        }
      />

      {/* Quick Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Projects"
          value={projects.length}
          icon={FolderKanban}
        />
        <StatCard
          title="Published Projects"
          value={publishedCount}
          icon={CheckCircle2}
        />
        <StatCard
          title="Draft Projects"
          value={draftCount}
          icon={FileClock}
        />
        <StatCard
          title="New Enquiries"
          value={newEnquiryCount}
          icon={MessageSquare}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Projects (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-gray-900">Recent Projects</h2>
              <p className="text-xs text-gray-500">Latest portfolio updates</p>
            </div>
            <Link
              href="/admin/projects"
              className="text-xs font-semibold text-[#F47920] hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {projects.slice(0, 5).map((project) => (
              <div key={project.id} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-gray-800 truncate">{project.name}</h3>
                  <p className="text-xs text-gray-400 truncate">
                    {project.category} • {project.location || "N/A"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={project.status} />
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className="p-1.5 text-gray-400 hover:text-[#F47920] rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Enquiries (1 Col) */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-gray-900">Recent Enquiries</h2>
              <p className="text-xs text-gray-500">Lead submissions from website</p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs font-semibold text-[#F47920] hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {enquiries.slice(0, 5).map((enquiry) => (
              <div key={enquiry.id} className="py-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-800">{enquiry.name}</span>
                  <StatusBadge status={enquiry.status} />
                </div>
                <p className="text-xs text-gray-500 truncate">{enquiry.email} • {enquiry.phone}</p>
                <p className="text-xs text-gray-400 line-clamp-1">{enquiry.message}</p>
              </div>
            ))}
            {enquiries.length === 0 && (
              <p className="py-6 text-xs text-gray-400 text-center italic">No enquiries received yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
