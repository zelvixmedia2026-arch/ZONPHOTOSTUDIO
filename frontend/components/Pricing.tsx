"use client";

import { Check, Zap, Crown, Building2 } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for freelancers and small setups.",
      price: "99",
      icon: <Zap size={20} className="text-gray-600" />,
      features: [
        "100 AI Background Removals / mo",
        "Standard Color Changes",
        "Standard Processing Speed",
        "Email Support",
      ],
      buttonText: "Start Free Trial",
      popular: false,
    },
    {
      name: "Professional",
      description: "Everything you need to automate your studio.",
      price: "299",
      icon: <Crown size={20} className="text-[#C89B2B]" />,
      features: [
        "Unlimited AI Background Removal",
        "Unlimited Color Changes",
        "AI Face Enhancement",
        "Passport & Stamp Layout",
        "Batch Processing",
        "Priority Support",
      ],
      buttonText: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For high-volume photo studios and franchises.",
      price: "799",
      icon: <Building2 size={20} className="text-gray-600" />,
      features: [
        "Everything in Professional",
        "Unlimited Team Members",
        "API Access for automation",
        "Dedicated Account Manager",
        "Custom AI Model Training",
      ],
      buttonText: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C89B2B]/10 text-[#C89B2B] font-medium text-sm mb-6">
            💎 Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Simple & Affordable
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            One simple plan designed for every Indian photo studio.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-[2rem] p-8 transition-all duration-300 ${
                plan.popular
                  ? "bg-white border-2 border-[#C89B2B] shadow-2xl md:scale-105 z-10"
                  : "bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#C89B2B] text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide shadow-md">
                  MOST POPULAR
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-xl ${plan.popular ? 'bg-[#C89B2B]/10' : 'bg-gray-50'}`}>
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
              </div>

              <p className="text-gray-500 text-sm mb-6 min-h-[40px]">
                {plan.description}
              </p>

              <div className="flex items-end gap-1 mb-8">
                <span className={`text-5xl font-extrabold ${plan.popular ? 'text-[#C89B2B]' : 'text-gray-900'}`}>
                  ₹{plan.price}
                </span>
                <span className="text-gray-500 font-medium mb-1">/month</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={18} className={`shrink-0 mt-0.5 ${plan.popular ? 'text-[#C89B2B]' : 'text-gray-400'}`} />
                    <span className="text-gray-700 text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  plan.popular
                    ? "bg-[#C89B2B] text-white hover:bg-[#b08720] shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    : "bg-gray-50 text-gray-900 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}