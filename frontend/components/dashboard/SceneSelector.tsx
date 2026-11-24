"use client";

import { Check } from "lucide-react";

interface SceneSelectorProps {
  selectedScene: string | null;
  setSelectedScene: (scene: string | null) => void;
}

export const SCENES = [
  { name: "Jungle", url: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800" },
  { name: "Beach", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800" },
  { name: "City", url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=800" },
  { name: "Studio", url: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=800" },
  { name: "Office", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800" },
  { name: "Abstract", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800" },
  { name: "Sunset", url: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?q=80&w=800" },
  { name: "Mountains", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800" },
  { name: "Library", url: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800" },
];

export default function SceneSelector({ selectedScene, setSelectedScene }: SceneSelectorProps) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900">Scene Backgrounds</h2>
      <p className="text-sm text-gray-500 mt-1 mb-5">Place the subject in a new environment.</p>

      <div className="grid grid-cols-3 gap-3">
        {SCENES.map((scene) => {
          const isSelected = selectedScene === scene.url;

          return (
            <button
              key={scene.name}
              onClick={() => setSelectedScene(isSelected ? null : scene.url)}
              className={`relative h-20 rounded-xl border-2 transition-all overflow-hidden group bg-gray-100 ${
                isSelected ? "border-[#C89B2B] scale-105 shadow-md" : "border-transparent hover:scale-105 hover:shadow-sm"
              }`}
            >
              <img 
                src={scene.url} 
                alt={scene.name} 
                className="absolute inset-0 w-full h-full object-cover" 
                loading="lazy"
              />
              <div className={`absolute inset-0 bg-black/40 transition-opacity ${isSelected ? 'opacity-100' : 'group-hover:opacity-100 opacity-0'}`} />
              
              {isSelected && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Check size={24} className="text-white drop-shadow-md" />
                </div>
              )}
              <span className="absolute bottom-1 left-0 right-0 text-center text-[11px] font-bold text-white drop-shadow-md">
                {scene.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}