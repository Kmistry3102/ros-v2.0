"use client";

import { useEffect, useState } from "react";
import { getUser } from "@/utils/auth";
import { HiMenuAlt4 } from "react-icons/hi";

export default function Header( { sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean, setSidebarOpen: (open: boolean) => void } ) {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const u = getUser();
    setUser(u);
  }, []);

  const initials = `${user?.firstName?.charAt(0) ?? ""}${user?.lastName?.charAt(0) ?? ""
    }`.toUpperCase();

  return (
    <div className="flex h-16 items-center px-8">
      {/* Left: product + page */}
      <div className="flex-col lg:flex hidden">
        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-gray-400">
          R‑OS Dashboard
        </span>
        {user?.firstName && user?.lastName && (
          <h1 className="text-base font-semibold text-gray-900 sm:text-lg">
            Welcome back, {user?.firstName} {user?.lastName}
          </h1>
        )}
      </div>

      <button className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <HiMenuAlt4 className="h-6 w-6 text-gray-400" />
      </button>

      {/* Right: user pill */}
      <div className="ml-auto flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-[11px] text-gray-500">
            {Array.isArray(user?.userRoles)
              ? user?.userRoles?.join(", ")
              : user?.userRoles}
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
          {initials}
        </div>
      </div>
    </div>
  );
}