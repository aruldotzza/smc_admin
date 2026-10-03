import React from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectDropdownProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  icon?: React.ReactNode;
  options: Option[];
}

export default function SelectDropdown({
  label,
  icon,
  options,
  className = "",
  ...props
}: SelectDropdownProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-medium text-slate-300 mb-1.5 uppercase tracking-wide">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center">
            {icon}
          </div>
        )}
        <select
          className={`w-full bg-[#0E172E] text-white text-sm rounded-lg border border-slate-700/80 focus:border-[#C49B55] focus:ring-1 focus:ring-[#C49B55] outline-none transition-all py-2.5 appearance-none cursor-pointer ${
            icon ? "pl-10 pr-8" : "px-3.5 pr-8"
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#0E172E] text-white">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 pointer-events-none text-slate-400 text-xs">
          ▼
        </div>
      </div>
    </div>
  );
}
