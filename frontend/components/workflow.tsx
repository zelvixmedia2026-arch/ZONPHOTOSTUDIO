import {
  UploadCloud,
  Cpu,
  Download,
  ArrowDown,
} from "lucide-react";

const steps = [
  {
    icon: UploadCloud,
    title: "Upload Photos",
    description:
      "Upload one or multiple studio photos in seconds.",
  },
  {
    icon: Cpu,
    title: "AI Processing",
    description:
      "Our AI removes backgrounds, enhances faces and prepares layouts automatically.",
  },
  {
    icon: Download,
    title: "Download & Print",
    description:
      "Download print-ready passport and stamp-size sheets instantly.",
  },
];

export default function Workflow() {
  return (
    <section className="py-28 bg-[#FFF7EF]">

      <div className="mx-auto max-w-7xl px-8">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-yellow-100 px-5 py-2 text-sm font-semibold text-[#C89B2B]">
            ⚡ Simple Workflow
          </span>

          <h2 className="mt-6 text-5xl font-bold text-[#1F1F1F]">
            From Upload to Print in 3 Steps
          </h2>

          <p className="mt-5 text-lg text-gray-500">
            No Photoshop skills required. Just upload, let AI work, and download.
          </p>

        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-3">

          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative rounded-[30px] border border-[#E8D9AF] bg-white p-8 shadow-[0_15px_40px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_25px_60px_rgba(196,154,0,0.18)]"
            >

              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF3D6]">

                <step.icon
                  size={30}
                  className="text-[#C89B2B]"
                />

              </div>

              <div className="mb-4 flex items-center gap-3">

                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C89B2B] font-bold text-white">
                  {index + 1}
                </span>

                <h3 className="text-2xl font-bold">
                  {step.title}
                </h3>

              </div>

              <p className="leading-7 text-gray-500">
                {step.description}
              </p>

              {index !== steps.length - 1 && (
                <ArrowDown
                  className="absolute -bottom-8 left-1/2 hidden -translate-x-1/2 text-[#C89B2B] lg:hidden"
                  size={28}
                />
              )}

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}