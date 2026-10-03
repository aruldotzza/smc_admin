import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "dark" | "outline" | "pill";
  className?: string;
  icon?: React.ReactNode;
}

export default function Badge({
  children,
  variant = "gold",
  className = "",
  icon,
}: BadgeProps) {
  const base =
    "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full";

  const variants = {
    gold: "bg-[#C49B55]/15 text-[#C49B55] border border-[#C49B55]/30",
    dark: "bg-[#0A1637] text-white border border-[#1E2D55]",
    outline: "border border-amber-500/40 text-amber-400 bg-amber-500/5",
    pill: "bg-slate-100 text-slate-800 border border-slate-200",
  };

  return (
    <span className={`${base} ${variants[variant]} ${className}`}>
      {icon && <span>{icon}</span>}
      {children}
    </span>
  );
}
