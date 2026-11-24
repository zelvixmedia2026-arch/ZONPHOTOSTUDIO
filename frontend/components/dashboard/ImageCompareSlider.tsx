"use client";

import { useState, useRef, useEffect } from "react";
import { MoveHorizontal } from "lucide-react";

interface SliderProps {
  beforeImage: string;
  afterImage: string;
}

export default function ImageCompareSlider({ beforeImage, afterImage }: SliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  // Handle mouse up outside the container
  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl cursor-ew-resize select-none border border-gray-200 shadow-sm"
      onMouseDown={() => setIsDragging(true)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchMove={handleTouchMove}
    >
      {/* AFTER IMAGE (Background with Checkered Pattern) */}
      <div 
        className="absolute inset-0 w-full h-full bg-gray-100 flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(45deg, #e5e7eb 25%, transparent 25%), 
                            linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), 
                            linear-gradient(45deg, transparent 75%, #e5e7eb 75%), 
                            linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
        }}
      >
        <img
          src={afterImage}
          alt="AI Result"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* BEFORE IMAGE (Clipped overlay) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img
          src={beforeImage}
          alt="Original"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* SLIDER HANDLE */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.3)]"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-200">
          <MoveHorizontal size={20} className="text-gray-600" />
        </div>
      </div>
    </div>
  );
}