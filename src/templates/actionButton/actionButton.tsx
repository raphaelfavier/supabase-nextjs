import React from "react";

interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "indigo" | "gray" | "red";
}

const variantClasses: Record<string, string> = {
  indigo:
    "border border-[#6366f1] bg-[#6366f1] text-white hover:bg-[#4f46e5] hover:border-[#4f46e5]",
  gray: "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 hover:border-gray-400",
  red: "border border-red-600 bg-red-600 text-white hover:bg-red-700 hover:border-red-700",
};

export default function ActionButton({
  children,
  variant = "indigo",
  className = "",
  ...props
}: ActionButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded-md cursor-pointer transition-colors font-medium ${
        variantClasses[variant] || variantClasses.indigo
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
