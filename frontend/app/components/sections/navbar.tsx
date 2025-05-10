'use client';

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const linkStyle = (path: string) =>
    pathname === path
      ? "px-2 py-2 rounded-md bg-[#770737] text-[#FAF9F6]"
      : "px-2 py-2 rounded-md text-[#FAF9F6] hover:bg-[#770737] transition-all duration-100";

  return (
    <div className="top-0 w-full z-40 h-30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="text-lg font-bold text-[#FAF9F6]">FocusFlow</Link>

          {/* Mobile Menu Icon */}
          <div
            className="w-7 h-5 relative cursor-pointer z-50 md:hidden text-[#FAF9F6]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-5">
            <Link href="/" className={linkStyle("/")}>Home</Link>
            <Link href="/about" className={linkStyle("/about")}>About</Link>
            <Link href="/contact" className={linkStyle("/contact")}>Contact</Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden border-[1px] border-[#770737] rounded-md m-4 right-0 absolute backdrop-blur-sm p-2 space-y-4 text-center shadow-xl z-40">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className={linkStyle("/") + " block"}
          >
            Home
          </Link>
          
          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className={linkStyle("/about") + " block"}
          >
            About
          </Link>

          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className={linkStyle("/contact") + " block"}
          >
            Contact
          </Link>

        </div>
      )}
    </div>
  );
};

export default Navbar;
