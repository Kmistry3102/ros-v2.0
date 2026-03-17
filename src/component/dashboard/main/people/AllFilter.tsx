"use client";

import FilterSelect, { OptionType } from "@/component/ui/FilterSelect";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { fetchUsersListRequest } from "@/feature/admin/users/users.slice";
import Button from "@/component/ui/Button";
import { FiX } from "react-icons/fi";

const SOURCE_OPTIONS: OptionType[] = [
    { value: "feedback", label: "Feedback" },
    { value: "vendor", label: "Vendor" },
    { value: "channel sales", label: "Channel Sales" },
    { value: "job seeker", label: "Job Seeker" },
    { value: "furniture", label: "Furniture" },
    { value: "land", label: "Land" },
];

const PLATFORM_OPTIONS: OptionType[] = [
    { value: "Website", label: "Website" },
    { value: "R", label: "R" },
    { value: "App", label: "App" },
];

const EMAIL_VERIFICATION_OPTIONS: OptionType[] = [
    { value: "all", label: "All" },
    { value: "1", label: "Verified" },
    { value: "0", label: "Unverified" },
];

const PHONE_VERIFICATION_OPTIONS: OptionType[] = [
    { value: "all", label: "All" },
    { value: "1", label: "Verified" },
    { value: "0", label: "Unverified" },
];

export default function AllFilter() {
    const dispatch = useAppDispatch();

    const [source, setSource] = useState("");
    const [platform, setPlatform] = useState("");
    const [emailVerification, setEmailVerification] = useState("");
    const [phoneVerification, setPhoneVerification] = useState("");

    const fetchUsers = (
        newSource = source,
        newPlatform = platform,
        newEmail = emailVerification,
        newPhone = phoneVerification
    ) => {
        dispatch(
            fetchUsersListRequest({
                page: 1,
                pageSize: 12,
                source: newSource || undefined,
                platformType: newPlatform || undefined,
                emailVerified: newEmail || undefined,
                phoneNumberVerified: newPhone || undefined,
            })
        );
    };

    const handleSourceChange = (value: string) => {
        setSource(value);
        fetchUsers(value, platform, emailVerification, phoneVerification);
    };

    const handlePlatformChange = (value: string) => {
        setPlatform(value);
        fetchUsers(source, value, emailVerification, phoneVerification);
    };

    const handleEmailVerificationChange = (value: string) => {
        setEmailVerification(value);
        fetchUsers(source, platform, value, phoneVerification);
    };

    const handlePhoneVerificationChange = (value: string) => {
        setPhoneVerification(value);
        fetchUsers(source, platform, emailVerification, value);
    };

    const handleClearFilters = () => {
        setSource("");
        setPlatform("");
        setEmailVerification("");
        setPhoneVerification("");

        dispatch(fetchUsersListRequest({ page: 1, pageSize: 12 }));
    };

    return (
        <div className="mb-6">

            {/* Filters */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <FilterSelect
                    id="filter-source"
                    label="Source"
                    options={SOURCE_OPTIONS}
                    value={source}
                    onChange={handleSourceChange}
                />

                <FilterSelect
                    id="filter-platform"
                    label="Platform"
                    options={PLATFORM_OPTIONS}
                    value={platform}
                    onChange={handlePlatformChange}
                />

                <FilterSelect
                    id="filter-email-verification"
                    label="Email Verification"
                    options={EMAIL_VERIFICATION_OPTIONS}
                    value={emailVerification}
                    onChange={handleEmailVerificationChange}
                />

                <FilterSelect
                    id="filter-phone-verification"
                    label="Phone Verification"
                    options={PHONE_VERIFICATION_OPTIONS}
                    value={phoneVerification}
                    onChange={handlePhoneVerificationChange}
                />
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap items-center justify-end gap-2 mt-4">

                {source && (
                    <div className="flex items-center gap-2 px-3 py-1.5 text-sm bg-violet-50/60 border border-violet-50 rounded-lg shadow-sm hover:shadow transition">
                        <span className="text-gray-600">Source</span>
                        <span className="font-medium text-gray-900">{source}</span>
                        <button
                            onClick={() => handleSourceChange("")}
                            className="ml-1 text-gray-400 hover:text-red-500 transition"
                        >
                            <FiX />
                        </button>
                    </div>
                )}

                {platform && (
                    <div className="flex items-center gap-2 px-3 py-1.5 text-sm bg-emerald-50/60 border border-emerald-50 rounded-lg shadow-sm hover:shadow transition">
                        <span className="text-gray-600">Platform</span>
                        <span className="font-medium text-gray-900">{platform}</span>
                        <button
                            onClick={() => handlePlatformChange("")}
                            className="ml-1 text-gray-400 hover:text-red-500 transition"
                        >
                            <FiX />
                        </button>
                    </div>
                )}

                {emailVerification && (
                    <div className="flex items-center gap-2 px-3 py-1.5 text-sm bg-sky-50/60 border border-sky-50 rounded-lg shadow-sm hover:shadow transition">
                        <span className="text-gray-600">Email Verification</span>
                        <span className="font-medium text-gray-900">
                            {emailVerification === "1" ? "Verified" : "Unverified"}
                        </span>
                        <button
                            onClick={() => handleEmailVerificationChange("")}
                            className="ml-1 text-gray-400 hover:text-red-500 transition"
                        >
                            <FiX />
                        </button>
                    </div>
                )}

                {phoneVerification && (
                    <div className="flex items-center gap-2 px-3 py-1.5 text-sm bg-rose-50/60 border border-rose-50 rounded-lg shadow-sm hover:shadow transition">
                        <span className="text-gray-600">Phone Verification</span>
                        <span className="font-medium text-gray-900">
                            {phoneVerification === "1" ? "Verified" : "Unverified"}
                        </span>
                        <button
                            onClick={() => handlePhoneVerificationChange("")}
                            className="ml-1 text-gray-400 hover:text-red-500 transition"
                        >
                            <FiX />
                        </button>
                    </div>
                )}

                {(source || platform || emailVerification || phoneVerification) && (
                    <Button
                        label="Clear All"
                        variant="outline"
                        onClick={handleClearFilters}
                    />
                )}
            </div>
        </div>
    );
}