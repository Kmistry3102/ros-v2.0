import DashboardLayoutClient from "@/component/dashboard/layout/DashboardLayoutClient";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayoutClient>{children}</DashboardLayoutClient>
  );
}