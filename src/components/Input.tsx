import React from "react";

interface InputProps {
  type?: "text" | "password" | "email" | "date" | "number";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  name?: string;
  id?: string;
  disabled?: boolean;
  variant?: "form" | "control" | "modal";
}

interface SelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  className?: string;
  name?: string;
  id?: string;
  disabled?: boolean;
  variant?: "form" | "control" | "modal";
}

interface TextAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  name?: string;
  id?: string;
  disabled?: boolean;
  rows?: number;
}

export function Input({
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  className = "",
  name,
  id,
  disabled = false,
  variant = "form",
}: InputProps) {
  const getVariantClass = () => {
    switch (variant) {
      case "control":
        return "control-input";
      case "modal":
        return ""; // Modal styles are applied via parent selector
      default:
        return ""; // Form styles are applied via parent selector
    }
  };

  const inputClasses = `${getVariantClass()} ${className}`.trim();

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={inputClasses}
      name={name}
      id={id}
      disabled={disabled}
    />
  );
}

export function Select({
  value,
  onChange,
  options,
  className = "",
  name,
  id,
  disabled = false,
  variant = "form",
}: SelectProps) {
  const getVariantClass = () => {
    switch (variant) {
      case "control":
        return "control-select";
      case "modal":
        return "filters"; // Based on existing modal select styling
      default:
        return "";
    }
  };

  const selectClasses = `${getVariantClass()} ${className}`.trim();

  return (
    <select
      value={value}
      onChange={onChange}
      className={selectClasses}
      name={name}
      id={id}
      disabled={disabled}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export function TextArea({
  value,
  onChange,
  placeholder,
  required = false,
  className = "",
  name,
  id,
  disabled = false,
  rows = 4,
}: TextAreaProps) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={className}
      name={name}
      id={id}
      disabled={disabled}
      rows={rows}
    />
  );
}
