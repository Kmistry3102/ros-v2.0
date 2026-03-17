import UsersClient from "@/component/dashboard/main/people/UsersClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Users",
};

export default function UsersPage() {
    return <UsersClient />;
};