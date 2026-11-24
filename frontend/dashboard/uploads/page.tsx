"use client";

import { useState } from "react";

import UploadArea from "@/components/dashboard/uploadarea";
import PhotoTypeSelector from "@/components/dashboard/PhotoTypeSelector";
import BackgroundSelector from "@/components/dashboard/BackgroundSelector";
import ProcessButton from "@/components/dashboard/ProcessButton";
import LivePreview from "@/components/dashboard/LivePreview";
import DownloadPanel from "@/components/dashboard/DownloadPanel";
import { removeBackground } from "@/lib/api";

// Must match the swatches in BackgroundSelector.tsx
const BACKGROUND_HEX: Record<string, string> = {
  white: "#FFFFFF",
  red: "#E53935",
  blue: "#1976D2",
  yellow: "#FDD835",
};

export default function DashboardPage() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  const [photoType, setPhotoType] = useState("passport");
  const [background, setBackground] = useState("white");

  const [processing, setProcessing] = useState(false);

  const handleProcess = async () => {
    if (!image) {
      alert("Please upload an image first.");
      return;
    }

    setProcessing(true);
    setProcessedImage(null);

    try {
      const result = await removeBackground(image, BACKGROUND_HEX[background]);
      setProcessedImage(result.imageUrl);
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Failed to process image.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          AI Workspace
        </h1>

        <p className="mt-2 text-gray-500">
          Upload a photo and let AI create professional passport and
          stamp-size images in seconds.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          <UploadArea
            image={image}
            preview={preview}
            setImage={setImage}
            setPreview={setPreview}
          />

          <PhotoTypeSelector
            photoType={photoType}
            setPhotoType={setPhotoType}
          />

          <BackgroundSelector
            background={background}
            setBackground={setBackground}
          />

          <ProcessButton
            image={image}
            photoType={photoType}
            background={background}
            onProcess={handleProcess}
            loading={processing}
          />
        </div>

        <div className="space-y-6 lg:col-span-7">
          <LivePreview
            original={preview}
            processed={processedImage}
          />

          <DownloadPanel
            processed={processedImage}
          />
        </div>
      </div>

      {processing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="rounded-3xl bg-white p-10 shadow-2xl">
            <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-[#C89B2B] border-t-transparent" />

            <h2 className="mt-6 text-center text-2xl font-bold">
              AI Processing...
            </h2>

            <p className="mt-3 text-center text-gray-500">
              Removing background, enhancing image and preparing passport photo.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}