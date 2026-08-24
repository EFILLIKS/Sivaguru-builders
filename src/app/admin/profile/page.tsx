"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema, ProfileFormValues } from "@/lib/validations/admin";
import { PageHeader } from "@/components/admin/PageHeader";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { LoadingState } from "@/components/admin/LoadingState";
import { getProfile, updateProfile } from "@/lib/repositories/settings";
import { UserProfile } from "@/types/admin";
import { User, ShieldCheck, KeyRound, CheckCircle2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Password state & visibility toggles
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileSchema),
  });

  useEffect(() => {
    async function loadUserProfile() {
      setLoading(true);
      try {
        const data = await getProfile();
        setProfile(data);
        reset({ name: data.name, email: data.email });
      } finally {
        setLoading(false);
      }
    }
    loadUserProfile();
  }, [reset]);

  const onSubmit = async (values: ProfileFormValues) => {
    setSaving(true);
    setSuccessMsg("");
    try {
      const updated = await updateProfile(values);
      setProfile(updated);
      setSuccessMsg("Profile updated successfully.");
      setTimeout(() => setSuccessMsg(""), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (!newPassword) {
      setPasswordError("Please enter a new password.");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setPasswordSaving(true);

    try {
      const supabase = createClient();
      if (supabase) {
        // Attempt Supabase Auth update if user session exists
        const { error } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (error && !error.message.includes("Auth session missing")) {
          setPasswordError(error.message);
          setPasswordSaving(false);
          return;
        }
      }

      // Persist password update in admin state
      if (typeof window !== "undefined") {
        localStorage.setItem("sivaguru_admin_password", newPassword);
      }

      setPasswordSuccess("Password updated successfully.");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPasswordSuccess(""), 4000);
    } catch (err: any) {
      setPasswordError(err?.message || "Failed to update password.");
    } finally {
      setPasswordSaving(false);
    }
  };

  if (loading || !profile) {
    return <LoadingState message="Loading administrator profile..." />;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="Admin Profile"
        description="View and update your account details and password settings."
        breadcrumbs={[{ label: "Profile" }]}
      />

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-semibold text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {successMsg}
        </div>
      )}

      {/* Profile Overview Card */}
      <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-[#F47920]/10 text-[#F47920] flex items-center justify-center text-2xl font-bold border border-[#F47920]/20 shrink-0">
          {profile.name.charAt(0)}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-gray-900">{profile.name}</h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" /> {profile.role.toUpperCase()}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{profile.email}</p>
        </div>
      </div>

      {/* Edit Profile Details */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-xs space-y-4">
        <h3 className="text-base font-semibold text-gray-900 pb-2 border-b border-gray-100 flex items-center gap-2">
          <User className="w-4 h-4 text-[#F47920]" /> Personal Account Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name *"
            error={errors.name?.message}
            {...register("name")}
          />
          <Input
            label="Email Address *"
            type="email"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-[#F47920] hover:bg-[#d96716] text-white text-xs font-semibold uppercase rounded-xl transition-all"
          >
            {saving ? "Saving..." : "Update Profile"}
          </Button>
        </div>
      </form>

      {/* Password Reset Security Card */}
      <form onSubmit={handleUpdatePassword} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-xs space-y-4">
        <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
          <KeyRound className="w-4 h-4 text-[#F47920]" /> Security & Password Settings
        </h3>

        {passwordSuccess && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-medium text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> {passwordSuccess}
          </div>
        )}

        {passwordError && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs font-medium text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" /> {passwordError}
          </div>
        )}

        <p className="text-xs text-gray-500 leading-relaxed">
          Update your administrator access password securely.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* New Password Input with Eye Icon */}
          <Input
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            rightElement={
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="text-gray-400 hover:text-gray-600 p-1 flex items-center justify-center cursor-pointer transition-colors"
                title={showNewPassword ? "Hide Password" : "Show Password"}
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
          />

          {/* Confirm New Password Input with Eye Icon */}
          <Input
            label="Confirm New Password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            rightElement={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-gray-400 hover:text-gray-600 p-1 flex items-center justify-center cursor-pointer transition-colors"
                title={showConfirmPassword ? "Hide Password" : "Show Password"}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            disabled={passwordSaving}
            className="px-6 py-2 bg-[#F47920] hover:bg-[#d96716] text-white text-xs font-semibold uppercase rounded-xl transition-all cursor-pointer"
          >
            {passwordSaving ? "Updating Password..." : "Update Password"}
          </Button>
        </div>
      </form>
    </div>
  );
}
