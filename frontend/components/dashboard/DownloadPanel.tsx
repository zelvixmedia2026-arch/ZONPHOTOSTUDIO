"use client";

import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
// 1. IMPORT ImageSettings HERE
import { ImageSettings } from "./AdjustmentsPanel";

interface DownloadPanelProps {
  processed: string | null;
  settings: ImageSettings; // 2. ADD THIS TO THE INTERFACE
}

export default function DownloadPanel({ processed, settings }: DownloadPanelProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!processed) return;
    setDownloading(true);

    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = processed;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // 3. APPLY THE EXACT SAME FILTERS TO THE CANVAS
        ctx.filter = `brightness(${settings.brightness}%) contrast(${settings.contrast}%) saturate(${settings.saturation}%) grayscale(${settings.grayscale}%) sepia(${settings.sepia}%) hue-rotate(${settings.hueRotate}deg)`;
        ctx.drawImage(img, 0, 0);

        const link = document.createElement("a");
        link.download = "zon-photostudio-processed.jpg";
        link.href = canvas.toDataURL("image/jpeg", 1.0);
        link.click();
      }
    } catch (err) {
      alert("Failed to download image.");
    } finally {
      setDownloading(false);
    }
  };

  if (!processed) return null;

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm flex items-center justify-between">
      <div>
        <h3 className="text-xl font-bold text-gray-900">Ready to save?</h3>
        <p className="text-sm text-gray-500 mt-1">Your adjustments are applied.</p>
      </div>
      
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="flex items-center gap-2 rounded-xl bg-[#C89B2B] px-6 py-3 font-bold text-white transition-all hover:bg-[#b08720] disabled:opacity-50"
      >
        {downloading ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />}
        Download HD
      </button>
    </div>
  );
}