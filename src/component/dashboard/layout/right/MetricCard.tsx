"use client";

import { ReactNode, useEffect, useState } from "react";

export interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: string;
  icon?: ReactNode;
  currentSeries?: number[];
  previousSeries?: number[];
}

export function MetricCard({
  label,
  value,
  trend,
  icon,
  currentSeries,
  previousSeries,
}: MetricCardProps) {
  const isNegative = trend?.trim().startsWith("-");
  const [dashOffset, setDashOffset] = useState(200);

  useEffect(() => {
    if (!currentSeries && !previousSeries) return;

    // reset, then animate to 0 once data is available
    setDashOffset(200);
    const timer = setTimeout(() => {
      setDashOffset(0);
    }, 50);

    return () => clearTimeout(timer);
  }, [currentSeries, previousSeries]);

  const buildPath = (series?: number[]) => {
    if (!series || series.length === 0) return "";

    const max = Math.max(...series, 1);
    const stepX = series.length > 1 ? 100 / (series.length - 1) : 100;
    const height = 26;

    return series
      .map((v, i) => {
        const x = i * stepX;
        const y = height - (v / max) * height;

        return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(" ");
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gray-300">

      {/* Header */}
      <div className="flex items-start justify-between px-5 pt-4 pb-2">
        <p className="text-sm font-semibold text-gray-900">
          {label}
        </p>

        {icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-600 ring-1 ring-slate-200 transition-all duration-300 group-hover:bg-white group-hover:shadow">
            {icon}
          </div>
        )}
      </div>

      {trend && (
        <span
          className={`absolute right-4 top-4 items-center text-sm font-medium ${isNegative
            ? " text-rose-600"
            : " text-emerald-600"
            }`}
        >
          {trend}
        </span>
      )}

      {/* Value + trend */}
      <div className="flex flex-col items-start justify-center px-5 pb-3">
        <p className="text-3xl font-bold text-gray-900">
          {value}
        </p>


      </div>

      {/* Graph */}
      {(currentSeries && previousSeries) && (
        <div className="px-5 pb-4 pt-2">
          <div className="relative">

            <svg
              viewBox="0 0 100 26"
              preserveAspectRatio="none"
              className="h-10  w-full overflow-visible"
            >
              {/* Previous Series */}
              {previousSeries && (
                <path
                  d={buildPath(previousSeries)}
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  strokeDasharray="200"
                  strokeDashoffset={dashOffset}
                  style={{ transition: "stroke-dashoffset 2s ease-out" }}
                  className="opacity-80 group-hover:opacity-80 group-hover:-translate-y-px"
                />
              )}

              {/* Current Series */}
              {currentSeries && (
                <path
                  d={buildPath(currentSeries)}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeDasharray="200"
                  strokeDashoffset={dashOffset}
                  style={{ transition: "stroke-dashoffset 2s ease-out" }}
                />
              )}
            </svg>

          </div>
        </div>
      )}
    </div>
  );
}