"use client";

export type DashboardRange = "Today" | "7_Days" | "30_Days" | "90_Days" | "ALL";

const RANGES: { label: string; value: DashboardRange }[] = [
  { label: "Today", value: "Today" },
  { label: "7 Days", value: "7_Days" },
  { label: "30 Days", value: "30_Days" },
  { label: "90 Days", value: "90_Days" },
  { label: "ALL", value: "ALL" },
];

interface RangeTabsProps {
  value: DashboardRange;
  onChange: (value: DashboardRange) => void;
}

export function RangeTabs({ value, onChange }: RangeTabsProps) {
  return (
    <div className="inline-flex items-center justify-center rounded-lg bg-gray-100 p-1.5 text-xs font-medium text-gray-600 shadow-inner">
      {RANGES.map((range) => {
        const isActive = range.value === value;

        return (
          <button
            key={range.value}
            type="button"
            onClick={() => onChange(range.value)}
            className={`relative rounded-lg px-3 py-2 transition-all ${isActive
                ? "bg-gray-900 text-gray-50"
                : "text-gray-600 hover:bg-white/70 hover:text-gray-900"
              }`}
          >
            {range.label}
          </button>
        );
      })}
    </div>
  );
}

