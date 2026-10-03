"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { X } from "lucide-react";

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function Sidebar({ mobileOpen = false, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();

  const isDashboard = pathname === "/" || pathname === "/dashboard";
  const isBookings = pathname.startsWith("/bookings");
  const isFleet = pathname.startsWith("/fleet");
  const isPricing = pathname.startsWith("/pricing");

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar - Matching exact Figma dashboard.html structure */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-60 bg-color-background-brand flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="self-stretch flex-1 flex flex-col justify-start items-start">
          {/* Logo / Header */}
          <div className="self-stretch px-6 py-5 border-b border-white/10 flex justify-between items-center">
            <Link href="/" className="inline-flex justify-start items-center gap-2.5">
              <div className="size-8 bg-color-background-accent rounded-md flex justify-center items-center">
                <div className="size-4 relative overflow-hidden">
                  <div className="w-3.5 h-1 left-[1px] top-[6px] absolute outline outline-[1.40px] outline-offset-[-0.70px] outline-slate-900" />
                  <div className="w-3.5 h-[3px] left-[1px] top-[10px] absolute outline outline-[1.40px] outline-offset-[-0.70px] outline-slate-900" />
                  <div className="size-0.5 left-[3.50px] top-[12px] absolute bg-color-text-primary" />
                  <div className="size-0.5 left-[10.50px] top-[12px] absolute bg-color-text-primary" />
                </div>
              </div>
              <div className="w-14 inline-flex flex-col justify-start items-start">
                <div className="self-stretch flex flex-col justify-start items-start">
                  <div className="justify-start text-color-text-inverse text-xs font-bold font-['Manrope'] leading-3">
                    Maxicabs
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start">
                  <div className="justify-start text-orange-400 text-[10px] font-normal font-['Manrope'] uppercase leading-4 tracking-wide">
                    Admin
                  </div>
                </div>
              </div>
            </Link>

            {/* Mobile close button */}
            <button
              type="button"
              onClick={onCloseMobile}
              className="lg:hidden text-white/60 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Nav Items */}
          <div className="self-stretch flex-1 px-3 py-4 flex flex-col justify-start items-start gap-1 overflow-hidden">
            <div className="w-52 h-6 px-3 pb-2 flex flex-col justify-start items-start">
              <div className="justify-start text-white/30 text-[10px] font-semibold font-['Manrope'] uppercase leading-4 tracking-wider">
                Management
              </div>
            </div>

            {/* Dashboard Link */}
            <Link
              href="/"
              onClick={onCloseMobile}
              className={`self-stretch px-3 py-2.5 rounded-lg inline-flex justify-start items-center gap-3 transition-colors ${
                isDashboard
                  ? "bg-color-background-accent text-color-text-primary"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="size-5 relative overflow-hidden flex-shrink-0">
                <div
                  className={`size-1.5 left-[2px] top-[2px] absolute outline outline-[1.60px] outline-offset-[-0.80px] ${
                    isDashboard ? "outline-slate-900" : "outline-white/70"
                  }`}
                />
                <div
                  className={`size-1.5 left-[11px] top-[2px] absolute outline outline-[1.60px] outline-offset-[-0.80px] ${
                    isDashboard ? "outline-slate-900" : "outline-white/70"
                  }`}
                />
                <div
                  className={`size-1.5 left-[2px] top-[11px] absolute outline outline-[1.60px] outline-offset-[-0.80px] ${
                    isDashboard ? "outline-slate-900" : "outline-white/70"
                  }`}
                />
                <div
                  className={`size-1.5 left-[11px] top-[11px] absolute outline outline-[1.60px] outline-offset-[-0.80px] ${
                    isDashboard ? "outline-slate-900" : "outline-white/70"
                  }`}
                />
              </div>
              <div
                className={`justify-start text-sm font-['Manrope'] leading-5 ${
                  isDashboard
                    ? "text-color-text-primary font-semibold"
                    : "text-white/70 font-medium"
                }`}
              >
                Dashboard
              </div>
            </Link>

            {/* Bookings Link */}
            <Link
              href="/bookings"
              onClick={onCloseMobile}
              className={`self-stretch px-3 py-2.5 rounded-lg inline-flex justify-start items-center gap-3 transition-colors ${
                isBookings
                  ? "bg-color-background-accent text-color-text-primary"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="size-5 relative overflow-hidden flex-shrink-0">
                <div
                  className={`w-3.5 h-3 left-[3px] top-[4px] absolute outline outline-[1.60px] outline-offset-[-0.80px] ${
                    isBookings ? "outline-slate-900" : "outline-white/70"
                  }`}
                />
                <div
                  className={`w-3.5 h-1.5 left-[3px] top-[2px] absolute outline outline-[1.60px] outline-offset-[-0.80px] ${
                    isBookings ? "outline-slate-900" : "outline-white/70"
                  }`}
                />
              </div>
              <div
                className={`justify-start text-sm font-['Manrope'] leading-5 ${
                  isBookings
                    ? "text-color-text-primary font-semibold"
                    : "text-white/70 font-medium"
                }`}
              >
                Bookings
              </div>
            </Link>

            {/* Fleet Link */}
            <Link
              href="/fleet"
              onClick={onCloseMobile}
              className={`self-stretch px-3 py-2.5 rounded-lg inline-flex justify-start items-center gap-3 transition-colors ${
                isFleet
                  ? "bg-color-background-accent text-color-text-primary"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="size-5 relative overflow-hidden flex-shrink-0">
                <div
                  className={`w-4 h-[5px] left-[2px] top-[8px] absolute outline outline-[1.60px] outline-offset-[-0.80px] ${
                    isFleet ? "outline-slate-900" : "outline-white/70"
                  }`}
                />
                <div
                  className={`w-4 h-1 left-[2px] top-[13px] absolute outline outline-[1.60px] outline-offset-[-0.80px] ${
                    isFleet ? "outline-slate-900" : "outline-white/70"
                  }`}
                />
                <div
                  className={`size-[3px] left-[4.50px] top-[15.50px] absolute ${
                    isFleet ? "bg-slate-900" : "bg-white/70"
                  }`}
                />
                <div
                  className={`size-[3px] left-[12.50px] top-[15.50px] absolute ${
                    isFleet ? "bg-slate-900" : "bg-white/70"
                  }`}
                />
              </div>
              <div
                className={`justify-start text-sm font-['Manrope'] leading-5 ${
                  isFleet
                    ? "text-color-text-primary font-semibold"
                    : "text-white/70 font-medium"
                }`}
              >
                Fleet
              </div>
            </Link>

            {/* Pricing Link */}
            <Link
              href="/pricing"
              onClick={onCloseMobile}
              className={`self-stretch px-3 py-2.5 rounded-lg inline-flex justify-start items-center gap-3 transition-colors ${
                isPricing
                  ? "bg-color-background-accent text-color-text-primary"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="size-5 relative overflow-hidden flex-shrink-0">
                <div
                  className={`size-4 left-[2px] top-[2px] absolute outline outline-[1.60px] outline-offset-[-0.80px] ${
                    isPricing ? "outline-slate-900" : "outline-white/70"
                  }`}
                />
                <div
                  className={`w-[5px] h-2 left-[7.50px] top-[6px] absolute outline outline-[1.60px] outline-offset-[-0.80px] ${
                    isPricing ? "outline-slate-900" : "outline-white/70"
                  }`}
                />
              </div>
              <div
                className={`justify-start text-sm font-['Manrope'] leading-5 ${
                  isPricing
                    ? "text-color-text-primary font-semibold"
                    : "text-white/70 font-medium"
                }`}
              >
                Pricing
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="self-stretch px-3 py-4 border-t border-white/10 flex flex-col justify-start items-start gap-1">
          <a
            href="https://singaporemaxicabs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="self-stretch px-3 py-2.5 rounded-lg inline-flex justify-start items-center gap-3 hover:bg-white/5 transition-colors"
          >
            <div className="size-5 relative overflow-hidden flex-shrink-0">
              <div className="w-3.5 h-2.5 left-[3px] top-[5px] absolute outline outline-[1.60px] outline-offset-[-0.80px] outline-white/50" />
            </div>
            <div className="justify-start text-white/50 text-xs font-normal font-['Manrope'] leading-5">
              Back to Site
            </div>
          </a>

          <button
            type="button"
            onClick={logout}
            className="w-52 px-3 py-2.5 rounded-lg inline-flex justify-start items-center gap-3 hover:bg-red-950/20 transition-colors text-left cursor-pointer"
          >
            <div className="size-5 relative overflow-hidden flex-shrink-0">
              <div className="size-3.5 left-[3px] top-[3px] absolute outline outline-[1.60px] outline-offset-[-0.80px] outline-red-400" />
            </div>
            <div className="justify-start text-red-400 text-xs font-normal font-['Manrope'] leading-5">
              Sign Out
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}
