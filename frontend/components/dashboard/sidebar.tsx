"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  History,
  CreditCard,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    name: "Workspace",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "History",
    href: "/dashboard/history",
    icon: History,
  },
  {
    name: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-[#ECE6D7] bg-white">

      {/* Logo */}

      <div className="border-b border-[#ECE6D7] p-8">

        <h1 className="text-2xl font-extrabold text-[#C89B2B]">
          Z
        </h1>

        <p className="mt-2 text-lg font-semibold">
          Z on PhotoStudios
        </p>

        <p className="text-sm text-gray-500">
          AI for Indian Studios
        </p>

      </div>

      {/* Menu */}

      <nav className="flex-1 space-y-2 p-5">

        {menuItems.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
                active
                  ? "bg-[#C89B2B] text-white shadow-lg"
                  : "text-gray-600 hover:bg-[#FFF8ED] hover:text-[#C89B2B]"
              }`}
            >
              <Icon size={22} />

              <span className="font-medium">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}

      <div className="border-t border-[#ECE6D7] p-6">

        <div className="rounded-2xl bg-[#FFF8ED] p-5">

          <p className="font-semibold text-[#C89B2B]">
            🚀 AI Powered
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Built for Indian Photo Studios.
          </p>

        </div>

      </div>

    </aside>
  );
}