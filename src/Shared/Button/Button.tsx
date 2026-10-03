import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "gold"
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger"
    | "dark";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export default function Button({
  variant = "gold",
  size = "md",
  children,
  icon,
  iconPosition = "left",
  fullWidth = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2.5 text-xs md:text-sm gap-2",
    lg: "px-5 py-3 text-sm md:text-base gap-2.5",
  };

  const variantStyles = {
    gold: "bg-[#C6A45A] hover:bg-[#B58E45] active:bg-[#A77E3C] text-[#071E3B] shadow-sm hover:shadow",
    primary:
      "bg-[#071E3B] hover:bg-[#0B2A4A] active:bg-[#041224] text-white shadow-sm hover:shadow border border-[#123F6B]",
    secondary:
      "bg-[#0B2A4A] hover:bg-[#123F6B] text-white border border-slate-700",
    outline:
      "bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 hover:border-slate-400 shadow-sm",
    ghost:
      "bg-transparent hover:bg-slate-100 text-slate-700 active:bg-slate-200",
    danger:
      "bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200",
    dark:
      "bg-[#071E3B] hover:bg-[#0E2F4A] text-white border border-[#172334]",
  };

  return (
    <button
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </button>
  );
}
