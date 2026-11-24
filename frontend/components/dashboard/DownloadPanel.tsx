"use client";

import { useState } from "react";

interface DownloadPanelProps {
  processed: string | null;
}

function convertToJpeg(blob: Blob): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(blob);
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Your browser cannot convert images."));
        return;
      }

      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (out) => {
          URL.revokeObjectURL(objectUrl);
          if (out) resolve(out);
          else reject(new Error("JPG conversion failed."));
        },
        "image/jpeg",
        0.95
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Could not read the processed image."));
    };

    img.src = objectUrl;
  });
}

export default function DownloadPanel({ processed }: DownloadPanelProps) {
  const [busy, setBusy] = useState(false);

  const handleDownload = async (format: "png" | "jpg") => {
    if (!processed) return;

    setBusy(true);
    try {
      const response = await fetch(processed);
      if (!response.ok) throw new Error("Could not load the image.");

      const pngBlob = await response.blob();
      const blob = format === "jpg" ? await convertToJpeg(pngBlob) : pngBlob;

      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `zon-photo.${format}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Download failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mt-6 rounded-3xl border border-[#ECE6D7] bg-white p-6 shadow-sm">

      <h2 className="text-2xl font-bold">
        Download
      </h2>

      <p className="mt-2 text-gray-500">
        Export your processed photo.
      </p>

      <div className="mt-6 grid grid-cols-3 gap-3">

        <button
          type="button"
          onClick={() => handleDownload("png")}
          disabled={!processed || busy}
          className="rounded-xl border p-3 hover:border-[#C89B2B] disabled:cursor-not-allowed disabled:opacity-40"
        >
          PNG
        </button>

        <button
          type="button"
          onClick={() => handleDownload("jpg")}
          disabled={!processed || busy}
          className="rounded-xl border p-3 hover:border-[#C89B2B] disabled:cursor-not-allowed disabled:opacity-40"
        >
          JPG
        </button>

        <button className="rounded-xl border p-3 hover:border-[#C89B2B]">
          Print Sheet
        </button>

      </div>

      <button
        type="button"
        onClick={() => handleDownload("png")}
        disabled={!processed || busy}
        className="mt-6 w-full rounded-xl bg-[#C89B2B] py-4 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        Download
      </button>

    </div>
  );
}