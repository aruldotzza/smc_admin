import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

export default function InputField({
  label,
  icon,
  error,
  className = "",
  ...props
}: InputFieldProps) {
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
        <input
          className={`w-full bg-[#0E172E] text-white text-sm placeholder:text-slate-500 rounded-lg border border-slate-700/80 focus:border-[#C49B55] focus:ring-1 focus:ring-[#C49B55] outline-none transition-all py-2.5 ${
            icon ? "pl-10 pr-3.5" : "px-3.5"
          } ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-rose-500 mt-1">{error}</span>}
    </div>
  );
}
