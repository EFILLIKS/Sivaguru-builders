"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectSchema, ProjectFormValues } from "@/lib/validations/admin";
import { Input } from "@/components/ui/Input";
import { BilingualField } from "./BilingualField";
import { Button } from "@/components/ui/Button";
import { ImageUploader } from "./ImageUploader";
import { Project } from "@/types/admin";
import { createProject, updateProject } from "@/lib/repositories/projects";

interface ProjectFormProps {
  initialData?: Project | null;
  isEdit?: boolean;
}

export function ProjectForm({ initialData, isEdit = false }: ProjectFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const defaultValues: ProjectFormValues = {
    name: initialData?.name || "",
    nameTa: initialData?.nameTa || "",
    slug: initialData?.slug || "",
    category: initialData?.category || "Residential",
    categoryTa: initialData?.categoryTa || "",
    location: initialData?.location || "",
    locationTa: initialData?.locationTa || "",
    year: initialData?.year || new Date().getFullYear().toString(),
    status: initialData?.status || "Published",
    area: initialData?.area || "",
    areaTa: initialData?.areaTa || "",
    floors: initialData?.floors || "",
    floorsTa: initialData?.floorsTa || "",
    bedrooms: initialData?.bedrooms || "",
    bedroomsTa: initialData?.bedroomsTa || "",
    shortDescription: initialData?.shortDescription || "",
    shortDescriptionTa: initialData?.shortDescriptionTa || "",
    projectOverview: initialData?.projectOverview || "",
    projectOverviewTa: initialData?.projectOverviewTa || "",
    coverImage: initialData?.coverImage || "",
    galleryImages: initialData?.galleryImages || [],
    seoTitle: initialData?.seoTitle || "",
    seoDescription: initialData?.seoDescription || "",
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(ProjectSchema) as any,
    defaultValues,
  });

  React.useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || "",
        nameTa: initialData.nameTa || "",
        slug: initialData.slug || "",
        category: initialData.category || "Residential",
        categoryTa: initialData.categoryTa || "",
        location: initialData.location || "",
        locationTa: initialData.locationTa || "",
        year: initialData.year || new Date().getFullYear().toString(),
        status: initialData.status || "Published",
        area: initialData.area || "",
        areaTa: initialData.areaTa || "",
        floors: initialData.floors || "",
        floorsTa: initialData.floorsTa || "",
        bedrooms: initialData.bedrooms || "",
        bedroomsTa: initialData.bedroomsTa || "",
        shortDescription: initialData.shortDescription || "",
        shortDescriptionTa: initialData.shortDescriptionTa || "",
        projectOverview: initialData.projectOverview || "",
        projectOverviewTa: initialData.projectOverviewTa || "",
        coverImage: initialData.coverImage || "",
        galleryImages: initialData.galleryImages || [],
        seoTitle: initialData.seoTitle || "",
        seoDescription: initialData.seoDescription || "",
      });
    }
  }, [initialData, reset]);

  const coverImage = watch("coverImage");
  const galleryImages = watch("galleryImages");
  const category = watch("category");
  const isInteriorMode = (category || "").toLowerCase().includes("interior");

  const updateFormField = (name: keyof ProjectFormValues, val: any) => {
    setValue(name as any, val, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
  };

  const onSubmit = async (values: ProjectFormValues) => {
    setSubmitting(true);
    setFormError(null);
    try {
      // Auto-fill values if in Interior mode
      if (isInteriorMode) {
        if (!values.name) {
          values.name = "Interior Design Showcase";
          values.nameTa = "உள் வடிவமைப்பு";
        }
        if (!values.slug) {
          values.slug = `interior-${Date.now()}`;
        }
      } else {
        if (!values.name) {
          values.name = "Untitled Project";
        }
      }

      let result;
      if (isEdit && initialData) {
        result = await updateProject(initialData.id, values);
      } else {
        result = await createProject(values as any);
      }

      if (result) {
        router.push("/admin/projects");
      } else {
        setFormError("Failed to save project. Please check all fields and try again.");
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : String(error);

      console.error("CREATE PROJECT FAILED:", message);
      setFormError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-12">
      {/* Hidden Fields for Form Registration */}
      <input type="hidden" {...register("name")} />
      <input type="hidden" {...register("nameTa")} />
      <input type="hidden" {...register("category")} />
      <input type="hidden" {...register("categoryTa")} />
      <input type="hidden" {...register("location")} />
      <input type="hidden" {...register("locationTa")} />
      <input type="hidden" {...register("area")} />
      <input type="hidden" {...register("areaTa")} />
      <input type="hidden" {...register("floors")} />
      <input type="hidden" {...register("floorsTa")} />
      <input type="hidden" {...register("bedrooms")} />
      <input type="hidden" {...register("bedroomsTa")} />
      <input type="hidden" {...register("shortDescription")} />
      <input type="hidden" {...register("shortDescriptionTa")} />
      <input type="hidden" {...register("projectOverview")} />
      <input type="hidden" {...register("projectOverviewTa")} />
      <input type="hidden" {...register("coverImage")} />

      {/* Form Error Banner */}
      {formError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between text-xs md:text-sm font-medium text-red-700">
          <span>⚠️ {formError}</span>
          <button type="button" onClick={() => setFormError(null)} className="text-red-500 hover:text-red-700 font-bold ml-4">✕</button>
        </div>
      )}

      {/* Mode Banner */}
      {isInteriorMode && (
        <div className="p-4 bg-[#F47920]/10 border border-[#F47920]/30 rounded-2xl flex items-center gap-3 text-xs md:text-sm font-medium text-[#F47920]">
          <span className="text-xl">🖼️</span>
          <span>
            <strong>Interior Showcase Mode:</strong> Title and location fields are hidden. Simply upload interior photos below! They will automatically display on the website as an interactive Pinterest-style gallery grid.
          </span>
        </div>
      )}

      {/* 1. Category Selection */}
      <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-xs space-y-5">
        <h3 className="text-base font-semibold text-gray-900 pb-2 border-b border-gray-100">
          1. Select Category *
        </h3>

        {/* FIELD 1: Category Selection Dropdown */}
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#F47920]">
            Category *
          </label>
          <select
            value={watch("category") || "Residential"}
            onChange={(e) => {
              const selected = e.target.value;
              updateFormField("category", selected);
              const catMap: Record<string, string> = {
                "Residential": "குடியிருப்பு",
                "Architecture": "கட்டிடக்கலை",
                "Commercial": "வணிகம்",
                "Interior Design": "உள் வடிவமைப்பு",
                "Interior": "உள் வடிவமைப்பு",
                "Reconstruct": "மறுசீரமைப்பு",
              };
              if (catMap[selected]) {
                updateFormField("categoryTa", catMap[selected]);
              }
            }}
            className="w-full h-11 px-3.5 bg-white border-2 border-[#F47920]/40 focus:border-[#F47920] rounded-xl text-sm font-semibold text-gray-900 outline-none transition-all cursor-pointer shadow-2xs"
          >
            <option value="Residential">Residential (குடியிருப்பு)</option>
            <option value="Architecture">Architecture (கட்டிடக்கலை)</option>
            <option value="Commercial">Commercial (வணிகம்)</option>
            <option value="Interior Design">Interior Design (உள் வடிவமைப்பு)</option>
            <option value="Reconstruct">Reconstruct (மறுசீரமைப்பு)</option>
          </select>
        </div>

        {/* Standard Fields (Hidden when Interior is selected) */}
        {!isInteriorMode && (
          <>
            {/* Title / Name (Bilingual) */}
            <BilingualField
              label="Title / Name *"
              sourceValue={watch("name") || ""}
              targetValue={watch("nameTa") || ""}
              onSourceChange={(val) => {
                updateFormField("name", val);
                if (!isEdit || !watch("slug")) {
                  const generatedSlug = val
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)+/g, "");
                  updateFormField("slug", generatedSlug);
                }
              }}
              onTargetChange={(val) => updateFormField("nameTa", val)}
              placeholderSource="e.g. Modern Villa Project"
              placeholderTarget="எ.கா. நவீன வில்லா திட்டம்"
              sourceError={errors.name?.message}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <Input
                label="URL Slug *"
                placeholder="demo-luxury-villa"
                error={errors.slug?.message}
                {...register("slug")}
              />
              <Input
                label="Year"
                placeholder="2026"
                error={errors.year?.message}
                {...register("year")}
              />
            </div>

            {/* Location (Bilingual) */}
            <div className="pt-2">
              <BilingualField
                label="Location (Optional)"
                sourceValue={watch("location") || ""}
                targetValue={watch("locationTa") || ""}
                onSourceChange={(val) => updateFormField("location", val)}
                onTargetChange={(val) => updateFormField("locationTa", val)}
                placeholderSource="Trichy, Tamil Nadu"
                placeholderTarget="திருச்சி, தமிழ்நாடு"
              />
            </div>
          </>
        )}
      </div>

      {/* 2. Media Upload Zone */}
      <div className="p-6 bg-white rounded-2xl border-2 border-[#F47920]/40 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <h3 className="text-base font-semibold text-gray-900">
            2. Images Upload Zone {isInteriorMode ? "(Primary Requirement)" : ""} *
          </h3>
          <span className="text-xs font-semibold text-[#F47920]">
            {isInteriorMode ? "Pinterest Grid Enabled" : ""}
          </span>
        </div>

        <ImageUploader
          coverImage={coverImage}
          galleryImages={galleryImages || []}
          onCoverChange={(url) => updateFormField("coverImage", url)}
          onGalleryChange={(urls) => updateFormField("galleryImages", urls)}
        />
        {errors.coverImage && (
          <p className="text-xs text-red-500 mt-1">{errors.coverImage.message}</p>
        )}
      </div>

      {/* 3. Specifications (Hidden for Interior Mode) */}
      {!isInteriorMode && (
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-xs space-y-4">
          <h3 className="text-base font-semibold text-gray-900 pb-2 border-b border-gray-100">
            3. Specifications & Dimensions
          </h3>

          <div className="space-y-4">
            <BilingualField
              label="Project Area / Size"
              sourceValue={watch("area") || ""}
              targetValue={watch("areaTa") || ""}
              onSourceChange={(val) => updateFormField("area", val)}
              onTargetChange={(val) => updateFormField("areaTa", val)}
              placeholderSource="e.g. 1,200 sq. ft."
              placeholderTarget="e.g. 1,200 சதுர அடி"
            />

            <BilingualField
              label="Floors"
              sourceValue={watch("floors") || ""}
              targetValue={watch("floorsTa") || ""}
              onSourceChange={(val) => updateFormField("floors", val)}
              onTargetChange={(val) => updateFormField("floorsTa", val)}
              placeholderSource="e.g. 2 Floors"
              placeholderTarget="e.g. 2 தளங்கள்"
            />

            <BilingualField
              label="Bedrooms / Configuration"
              sourceValue={watch("bedrooms") || ""}
              targetValue={watch("bedroomsTa") || ""}
              onSourceChange={(val) => updateFormField("bedrooms", val)}
              onTargetChange={(val) => updateFormField("bedroomsTa", val)}
              placeholderSource="e.g. 3 BHK"
              placeholderTarget="e.g. 3 படுக்கையறைகள்"
            />
          </div>
        </div>
      )}

      {/* 4. Project Content Descriptions (Hidden for Interior Mode) */}
      {!isInteriorMode && (
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-xs space-y-4">
          <h3 className="text-base font-semibold text-gray-900 pb-2 border-b border-gray-100">
            4. Project Descriptions
          </h3>

          <BilingualField
            label="Short Summary Description"
            isTextArea
            rows={2}
            sourceValue={watch("shortDescription") || ""}
            targetValue={watch("shortDescriptionTa") || ""}
            onSourceChange={(val) => updateFormField("shortDescription", val)}
            onTargetChange={(val) => updateFormField("shortDescriptionTa", val)}
            placeholderSource="Concise overview for cards and meta descriptions..."
          />

          <BilingualField
            label="Detailed Project Overview"
            isTextArea
            rows={4}
            sourceValue={watch("projectOverview") || ""}
            targetValue={watch("projectOverviewTa") || ""}
            onSourceChange={(val) => updateFormField("projectOverview", val)}
            onTargetChange={(val) => updateFormField("projectOverviewTa", val)}
            placeholderSource="Comprehensive description..."
          />
        </div>
      )}

      {/* 5. Publishing Status */}
      <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-xs space-y-4">
        <h3 className="text-base font-semibold text-gray-900 pb-2 border-b border-gray-100">
          Publishing Status *
        </h3>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input type="radio" value="Draft" {...register("status")} className="text-[#F47920] focus:ring-[#F47920]" />
            <span>Draft (Hidden from public website)</span>
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input type="radio" value="Published" {...register("status")} className="text-[#F47920] focus:ring-[#F47920]" />
            <span>Published (Live on public website)</span>
          </label>
        </div>
      </div>

      {/* Sticky Action Footer */}
      <div className="flex items-center justify-end gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-lg sticky bottom-4 z-20">
        <button
          type="button"
          onClick={() => router.push("/admin/projects")}
          className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold uppercase rounded-xl transition-colors cursor-pointer"
        >
          Cancel
        </button>

        <Button
          type="submit"
          disabled={submitting}
          className="px-6 py-2.5 bg-[#F47920] text-white text-xs font-semibold uppercase rounded-xl cursor-pointer"
        >
          {submitting ? "Saving..." : isEdit ? "Update Item" : "Save Item"}
        </Button>
      </div>
    </form>
  );
}
