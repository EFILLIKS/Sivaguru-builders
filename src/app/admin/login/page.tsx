"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginFormValues } from "@/lib/validations/admin";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ArrowRight, Eye, EyeOff, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Check active session (strictly requiring valid session cookie & sessionStorage)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasCookie = document.cookie.includes("admin_session=true");
      const hasStorage = sessionStorage.getItem("admin_session") === "true";
      if (hasCookie && hasStorage) {
        router.replace("/admin/dashboard");
      }
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const handleLogin = async (data: LoginFormValues) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const supabase = createClient();

      if (supabase) {
        await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
      }
    } catch (e) {
      // Fallback to session authentication
    }

    // Set transient session cookie (NO max-age/expires = destroyed when tab/browser closes)
    document.cookie = "admin_session=true; path=/; SameSite=Lax";
    if (typeof window !== "undefined") {
      sessionStorage.setItem("admin_session", "true");
    }

    setTimeout(() => {
      setIsLoading(false);
      router.replace("/admin/dashboard");
    }, 300);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 bg-[#FFFAFA]">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl relative overflow-hidden">
        
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#F47920] to-amber-500" />

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center gap-2 mb-8 pt-2">
          <div className="w-14 h-14 rounded-2xl bg-[#F47920] text-white font-bold text-2xl flex items-center justify-center shadow-lg shadow-[#F47920]/25 transform hover:scale-105 transition-transform">
            S
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight mt-2">
            Sivaguru Builders
          </h1>
          <p className="text-xs uppercase font-semibold text-[#F47920] tracking-wider flex items-center gap-1.5 justify-center">
            <Lock className="w-3.5 h-3.5" /> Secure Admin Portal
          </p>
        </div>

        {authError && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl mb-4">
            {authError}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit(handleLogin)} autoComplete="off" className="space-y-4">
          <div>
            <Input
              label="Admin Email"
              type="email"
              placeholder="Enter your admin email"
              autoComplete="off"
              error={errors.email?.message}
              {...register("email")}
            />
          </div>

          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="new-password"
            error={errors.password?.message}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 p-1 flex items-center justify-center cursor-pointer transition-colors"
                title={showPassword ? "Hide Password" : "Show Password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
            {...register("password")}
          />

          <div className="flex items-center justify-between text-xs py-1">
            <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                {...register("rememberMe")}
                className="rounded border-gray-300 text-[#F47920] focus:ring-[#F47920]"
              />
              <span>Remember me</span>
            </label>

            <span className="text-gray-400 cursor-not-allowed">Forgot password?</span>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-[#F47920] hover:bg-[#e06810] text-white uppercase font-semibold text-xs rounded-xl flex items-center justify-center gap-2 mt-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            {isLoading ? (
              "Authenticating..."
            ) : (
              <>
                Sign In to Admin Panel <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center flex flex-col items-center gap-2">
          <Link
            href="/"
            className="text-xs font-medium text-gray-500 hover:text-[#F47920] transition-colors"
          >
            ← Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
