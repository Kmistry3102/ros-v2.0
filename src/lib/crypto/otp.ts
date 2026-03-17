import { encryptText, generateKey } from "./core";

// For land source key encryption
const OTP_DEFAULT_KEY = process.env.NEXT_PUBLIC_OTP_DEFAULT_KEY || "";
const otpKey = generateKey(OTP_DEFAULT_KEY);

export const encryptOtpKey = (): string =>
  encryptText(process.env.NEXT_PUBLIC_OTP_DEFAULT_TEXT || "", otpKey);
