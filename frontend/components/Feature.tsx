import {
  ImageIcon,
  Palette,
  ScanFace,
  Printer,
  FolderOpen,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: ImageIcon,
    title: "AI Background Removal",
    description:
      "Remove backgrounds automatically with studio-grade precision.",
  },
  {
    icon: Palette,
    title: "Background Color Change",
    description:
      "Switch to white, blue, red, green or custom colors instantly.",
  },
  {
    icon: ScanFace,
    title: "AI Face Enhancement",
    description:
      "Improve lighting, sharpness and facial clarity in seconds.",
  },
  {
    icon: Printer,
    title: "Passport Print Layout",
    description:
      "Generate print-ready passport and stamp-size sheets automatically.",
  },
  {
    icon: FolderOpen,
    title: "Batch Processing",
    description:
      "Upload multiple photos and edit them all at once.",
  },
  {
    icon: Zap,
    title: "Ultra Fast Processing",
    description:
      "Complete edits in under 20 seconds with AI automation.",
  },
];

export default function Features() {
  return (
    <section className="py-28 bg-[#FFFDF8]">

      <div className="mx-auto max-w-7xl px-8">

        {/* Heading */}

        <div className="mx-auto mb-20 max-w-3xl text-center">

          <span className="rounded-full bg-yellow-100 px-5 py-2 text-sm font-semibold text-[#C89B2B]">
            ✨ Powerful AI Features
          </span>

          <h2 className="mt-6 text-5xl font-bold text-[#1F1F1F]">
            Everything a Photo Studio Needs
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-500">
            Built specifically for Indian photo studios to reduce manual
            Photoshop work and increase productivity.
          </p>

        </div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="
                group
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-[#E8D9AF]
                bg-white
                p-8
                shadow-[0_15px_40px_rgba(0,0,0,0.05)]
                transition-all
                duration-300
                hover:-translate-y-3
                hover:border-[#C89B2B]
                hover:shadow-[0_25px_55px_rgba(196,154,0,0.18)]
              "
            >

              {/* Gold Line */}

              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#E7C75F] to-[#C89B2B]" />

              {/* Icon */}

              <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF5DB] transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">

                <feature.icon
                  size={30}
                  className="text-[#C89B2B]"
                />

              </div>

              <h3 className="text-2xl font-bold text-[#1F1F1F]">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-500">
                {feature.description}
              </p>

              <button className="mt-8 font-semibold text-[#C89B2B] transition group-hover:translate-x-2">
                Learn More →
              </button>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}