import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "blue" | "green" | "red" | "default";
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  variant = "default",
  type = "button",
  onClick,
  className = "",
  disabled = false,
}: ButtonProps) {
  const getVariantClass = () => {
    switch (variant) {
      case "blue":
        return "btn-blue";
      case "green":
        return "btn-green";
      case "red":
        return "btn-red";
      default:
        return "";
    }
  };

  const buttonClasses = `btn ${getVariantClass()} ${className}`.trim();

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
