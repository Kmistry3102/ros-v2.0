"use client";

import { ReactNode } from "react";

export function DashboardShell({
  title,
  subtitle,
  right,
  children,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4 ">
        <div className="space-y-1">
          <p className="text-2xl font-semibold text-gray-900">
            {title}
          </p>
          {subtitle && (
            <p className="text-sm text-gray-500">
              {subtitle}
            </p>
          )}
        </div>
        {right}
      </div>

      <div className="space-y-8">{children}</div>
    </div>
  );
}

