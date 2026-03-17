"use client";

import { useRef } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const ACCENT_COLORS = [
  "border-l-violet-500 bg-violet-50/60",
  "border-l-amber-500 bg-amber-50/60",
  "border-l-emerald-500 bg-emerald-50/60",
  "border-l-sky-500 bg-sky-50/60",
  "border-l-rose-500 bg-rose-50/60",
  "border-l-indigo-500 bg-indigo-50/60",
  "border-l-teal-500 bg-teal-50/60",
  "border-l-purple-500 bg-purple-50/60",
  "border-l-pink-500 bg-pink-50/60",
  "border-l-gray-500 bg-gray-50/60",
  "border-l-blue-500 bg-blue-50/60",
  "border-l-green-500 bg-green-50/60",
  "border-l-yellow-500 bg-yellow-50/60",
  "border-l-orange-500 bg-orange-50/60",
];

export function PeopleAnalyticsStrip({
  title,
  items,
}: {
  title: string;
  items?: { label: string; value: number | string }[];
}) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="min-w-0 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center gap-0.5">
          <button
            ref={prevRef}
            type="button"
            className="people-analytics-prev flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50 hover:border-gray-300 [&.swiper-button-disabled]:opacity-40 [&.swiper-button-disabled]:pointer-events-none"
            aria-label="Scroll left"
          >
            <HiChevronLeft className="h-5 w-5" />
          </button>
          <button
            ref={nextRef}
            type="button"
            className="people-analytics-next flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50 hover:border-gray-300 [&.swiper-button-disabled]:opacity-40 [&.swiper-button-disabled]:pointer-events-none"
            aria-label="Scroll right"
          >
            <HiChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={12}
        slidesPerView="auto"
        speed={280}
        onInit={(swiper) => {
          if (prevRef.current && nextRef.current && swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }
        }}
        breakpoints={{
          0: { slidesPerGroup: 1 },
          640: { slidesPerGroup: 2 },
          1024: { slidesPerGroup: 3 },
        }}
      >
        {items && items.map((item, i) => (
          <SwiperSlide
            key={`${item.label}-${i}`}
            className="!flex-shrink-0 !w-[200px]"
          >
            <div
              className={`rounded-xl border border-gray-200/80 border-l-2 px-4 py-3 transition hover:shadow-md ${ACCENT_COLORS[i % ACCENT_COLORS.length]}`}
            >
              <p className="text-xs font-medium text-gray-600">{item.label}</p>
              <p className="mt-1 text-xl font-bold tabular-nums text-gray-900">
                {item.value}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
