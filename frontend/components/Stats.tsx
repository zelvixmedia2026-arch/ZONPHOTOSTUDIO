"use client";

import {
  ImageIcon,
  Building2,
  TimerReset,
  ShieldCheck,
} from "lucide-react";

const stats = [
  {
    icon: ImageIcon,
    value: "20K+",
    label: "Photos Processed",
  },
  {
    icon: Building2,
    value: "500+",
    label: "Photo Studios",
  },
  {
    icon: ShieldCheck,
    value: "95%",
    label: "AI Accuracy",
  },
  {
    icon: TimerReset,
    value: "<20s",
    label: "Average Processing",
  },
];

export default function Stats() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-8">

        {/* Heading */}

        <div className="mb-16 text-center">

          <span className="rounded-full bg-yellow-100 px-5 py-2 font-medium text-[#C89B2B]">
            Trusted by Studios
          </span>

          <h2 className="mt-5 text-5xl font-bold text-[#1F1F1F]">
            Numbers that Speak
          </h2>

          <p className="mt-4 text-lg text-gray-500">
            Built to save hours of manual Photoshop work.
          </p>

        </div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {stats.map((item) => (
            <div
              key={item.label}
              className="
              group
              rounded-3xl
              border
              border-[#E8D9AF]
              bg-white
              p-8
              shadow-[0_12px_35px_rgba(0,0,0,0.06)]
              transition-all
              duration-300
              hover:-translate-y-3
              hover:border-[#C89B2B]
              hover:shadow-[0_18px_45px_rgba(200,155,43,0.18)]
              "
            >

              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF3D6] transition group-hover:rotate-6 group-hover:scale-110">

                <item.icon
                  size={30}
                  className="text-[#C89B2B]"
                />

              </div>

              <h3 className="text-5xl font-extrabold text-[#1F1F1F]">
                {item.value}
              </h3>

              <p className="mt-3 text-gray-500">
                {item.label}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}