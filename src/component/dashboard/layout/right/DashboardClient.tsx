"use client";

import useCountRange from "@/hooks/admin/useCountRange";
import { DashboardShell } from "./DashboardShell";
import { RangeTabs } from "@/feature/admin/range";
import { MetricCard } from "./MetricCard";
import SalesDashboard from "./SalesDashboard";


export function DashboardClient() {
  const {
    range,
    setRange,
    data,
    status,
    error,
    counts
  } = useCountRange();



  return (
    <div className="flex flex-col gap-10">
      <DashboardShell
        title="Dashboard"
        subtitle="Overview of all metrics and analytics."
        right={<RangeTabs value={range} onChange={setRange} />}
      >
        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        {/* Top metrics */}
        <section className="space-y-3">
          <div className="flex justify-end gap-4 text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1">
              <span className="w-4 border-t border-blue-600" />
              Current
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-4 border-t border-dashed border-green-600" />
              Previous
            </span>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="People"
              value={counts.people.value}
              trend={counts.people.trend}
              currentSeries={data?.peoplesCount?.graphs?.current}
              previousSeries={data?.peoplesCount?.graphs?.previous}
            />
            <MetricCard
              label="OTP Verified"
              value={counts.otpVerified.value}
              trend={counts.otpVerified.trend}
              currentSeries={data?.otpVerifiedCount?.graphs?.current}
              previousSeries={data?.otpVerifiedCount?.graphs?.previous}
            />
            <MetricCard
              label="KYC Verified"
              value={counts.kycVerified.value}
              trend={counts.kycVerified.trend}
              currentSeries={data?.kycVerifiedUsersCount?.graphs?.current}
              previousSeries={data?.kycVerifiedUsersCount?.graphs?.previous}
            />
            <MetricCard
              label="RID Users"
              value={counts.rid.value}
              trend={counts.rid.trend}
              currentSeries={data?.ridUsersCount?.graphs?.current}
              previousSeries={data?.ridUsersCount?.graphs?.previous}
            />
          </div>
        </section>

        {/* Assets */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-tight text-slate-900">
              Assets
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="Land"
              value={ counts.lands.value}
              trend={counts.lands.trend}
              currentSeries={data?.landsCount?.graphs?.current}
              previousSeries={data?.landsCount?.graphs?.previous}
            />
            <MetricCard
              label="Projects"
              value={counts.projects.value}
              trend={counts.projects.trend}
              currentSeries={data?.projectCount?.graphs?.current}
              previousSeries={data?.projectCount?.graphs?.previous}
            />
            {/* <MetricCard
            label="Society Onboard"
            value={counts.societyOnboard.value}
            trend={counts.societyOnboard.trend}
          /> */}
          </div>
        </section>

        {/* Shivalik People */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-tight text-slate-900">
              Shivalik People
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="Employee"
              value={counts.employee.value}
              trend={counts.employee.trend}
              currentSeries={data?.employeeCount?.graphs?.current}
              previousSeries={data?.employeeCount?.graphs?.previous}
            />
            <MetricCard
              label="Job Seeker"
              value={counts.jobSeeker.value}
              trend={counts.jobSeeker.trend}
              currentSeries={data?.jobseekerCount?.graphs?.current}
              previousSeries={data?.jobseekerCount?.graphs?.previous}
            />
            <MetricCard
              label="Vendor"
              value={counts.vendors.value}
              trend={counts.vendors.trend}
              currentSeries={data?.vendorsCount?.graphs?.current}
              previousSeries={data?.vendorsCount?.graphs?.previous}
            />
            <MetricCard
              label="Active Channel Sales"
              value={counts.activeChannelSales.value}
              trend={counts.activeChannelSales.trend}
              currentSeries={data?.activeChannelSalesCount?.graphs?.current}
              previousSeries={data?.activeChannelSalesCount?.graphs?.previous}
            />
            <MetricCard
              label="Channel Partners"
              value={counts.channelPartners.value}
              trend={counts.channelPartners.trend}
              currentSeries={data?.channelPartnersCount?.graphs?.current}
              previousSeries={data?.channelPartnersCount?.graphs?.previous}
            />
            <MetricCard
              label="Dormant Channel Sales"
              value={counts.dormantChannelSales.value}
              trend={counts.dormantChannelSales.trend}
              currentSeries={data?.dormantChannelSalesCount?.graphs?.current}
              previousSeries={data?.dormantChannelSalesCount?.graphs?.previous}
            />
          </div>
        </section>

        {/* R Facility */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-tight text-slate-900">
              R Facility
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="Events"
                  value={counts.events.value}
              trend={counts.events.trend}
              currentSeries={data?.eventCount?.graphs?.current}
              previousSeries={data?.eventCount?.graphs?.previous}
            />
            <MetricCard
              label="Pulses"
              value={counts.knowledge.value}
              trend={counts.knowledge.trend}
              currentSeries={data?.knowledgesCount?.graphs?.current}
              previousSeries={data?.knowledgesCount?.graphs?.previous}
            />
            <MetricCard
              label="Territory"
              value={counts.territories.value}
              trend={counts.territories.trend}
              currentSeries={data?.territoriesCount?.graphs?.current}
              previousSeries={data?.territoriesCount?.graphs?.previous}
            />
            <MetricCard
              label="Community"
              value={counts.community.value}
              trend={counts.community.trend}
              currentSeries={data?.communityCount?.graphs?.current}
              previousSeries={data?.communityCount?.graphs?.previous}
            />
          </div>
        </section>

        {status === "loading" && (
          <div className="pointer-events-none fixed inset-x-0 bottom-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-medium text-slate-50 shadow-lg shadow-slate-900/40">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              Refreshing dashboard for {range}.
            </div>
          </div>
        )}
      </DashboardShell>

      <SalesDashboard />

    </div>
  );
}

