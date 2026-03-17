'use client'
import { useRef } from "react";

export const useOtpController = (
  otp: string[],
  setOtp: React.Dispatch<React.SetStateAction<string[]>>,
  OTP_LENGTH: number
) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, idx: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);

    if (value && idx < OTP_LENGTH - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData
      .getData("text")
      .slice(0, OTP_LENGTH);

    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = pasteData.split("");

    setOtp([
      ...newOtp,
      ...Array(OTP_LENGTH - newOtp.length).fill(""),
    ]);

    newOtp.forEach((_, i) => {
      inputsRef.current[i]?.focus();
    });
  };

  return {
    inputsRef,
    handleChange,
    handleKeyDown,
    handlePaste,
  };
};