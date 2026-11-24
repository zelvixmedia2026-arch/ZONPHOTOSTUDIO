import Link from "next/link";

export default function Hero() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#f8f2e8] via-[#f5efe3] to-white">
      <div className="mx-auto grid max-w-7xl items-center gap-20 px-8 lg:grid-cols-2">

        {/* LEFT SIDE */}

        <div className="max-w-xl">

          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            ✨ AI Powered • Built for Indian Photo Studios
          </span>

          <h1 className="mt-8 text-6xl font-extrabold leading-tight text-black">
            Transform Studio Photos
            <br />
            with{" "}
            <span className="text-[#C89B2B]">
              AI in Seconds
            </span>
          </h1>

          <p className="mt-8 text-lg leading-8 text-gray-600">
            Automatically remove backgrounds, enhance faces, replace
            background colors, generate passport and stamp-size print
            layouts, and download everything ready for printing.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">

            <Link
              href="/dashboard"
              className="rounded-xl bg-[#C89B2B] px-8 py-4 font-semibold text-white shadow-xl transition duration-300 hover:-translate-y-1 hover:scale-105"
            >
              Get Started Free
            </Link>

            <button className="rounded-xl border border-[#C89B2B] px-8 py-4 font-semibold text-[#C89B2B] transition duration-300 hover:bg-yellow-50">
              Watch Demo
            </button>

          </div>

          <div className="mt-12 flex flex-wrap gap-8 text-sm font-medium text-gray-700">

            <span>⚡ Under 20 Seconds</span>

            <span>📄 Print Ready Layouts</span>

            <span>🎯 95%+ AI Accuracy</span>

            <span>🇮🇳 Made for Indian Studios</span>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="flex justify-center">

          <div className="relative w-full max-w-[520px]">

            <div className="absolute -inset-6 rounded-full bg-yellow-300/20 blur-3xl"></div>

            <div className="relative rounded-[32px] border border-[#E8D9AF] bg-white p-8 shadow-[0_25px_70px_rgba(0,0,0,0.08)]">

              <div className="text-center">

                <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-[#C89B2B]">
                  🚀 AI Workspace
                </span>

                <h2 className="mt-5 text-3xl font-bold text-[#1F1F1F]">
                  One Platform.
                  <br />
                  Complete Studio Workflow.
                </h2>

                <p className="mt-3 text-gray-500">
                  Upload • Process • Download
                </p>

              </div>

              <div className="mt-8 space-y-4">

                <div className="rounded-2xl bg-[#FFF8ED] p-5 transition hover:shadow-lg">
                  <h3 className="text-lg font-semibold">
                    🖼️ AI Background Removal
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Studio-quality cutouts with one click.
                  </p>
                </div>

                <div className="rounded-2xl bg-[#FFF8ED] p-5 transition hover:shadow-lg">
                  <h3 className="text-lg font-semibold">
                    🎨 Background Color Replacement
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    White, Blue, Red & Yellow backgrounds instantly.
                  </p>
                </div>

                <div className="rounded-2xl bg-[#FFF8ED] p-5 transition hover:shadow-lg">
                  <h3 className="text-lg font-semibold">
                    😊 AI Face Enhancement
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Sharper, brighter and professional-quality portraits.
                  </p>
                </div>

                <div className="rounded-2xl bg-[#FFF8ED] p-5 transition hover:shadow-lg">
                  <h3 className="text-lg font-semibold">
                    🖨️ Automatic Print Layout
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Generate 4, 6, 8 or custom passport & stamp layouts.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}