"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Wrench,
  HelpCircle,
  MessageSquare,
  Settings,
  User,
  LogOut,
  ExternalLink,
} from "lucide-react";

export const adminNavLinks = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Services", href: "/admin/services", icon: Wrench },
  { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  { label: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Profile", href: "/admin/profile", icon: User },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-100 shrink-0 h-screen sticky top-0 z-30">
      {/* Brand Header */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100">
        <Link href="/admin/dashboard" className="flex items-center gap-2.5 no-underline">
          <div className="w-8 h-8 rounded-xl bg-[#F47920] flex items-center justify-center text-white font-bold text-base shadow-xs">
            S
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900 text-sm leading-tight">Sivaguru</span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-[#F47920]">
              Admin Panel
            </span>
          </div>
        </Link>

        <Link
          href="/"
          target="_blank"
          title="View Public Site"
          className="p-1.5 text-gray-400 hover:text-[#F47920] rounded-lg transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
        <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
          Management
        </div>

        {adminNavLinks.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/admin/dashboard"
              ? pathname === "/admin/dashboard" || pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? "bg-[#F47920] text-white shadow-sm font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-gray-400"}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* User Footer / Logout */}
      <div className="p-4 border-t border-gray-100">
        <Link
          href="/admin/login"
          onClick={() => {
            document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 transition-colors w-full"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Sign Out</span>
        </Link>
      </div>
    </aside>
  );
}
