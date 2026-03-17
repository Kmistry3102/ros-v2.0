"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menu } from "@/lib/constant/SidebarConstant";
import SidebarTooltip from "@/component/ui/dashboard/SidebarTooltip";

export default function SidebarLinks({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen?: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + "/");

  const closeSidebarOnMobile = () => {
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches) {
      setOpen?.(false);
    }
  };

  return (
    <nav className="space-y-4">
      {menu.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={closeSidebarOnMobile}
            className={`group relative flex items-center rounded-xl ${
              open ? "px-3 py-2.5" : "px-2 py-2"
            } text-sm tracking-tight transition-colors ${
              active
                ? "bg-white/10 text-white"
                : "text-gray-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            {active && (
              <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-white" />
            )}

            <item.icon
              className={`h-5 w-5 ${
                active ? "text-white" : "text-gray-300 group-hover:text-white"
              }`}
            />

            {open && <span className="ml-3 truncate">{item.name}</span>}

            <SidebarTooltip show={!open}>{item.name}</SidebarTooltip>
          </Link>
        );
      })}
    </nav>
  );
}