"use client";

import { Sparkles, CheckCircle2 } from "lucide-react";

// Safe placeholder images from the internet
const PLACEHOLDER_BEFORE = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800";
const PLACEHOLDER_AFTER = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800"; 

export default function BeforeAfter() {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">AI Preview</h2>
          <p className="text-sm text-gray-500 mt-1">Before → After</p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-[#C89B2B]/10 px-4 py-2 text-sm font-semibold text-[#C89B2B]">
          <Sparkles size={16} />
          AI Enhanced
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* BEFORE BOX */}
        <div className="space-y-3">
          <p className="text-center font-bold text-gray-800">Before</p>
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 flex items-center justify-center">
            <img
              src={PLACEHOLDER_BEFORE}
              alt="Original"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* AFTER BOX */}
        <div className="space-y-3">
          <p className="text-center font-bold text-[#C89B2B]">After</p>
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border-2 border-[#C89B2B]/30 bg-gray-50 flex items-center justify-center">
            {/* Replace this URL later with an actual background-removed image if you want */}
            <img
              src={PLACEHOLDER_AFTER}
              alt="AI Result"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* BOTTOM PILLS */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="flex items-center justify-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          <CheckCircle2 size={16} /> Background Removed
        </div>
        <div className="flex items-center justify-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
          <CheckCircle2 size={16} /> Face Enhanced
        </div>
        <div className="flex items-center justify-center gap-2 rounded-xl bg-yellow-50 px-4 py-3 text-sm font-medium text-yellow-700">
          <CheckCircle2 size={16} /> Passport Ready
        </div>
      </div>
    </div>
  );
}