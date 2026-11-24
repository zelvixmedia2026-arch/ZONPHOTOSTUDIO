"use client";

import { Camera, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] pt-20 pb-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand & Socials */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Camera className="text-[#C89B2B]" size={28} />
              <span className="text-xl font-bold text-white tracking-tight">
                Z on PhotoStudios
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 pr-4">
              AI-powered photo editing platform built exclusively for Indian Photo Studios. Save hours of manual work and deliver studio-quality results instantly.
            </p>
            
            {/* Social Icons (Custom SVGs to prevent errors) */}
            <div className="flex items-center gap-4">
              {/* Instagram */}
              <a href="#" className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#C89B2B] transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              {/* X (Twitter) */}
              <a href="#" className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#C89B2B] transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
              </a>
              {/* Facebook */}
              <a href="#" className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#C89B2B] transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              {/* WhatsApp */}
              <a href="#" className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#C89B2B] transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Product Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg tracking-wide">Product</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-gray-400 hover:text-[#C89B2B] transition-colors text-sm font-medium">Features</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-[#C89B2B] transition-colors text-sm font-medium">Workflow</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-[#C89B2B] transition-colors text-sm font-medium">Pricing</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-[#C89B2B] transition-colors text-sm font-medium">FAQ</Link></li>
            </ul>
          </div>

          {/* Column 3: Company Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg tracking-wide">Company</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-gray-400 hover:text-[#C89B2B] transition-colors text-sm font-medium">The Z Group of Companies</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-[#C89B2B] transition-colors text-sm font-medium">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-[#C89B2B] transition-colors text-sm font-medium">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg tracking-wide">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:support@zonphotostudios.com" className="flex items-center gap-3 text-gray-400 hover:text-[#C89B2B] transition-colors text-sm font-medium">
                  <Mail size={16} className="text-[#C89B2B]" />
                  support@zonphotostudios.com
                </a>
              </li>
              <li>
                <a href="tel:+919663808209" className="flex items-center gap-3 text-gray-400 hover:text-[#C89B2B] transition-colors text-sm font-medium">
                  <Phone size={16} className="text-[#C89B2B]" />
                  +91 96638 08209
                </a>
              </li>
              <li>
                <a href="https://wa.me/919663808209" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-[#C89B2B] transition-colors text-sm font-medium">
                  <svg width="16" height="16" className="text-[#C89B2B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                  WhatsApp Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Credits */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm font-medium text-center md:text-left">
            © {new Date().getFullYear()} Z on PhotoStudios. All Rights Reserved.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-sm">
            <p className="text-gray-500 font-medium">
              Designed by <span className="text-[#C89B2B] font-bold tracking-wide">ZELVIX MEDIA</span>
            </p>
            <span className="hidden sm:block text-gray-700">|</span>
            <p className="text-gray-500 font-medium">
              Developed by <span className="text-white font-bold tracking-wide">THE Z TECHNOLOGIES</span>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}