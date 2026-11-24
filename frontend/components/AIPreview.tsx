import Image from "next/image";
import { Sparkles, CheckCircle2 } from "lucide-react";

export default function AIPreview() {
  return (
    <div className="relative">

      {/* Glow */}

      <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-r from-yellow-300/30 to-yellow-500/20 blur-3xl"></div>

      <div className="relative rounded-[32px] border border-[#E9D8A6] bg-white p-6 shadow-[0_30px_80px_rgba(0,0,0,0.12)]">

        {/* Header */}

        <div className="mb-6 flex items-center justify-between">

          <div>
            <h3 className="text-xl font-bold text-[#1F1F1F]">
              AI Preview
            </h3>

            <p className="text-sm text-gray-500">
              Before → After
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-700">
            <Sparkles size={16} />
            AI Enhanced
          </div>

        </div>

        {/* Images */}

        <div className="grid grid-cols-2 gap-5">

          {/* Before */}

          <div>

            <p className="mb-3 text-center font-semibold">
              Before
            </p>

            <div className="overflow-hidden rounded-2xl border shadow-md">

              <Image
                src="/before.jpg"
                alt="Before"
                width={350}
                height={450}
                className="h-[320px] w-full object-cover transition duration-500 hover:scale-105"
              />

            </div>

          </div>

          {/* After */}

          <div>

            <p className="mb-3 text-center font-semibold text-[#C89B2B]">
              After
            </p>

            <div className="overflow-hidden rounded-2xl border-2 border-[#C89B2B] shadow-xl">

              <Image
                src="/after.jpg"
                alt="After"
                width={350}
                height={450}
                className="h-[320px] w-full object-cover transition duration-500 hover:scale-105"
              />

            </div>

          </div>

        </div>

        {/* Features */}

        <div className="mt-7 grid grid-cols-3 gap-3">

          <div className="flex items-center gap-2 rounded-xl bg-green-50 p-3">
            <CheckCircle2 className="text-green-600" size={18} />
            <span className="text-sm font-medium">
              Background Removed
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-blue-50 p-3">
            <CheckCircle2 className="text-blue-600" size={18} />
            <span className="text-sm font-medium">
              Face Enhanced
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-yellow-50 p-3">
            <CheckCircle2 className="text-yellow-700" size={18} />
            <span className="text-sm font-medium">
              Passport Ready
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}