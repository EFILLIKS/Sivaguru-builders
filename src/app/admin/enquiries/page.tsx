"use client";

import React, { useEffect, useState } from "react";
import { SearchInput, FilterDropdown } from "@/components/admin/SearchInput";
import { DataTable, Column } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { DeleteDialog } from "@/components/admin/ConfirmDialog";
import { LoadingState, EmptyState } from "@/components/admin/LoadingState";
import { PageHeader } from "@/components/admin/PageHeader";
import { Eye, Trash2, Mail, Phone, Calendar, X } from "lucide-react";
import { getEnquiries, updateEnquiryStatus, deleteEnquiry } from "@/lib/repositories/enquiries";
import { EnquiryItem, EnquiryStatus } from "@/types/admin";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const data = await getEnquiries({ search, status: statusFilter });
      setEnquiries(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [search, statusFilter]);

  const handleUpdateStatus = async (id: string, status: EnquiryStatus) => {
    await updateEnquiryStatus(id, status);
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status });
    }
    fetchEnquiries();
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteEnquiry(deleteId);
      if (selectedEnquiry && selectedEnquiry.id === deleteId) {
        setSelectedEnquiry(null);
      }
      setDeleteId(null);
      fetchEnquiries();
    } finally {
      setDeleting(false);
    }
  };

  const columns: Column<EnquiryItem>[] = [
    {
      header: "Contact Name",
      cell: (row) => (
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900">{row.name}</span>
          <span className="text-xs text-gray-400">{row.email}</span>
        </div>
      ),
    },
    {
      header: "Phone",
      accessorKey: "phone",
    },
    {
      header: "Service Needed",
      accessorKey: "service",
    },
    {
      header: "Status",
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: "Date Received",
      cell: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      header: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedEnquiry(row)}
            className="p-1.5 text-gray-500 hover:text-[#F47920] hover:bg-gray-100 rounded-lg transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeleteId(row.id)}
            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Delete Enquiry"
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
        title="Contact Enquiries"
        description="Manage incoming client consultations and project inquiries."
        breadcrumbs={[{ label: "Enquiries" }]}
      />

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-xs">
        <SearchInput
          value={search}
          onSearchChange={setSearch}
          placeholder="Search by name, email, phone..."
        />

        <FilterDropdown
          label="Status"
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { label: "All Statuses", value: "all" },
            { label: "New", value: "New" },
            { label: "Contacted", value: "Contacted" },
            { label: "Closed", value: "Closed" },
          ]}
        />
      </div>

      {loading ? (
        <LoadingState message="Loading enquiries..." />
      ) : (
        <DataTable
          columns={columns}
          data={enquiries}
          keyExtractor={(e) => e.id}
          emptyState={
            <EmptyState
              title="No Enquiries Found"
              description="No contact form submissions matched your filters."
            />
          }
          mobileCardRender={(e) => (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{e.name}</h4>
                  <p className="text-xs text-gray-500">{e.phone} · {e.service}</p>
                </div>
                <StatusBadge status={e.status} />
              </div>

              <p className="text-xs text-gray-600 line-clamp-2 italic bg-gray-50 p-2 rounded-lg">
                "{e.message}"
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-400">
                  {new Date(e.createdAt).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedEnquiry(e)}
                    className="px-3 py-1.5 text-xs font-medium text-[#F47920] bg-[#F47920]/10 rounded-lg"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => setDeleteId(e.id)}
                    className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        />
      )}

      {/* Enquiry Detail Drawer / Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="relative w-full max-w-xl bg-white rounded-2xl p-6 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedEnquiry.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">Enquiry Detail View</p>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                <a href={`mailto:${selectedEnquiry.email}`} className="font-semibold text-gray-800 hover:text-[#F47920]">
                  {selectedEnquiry.email}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                <a href={`tel:${selectedEnquiry.phone}`} className="font-semibold text-gray-800 hover:text-[#F47920]">
                  {selectedEnquiry.phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-500">Service:</span>
                <span className="font-semibold text-gray-800">{selectedEnquiry.service}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="text-gray-600">{new Date(selectedEnquiry.createdAt).toLocaleString()}</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Message Body</h4>
              <div className="p-4 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 leading-relaxed min-h-[100px]">
                {selectedEnquiry.message}
              </div>
            </div>

            {/* Status Control */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-500">Update Status:</span>
                <div className="flex items-center gap-1.5">
                  {(["New", "Contacted", "Closed"] as EnquiryStatus[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(selectedEnquiry.id, st)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        selectedEnquiry.status === st
                          ? "bg-[#F47920] text-white shadow-xs"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold uppercase rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Enquiry?"
        description="Are you sure you want to delete this enquiry record?"
        isLoading={deleting}
      />
    </div>
  );
}
