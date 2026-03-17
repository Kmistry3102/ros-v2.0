'use client';
import { HiMenuAlt4 } from "react-icons/hi";
import Image from "next/image";

export default function TopSidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void | boolean;
}) {
  return (
    <div
      className={`flex items-center transition-all duration-200 ${
        open ? "justify-between mb-2" : "flex-col gap-2 justify-center mb-1"
      }`}
    >
      {/* Brand pill */}
      <div
        className={`flex items-center py-1.5 ${
          open ? "gap-2" : "gap-0"
        }`}
      >
        <div className="flex items-center justify-center">
          <Image
            src="/r_logo_white.png"
            alt="R-OS logo"
            height={14}
            width={14}
            className="h-7 w-7 rounded-lg"
          />
        </div>
        {open && (
          <div className="flex flex-col pr-1">
            <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-gray-300">
              R‑OS
            </span>
            <span className="text-xs font-medium text-white">
              Real Estate OS
            </span>
          </div>
        )}
      </div>

      {/* Toggle */}
      <button
        type="button"
        aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
        onClick={() => setOpen(!open)}
        className={`flex items-center rounded-lg px-2 py-2 text-gray-300 hover:bg-white/10 hover:text-white ${
          open ? "hidden md:flex" : "flex"
        }`}
      >
        <HiMenuAlt4 className="h-4 w-4" />
      </button>
    </div>
  );
}