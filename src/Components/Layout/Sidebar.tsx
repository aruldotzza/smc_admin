"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutGrid,
  CalendarDays,
  Car,
  DollarSign,
  ArrowUpRight,
  LogOut,
  X,
} from "lucide-react";

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

  const navItems = [
    {
      name: "Dashboard",
      href: "/",
      active: isDashboard,
      icon: LayoutGrid,
    },
    {
      name: "Bookings",
      href: "/bookings",
      active: isBookings,
      icon: CalendarDays,
    },
    {
      name: "Fleet",
      href: "/fleet",
      active: isFleet,
      icon: Car,
    },
    {
      name: "Pricing",
      href: "/pricing",
      active: isPricing,
      icon: DollarSign,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar matching Figma design */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-60 bg-color-background-brand flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="self-stretch flex-1 flex flex-col justify-start items-start">
          {/* Logo / Header */}
          <div className="self-stretch px-6 py-5 border-b border-white/10 flex justify-between items-center">
            <Link href="/" className="inline-flex justify-start items-center gap-2.5">
              <div className="size-8 bg-color-background-accent rounded-md flex justify-center items-center flex-shrink-0">
                <Car className="size-4 text-slate-900" />
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

            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`self-stretch px-3 py-2.5 rounded-lg inline-flex justify-start items-center gap-3 transition-colors ${
                    item.active
                      ? "bg-color-background-accent text-color-text-primary"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon
                    className={`size-4.5 flex-shrink-0 ${
                      item.active ? "text-slate-900" : "text-white/70"
                    }`}
                  />
                  <div
                    className={`justify-start text-sm font-['Manrope'] leading-5 ${
                      item.active
                        ? "text-color-text-primary font-semibold"
                        : "text-white/70 font-medium"
                    }`}
                  >
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="self-stretch px-3 py-4 border-t border-white/10 flex flex-col justify-start items-start gap-1">
          <a
            href="https://singaporemaxicabs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="self-stretch px-3 py-2.5 rounded-lg inline-flex justify-start items-center gap-3 text-white/50 hover:text-white/80 hover:bg-white/5 transition-colors"
          >
            <ArrowUpRight className="size-4 text-white/50 flex-shrink-0" />
            <div className="justify-start text-xs font-normal font-['Manrope'] leading-5">
              Back to Site
            </div>
          </a>

          <button
            type="button"
            onClick={logout}
            className="w-full px-3 py-2.5 rounded-lg inline-flex justify-start items-center gap-3 text-red-400 hover:bg-red-950/20 transition-colors text-left cursor-pointer"
          >
            <LogOut className="size-4 text-red-400 flex-shrink-0" />
            <div className="justify-start text-red-400 text-xs font-normal font-['Manrope'] leading-5">
              Sign Out
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}
