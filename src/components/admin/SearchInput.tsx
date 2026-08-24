import React from "react";
import { Search, X } from "lucide-react";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onSearchChange: (val: string) => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onSearchChange,
  placeholder = "Search...",
  className = "",
  ...props
}: SearchInputProps) {
  return (
    <div className={`relative flex items-center w-full max-w-xs ${className}`}>
      <Search className="absolute left-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#F47920] focus:ring-1 focus:ring-[#F47920]/20 transition-all"
        {...props}
      />
      {value && (
        <button
          onClick={() => onSearchChange("")}
          className="absolute right-3 p-0.5 text-gray-400 hover:text-gray-600 rounded"
          aria-label="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

interface FilterDropdownProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
  className?: string;
}

export function FilterDropdown({
  label,
  value,
  onChange,
  options,
  className = "",
}: FilterDropdownProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-xs font-medium text-gray-500 shrink-0">{label}:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white border border-gray-200 text-sm text-gray-900 rounded-xl px-3 py-2 focus:outline-none focus:border-[#F47920] focus:ring-1 focus:ring-[#F47920]/20 transition-all cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
