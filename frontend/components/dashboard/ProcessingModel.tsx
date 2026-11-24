"use client";

import { Loader2 } from "lucide-react";

interface ProcessingModalProps {
  open: boolean;
}

const steps = [
  "Uploading image...",
  "Removing background...",
  "Enhancing face...",
  "Generating passport photo...",
];

export default function ProcessingModal({
  open,
}: ProcessingModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

        <div className="flex justify-center">
          <Loader2
            className="animate-spin text-[#C89B2B]"
            size={55}
          />
        </div>

        <h2 className="mt-6 text-center text-2xl font-bold">
          AI Processing
        </h2>

        <p className="mt-2 text-center text-gray-500">
          Please wait while we generate your passport photo.
        </p>

        <div className="mt-8 space-y-4">
          {steps.map((step) => (
            <div
              key={step}
              className="rounded-xl bg-[#FFF8ED] p-4 text-gray-700"
            >
              {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}