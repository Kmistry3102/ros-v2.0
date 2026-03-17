"use client";

import { FaSearch } from "react-icons/fa";

export interface SearchInputProps {
  id?: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  "aria-label"?: string;
}

const baseInputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 pl-10 text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-gray-400 focus:ring-2 focus:ring-gray-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

export function SearchInput({
  id,
  label,
  placeholder = "Search…",
  value,
  onChange,
  className = "",
  disabled = false,
  "aria-label": ariaLabel,
}: SearchInputProps) {
  const inputId = id ?? "search-input";
  const labelText = label ?? "Search";

  return (
    <div className="relative max-w-full">
      <label htmlFor={inputId} className="sr-only">
        {labelText}
      </label>
      <input
        id={inputId}
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        aria-label={ariaLabel ?? labelText}
        className={`${baseInputClass} ${className}`.trim()}
      />
      <FaSearch
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400"
        aria-hidden
      />
    </div>
  );
}
