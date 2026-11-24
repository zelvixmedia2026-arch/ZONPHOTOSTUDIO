import { Camera, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white">

      <div className="mx-auto max-w-7xl px-8 py-20">

        <div className="grid gap-14 md:grid-cols-4">

          {/* Brand */}

          <div>

            <div className="flex items-center gap-3">

              <Camera className="text-[#C89B2B]" />

              <h2 className="text-2xl font-bold">
                Z on PhotoStudios
              </h2>

            </div>

            <p className="mt-5 leading-7 text-gray-400">
              AI-powered photo editing platform built exclusively for Indian
              Photo Studios.
            </p>

          </div>

          {/* Product */}

          <div>

            <h3 className="text-lg font-semibold">
              Product
            </h3>

            <ul className="mt-5 space-y-3 text-gray-400">

              <li>Features</li>

              <li>Workflow</li>

              <li>Pricing</li>

              <li>FAQ</li>

            </ul>

          </div>

          {/* Company */}

          <div>

            <h3 className="text-lg font-semibold">
              Company
            </h3>

            <ul className="mt-5 space-y-3 text-gray-400">

              <li>The Z Group of Companies</li>

              <li>Privacy Policy</li>

              <li>Terms & Conditions</li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-lg font-semibold">
              Contact
            </h3>

            <div className="mt-5 flex items-center gap-3 text-gray-400">

              <Mail size={18} />

              support@zonphotostudios.com

            </div>

            <div className="mt-4 flex gap-4">

              

            </div>

          </div>

        </div>

        <div className="mt-16 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">

          © 2026 Z on PhotoStudios. All Rights Reserved.

        </div>

      </div>

    </footer>
  );
}