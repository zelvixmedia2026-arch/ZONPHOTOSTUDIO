"use client";

import { Check } from "lucide-react";

interface BackgroundSelectorProps {
  background: string;
  setBackground: (bg: string) => void;
}

const COLORS = [
  { name: "white", hex: "#FFFFFF" },
  { name: "red", hex: "#E53935" },
  { name: "blue", hex: "#1976D2" },
  { name: "yellow", hex: "#FDD835" },
  { name: "light-blue", hex: "#D3E3F8" }, 
  { name: "gray", hex: "#E0E0E0" },
  { name: "dark-gray", hex: "#9E9E9E" },
  { name: "green", hex: "#43A047" },
];

export default function BackgroundSelector({ background, setBackground }: BackgroundSelectorProps) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm w-full">
      <h2 className="text-xl font-bold text-gray-900">Background Color</h2>
      <p className="text-sm text-gray-500 mt-1 mb-5">Choose the passport background color.</p>

      {/* Added w-full here to stretch the grid */}
      <div className="grid grid-cols-2 gap-4 w-full max-h-[220px] overflow-y-auto pr-2 pb-2 custom-scrollbar">
        {COLORS.map((color) => (
          <button
            key={color.name}
            onClick={() => setBackground(color.name)}
            className={`flex items-center gap-3 w-full rounded-2xl border-2 p-3.5 text-left transition-all ${
              background === color.name
                ? "border-[#C89B2B] bg-[#C89B2B]/5"
                : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
            }`}
          >
            <div
              className="h-9 w-9 rounded-full border border-gray-200 shadow-sm flex items-center justify-center shrink-0"
              style={{ backgroundColor: color.hex }}
            >
              {background === color.name && (
                <Check
                  size={18}
                  className={color.name === "white" || color.name === "light-blue" || color.name === "gray" ? "text-gray-900" : "text-white"}
                />
              )}
            </div>
            <span className="text-sm font-bold text-gray-700 capitalize truncate">
              {color.name.replace("-", " ")}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}