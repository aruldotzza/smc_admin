"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, Activity } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getHealth } from "@/lib/api/services";

interface TopNavProps {
  onOpenMobileMenu: () => void;
}

export default function TopNav({ onOpenMobileMenu }: TopNavProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const [apiStatus, setApiStatus] = useState<"checking" | "online" | "offline">("checking");

  useEffect(() => {
    let isMounted = true;
    async function checkApi() {
      try {
        const res = await getHealth();
        if (isMounted) {
          setApiStatus(res?.status === "ok" ? "online" : "offline");
        }
      } catch {
        if (isMounted) setApiStatus("offline");
      }
    }
    checkApi();
    const interval = setInterval(checkApi, 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const getPageTitle = () => {
    if (pathname === "/" || pathname === "/dashboard") return "Dashboard";
    if (pathname.startsWith("/bookings")) return "bookings";
    if (pathname.startsWith("/fleet")) return "fleet";
    if (pathname.startsWith("/pricing")) return "pricing";
    return "dashboard";
  };

  return (
    <div className="self-stretch h-14 px-4 sm:px-6 bg-color-background-white border-b border-color-border-subtle inline-flex justify-between items-center sticky top-0 z-30 font-['Manrope']">
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

      {/* Right: API Status, WhatsApp & User Avatar */}
      <div className="flex-1 flex justify-end items-center">
        <div className="flex justify-start items-center gap-4">
          {/* Live API Health Status */}
          <div
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
              apiStatus === "online"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : apiStatus === "checking"
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : "bg-red-50 text-red-700 border-red-200"
            }`}
            title="Backend REST API Connectivity"
          >
            <span
              className={`size-2 rounded-full ${
                apiStatus === "online"
                  ? "bg-emerald-500 animate-pulse"
                  : apiStatus === "checking"
                  ? "bg-amber-500"
                  : "bg-red-500"
              }`}
            />
            <span>{apiStatus === "online" ? "API Live" : apiStatus === "checking" ? "Connecting..." : "API Offline"}</span>
          </div>

          {/* WhatsApp Channel */}
          <div className="flex justify-start items-center gap-1.5">
            <div className="size-4 relative overflow-hidden flex items-center justify-center">
              <div className="size-3 bg-color-status-success rounded-full" />
            </div>
            <div className="justify-start text-color-status-success text-xs font-medium font-['Manrope'] leading-5">
              WhatsApp
            </div>
          </div>

          {/* User Avatar */}
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
