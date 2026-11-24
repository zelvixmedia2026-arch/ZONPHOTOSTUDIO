"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface UploadAreaProps {
  image: File | null;
  preview: string | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  setPreview: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function UploadArea({
  image,
  preview,
  setImage,
  setPreview,
}: UploadAreaProps) {
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (!file) return;

      setImage(file);
      setPreview(URL.createObjectURL(file));

      setFileName(file.name);
      setFileSize((file.size / (1024 * 1024)).toFixed(2) + " MB");
    },
    [setImage, setPreview]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/jpg": [],
    },
  });

  return (
    <div className="rounded-3xl border border-[#ECE6D7] bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold">Upload Photo</h2>

      <p className="mt-2 text-gray-500">
        Upload a passport or portrait image.
      </p>

      <div
        {...getRootProps()}
        className={`mt-8 cursor-pointer rounded-3xl border-2 border-dashed p-12 transition-all duration-300 ${
          isDragActive
            ? "border-[#C89B2B] bg-[#FFF8ED]"
            : "border-gray-300 hover:border-[#C89B2B] hover:bg-[#FFFCF5]"
        }`}
      >
        <input {...getInputProps()} />

        {preview ? (
          <div className="flex flex-col items-center">
            <div className="relative h-72 w-72 overflow-hidden rounded-2xl">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>

            <h3 className="mt-6 text-lg font-semibold">{fileName}</h3>

            <p className="text-gray-500">{fileSize}</p>

            <button
              type="button"
              className="mt-6 rounded-xl bg-[#C89B2B] px-6 py-3 text-white transition hover:scale-105"
            >
              Change Image
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-[#FFF8ED] p-6">
              <UploadCloud
                className="text-[#C89B2B]"
                size={50}
              />
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              Drag & Drop Image
            </h3>

            <p className="mt-2 text-gray-500">
              or click to browse
            </p>

            <div className="mt-8 rounded-xl bg-[#C89B2B] px-6 py-3 text-white shadow-lg transition hover:scale-105">
              Choose Image
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-gray-400">
              <ImageIcon size={16} />
              JPG, JPEG & PNG
            </div>
          </div>
        )}
      </div>
    </div>
  );
}