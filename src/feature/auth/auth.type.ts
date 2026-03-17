import { ErrorTypes, RequestStatus } from "../commonapi.types";

export interface BasicDetails {
    firstName: string;
    lastName: string;
    countryCode?: string;
    phoneNumber?: string;
    countryCodeName?: string;
    countryShortCode?: string;
    email: string;
}

export interface OTPData extends BasicDetails {
    otp?: string;
    accessToken?: string;
    isProfileSubmit?: boolean;
}

export interface AuthState {
    basicData: BasicDetails | null;
    basicStatus: RequestStatus;
    basicError: ErrorTypes;

    // Send Otp
    SendOtpStatus: RequestStatus;
    sendOtpError: ErrorTypes;

    // VerifyOtp
    verifyOtpData: OTPData | null;
    verifyOtpStatus: RequestStatus;
    verifyOtpError: ErrorTypes;

    SendEmailOtpStatus: RequestStatus;
    sendEmailOtpError: ErrorTypes;

    // VerifyOtp
    verifyEmailOtpData: OTPData | null;
    verifyEmailOtpStatus: RequestStatus;
    verifyEmailOtpError: ErrorTypes;

    // Resend Otp
    resendOtpStatus: RequestStatus,
    resendOtpError: ErrorTypes,

    user: OTPData | null;
}