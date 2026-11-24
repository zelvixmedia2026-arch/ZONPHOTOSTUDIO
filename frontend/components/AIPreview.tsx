"use client";

import { useState, useRef, useEffect } from "react";
import { MoveHorizontal } from "lucide-react";

// 1. THIS MUST BE A TRANSPARENT PNG OF A PERSON
// I am using a reliable transparent portrait for this demo.
const SUBJECT_IMG = "https://pngimg.com/uploads/man/man_PNG6529.png"; 

// 2. The color of the background for the "Before" side (simulating a studio wall)
const BEFORE_BG_COLOR = "#A48F7C"; 

export default function AIPreview() {
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
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Remove Backgrounds <span className="text-[#C89B2B]">Instantly.</span>
          </h2>
          <p className="text-lg text-gray-500">
            Drag the slider to see the magic.
          </p>
        </div>

        {/* THE SLIDER */}
        <div 
          ref={containerRef}
          className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-2xl border border-gray-200 bg-white"
          onMouseDown={() => setIsDragging(true)}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setIsDragging(true)}
          onTouchMove={handleTouchMove}
        >
          {/* AFTER IMAGE (Transparent PNG over Checkerboard) */}
          <div 
            className="absolute inset-0 w-full h-full flex items-end justify-center pb-0"
            style={{
              backgroundImage: `
                linear-gradient(45deg, #e5e7eb 25%, transparent 25%), 
                linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), 
                linear-gradient(45deg, transparent 75%, #e5e7eb 75%), 
                linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)
              `,
              backgroundSize: '24px 24px',
              backgroundPosition: '0 0, 0 12px, 12px -12px, -12px 0px'
            }}
          >
            <img
              src={SUBJECT_IMG}
              alt="AI Result"
              className="h-[90%] w-auto object-contain drop-shadow-2xl" 
              draggable={false}
            />
          </div>

          {/* BEFORE IMAGE (Clipped overlay with Solid Background) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden flex items-end justify-center pb-0"
            style={{ 
              clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
              backgroundColor: BEFORE_BG_COLOR 
            }}
          >
            <img
              src={SUBJECT_IMG}
              alt="Original"
              className="h-[90%] w-auto object-contain drop-shadow-2xl"
              draggable={false}
            />
          </div>

          {/* SLIDER HANDLE */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.3)] z-30"
            style={{ left: `calc(${sliderPosition}% - 1px)` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 bg-[#6B4F3F] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
              <MoveHorizontal size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}