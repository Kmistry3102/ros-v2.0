"use client";

import { useState } from "react";
import TopSidebar from "./TopSidebar";
import SidebarLinks from "./SidebarLinks";
import BottomSidebar from "./BottomSidebar";

type SidebarProps = {
  open?: boolean;
  setOpen?: (open: boolean) => void;
};

export default function Sidebar({ open: controlledOpen, setOpen: controlledSetOpen }: SidebarProps = {}) {
  const [internalOpen, setInternalOpen] = useState(true);
  const isControlled = controlledSetOpen != null;
  const open = isControlled ? (controlledOpen ?? true) : internalOpen;
  const setOpen = isControlled ? controlledSetOpen : setInternalOpen;

  return (
    <>
      {/* Mobile: backdrop when sidebar open */}
      <div
        className={`fixed inset-0 top-16 z-20 bg-black/50 md:hidden transition-opacity duration-300 ease-out ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`
          fixed left-0 top-16 z-30 h-[calc(100dvh-4rem)] flex flex-col border-r border-gray-900 bg-black py-4 text-white
          w-72 pl-8 pr-4
          transition-[transform,width,padding] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          ${open ? "md:w-72 md:pl-8 md:pr-4" : "md:w-16 md:items-center md:px-1"}
        `}
      >
      <TopSidebar open={open} setOpen={setOpen} />

      {/* Scrollable links area */}
      <div className={`mt-2 mb-3 min-h-0 overflow-y-auto custom-scrollbar ${!open && "ml-3"}`}>
        <SidebarLinks open={open} setOpen={setOpen} />
      </div>

      <BottomSidebar open={open} />
    </aside>
    </>
  );
}