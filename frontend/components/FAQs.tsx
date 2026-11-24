"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How long does AI processing take?",
    answer:
      "Most photos are processed in under 20 seconds depending on image size.",
  },
  {
    question: "Can I upload multiple photos at once?",
    answer:
      "Yes. Batch processing allows you to upload and edit multiple photos together.",
  },
  {
    question: "Do I need Photoshop?",
    answer:
      "No. Z on PhotoStudios automates the editing process without requiring Photoshop.",
  },
  {
    question: "Can I create passport and stamp photos?",
    answer:
      "Yes. AI automatically creates print-ready passport and stamp-size layouts.",
  },
  {
    question: "Which background colors are supported?",
    answer:
      "White, blue, red, green and custom background colors are supported.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-[#FFFDF8] py-28">
      <div className="mx-auto max-w-5xl px-8">

        <div className="text-center">

          <span className="rounded-full bg-yellow-100 px-5 py-2 text-sm font-semibold text-[#C89B2B]">
            ❓ FAQ
          </span>

          <h2 className="mt-6 text-5xl font-bold text-[#1F1F1F]">
            Frequently Asked Questions
          </h2>

          <p className="mt-5 text-lg text-gray-500">
            Everything you need to know before getting started.
          </p>

        </div>

        <div className="mt-16 space-y-5">

          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-[#E8D9AF] bg-white shadow-sm"
            >
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-semibold">
                  {faq.question}
                </span>

                <ChevronDown
                  className={`transition-transform ${
                    open === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open === index && (
                <div className="px-6 pb-6 text-gray-600 leading-7">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}