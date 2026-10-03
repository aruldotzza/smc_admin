"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("owner@singaporemaxicabs.com.sg");
  const [password, setPassword] = useState("Admin@2026");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = login(email, password);
    if (!success) {
      setError("Please enter valid admin credentials.");
    }
  };

  const handleUseDemo = () => {
    setEmail("owner@singaporemaxicabs.com.sg");
    setPassword("Admin@2026");
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F8F9FA] font-sans">
      {/* Left Column: Brand & Value Proposition */}
      <div className="w-full lg:w-[540px] lg:min-h-screen bg-[#071E3B] text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden border-r border-[#123F6B] flex-shrink-0">
        {/* Top Gold Accent Line */}
        <div className="w-full h-1 absolute left-0 top-0 bg-[#C6A45A]" />

        {/* Top Brand Logo */}
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#C6A45A] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
              {/* Vehicle / Cab SVG Icon */}
              <svg
                className="w-5 h-5 text-[#071E3B]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.2 1 12 1 13v3c0 .6.4 1 1 1h2" />
                <circle cx="7" cy="17" r="2" />
                <path d="M9 17h6" />
                <circle cx="17" cy="17" r="2" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-white text-sm font-bold leading-4">
                Singapore Maxicabs
              </span>
              <span className="text-[#C6A45A] text-[10px] font-normal uppercase tracking-widest pt-0.5">
                Premium Transport
              </span>
            </div>
          </div>

          {/* Middle Hero Section */}
          <div className="py-12 md:py-16">
            <span className="text-[#C6A45A] text-xs font-bold uppercase tracking-[2.5px]">
              Owner Portal
            </span>
            <h1 className="text-white text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] mt-3">
              Manage your
              <br />
              fleet with ease.
            </h1>
            <p className="text-white/60 text-sm md:text-base font-normal leading-relaxed mt-4 max-w-sm">
              Control bookings, manage vehicles, update pricing, and track your business — all from one place.
            </p>
          </div>

          {/* 3 Value Pillars / Features */}
          <div className="space-y-4">
            {/* 1. Booking Management */}
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 text-base">
                📋
              </div>
              <div>
                <div className="text-white text-xs font-semibold leading-tight">
                  Booking Management
                </div>
                <div className="text-white/50 text-xs font-normal leading-tight mt-0.5">
                  Process and track all incoming rides
                </div>
              </div>
            </div>

            {/* 2. Fleet Control */}
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 text-base">
                🚗
              </div>
              <div>
                <div className="text-white text-xs font-semibold leading-tight">
                  Fleet Control
                </div>
                <div className="text-white/50 text-xs font-normal leading-tight mt-0.5">
                  Add, edit or deactivate vehicles
                </div>
              </div>
            </div>

            {/* 3. Live Pricing */}
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 text-base">
                💰
              </div>
              <div>
                <div className="text-white text-xs font-semibold leading-tight">
                  Live Pricing
                </div>
                <div className="text-white/50 text-xs font-normal leading-tight mt-0.5">
                  Update fares instantly across the board
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-10 text-white/30 text-xs font-normal">
          © 2026 Singapore Maxicabs · Authorised personnel only
        </div>
      </div>

      {/* Right Column: Sign In Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 lg:p-16 bg-gray-100">
        <div className="w-full max-w-[384px] flex flex-col justify-start items-start">
          {/* Form Header */}
          <div className="w-full">
            <h2 className="text-[#071E3B] text-3xl font-bold tracking-tight leading-10">
              Welcome back
            </h2>
            <p className="text-slate-500 text-sm font-normal leading-5 mt-1">
              Sign in to access the admin dashboard.
            </p>
          </div>

          {error && (
            <div className="w-full mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full mt-8 space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-[#071E3B] text-xs font-semibold leading-5">
                Email address
              </label>
              <div className="w-full px-4 py-3.5 bg-white rounded-xl border border-slate-200 flex items-center gap-3 focus-within:border-[#C6A45A] focus-within:ring-1 focus-within:ring-[#C6A45A] transition-all shadow-xs">
                <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="owner@singaporemaxicabs.com.sg"
                  className="w-full text-[#071E3B] text-sm font-normal placeholder:text-slate-400 outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="block text-[#071E3B] text-xs font-semibold leading-5">
                Password
              </label>
              <div className="w-full px-4 py-3.5 bg-white rounded-xl border border-slate-200 flex items-center gap-3 focus-within:border-[#C6A45A] focus-within:ring-1 focus-within:ring-[#C6A45A] transition-all shadow-xs">
                <Lock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-[#071E3B] text-sm font-normal placeholder:text-slate-400 outline-none bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <div className="pt-1">
              <button
                type="submit"
                className="w-full py-3.5 bg-[#071E3B] hover:bg-[#0B2A4A] active:bg-[#041224] text-white rounded-xl flex items-center justify-center gap-2.5 text-base font-semibold transition-all shadow-sm cursor-pointer"
              >
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4 text-[#C6A45A]" />
              </button>
            </div>
          </form>

          {/* Demo Credentials Box */}
          <div
            onClick={handleUseDemo}
            className="w-full mt-6 p-4 bg-[#EEF5FB] rounded-xl border border-[#C6A45A]/30 cursor-pointer hover:border-[#C6A45A] transition-all"
            title="Click to autofill demo credentials"
          >
            <div className="text-[#C6A45A] text-xs font-semibold uppercase tracking-wide">
              Demo Credentials
            </div>
            <div className="pt-2 space-y-1 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Email</span>
                <span className="text-[#071E3B] font-medium font-mono text-[11px]">
                  owner@singaporemaxicabs.com.sg
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Password</span>
                <span className="text-[#071E3B] font-medium font-mono text-[11px]">
                  Admin@2026
                </span>
              </div>
            </div>
          </div>

          {/* Footer Back Link */}
          <div className="w-full pt-6 text-center text-xs leading-4">
            <span className="text-slate-500">
              This portal is for authorised personnel only.{" "}
            </span>
            <a
              href="https://singaporemaxicabs.com"
              className="text-[#C6A45A] font-medium hover:underline inline-block"
            >
              Back to site →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
