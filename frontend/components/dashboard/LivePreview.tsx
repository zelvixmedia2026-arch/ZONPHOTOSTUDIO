"use client";

import { Image as ImageIcon, Sparkles, Loader2 } from "lucide-react";
// 1. IMPORT ImageSettings HERE
import { ImageSettings } from "./AdjustmentsPanel";

interface LivePreviewProps {
  original: string | null;
  processed: string | null;
  isProcessing?: boolean;
  settings: ImageSettings; // 2. ADD THIS TO THE INTERFACE
}

export default function LivePreview({ original, processed, isProcessing = false, settings }: LivePreviewProps) {
  
  // 3. BUILD THE CSS FILTER STRING
  const cssFilter = `brightness(${settings.brightness}%) contrast(${settings.contrast}%) saturate(${settings.saturation}%) grayscale(${settings.grayscale}%) sepia(${settings.sepia}%) hue-rotate(${settings.hueRotate}deg)`;

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">AI Preview</h2>
          <p className="text-sm text-gray-500 mt-1">Live preview of adjustments</p>
        </div>
        {processed && (
          <div className="flex items-center gap-2 rounded-full bg-[#C89B2B]/10 px-4 py-2 text-sm font-semibold text-[#C89B2B]">
            <Sparkles size={16} /> AI Enhanced
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* BEFORE */}
        <div className="space-y-3">
          <p className="text-center font-bold text-gray-800">Before</p>
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 flex items-center justify-center">
            {original ? (
              <img src={original} alt="Original" className="h-full w-full object-cover" />
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <ImageIcon size={48} className="mb-2 opacity-50" />
                <p className="text-sm font-medium">No image</p>
              </div>
            )}
          </div>
        </div>

        {/* AFTER */}
        <div className="space-y-3">
          <p className="text-center font-bold text-[#C89B2B]">After</p>
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border-2 border-[#C89B2B]/30 bg-gray-50 flex items-center justify-center">
            {isProcessing ? (
              <div className="flex flex-col items-center text-[#C89B2B]">
                <Loader2 size={40} className="mb-3 animate-spin" />
                <p className="text-sm font-medium">Processing...</p>
              </div>
            ) : processed ? (
              <img
                src={processed}
                alt="AI Result"
                className="h-full w-full object-cover transition-all duration-200"
                style={{ filter: cssFilter }} // 4. APPLY FILTER HERE
              />
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <Sparkles size={48} className="mb-2 opacity-50" />
                <p className="text-sm font-medium">Waiting for AI</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}