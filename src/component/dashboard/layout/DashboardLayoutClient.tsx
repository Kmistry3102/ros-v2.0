"use client";

import { useState } from "react";
import Sidebar from "./Left/Sidebar";
import Header from "./Header";

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-dvh flex-col text-gray-900">
      {/* Sticky top header */}
      <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/80 backdrop-blur">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </header>
      <div className="relative flex flex-1 min-h-0">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <main
          className={`flex-1 min-w-0 overflow-x-hidden overflow-y-auto py-4 pt-4 sm:py-6 px-8 transition-[margin] duration-200 ${sidebarOpen ? "md:ml-72" : "md:ml-16"
            }`}
        >
          <div className="h-full min-w-0">{children}</div>
        </main>
      </div>
    </div>
  );
}
