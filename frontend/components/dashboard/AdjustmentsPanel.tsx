"use client";

import { Sun, Contrast, Droplets, Palette, Thermometer, SlidersHorizontal } from "lucide-react";

export interface ImageSettings {
  brightness: number;
  contrast: number;
  saturation: number;
  grayscale: number;
  sepia: number;
  hueRotate: number;
}

interface AdjustmentsPanelProps {
  settings: ImageSettings;
  onChange: (settings: ImageSettings) => void;
}

// Explicitly type the presets to avoid TypeScript errors
// Explicitly type the presets to avoid TypeScript errors
const PRESETS: Record<string, ImageSettings> = {
  Normal: { brightness: 100, contrast: 100, saturation: 100, grayscale: 0, sepia: 0, hueRotate: 0 },
  Warm: { brightness: 105, contrast: 100, saturation: 110, grayscale: 0, sepia: 25, hueRotate: 0 },
  Cool: { brightness: 100, contrast: 105, saturation: 90, grayscale: 0, sepia: 0, hueRotate: 180 },
  "B&W": { brightness: 100, contrast: 110, saturation: 0, grayscale: 100, sepia: 0, hueRotate: 0 },
  Vivid: { brightness: 105, contrast: 115, saturation: 150, grayscale: 0, sepia: 0, hueRotate: 0 },
  Vintage: { brightness: 90, contrast: 90, saturation: 80, grayscale: 0, sepia: 40, hueRotate: 0 },
};

export default function AdjustmentsPanel({ settings, onChange }: AdjustmentsPanelProps) {
  
  const handleChange = (key: keyof ImageSettings, value: number) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <SlidersHorizontal size={20} className="text-[#C89B2B]" />
        <h3 className="text-lg font-bold text-gray-900">Pro Adjustments</h3>
      </div>
      
      {/* PRESETS ROW */}
      <div className="mb-8">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Presets</p>
        <div className="flex flex-wrap gap-2">
          {Object.keys(PRESETS).map((presetName) => (
            <button
              key={presetName}
              onClick={() => onChange(PRESETS[presetName])}
              className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-gray-50 border border-gray-200 text-gray-700 hover:bg-[#C89B2B] hover:text-white hover:border-[#C89B2B] transition-all"
            >
              {presetName}
            </button>
          ))}
        </div>
      </div>

      {/* SLIDERS */}
      <div className="space-y-5">
        {/* Brightness */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Sun size={14} className="text-[#C89B2B]" /> Brightness
            </label>
            <span className="text-xs font-bold text-gray-500">{settings.brightness}%</span>
          </div>
          <input 
            type="range" min="50" max="150" 
            value={settings.brightness} 
            onChange={(e) => handleChange("brightness", Number(e.target.value))} 
            className="w-full accent-[#C89B2B]" 
          />
        </div>

        {/* Contrast */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Contrast size={14} className="text-[#C89B2B]" /> Contrast
            </label>
            <span className="text-xs font-bold text-gray-500">{settings.contrast}%</span>
          </div>
          <input 
            type="range" min="50" max="150" 
            value={settings.contrast} 
            onChange={(e) => handleChange("contrast", Number(e.target.value))} 
            className="w-full accent-[#C89B2B]" 
          />
        </div>

        {/* Saturation */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Droplets size={14} className="text-[#C89B2B]" /> Saturation
            </label>
            <span className="text-xs font-bold text-gray-500">{settings.saturation}%</span>
          </div>
          <input 
            type="range" min="0" max="200" 
            value={settings.saturation} 
            onChange={(e) => handleChange("saturation", Number(e.target.value))} 
            className="w-full accent-[#C89B2B]" 
          />
        </div>

        {/* Grayscale */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Palette size={14} className="text-[#C89B2B]" /> Grayscale
            </label>
            <span className="text-xs font-bold text-gray-500">{settings.grayscale}%</span>
          </div>
          <input 
            type="range" min="0" max="100" 
            value={settings.grayscale} 
            onChange={(e) => handleChange("grayscale", Number(e.target.value))} 
            className="w-full accent-[#C89B2B]" 
          />
        </div>

        {/* Sepia */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Thermometer size={14} className="text-[#C89B2B]" /> Sepia
            </label>
            <span className="text-xs font-bold text-gray-500">{settings.sepia}%</span>
          </div>
          <input 
            type="range" min="0" max="100" 
            value={settings.sepia} 
            onChange={(e) => handleChange("sepia", Number(e.target.value))} 
            className="w-full accent-[#C89B2B]" 
          />
        </div>
      </div>
    </div>
  );
}