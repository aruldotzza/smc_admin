import React from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  highlight?: boolean;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  highlight = false,
}: StatsCardProps) {
  return (
    <div
      className={`p-5 rounded-xl border transition-all duration-200 shadow-xs flex flex-col justify-between ${
        highlight
          ? "bg-white border-[#C6A45A]/40 ring-1 ring-[#C6A45A]/20"
          : "bg-white border-slate-200"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {title}
          </span>
          <div className="text-2xl md:text-3xl font-extrabold text-[#071E3B] mt-1 tracking-tight">
            {value}
          </div>
        </div>

        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center ${
            highlight
              ? "bg-[#FBF7EC] text-[#C6A45A]"
              : "bg-slate-50 text-[#071E3B] border border-slate-100"
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs pt-2 border-t border-slate-100">
        {trend ? (
          <div
            className={`flex items-center gap-1 font-semibold ${
              trend.isPositive ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {trend.isPositive ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            <span>{trend.value}</span>
            <span className="text-slate-400 font-normal">vs last week</span>
          </div>
        ) : (
          <span className="text-slate-500">{subtitle}</span>
        )}
      </div>
    </div>
  );
}
