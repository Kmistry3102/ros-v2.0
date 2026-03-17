"use client";

import clsx from "clsx";

interface StepIndicatorProps {
  totalSteps: number;
  currentStep: number; // 1-based
}

const StepIndicator = ({
  totalSteps,
  currentStep,
}: StepIndicatorProps) => {
  return (
    <div className="relative mt-14 mb-6">
      {/* Progress Bars */}
      <div className="flex w-full">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const barStep = index + 1;

          let widthClass = "w-0";

          if (currentStep === barStep) {
            widthClass = "w-1/2"; // ✅ current step
          } else if (currentStep > barStep) {
            widthClass = "w-full"; // ✅ completed step
          }

          return (
            <div key={barStep} className="relative flex-1 h-1 bg-gray-200">
              <div
                className={clsx(
                  "absolute left-0 top-0 h-full bg-black transition-all duration-300 ease-in-out",
                  widthClass
                )}
              />
            </div>
          );
        })}
      </div>

      {/* Step Circles */}
      <div className="absolute left-0 -top-8 grid w-full grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const step = index + 1;
          const isCompleted = step < currentStep;
          const isActive = step === currentStep;

          return (
            <div key={step} className="flex justify-start pl-5">
              <div
                className={clsx(
                  "w-7 h-7 flex items-center justify-center text-sm rounded transition-colors",
                  isCompleted || isActive
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-600"
                )}
              >
                {isCompleted ? "✓" : step}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
