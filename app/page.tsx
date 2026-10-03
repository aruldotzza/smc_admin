import React from "react";
import Button from "@/Shared/Button/Button";
import Badge from "@/Shared/Badge/Badge";
import { LayoutDashboard, Car, Calendar, Users, Settings, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#071E3B] flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-[#071E3B] text-white border-b border-[#123F6B] px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C6A45A] to-[#B58E45] flex items-center justify-center font-bold text-[#071E3B] text-lg shadow">
            SMC
          </div>
          <div>
            <div className="font-bold text-base tracking-wide flex items-center gap-2">
              Singapore Maxicabs <Badge variant="gold" className="text-[10px] py-0.5">Admin</Badge>
            </div>
            <p className="text-xs text-slate-400">Operations & Management Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-300 bg-[#0B2A4A] px-3 py-1.5 rounded-lg border border-slate-700/60">
            <ShieldCheck className="w-4 h-4 text-[#C6A45A]" />
            <span>Design System Ready</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 flex flex-col items-center justify-center text-center">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-12 max-w-2xl w-full">
          <div className="w-16 h-16 rounded-2xl bg-[#FBF7EC] border border-[#C6A45A]/30 flex items-center justify-center mx-auto mb-6">
            <LayoutDashboard className="w-8 h-8 text-[#C6A45A]" />
          </div>

          <Badge variant="gold" className="mb-4">Setup Completed</Badge>
          
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#071E3B] tracking-tight mb-3">
            Admin Portal Architecture Ready
          </h1>
          
          <p className="text-slate-600 text-sm md:text-base mb-8 max-w-lg mx-auto">
            Design tokens, Tailwind v4 theme, Google typography (Manrope & Playfair Display), 
            and atomic components are aligned with the landing page design system.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left mb-8">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
              <span className="text-xs text-slate-500 font-medium">Palette</span>
              <span className="text-xs font-semibold text-[#071E3B] flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#071E3B] inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#C6A45A] inline-block"></span>
                Deep Navy & Gold
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
              <span className="text-xs text-slate-500 font-medium">Typography</span>
              <span className="text-xs font-semibold text-[#071E3B]">Manrope & Inter</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
              <span className="text-xs text-slate-500 font-medium">Icons</span>
              <span className="text-xs font-semibold text-[#071E3B]">Lucide React</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
              <span className="text-xs text-slate-500 font-medium">Architecture</span>
              <span className="text-xs font-semibold text-[#071E3B]">Next.js 16 App</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant="gold" size="md">
              Ready for Page HTML / Designs
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
