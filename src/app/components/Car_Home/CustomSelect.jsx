"use client";

import { ChevronDown } from "lucide-react";

export function CustomSelect({ value, onChange, options, placeholder }) {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-white rounded-full px-6 py-3 text-gray-700 cursor-pointer
                 border border-gray-200 focus:outline-none focus:border-blue-400 transition-colors"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" 
        size={20} 
      />
    </div>
  );
}