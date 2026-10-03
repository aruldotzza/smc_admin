import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "gold" | "dark";
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
  iconPosition = "right",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-6 py-3.5 text-base gap-2.5",
  };

  const variantStyles = {
    gold: "bg-[#C49B55] hover:bg-[#b08741] text-[#0A1128] font-semibold shadow-sm hover:shadow-md",
    primary:
      "bg-[#0A1637] hover:bg-[#112352] text-white shadow-sm hover:shadow-md",
    secondary:
      "bg-[#1A2544] hover:bg-[#23325c] text-white border border-[#2B3B66]",
    outline:
      "border border-[#C49B55] text-[#C49B55] hover:bg-[#C49B55] hover:text-[#0A1128]",
    dark: "bg-[#0d1527] hover:bg-[#14203d] text-white border border-[#1e2e54]",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...props}
    >
      {icon && iconPosition === "left" && <span>{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span>{icon}</span>}
    </button>
  );
}
