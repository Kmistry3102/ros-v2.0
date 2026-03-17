"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  pageSize?: number;
  className?: string;
  disabled?: boolean;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  totalItems,
  pageSize = 10,
  className,
  disabled = false,
}: PaginationProps) {
  const [inputValue, setInputValue] = useState(String(page));

  useEffect(() => {
    setInputValue(String(page));
  }, [page]);

  const canPrev = page > 1;
  const canNext = page < totalPages;

  const from =
    totalItems != null && totalItems > 0 ? (page - 1) * pageSize + 1 : null;
  const to =
    totalItems != null && totalItems > 0
      ? Math.min(page * pageSize, totalItems)
      : null;

  const goToPage = (value: string) => {
    const num = parseInt(value, 10);
    if (Number.isNaN(num) || num < 1 || num > totalPages) {
      setInputValue(String(page));
      return;
    }
    if (num !== page) onPageChange(num);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  if (totalPages <= 1) return null;

  return (
    <nav
      className={clsx(
        "flex flex-wrap items-center justify-between gap-3 text-sm fixed lg:relative bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200",
        className
      )}
      aria-label="Pagination"
    >
      <span
        className="flex items-center gap-1.5 text-gray-600"
        aria-live="polite"
      >
        Page
        <input
          type="number"
          min={1}
          max={totalPages}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={() => goToPage(inputValue)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-label="Current page"
          className={clsx(
            "w-11 rounded border border-gray-200 bg-white px-1.5 py-0.5 text-center text-sm font-medium text-gray-900",
            "focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 disabled:opacity-50",
            "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          )}
        />
        of {totalPages.toLocaleString()}
        {from != null && to != null && totalItems != null && (
          <span className="ml-2 rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-500 tabular-nums">
            {from.toLocaleString()} – {to.toLocaleString()} of {totalItems.toLocaleString()}
          </span>
        )}
      </span>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => canPrev && !disabled && onPageChange(page - 1)}
          disabled={disabled || !canPrev}
          aria-label="Previous page"
          className={clsx(
            "inline-flex items-center gap-1 text-gray-600 transition hover:text-gray-900 disabled:opacity-40 disabled:pointer-events-none"
          )}
        >
          <HiChevronLeft className="h-4 w-4" />
          Previous
        </button>
        <button
          type="button"
          onClick={() => canNext && !disabled && onPageChange(page + 1)}
          disabled={disabled || !canNext}
          aria-label="Next page"
          className={clsx(
            "inline-flex items-center gap-1 text-gray-600 transition hover:text-gray-900 disabled:opacity-40 disabled:pointer-events-none"
          )}
        >
          Next
          <HiChevronRight className="h-4 w-4" />
        </button>
      </div>
    </nav>
  );
}
