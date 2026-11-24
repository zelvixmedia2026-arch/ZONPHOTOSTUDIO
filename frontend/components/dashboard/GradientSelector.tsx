"use client";

import { Check } from "lucide-react";

interface GradientSelectorProps {
  selectedGradient: string | null;
  setSelectedGradient: (gradient: string | null) => void;
}

export const GRADIENTS = [
  { name: "Sunset", value: "#FF7E5F,#FEB47B" },
  { name: "Ocean", value: "#2E3192,#1BFFFF" },
  { name: "Purple", value: "#DA22FF,#9733EE" },
  { name: "Emerald", value: "#348F50,#56B4D3" },
  { name: "Warm Glow", value: "#F09819,#EDDE5D" },
  { name: "Cool Blue", value: "#2193B0,#6DD5ED" },
  { name: "Pink", value: "#FF0099,#493240" },
  { name: "Dark Knight", value: "#232526,#414345" },
  { name: "Peach", value: "#FFE000,#799F0C" },
  { name: "Sky", value: "#56CCF2,#2F80ED" },
  { name: "Lush", value: "#56AB2F,#A8E063" },
  { name: "Fire", value: "#F12711,#F5AF19" },
];

export default function GradientSelector({ selectedGradient, setSelectedGradient }: GradientSelectorProps) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900">Gradients</h2>
      <p className="text-sm text-gray-500 mt-1 mb-5">Choose a stylish gradient background.</p>

      <div className="grid grid-cols-3 gap-3">
        {GRADIENTS.map((grad) => {
          const [c1, c2] = grad.value.split(",");
          const cssGradient = `linear-gradient(135deg, ${c1}, ${c2})`;
          const isSelected = selectedGradient === grad.value;

          return (
            <button
              key={grad.name}
              onClick={() => setSelectedGradient(isSelected ? null : grad.value)}
              className={`relative h-16 rounded-xl border-2 transition-all overflow-hidden ${
                isSelected ? "border-[#C89B2B] scale-105 shadow-md" : "border-transparent hover:scale-105 hover:shadow-sm"
              }`}
              style={{ background: cssGradient }}
            >
              {isSelected && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center backdrop-blur-[1px]">
                  <Check size={20} className="text-white drop-shadow-md" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}