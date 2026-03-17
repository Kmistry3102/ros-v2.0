import { MetricCard } from "../../layout/right/MetricCard";

export default function RFacilityDashboard({ range, data, counts }: { range: string, data: any, counts: any }) {
    return (
        <section className="space-y-3">
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold tracking-tight text-slate-900">
                    R Facility
                </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <MetricCard
                    label="Events"
                    value={range === "ALL" ? data?.eventsCount : counts.events.value}
                    trend={counts.events.trend}
                    currentSeries={data?.eventCount?.graphs?.current}
                    previousSeries={data?.eventCount?.graphs?.previous}
                />
                <MetricCard
                    label="Pulses"
                    value={range === "ALL" ? data?.pulsesCount : counts.knowledge.value}
                    trend={counts.knowledge.trend}
                    currentSeries={data?.knowledgesCount?.graphs?.current}
                    previousSeries={data?.knowledgesCount?.graphs?.previous}
                />
                <MetricCard
                    label="Territory"
                    value={range === "ALL" ? data?.territoriesCount : counts.territories.value}
                    trend={counts.territories.trend}
                    currentSeries={data?.territoriesCount?.graphs?.current}
                    previousSeries={data?.territoriesCount?.graphs?.previous}
                />
                <MetricCard
                    label="Community"
                    value={range === "ALL" ? data?.communityCount : counts.community.value}
                    trend={counts.community.trend}
                    currentSeries={data?.communityCount?.graphs?.current}
                    previousSeries={data?.communityCount?.graphs?.previous}
                />
            </div>
        </section>
    )
}