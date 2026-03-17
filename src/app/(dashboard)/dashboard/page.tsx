import { DashboardClient } from "@/component/dashboard/layout/right/DashboardClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Super admin overview of ROS metrics, assets, and user activity.",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
