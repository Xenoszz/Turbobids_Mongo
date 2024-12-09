
import React from "react";

export function Input({
  label,
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full rounded-md border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 ${className}`}
      />
    </div>
  );
}
