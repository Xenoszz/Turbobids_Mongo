"use client";

import { Search } from "lucide-react";

export function SearchButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full flex items-center gap-2 transition-colors duration-200 shadow-lg"
    >
      <Search size={20} />
      <span>SEARCH</span>
    </button>
  );
}