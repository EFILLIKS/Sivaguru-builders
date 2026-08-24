"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Edit3, Trash2, Globe, FileText, ArrowUp, ArrowDown } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable, Column } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { DeleteDialog } from "@/components/admin/ConfirmDialog";
import { LoadingState, EmptyState } from "@/components/admin/LoadingState";
import { Button } from "@/components/ui/Button";
import { Input, TextArea } from "@/components/ui/Input";
import { getServices, createService, updateService, deleteService } from "@/lib/repositories/services";
import { ServiceItem } from "@/types/admin";

import { BilingualField } from "@/components/admin/BilingualField";

import { SearchInput } from "@/components/admin/SearchInput";

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal / Drawer state for Add/Edit
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [titleTa, setTitleTa] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionTa, setDescriptionTa] = useState("");
  const [iconName, setIconName] = useState("Home");
  const [image, setImage] = useState("/images/house-image.jpg");
  const [published, setPublished] = useState(true);
  const [saving, setSaving] = useState(false);

  // Delete modal state
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const data = await getServices();
      setServices(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setTitle("");
    setTitleTa("");
    setDescription("");
    setDescriptionTa("");
    setIconName("Home");
    setImage("/images/house-image.jpg");
    setPublished(true);
    setModalOpen(true);
  };

  const handleOpenEditModal = (item: ServiceItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setTitleTa(item.titleTa || "");
    setDescription(item.description);
    setDescriptionTa(item.descriptionTa || "");
    setIconName(item.iconName);
    setImage(item.image);
    setPublished(item.published);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;
    setSaving(true);

    try {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      if (editingItem) {
        await updateService(editingItem.id, {
          title,
          titleTa,
          slug,
          description,
          descriptionTa,
          iconName,
          image,
          published,
        });
      } else {
        await createService({
          title,
          titleTa,
          slug,
          description,
          descriptionTa,
          iconName,
          image,
          displayOrder: services.length + 1,
          published,
        });
      }
      setModalOpen(false);
      fetchServices();
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (item: ServiceItem) => {
    await updateService(item.id, { published: !item.published });
    fetchServices();
  };

  const handleMoveOrder = async (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= services.length) return;

    const currentItem = services[index];
    const targetItem = services[targetIdx];

    await updateService(currentItem.id, { displayOrder: targetItem.displayOrder });
    await updateService(targetItem.id, { displayOrder: currentItem.displayOrder });
    fetchServices();
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteService(deleteId);
      setDeleteId(null);
      fetchServices();
    } finally {
      setDeleting(false);
    }
  };

  const columns: Column<ServiceItem>[] = [
    {
      header: "Order",
      cell: (row) => {
        const idx = services.findIndex((s) => s.id === row.id);
        return (
          <div className="flex items-center gap-1">
            <span className="font-semibold text-xs text-gray-500 w-4 text-center">
              {row.displayOrder}
            </span>
            <div className="flex flex-col gap-0.5">
              <button
                onClick={() => handleMoveOrder(idx, "up")}
                disabled={idx === 0}
                className="p-0.5 text-gray-400 hover:text-gray-900 disabled:opacity-30"
              >
                <ArrowUp className="w-3 h-3" />
              </button>
              <button
                onClick={() => handleMoveOrder(idx, "down")}
                disabled={idx === services.length - 1}
                className="p-0.5 text-gray-400 hover:text-gray-900 disabled:opacity-30"
              >
                <ArrowDown className="w-3 h-3" />
              </button>
            </div>
          </div>
        );
      },
    },
    {
      header: "Service Title",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-gray-200 shrink-0">
            <Image src={row.image} alt={row.title} fill sizes="40px" className="object-cover" />
          </div>
          <span className="font-semibold text-gray-900">{row.title}</span>
        </div>
      ),
    },
    {
      header: "Description",
      cell: (row) => (
        <span className="text-xs text-gray-500 line-clamp-2 max-w-md">{row.description}</span>
      ),
    },
    {
      header: "Status",
      cell: (row) => (
        <StatusBadge status={row.published ? "Published" : "Draft"} />
      ),
    },
    {
      header: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleTogglePublish(row)}
            title={row.published ? "Unpublish Service" : "Publish Service"}
            className="p-1.5 text-gray-500 hover:text-[#F47920] hover:bg-gray-100 rounded-lg transition-colors"
          >
            {row.published ? <FileText className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
          </button>
          <button
            onClick={() => handleOpenEditModal(row)}
            className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Edit Service"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeleteId(row.id)}
            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Delete Service"
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
        title="Services Management"
        description="Manage services offered by Sivaguru Builders."
        breadcrumbs={[{ label: "Services" }]}
        actions={
          <Button
            onClick={handleOpenAddModal}
            className="px-4 py-2 bg-[#F47920] text-white text-xs uppercase font-semibold rounded-xl flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Service
          </Button>
        }
      />

      {/* Search Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
        <SearchInput
          value={search}
          onSearchChange={setSearch}
          placeholder="Search services by title or description..."
        />
      </div>

      {loading ? (
        <LoadingState message="Loading services..." />
      ) : (
        <DataTable
          columns={columns}
          data={services.filter((s) =>
            !search ||
            s.title.toLowerCase().includes(search.toLowerCase()) ||
            (s.titleTa && s.titleTa.toLowerCase().includes(search.toLowerCase())) ||
            s.description.toLowerCase().includes(search.toLowerCase())
          )}
          keyExtractor={(s) => s.id}
          emptyState={
            <EmptyState
              title="No Services Found"
              description="Add your first service offering."
              actionText="Add Service"
              onAction={handleOpenAddModal}
            />
          }
        />
      )}

      {/* Add / Edit Service Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl my-auto bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 flex flex-col max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)] overflow-hidden">
            <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4 shrink-0">
              {editingItem ? "Edit Service" : "Add New Service"}
            </h3>

            <form onSubmit={handleSave} className="flex-1 overflow-y-auto pr-1 space-y-4 py-2">
              <BilingualField
                label="Service Title"
                sourceValue={title}
                targetValue={titleTa}
                onSourceChange={setTitle}
                onTargetChange={setTitleTa}
                placeholderSource="e.g. Architectural Design"
                placeholderTarget="எ.கா. கட்டிடக்கலை வடிவமைப்பு"
              />

              <BilingualField
                label="Service Description"
                isTextArea
                rows={3}
                sourceValue={description}
                targetValue={descriptionTa}
                onSourceChange={setDescription}
                onTargetChange={setDescriptionTa}
                placeholderSource="Describe what this service encompasses..."
                placeholderTarget="இந்த சேவை எதை உள்ளடக்கியது என்பதை விவரிக்கவும்..."
              />

              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    label="Icon Name"
                    value={iconName}
                    onChange={(e) => setIconName(e.target.value)}
                    placeholder="Home, Building2, Sparkles, etc."
                  />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Service Cover Image (Upload from device)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setSaving(true);
                        try {
                          const formData = new FormData();
                          formData.append("file", file);
                          const res = await fetch("/api/upload", { method: "POST", body: formData });
                          if (res.ok) {
                            const data = await res.json();
                            if (data.url) {
                              setImage(data.url);
                              setSaving(false);
                              return;
                            }
                          }
                        } catch (err) {
                          console.warn("Cloudinary upload failed, using Data URL fallback", err);
                        }
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setImage(reader.result as string);
                          setSaving(false);
                        };
                        reader.readAsDataURL(file);
                      }}
                      className="text-xs text-gray-500 file:mr-2 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#F47920]/10 file:text-[#F47920] hover:file:bg-[#F47920]/20 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Service Image Preview */}
                {image && (
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-400">Current Image Preview:</span>
                    <div className="relative w-full h-[140px] rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
                      <Image src={image} alt="Service preview" fill sizes="(max-width: 640px) 100vw, 400px" className="object-cover" />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="published-toggle"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="rounded border-gray-300 text-[#F47920] focus:ring-[#F47920]"
                />
                <label htmlFor="published-toggle" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Publish service to website
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold uppercase rounded-xl"
                >
                  Cancel
                </button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-[#F47920] text-white text-xs font-semibold uppercase rounded-xl"
                >
                  {saving ? "Saving..." : "Save Service"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Service?"
        description="Are you sure you want to delete this service? It will no longer appear on the website."
        isLoading={deleting}
      />
    </div>
  );
}
