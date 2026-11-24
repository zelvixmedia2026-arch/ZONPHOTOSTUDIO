"use client";

import { Check } from "lucide-react";

interface BackgroundSelectorProps {
  background: string;
  setBackground: React.Dispatch<React.SetStateAction<string>>;
}

const colors = [
  {
    id: "white",
    name: "White",
    color: "#FFFFFF",
    border: "border-gray-300",
  },
  {
    id: "red",
    name: "Red",
    color: "#E53935",
  },
  {
    id: "blue",
    name: "Blue",
    color: "#1976D2",
  },
  {
    id: "yellow",
    name: "Yellow",
    color: "#FDD835",
  },
];

export default function BackgroundSelector({
  background,
  setBackground,
}: BackgroundSelectorProps) {
  return (
    <div className="rounded-3xl border border-[#ECE6D7] bg-white p-6 shadow-sm">

      <h2 className="text-2xl font-bold">
        Background Color
      </h2>

      <p className="mt-2 text-gray-500">
        Choose the passport background color.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4">

        {colors.map((item) => {

          const active = background === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setBackground(item.id)}
              className={`flex items-center gap-4 rounded-2xl border p-4 transition-all duration-300 ${
                active
                  ? "border-[#C89B2B] bg-[#FFF8ED]"
                  : "border-gray-200 hover:border-[#C89B2B]"
              }`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${
                  item.border ?? ""
                }`}
                style={{ backgroundColor: item.color }}
              >
                {active && (
                  <Check
                    size={18}
                    className={
                      item.id === "white"
                        ? "text-black"
                        : "text-white"
                    }
                  />
                )}
              </div>

              <span className="font-medium">
                {item.name}
              </span>

            </button>
          );
        })}

      </div>

    </div>
  );
}