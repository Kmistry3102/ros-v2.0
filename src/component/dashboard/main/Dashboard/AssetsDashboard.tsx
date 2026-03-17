import { MetricCard } from "../../layout/right/MetricCard";

export default function AssetsDashboard({ range, data, counts }: { range: string, data: any, counts: any }) {

    return (
        <section className="space-y-3">
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold tracking-tight text-slate-900">
                    Assets
                </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <MetricCard
                    label="Land"
                    value={range === "ALL" ? data?.landsCount : counts.lands.value}
                    trend={counts.lands.trend}
                    currentSeries={data?.landsCount?.graphs?.current}
                    previousSeries={data?.landsCount?.graphs?.previous}
                />
                <MetricCard
                    label="Projects"
                    value={range === "ALL" ? data?.projectCount : counts.projects.value}
                    trend={counts.projects.trend}
                    currentSeries={data?.projectCount?.graphs?.current}
                    previousSeries={data?.projectCount?.graphs?.previous}
                />
            </div>
        </section>
    )
}