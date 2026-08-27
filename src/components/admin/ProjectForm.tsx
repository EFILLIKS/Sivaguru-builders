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

  const onSubmit = async (values: ProjectFormValues) => {
    setSubmitting(true);
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

      if (isEdit && initialData) {
        await updateProject(initialData.id, values);
      } else {
        await createProject(values as any);
      }
      router.push("/admin/projects");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-12">
      {/* Mode Banner */}
      {isInteriorMode && (
        <div className="p-4 bg-[#F47920]/10 border border-[#F47920]/30 rounded-2xl flex items-center gap-3 text-xs md:text-sm font-medium text-[#F47920]">
          <span className="text-xl">🖼️</span>
          <span>
            <strong>Interior Showcase Mode:</strong> Title and location fields are hidden. Simply upload interior photos below! They will automatically display on the website as an interactive Pinterest-style gallery grid.
          </span>
        </div>
      )}

      {/* 1. Category Selection (FIELD 1 IS CATEGORY ONLY FOR INTERIOR) */}
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
              setValue("category", selected, { shouldValidate: true, shouldDirty: true });
              const catMap: Record<string, string> = {
                "Residential": "குடியிருப்பு",
                "Architecture": "கட்டிடக்கலை",
                "Commercial": "வணிகம்",
                "Interior Design": "உள் வடிவமைப்பு",
                "Interior": "உள் வடிவமைப்பு",
                "Reconstruct": "மறுசீரமைப்பு",
              };
              if (catMap[selected]) {
                setValue("categoryTa", catMap[selected]);
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
                setValue("name", val);
                if (!isEdit || !watch("slug")) {
                  const generatedSlug = val
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)+/g, "");
                  setValue("slug", generatedSlug);
                }
              }}
              onTargetChange={(val) => setValue("nameTa", val)}
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
                onSourceChange={(val) => setValue("location", val)}
                onTargetChange={(val) => setValue("locationTa", val)}
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
          onCoverChange={(url) => setValue("coverImage", url, { shouldValidate: true, shouldDirty: true, shouldTouch: true })}
          onGalleryChange={(urls) => setValue("galleryImages", urls, { shouldValidate: true, shouldDirty: true, shouldTouch: true })}
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
              onSourceChange={(val) => setValue("area", val)}
              onTargetChange={(val) => setValue("areaTa", val)}
              placeholderSource="3,500 sq.ft"
              placeholderTarget="3,500 சதுர அடி"
            />

            <BilingualField
              label="Floors"
              sourceValue={watch("floors") || ""}
              targetValue={watch("floorsTa") || ""}
              onSourceChange={(val) => setValue("floors", val)}
              onTargetChange={(val) => setValue("floorsTa", val)}
              placeholderSource="2 Floors (G + 1)"
              placeholderTarget="2 தளங்கள் (தரை + 1)"
            />

            <BilingualField
              label="Bedrooms / Configuration"
              sourceValue={watch("bedrooms") || ""}
              targetValue={watch("bedroomsTa") || ""}
              onSourceChange={(val) => setValue("bedrooms", val)}
              onTargetChange={(val) => setValue("bedroomsTa", val)}
              placeholderSource="4 BHK"
              placeholderTarget="4 படுக்கையறைகள்"
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
            onSourceChange={(val) => setValue("shortDescription", val)}
            onTargetChange={(val) => setValue("shortDescriptionTa", val)}
            placeholderSource="Concise overview for cards and meta descriptions..."
          />

          <BilingualField
            label="Detailed Project Overview"
            isTextArea
            rows={4}
            sourceValue={watch("projectOverview") || ""}
            targetValue={watch("projectOverviewTa") || ""}
            onSourceChange={(val) => setValue("projectOverview", val)}
            onTargetChange={(val) => setValue("projectOverviewTa", val)}
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
