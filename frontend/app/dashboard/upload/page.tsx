"use client";

import { useState } from "react";

import UploadArea from "@/components/dashboard/uploadarea";
import PhotoTypeSelector from "@/components/dashboard/PhotoTypeSelector";
import BackgroundSelector from "@/components/dashboard/BackgroundSelector";
import ProcessButton from "@/components/dashboard/ProcessButton";
import LivePreview from "@/components/dashboard/LivePreview";
import DownloadPanel from "@/components/dashboard/DownloadPanel";

interface ApiResponse {
  success: boolean;
  message: string;
  data?: {
    output_file: string;
    image_url: string;
  };
}

export default function DashboardPage() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [processedImage, setProcessedImage] = useState<string | null>(null);

  const [photoType, setPhotoType] = useState("passport");
  const [background, setBackground] = useState("white");

  const [processing, setProcessing] = useState(false);

  const handleProcess = async () => {
    console.log("Generate button clicked");

    if (!image) {
      alert("Please upload an image first.");
      return;
    }

    setProcessing(true);
    setProcessedImage(null);

    try {
      const formData = new FormData();
formData.append("image", image);
formData.append("background", background);
formData.append("photoType", photoType);
      const response = await fetch(
        "http://127.0.0.1:8000/process/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data: ApiResponse = await response.json();

      console.log(data);

      if (!data.success) {
        alert(data.message);
      } else {
        setProcessedImage(data.data!.image_url);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to backend.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          AI Workspace
        </h1>

        <p className="mt-2 text-gray-500">
          Upload a photo and let AI create professional passport and
          stamp-size images in seconds.
        </p>
      </div>

      {/* Workspace */}
      <div className="grid gap-8 lg:grid-cols-12">

        {/* Left */}
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
          />

        </div>

        {/* Right */}
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
              Removing background...
            </p>

          </div>

        </div>
      )}

    </div>
  );
}