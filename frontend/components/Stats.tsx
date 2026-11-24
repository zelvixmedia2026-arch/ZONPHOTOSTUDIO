"use client";

import { Image as ImageIcon, Building2, ShieldCheck, Timer } from "lucide-react";

export default function Stats() {
  const stats = [
    {
      icon: <ImageIcon size={28} className="text-[#C89B2B]" />,
      value: "100",
      label: "Photos Processed",
    },
    {
      icon: <Building2 size={28} className="text-[#C89B2B]" />,
      value: "10",
      label: "Photo Studios",
    },
    {
      icon: <ShieldCheck size={28} className="text-[#C89B2B]" />,
      value: "98%",
      label: "AI Accuracy",
    },
    {
      icon: <Timer size={28} className="text-[#C89B2B]" />,
      value: "<20s",
      label: "Average Processing",
    },
  ];

  return (
    <section className="py-24 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#C89B2B]/10 text-[#C89B2B] font-medium text-sm mb-6">
            Trusted by Studios
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Numbers that Speak
          </h2>
          <p className="text-lg text-gray-500">
            Built to save hours of manual Photoshop work.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-14 w-14 rounded-2xl bg-[#FDFBF7] flex items-center justify-center mb-6 border border-[#C89B2B]/10">
                {stat.icon}
              </div>
              <div className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-gray-500 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}