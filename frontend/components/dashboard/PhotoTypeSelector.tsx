"use client";

import { CheckCircle } from "lucide-react";

interface PhotoTypeSelectorProps {
  photoType: string;
  setPhotoType: React.Dispatch<React.SetStateAction<string>>;
}

const options = [
  {
    id: "passport",
    title: "Passport Photo",
    subtitle: "35 × 45 mm",
    icon: "🛂",
  },
  {
    id: "stamp",
    title: "Stamp Size",
    subtitle: "25 × 35 mm",
    icon: "📄",
  },
];

export default function PhotoTypeSelector({
  photoType,
  setPhotoType,
}: PhotoTypeSelectorProps) {
  return (
    <div className="rounded-3xl border border-[#ECE6D7] bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold">
        Photo Type
      </h2>

      <p className="mt-2 text-gray-500">
        Select the output photo size.
      </p>

      <div className="mt-6 grid gap-4">
        {options.map((item) => {
          const active = photoType === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setPhotoType(item.id)}
              className={`relative rounded-2xl border p-5 text-left transition-all duration-300 ${
                active
                  ? "border-[#C89B2B] bg-[#FFF8ED]"
                  : "border-gray-200 hover:border-[#C89B2B]"
              }`}
            >
              {active && (
                <CheckCircle
                  size={22}
                  className="absolute right-5 top-5 text-[#C89B2B]"
                />
              )}

              <div className="text-3xl">
                {item.icon}
              </div>

              <h3 className="mt-3 text-lg font-semibold">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500">
                {item.subtitle}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}