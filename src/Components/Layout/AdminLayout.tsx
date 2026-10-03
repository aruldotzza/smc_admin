"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-start items-start overflow-x-hidden font-['Manrope']">
      {/* Sidebar Navigation (w-60) */}
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Layout Area */}
      <div className="flex-1 lg:pl-60 self-stretch min-w-0 flex flex-col justify-start items-start overflow-hidden transition-all duration-300">
        {/* Top Header (h-14) */}
        <TopNav onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        {/* Main Body Content */}
        <main className="self-stretch flex-1 p-4 sm:p-6 flex flex-col justify-start items-start overflow-y-auto">
          <div className="w-full max-w-[1200px] mx-auto flex flex-col justify-start items-start gap-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
