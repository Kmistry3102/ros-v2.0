"use client";

import { FormProvider } from "react-hook-form";
import { useEffect } from "react";
import { FiX } from "react-icons/fi";

import { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
// Form Modal Types
type ModalMode = "popup" | "direct";

interface FormModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children: ReactNode;
  onSubmit: (data: any) => void;
  mode?: ModalMode;
  className?: string;
  methods: UseFormReturn<any>;
  label?: string;
  showCloseButton?: boolean;
}

export default function FormModal({
  isOpen,
  onClose,
  onSubmit,
  mode = "popup",
  showCloseButton = true,
  children,
  className = "",
  methods,
  label,
}: FormModalProps) {
  const { handleSubmit } = methods;
  // Disable scroll when modal is open (only for popup mode)
  useEffect(() => {
    if (mode === "popup") {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    }
    return () => {
      if (mode === "popup") {
        document.body.style.overflow = "unset";
      }
    };
  }, [isOpen, mode]);

  // Only check isOpen for popup mode, direct mode always renders
  if (mode === "popup" && !isOpen) return null;

  // Popup mode
  if (mode === "popup") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
        {/* Background Overlay */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-xs"
          onClick={onClose}
        />

        {/* Modal Box: outer keeps rounded corners, inner scrolls */}
        <div
          className={`relative bg-white rounded-xl shadow-xl z-10 w-full animate-fadeIn max-h-[97vh] flex flex-col overflow-hidden ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="overflow-y-auto flex-1 min-h-0 p-4 lg:p-6">
            <div className="lg:mb-7 mb-4 flex items-center justify-between">
              {/* Close Button */}
              {label && <h2 className="lg:text-3xl text-2xl font-normal">{label}</h2>}
              {showCloseButton && onClose && (
                <button
                  onClick={onClose}
                  className="bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-colors"
                  aria-label="Close"
                >
                  <FiX className="w-5 h-5 text-black" />
                </button>
              )}
            </div>

            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:space-y-4 space-y-3.5"
              >
                {children}
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    );
  }

  // Direct mode
  return (
    <div
      className={`p-0 bg-white lg:rounded-xl lg:shadow-sm lg:p-8 ${className}`}
    >
      {/* Close Button */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {label && <h2 className="lg:text-3xl text-2xl font-normal">{label}</h2>}
          {children}
        </form>
      </FormProvider>
    </div>
  );
}
