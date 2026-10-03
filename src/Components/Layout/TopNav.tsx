"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface TopNavProps {
  onOpenMobileMenu: () => void;
}

export default function TopNav({ onOpenMobileMenu }: TopNavProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  const getPageTitle = () => {
    if (pathname === "/" || pathname === "/dashboard") return "Dashboard";
    if (pathname.startsWith("/bookings")) return "bookings";
    if (pathname.startsWith("/fleet")) return "fleet";
    if (pathname.startsWith("/pricing")) return "pricing";
    return "dashboard";
  };

  return (
    <div className="self-stretch h-14 px-4 sm:px-6 bg-color-background-white border-b border-color-border-subtle inline-flex justify-between items-center sticky top-0 z-30">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex justify-start items-center gap-2">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="inline-flex flex-col justify-start items-start">
          <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-5">
            Singapore Maxicabs
          </div>
        </div>
        <div className="inline-flex flex-col justify-start items-start">
          <div className="justify-start text-gray-200 text-base font-normal font-['Manrope'] leading-6">
            /
          </div>
        </div>
        <div className="inline-flex flex-col justify-start items-start">
          <div className="justify-start text-color-text-primary text-xs font-semibold font-['Manrope'] capitalize leading-5">
            {getPageTitle()}
          </div>
        </div>
      </div>

      {/* Right: WhatsApp Channel Status & User Avatar */}
      <div className="flex-1 flex justify-end items-center">
        <div className="flex justify-start items-center gap-3">
          <div className="flex justify-start items-center gap-1.5">
            <div className="size-4 relative overflow-hidden flex items-center justify-center">
              <div className="size-3 bg-color-status-success rounded-full" />
            </div>
            <div className="justify-start text-color-status-success text-xs font-medium font-['Manrope'] leading-5">
              WhatsApp
            </div>
          </div>
          <div className="size-8 bg-color-background-brand rounded-full flex justify-center items-center">
            <div className="inline-flex flex-col justify-start items-start">
              <div className="justify-start text-color-text-inverse text-xs font-bold font-['Manrope'] leading-4">
                {user?.initials || "OW"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
