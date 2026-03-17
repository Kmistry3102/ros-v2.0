type SidebarTooltipProps = {
  show: boolean;
  children: React.ReactNode;
  className?: string;
};

export default function SidebarTooltip({
  show,
  children,
  className = "",
}: SidebarTooltipProps) {
  if (!show) return null;

  return (
    <span
      className={`pointer-events-none absolute left-11 top-1/2 z-10 -translate-y-1/2 rounded-md bg-slate-900 px-2 py-1 text-xs text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100 ${className}`}
    >
      {children}
    </span>
  );
}

