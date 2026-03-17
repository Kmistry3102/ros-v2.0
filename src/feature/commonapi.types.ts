export type RequestStatus = "idle" | "loading" | "success" | "failed";

export interface OptionTypes {
  label: string;
  value: string;
}

export type ErrorTypes =  string | null;

export const projectDocPath = "https://d1d09q7vt7sqxk.cloudfront.net/projects/documents/"

export const displayName = (user: Record<string, unknown>) =>
  [user.firstName, user.lastName].filter(Boolean).join(" ").trim() || null;

export const mobileText = (user: Record<string, unknown>) =>
  [user.countryCode, user.phoneNumber].filter(Boolean).join(" ").trim() || null;

export interface CommonFormData {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  countryCodeName?: string;
}