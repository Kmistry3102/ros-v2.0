import { MetricCard } from "../../layout/right/MetricCard";

export default function FirstGraph({ range, data, counts }: { range: string, data: any, counts: any }) {
    return (
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

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
    )
}