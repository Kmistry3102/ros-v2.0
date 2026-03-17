import { MetricCard } from "../../layout/right/MetricCard";

export default function ShivalikPeopleDashboard({ range, data, counts }: { range: string, data: any, counts: any }) {
    return (
        <section className="space-y-3">
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold tracking-tight text-slate-900">
                    Shivalik People
                </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
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

    )
}