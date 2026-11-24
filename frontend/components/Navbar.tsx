import Image from "next/image";

const links = [
  "Home",
  "Features",
  "Pricing",
  "About",
  "Contact",
];

export default function Navbar() {
  return (
    <div className="flex justify-center pt-6">
      <nav
        className="
          w-[92%]
          max-w-7xl
          rounded-[28px]
          border
          border-[#E8C97A]
          bg-[#FFF8ED]
          shadow-[0_18px_45px_rgba(201,155,43,0.18)]
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-[0_25px_60px_rgba(201,155,43,0.28)]
        "
      >
        <div className="flex h-[82px] items-center justify-between px-8">

          {/* Logo */}

          <div className="flex items-center gap-4">

            <Image
              src="/logo.jpeg"
              alt="Z Logo"
              width={54}
              height={54}
              className="
                rounded-2xl
                border
                border-[#E8C97A]
                shadow-md
              "
            />

            <div>

              <h1 className="text-[30px] font-bold tracking-tight text-[#1F1F1F]">
                Z on PhotoStudios
              </h1>

              <p className="text-sm text-[#666666]">
                AI for Indian Photo Studios
              </p>

            </div>

          </div>

          {/* Navigation */}

          <ul className="hidden lg:flex items-center gap-3">

            {links.map((link) => (
              <li key={link}>

                <a
                  href="#"
                  className="
                    group
                    relative
                    rounded-xl
                    px-4
                    py-2
                    font-medium
                    text-[#2E2E2E]
                    transition-all
                    duration-300
                    hover:bg-[#F7E7BE]
                    hover:text-[#B8860B]
                  "
                >
                  {link}

                  <span
                    className="
                      absolute
                      left-4
                      bottom-1
                      h-[2px]
                      w-0
                      rounded-full
                      bg-[#C89B2B]
                      transition-all
                      duration-300
                      group-hover:w-[calc(100%-32px)]
                    "
                  ></span>

                </a>

              </li>
            ))}

          </ul>

          {/* Button */}

          <button
            className="
              rounded-2xl
              bg-gradient-to-b
              from-[#D9AE3D]
              to-[#B8860B]
              px-8
              py-3
              font-semibold
              text-white
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-1
              hover:scale-105
              hover:shadow-[0_12px_30px_rgba(201,155,43,0.45)]
              active:scale-95
            "
          >
            Start Editing
          </button>

        </div>
      </nav>
    </div>
  );
}