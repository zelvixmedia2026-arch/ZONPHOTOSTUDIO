"use client";

import { Sparkles, Loader2 } from "lucide-react";

interface ProcessButtonProps {
  image: File | null;
  photoType: string;
  background: string;
  onProcess: () => void;
  loading?: boolean;
}

export default function ProcessButton({
  image,
  onProcess,
  loading = false,
}: ProcessButtonProps) {
  return (
    <button
      onClick={onProcess}
      disabled={loading || !image}
      className="
        group
        relative
        w-full
        overflow-hidden
        rounded-2xl
        bg-[#C89B2B]
        px-6
        py-5
        text-lg
        font-semibold
        text-white
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-2xl
        active:scale-[0.98]
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >
      <span
        className="
          absolute
          left-[-120%]
          top-0
          h-full
          w-1/2
          rotate-12
          bg-white/20
          transition-all
          duration-700
          group-hover:left-[130%]
        "
      />

      <span className="relative flex items-center justify-center gap-3">
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={22} />
            Processing...
          </>
        ) : (
          <>
            <Sparkles size={22} />
            Process with AI
          </>
        )}
      </span>
    </button>
  );
}