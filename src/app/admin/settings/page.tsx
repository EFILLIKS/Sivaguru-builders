"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsSchema, SettingsFormValues } from "@/lib/validations/admin";
import { PageHeader } from "@/components/admin/PageHeader";
import { Input, TextArea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { LoadingState } from "@/components/admin/LoadingState";
import { getSettings, updateSettings } from "@/lib/repositories/settings";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(SettingsSchema),
  });

  useEffect(() => {
    async function loadSiteSettings() {
      setLoading(true);
      try {
        const data = await getSettings();
        reset(data);
      } finally {
        setLoading(false);
      }
    }
    loadSiteSettings();
  }, [reset]);

  const onSubmit = async (values: SettingsFormValues) => {
    setSaving(true);
    setSuccessMessage("");
    try {
      await updateSettings(values);
      setSuccessMessage("Settings saved successfully.");
      setTimeout(() => setSuccessMessage(""), 3000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingState message="Loading site settings..." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Site Settings"
        description="Manage company details, contact channels, location, and global SEO defaults."
        breadcrumbs={[{ label: "Settings" }]}
      />

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-semibold text-emerald-800 animate-in fade-in duration-200">
          ✓ {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Company Information */}
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-xs space-y-4">
          <h3 className="text-base font-semibold text-gray-900 pb-2 border-b border-gray-100">
            Company Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Company Name *"
              error={errors.companyName?.message}
              {...register("companyName")}
            />
            <Input
              label="Official Email *"
              type="email"
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              label="Primary Phone *"
              error={errors.phone?.message}
              {...register("phone")}
            />
            <Input
              label="WhatsApp Number *"
              error={errors.whatsapp?.message}
              {...register("whatsapp")}
            />
          </div>

          <TextArea
            label="Physical Address *"
            rows={2}
            error={errors.address?.message}
            {...register("address")}
          />
        </div>

        {/* Social Links & Location */}
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-xs space-y-4">
          <h3 className="text-base font-semibold text-gray-900 pb-2 border-b border-gray-100">
            Social Channels & Location
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Instagram URL"
              placeholder="https://instagram.com/sivagurubuilders"
              {...register("instagramUrl")}
            />
            <Input
              label="Facebook URL"
              placeholder="https://facebook.com/sivagurubuilders"
              {...register("facebookUrl")}
            />
          </div>

          <Input
            label="Google Maps Location Embed / URL"
            placeholder="https://maps.google.com/..."
            {...register("googleMapsUrl")}
          />
        </div>

        {/* SEO Defaults */}
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-xs space-y-4">
          <h3 className="text-base font-semibold text-gray-900 pb-2 border-b border-gray-100">
            Global SEO Defaults
          </h3>

          <Input
            label="Default SEO Title"
            placeholder="Sivaguru Builders | Architecture, Construction & Interiors"
            {...register("defaultSeoTitle")}
          />

          <TextArea
            label="Default SEO Description"
            placeholder="Default website meta description..."
            rows={3}
            {...register("defaultSeoDescription")}
          />
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-[#F47920] text-white text-xs font-semibold uppercase rounded-xl"
          >
            {saving ? "Saving Changes..." : "Save Settings"}
          </Button>
        </div>
      </form>
    </div>
  );
}
