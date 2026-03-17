'use client'

import { createSendEmailOtpRequest, createSendOtpRequest, resendOtpRequest, resetOtpState, setUser, verifyEmailOtpRequest, verifyOtpRequest } from "@/feature/auth/auth.slice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useOtpController } from "@/hooks/useOtpController";
import { RootState } from "@/store/rootReducer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { encryptOtpKey } from "@/lib/crypto/otp";

const OTP_LENGTH = 6
const RESEND_TIME = 60

export interface OtpProps {
    mobileNumber?: string;
    countryCode?: string;
    countryCodeName?: string;
    email?: string;
    onProfileRequired?: () => void;
}

const OtpInput = ({ mobileNumber, onProfileRequired, countryCode, countryCodeName, email }: OtpProps) => {

    const [timer, setTimer] = useState(RESEND_TIME);
    const [submitted, setSubmitted] = useState(false);
    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));

    const router = useRouter();
    const dispatch = useAppDispatch();
    const { verifyOtpError, verifyOtpData, verifyOtpStatus, basicData } = useAppSelector((state: RootState) => state.auth);
    const {
        inputsRef,
        handleChange,
        handleKeyDown,
        handlePaste,
    } = useOtpController(otp, setOtp, OTP_LENGTH);

    // Timer countdown
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleSubmit = () => {
        setSubmitted(true);

        if (!mobileNumber && !email) return;

        try {
            if (email) {
                const reqBody = {
                    otp: otp.join(""),
                    email: email,
                    sourceKey: encryptOtpKey(),
                }
                dispatch(verifyEmailOtpRequest(reqBody as any));
            } else {
                const reqBody = {
                    ...basicData,
                    otp: otp.join(""),
                    phoneNumber: mobileNumber,
                    countryCode: countryCode,
                    countryCodeName: countryCodeName,
                    sourceKey: encryptOtpKey(),
                };
                dispatch(verifyOtpRequest(reqBody as any));
            }

        } catch (error) {
            console.error(error);
        }
    };

    const isLoading = verifyOtpStatus === "loading";

    useEffect(() => {
        if (verifyOtpData && verifyOtpStatus === "success") {

            // store full response
            localStorage.setItem("user", JSON.stringify(verifyOtpData));

            // store in redux
            dispatch(setUser(verifyOtpData));

            if (verifyOtpData.isProfileSubmit) {
                dispatch(resetOtpState());
                router.push("/dashboard");
            } else {
                onProfileRequired?.();
            }
        }
    }, [verifyOtpData, verifyOtpStatus, dispatch, onProfileRequired, router]);

    const maskMobileNumber = (number?: string) => {
        if (!number) return "";

        if (number.length <= 5) {
            return number.replace(/\d(?=\d{2})/g, "*");
        }

        const start = number.slice(0, 2);
        const end = number.slice(-3);
        const masked = "*".repeat(number.length - 5);

        return `${start}${masked}${end}`;
    };

    // Resend OTP
    const handleResend = () => {

        if (!mobileNumber && !email) return;
        try {
            if (email) {
                const reqBody = {
                    email: email,
                    sourceKey: encryptOtpKey(),
                }
                dispatch(createSendEmailOtpRequest(reqBody));
            } else {
                const reqBody = {
                    phoneNumber: mobileNumber,
                    countryCode: countryCode,
                    countryCodeName: countryCodeName,
                    sourceKey: encryptOtpKey(),
                }
                dispatch(
                    resendOtpRequest(reqBody)
                )
            }
        } catch (error) {
            console.error(error)
        }
        setTimer(RESEND_TIME);
    };

    return (
        <>
            <div className="space-y-4 text-center">
                <p className="text-base text-gray-500">
                    Enter the 6-digit code sent to {email ? email : maskMobileNumber(mobileNumber)}
                </p>

                <div className="flex items-center justify-center gap-2">
                    {otp.map((digit, idx) => (
                        <input
                            key={idx}
                            type="text"
                            ref={(el) => {
                                inputsRef.current[idx] = el;
                            }}
                            maxLength={1}
                            value={digit}
                            onChange={(e) =>
                                handleChange(e.target.value, idx)
                            }
                            onPaste={handlePaste}
                            onKeyDown={(e) => handleKeyDown(e, idx)}
                            className="w-10 h-12 text-center 
                            text-lg font-normal
                            focus:outline-none
                            focus:ring-none rounded-lg lg:bg-gray-100"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                        />
                    ))}
                </div>

                {/* Resend Section */}
                <div className="text-sm text-gray-500">
                    {timer > 0 ? (
                        <p>Didn&apos;t receive the code? Resend in {timer}s</p>
                    ) : (
                        <button
                            onClick={handleResend}
                            className="font-medium text-black underline"
                        >
                            Resend OTP
                        </button>
                    )}
                </div>

            </div>

            {verifyOtpError && (
                <p className="text-sm text-red-500"> {verifyOtpError}</p>
            )}

            <Button
                label={isLoading ? "Verifying..." : "Verify OTP"}
                variant="filled"
                hasHref={false}
                disabled={otp.join("").length !== OTP_LENGTH}
                onClick={handleSubmit}
                className="w-full"
                type="button"
            />
        </>
    )
}

export default OtpInput