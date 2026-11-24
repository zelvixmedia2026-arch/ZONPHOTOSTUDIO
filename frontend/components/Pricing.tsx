import { Check } from "lucide-react";

const features = [
  "Unlimited AI Background Removal",
  "Unlimited Color Changes",
  "AI Face Enhancement",
  "Passport & Stamp Layout",
  "Batch Processing",
  "Priority Support",
];

export default function Pricing() {
  return (
    <section className="py-28 bg-white">
      <div className="mx-auto max-w-7xl px-8">

        <div className="text-center max-w-3xl mx-auto">

          <span className="rounded-full bg-yellow-100 px-5 py-2 text-sm font-semibold text-[#C89B2B]">
            💎 Pricing
          </span>

          <h2 className="mt-6 text-5xl font-bold text-[#1F1F1F]">
            Simple & Affordable
          </h2>

          <p className="mt-5 text-lg text-gray-500">
            One simple plan designed for every Indian photo studio.
          </p>

        </div>

        <div className="mt-20 flex justify-center">

          <div className="w-full max-w-md rounded-[32px] border border-[#E8D9AF] bg-white p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">

            <h3 className="text-3xl font-bold">
              Professional Plan
            </h3>

            <p className="mt-4 text-gray-500">
              Everything you need to automate your studio.
            </p>

            <div className="mt-8">
              <span className="text-6xl font-bold text-[#C89B2B]">
                ₹299
              </span>
              <span className="text-xl text-gray-500">
                /month
              </span>
            </div>

            <div className="mt-10 space-y-5">

              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3"
                >
                  <Check
                    className="text-[#C89B2B]"
                    size={20}
                  />

                  <span>{feature}</span>
                </div>
              ))}

            </div>

            <button className="mt-10 w-full rounded-xl bg-[#C89B2B] py-4 font-semibold text-white transition hover:scale-105">
              Start Free Trial
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}