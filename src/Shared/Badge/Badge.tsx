import React from "react";
import { MessageSquare, Globe, Phone, CheckCircle2, Clock, PlayCircle, XCircle, AlertTriangle, User } from "lucide-react";

export type BadgeVariant =
  | "gold"
  | "dark"
  | "outline"
  | "pill"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "purple"
  | "pending"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "whatsapp"
  | "website"
  | "phone"
  | "walkin"
  | "active"
  | "maintenance"
  | "inactive";

interface BadgeProps {
  children?: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  icon?: React.ReactNode;
  size?: "sm" | "md";
}

export default function Badge({
  children,
  variant = "gold",
  className = "",
  icon,
  size = "md",
}: BadgeProps) {
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";

  const base = `inline-flex items-center gap-1 font-semibold rounded-full tracking-wide transition-colors ${sizeClasses}`;

  const variants: Record<BadgeVariant, string> = {
    gold: "bg-[#C6A45A]/15 text-[#B58E45] border border-[#C6A45A]/30",
    dark: "bg-[#071E3B] text-white border border-[#123F6B]",
    outline: "border border-[#C6A45A]/40 text-[#C6A45A] bg-[#C6A45A]/5",
    pill: "bg-slate-100 text-slate-700 border border-slate-200",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border border-amber-200",
    error: "bg-rose-50 text-rose-700 border border-rose-200",
    info: "bg-sky-50 text-sky-700 border border-sky-200",
    purple: "bg-purple-50 text-purple-700 border border-purple-200",

    // Booking statuses
    pending: "bg-amber-50 text-amber-700 border border-amber-200",
    confirmed: "bg-blue-50 text-blue-700 border border-blue-200",
    in_progress: "bg-purple-50 text-purple-700 border border-purple-200",
    completed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    cancelled: "bg-rose-50 text-rose-700 border border-rose-200",

    // Channels
    whatsapp: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    website: "bg-blue-50 text-blue-700 border border-blue-200",
    phone: "bg-slate-100 text-slate-700 border border-slate-200",
    walkin: "bg-amber-50 text-amber-800 border border-amber-200",

    // Fleet status
    active: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    maintenance: "bg-amber-50 text-amber-700 border border-amber-200",
    inactive: "bg-slate-100 text-slate-600 border border-slate-200",
  };

  // Optional default icon for common status / channels if none provided
  const getDefaultIcon = () => {
    if (icon) return icon;
    switch (variant) {
      case "whatsapp":
        return <MessageSquare className="w-3 h-3 text-emerald-600" />;
      case "website":
        return <Globe className="w-3 h-3 text-blue-600" />;
      case "phone":
        return <Phone className="w-3 h-3 text-slate-600" />;
      case "walkin":
        return <User className="w-3 h-3 text-amber-600" />;
      case "completed":
        return <CheckCircle2 className="w-3 h-3 text-emerald-600" />;
      case "pending":
        return <Clock className="w-3 h-3 text-amber-600" />;
      case "in_progress":
        return <PlayCircle className="w-3 h-3 text-purple-600" />;
      case "cancelled":
        return <XCircle className="w-3 h-3 text-rose-600" />;
      default:
        return null;
    }
  };

  const badgeIcon = getDefaultIcon();

  // Default text label if children is not provided
  const getLabel = () => {
    if (children) return children;
    if (variant === "in_progress") return "In-Progress";
    if (variant === "walkin") return "Walk-In";
    return variant.charAt(0).toUpperCase() + variant.slice(1);
  };

  return (
    <span className={`${base} ${variants[variant] || variants.gold} ${className}`}>
      {badgeIcon && <span className="flex-shrink-0">{badgeIcon}</span>}
      <span>{getLabel()}</span>
    </span>
  );
}
