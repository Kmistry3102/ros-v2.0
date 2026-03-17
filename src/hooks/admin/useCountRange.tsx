import { useEffect, useState } from "react";
import { DashboardRange } from "@/feature/admin/range";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchDashboardRequest } from "@/feature/admin/range/range.slice";

export default function useCountRange() {
  const dispatch = useAppDispatch();
  const [range, setRange] = useState<DashboardRange>("Today");

  const { data, status, error } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardRequest({ range }));
  }, [dispatch, range]);

  const getCurrent = (metric: any) =>
    metric && typeof metric.currentCount === "number" ? metric.currentCount : 0;

  const getTrend = (metric: any) =>
    metric?.percentageTrend?.value ?? "+0.0%";

  const counts = {
    people: {
      value: getCurrent(data?.peoplesCount),
      trend: getTrend(data?.peoplesCount),
    },
    otpVerified: {
      value: getCurrent(data?.otpVerifiedCount),
      trend: getTrend(data?.otpVerifiedCount),
    },
    kycVerified: {
      value: getCurrent(data?.kycVerifiedUsersCount),
      trend: getTrend(data?.kycVerifiedUsersCount),
    },
    rid: {
      value: getCurrent(data?.ridUsersCount),
      trend: getTrend(data?.ridUsersCount),
    },
    employee: {
      value: getCurrent(data?.employeeCount),
      trend: getTrend(data?.employeeCount),
    },
    projects: {
      value: getCurrent(data?.projectCount),
      trend: getTrend(data?.projectCount),
    },
    events: {
      value: getCurrent(data?.eventCount),
      trend: getTrend(data?.eventCount),
    },
    knowledge: {
      value: getCurrent(data?.knowledgesCount),
      trend: getTrend(data?.knowledgesCount),
    },
    vendors: {
      value: getCurrent(data?.vendorsCount),
      trend: getTrend(data?.vendorsCount),
    },
    territories: {
      value: getCurrent(data?.territoriesCount),
      trend: getTrend(data?.territoriesCount),
    },
    lands: {
      value: getCurrent(data?.landsCount),
      trend: getTrend(data?.landsCount),
    },
    community: {
      value: getCurrent(data?.communityCount),
      trend: getTrend(data?.communityCount),
    },
    jobSeeker: {
      value: getCurrent(data?.jobseekerCount),
      trend: getTrend(data?.jobseekerCount),
    },
    channelPartners: {
      value: getCurrent(data?.channelPartnersCount),
      trend: getTrend(data?.channelPartnersCount),
    },
    activeChannelSales: {
      value: getCurrent(data?.activeChannelSalesCount),
      trend: getTrend(data?.activeChannelSalesCount),
    },
    dormantChannelSales: {
      value: getCurrent(data?.dormantChannelSalesCount),
      trend: getTrend(data?.dormantChannelSalesCount),
    },
  };

  return {
    range,
    setRange,
    data,
    status,
    error,
    getCurrent,
    getTrend,
    counts,
  };
}