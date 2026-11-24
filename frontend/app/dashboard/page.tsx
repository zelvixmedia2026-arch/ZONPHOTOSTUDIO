"use client";

import { useState } from "react";
import UploadArea from "@/components/dashboard/uploadarea";
import PhotoTypeSelector from "@/components/dashboard/PhotoTypeSelector";
import BackgroundSelector from "@/components/dashboard/BackgroundSelector";
import ProcessButton from "@/components/dashboard/ProcessButton";
import LivePreview from "@/components/dashboard/LivePreview";
import DownloadPanel from "@/components/dashboard/DownloadPanel";
import AdjustmentsPanel, { ImageSettings } from "@/components/dashboard/AdjustmentsPanel";
import GradientSelector from "@/components/dashboard/GradientSelector";
import SceneSelector from "@/components/dashboard/SceneSelector"; // <-- Import
import { removeBackground } from "@/lib/api";

const BACKGROUND_HEX: Record<string, string> = {
  white: "#FFFFFF", red: "#E53935", blue: "#1976D2", yellow: "#FDD835",
  "light-blue": "#D3E3F8", gray: "#E0E0E0", "dark-gray": "#9E9E9E", green: "#43A047",
};

export default function DashboardPage() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [photoType, setPhotoType] = useState("passport");
  
  // Background states
  const [background, setBackground] = useState("white");
  const [gradient, setGradient] = useState<string | null>(null);
  const [scene, setScene] = useState<string | null>(null); // <-- New scene state

  const [processing, setProcessing] = useState(false);

  const [settings, setSettings] = useState<ImageSettings>({
    brightness: 100, contrast: 100, saturation: 100, grayscale: 0, sepia: 0, hueRotate: 0,
  });

  const handleProcess = async () => {
    if (!image) return alert("Please upload an image first.");
    setProcessing(true);
    setProcessedImage(null);

    // Priority: Scene > Gradient > Solid Color
    const finalBackground = scene ? scene : (gradient ? gradient : BACKGROUND_HEX[background]);

    try {
      const result = await removeBackground(image, finalBackground);
      setProcessedImage(result.imageUrl);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to process image.");
    } finally {
      setProcessing(false);
    }
  };

  // Handlers to ensure only ONE background type is active at a time
  const handleColorSelect = (color: string) => {
    setBackground(color);
    setGradient(null);
    setScene(null);
  };

  const handleGradientSelect = (grad: string | null) => {
    setGradient(grad);
    if (grad) setScene(null);
  };

  const handleSceneSelect = (selectedScene: string | null) => {
    setScene(selectedScene);
    if (selectedScene) {
      setGradient(null);
    }
  };

  return (
    <div className="mx-auto max-w-7xl pb-20">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">AI Workspace</h1>
        <p className="mt-2 text-gray-500">Upload a photo and let AI create professional passport images.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* LEFT COLUMN */}
        <div className="space-y-6 lg:col-span-5">
          <UploadArea image={image} preview={preview} setImage={setImage} setPreview={setPreview} />
          <PhotoTypeSelector photoType={photoType} setPhotoType={setPhotoType} />
          <BackgroundSelector background={background} setBackground={handleColorSelect} />
          <AdjustmentsPanel settings={settings} onChange={setSettings} />
          <ProcessButton image={image} photoType={photoType} background={background} onProcess={handleProcess} loading={processing} />
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6 lg:col-span-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <GradientSelector selectedGradient={gradient} setSelectedGradient={handleGradientSelect} />
             <SceneSelector selectedScene={scene} setSelectedScene={handleSceneSelect} />
          </div>

          <LivePreview original={preview} processed={processedImage} isProcessing={processing} settings={settings} />
          <DownloadPanel processed={processedImage} settings={settings} />
        </div>
      </div>

      {/* LOADING OVERLAY */}
      {processing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="rounded-3xl bg-white p-10 shadow-2xl">
            <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-[#C89B2B] border-t-transparent" />
            <h2 className="mt-6 text-center text-2xl font-bold">AI Processing...</h2>
            <p className="mt-3 text-center text-gray-500">Removing background and placing subject in scene.</p>
          </div>
        </div>
      )}
    </div>
  );
}