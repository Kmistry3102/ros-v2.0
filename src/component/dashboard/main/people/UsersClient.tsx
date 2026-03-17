"use client";

import { useState, useMemo } from "react";
import { DashboardShell } from "../../layout/right/DashboardShell";
import UserFilters from "./UserFilters";
import { PeopleAnalyticsStrip } from "./PeopleAnalyticsStrip";
import { SearchInput } from "@/component/ui/SearchInput";
import UserCard from "./UserCard";
import { useUsersList } from "@/feature/admin/users/useUsersList";
import AllFilter from "./AllFilter";
import { FiX } from "react-icons/fi";
import Link from "next/link";

export default function UsersClient() {
    const [search, setSearch] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const { counts, total, todaysCount } = useUsersList(12, "shivalik_group");
    const [selectedUser, setSelectedUser] = useState<any | null>(null);

    const totalItems = useMemo(
        () => [
            { label: "Total Users", value: total },
            ...(counts ?? []).map((c: { title?: string; totalCount?: number }) => ({
                label: c.title ?? "",
                value: c.totalCount ?? 0,
            })),
        ],
        [counts, total]
    );

    const todayItems = useMemo(
        () => [
            { label: "Today's Users", value: todaysCount },
            ...(counts ?? []).map((c: { title?: string; daysCount?: number }) => ({
                label: c.title ?? "",
                value: c.daysCount ?? 0,
            })),
        ],
        [counts, todaysCount]
    );

    return (
        <DashboardShell
            title="People"
            right={
                <UserFilters
                    onShowFilters={() => setShowFilters(!showFilters)}
                    showFilters={showFilters}
                />}
        >
            {showFilters && (
                <AllFilter />
            )}
            <div className="flex flex-col gap-6">
                <SearchInput
                    id="search-users"
                    label="Search Users"
                    placeholder="Search Users"
                    value={search}
                    onChange={setSearch}
                />

                <PeopleAnalyticsStrip title="Total Analytics" items={totalItems} />
                <PeopleAnalyticsStrip title="Today's Analytics" items={todayItems} />

                {/* Main content: cards + side panel */}
                <div className="mt-5 flex flex-col gap-4 lg:flex-row">
                    <div className={`flex-1 transition-[width] ${selectedUser ? "lg:pr-4" : ""}`}>
                        <UserCard setSelectedUser={setSelectedUser} selectedUser={selectedUser} />
                    </div>

                    {selectedUser && (
                        <aside className="w-full max-w-xs rounded-lg border border-gray-200 bg-white shadow-lg p-5 lg:sticky lg:top-12 lg:self-start">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                                <div>
                                    <h2 className="text-sm font-semibold text-gray-900 tracking-tight">
                                        Selected User
                                    </h2>
                                    <p className="text-xs text-gray-500">
                                        Summary of the user you clicked
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSelectedUser(null)}
                                    className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-black transition text-sm"
                                    aria-label="Close"
                                >
                                    <FiX />
                                </button>
                            </div>

                            <div className="space-y-4 text-sm text-gray-800">
                                {/* Name + avatar badge */}
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white text-sm font-semibold">
                                        {(selectedUser?.firstName?.[0] || selectedUser?.name?.[0] || "U").toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
                                            Name
                                        </p>
                                        <p className="mt-0.5 text-sm font-semibold text-gray-900">
                                            {selectedUser?.name ||
                                                `${selectedUser?.firstName ?? ""} ${selectedUser?.lastName ?? ""}`.trim() ||
                                                "N/A"}
                                        </p>
                                    </div>
                                </div>

                                {/* Mobile */}
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium text-gray-500">
                                        Mobile
                                    </p>
                                    <p className="text-sm text-gray-900">
                                        {selectedUser?.mobile ||
                                            `${selectedUser?.countryCode ?? ""} ${selectedUser?.phoneNumber ?? ""}`.trim() ||
                                            "N/A"}
                                    </p>
                                </div>

                                {/* Email */}
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium text-gray-500">
                                        Email
                                    </p>
                                    {selectedUser?.email ? (
                                        <Link href={`mailto:${selectedUser?.email}`} className="text-sm text-blue-600 cursor-pointer hover:text-blue-700 hover:underline">
                                            {selectedUser?.email}
                                        </Link>
                                    ) : (
                                        <p className="text-sm text-gray-500">
                                            N/A
                                        </p>
                                    )}
                                </div>

                                {/* Source + Platform */}
                                <div className="grid grid-cols-1 gap-3">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-medium text-gray-500">
                                            Source
                                        </p>
                                        <p className="text-sm text-gray-900">
                                            {selectedUser?.source || "N/A"}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-medium text-gray-500">
                                            Platform Type
                                        </p>
                                        <p className="text-sm text-gray-900">
                                            {selectedUser?.subSource || selectedUser?.platformType || "N/A"}
                                        </p>
                                    </div>
                                </div>

                                {/* Created date */}
                                {selectedUser?.createdAt && (
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-medium text-gray-500">
                                            Date
                                        </p>
                                        <p className="text-sm text-gray-900">
                                            {new Date(selectedUser.createdAt as string).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </aside>
                    )}
                </div>
            </div>
        </DashboardShell>
    );
}