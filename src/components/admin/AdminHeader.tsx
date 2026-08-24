"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User, ExternalLink, LogOut, ShieldCheck } from "lucide-react";
import { adminNavLinks } from "./AdminSidebar";

interface AdminHeaderProps {
  onOpenMobileMenu: () => void;
}

export function AdminHeader({ onOpenMobileMenu }: AdminHeaderProps) {
  const isSupabaseConnected = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-4 md:px-8 bg-white/90 backdrop-blur-md border-b border-gray-100 shrink-0">
      {/* Mobile Hamburger & Brand Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-50 lg:hidden transition-colors"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:inline">
          Sivaguru Builders Admin
        </span>
      </div>

      {/* Top Header Actions */}
      <div className="flex items-center gap-3">
        {/* Environment Badge */}
        {isSupabaseConnected ? (
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Supabase Connected
          </span>
        ) : (
          <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
            Offline Storage Active
          </span>
        )}

        <Link
          href="/admin/profile"
          className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-50 text-gray-700 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-[#F47920]/10 text-[#F47920] flex items-center justify-center font-semibold text-xs border border-[#F47920]/20">
            A
          </div>
          <span className="text-xs font-medium text-gray-800 hidden md:inline">Admin</span>
        </Link>
      </div>
    </header>
  );
}

interface AdminMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminMobileMenu({ isOpen, onClose }: AdminMobileMenuProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={onClose} />

      <div className="fixed inset-y-0 left-0 w-4/5 max-w-xs bg-white shadow-2xl flex flex-col justify-between p-6">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F47920] text-white font-bold flex items-center justify-center text-lg">
                S
              </div>
              <span className="font-bold text-gray-900 text-sm">Sivaguru Admin</span>
            </div>
            <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="mt-6 space-y-1">
            {adminNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                    isActive ? "bg-[#F47920] text-white" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-100 flex flex-col gap-2">
          <Link
            href="/"
            target="_blank"
            onClick={onClose}
            className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Website</span>
          </Link>
          <Link
            href="/admin/login"
            onClick={() => {
              document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
              if (typeof window !== "undefined") sessionStorage.clear();
              onClose();
            }}
            className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
