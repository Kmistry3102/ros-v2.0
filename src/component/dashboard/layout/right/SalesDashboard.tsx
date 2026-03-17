import useSalesRange from "@/hooks/admin/useSalesRange";
import { DashboardShell } from "./DashboardShell";
import { RangeTabs } from "@/feature/admin/range";
import { MetricCard } from "./MetricCard";

export default function SalesDashboard() {

    const {
        salesRange,
        setSalesRange,
        salesData,
        salesStatus,
        salesError,
    } = useSalesRange();

    return (
        <DashboardShell
            title="Sales"
            subtitle="Overview of all metrics and analytics."
            right={<RangeTabs value={salesRange} onChange={setSalesRange} />}
        >
            {salesError && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {salesError}
                </div>
            )}

            {/* Top metrics */}
            <section className="space-y-3">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {salesData?.map((item: any, index: number) => (
                        <MetricCard
                            key={item?.id ?? item?.title ?? index}
                            label={item?.title}
                            value={item?.currentCount}
                            trend={item?.percentageTrend?.value}
                            currentSeries={item?.graphs?.current}
                            previousSeries={item?.graphs?.previous}
                        />
                    ))}
                </div>
            </section>

            {salesStatus === "loading" && (
                <div className="pointer-events-none fixed inset-x-0 bottom-6 flex justify-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-medium text-slate-50 shadow-lg shadow-slate-900/40">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                        Refreshing dashboard for {salesRange}.
                    </div>
                </div>
            )}
        </DashboardShell>
    )
}