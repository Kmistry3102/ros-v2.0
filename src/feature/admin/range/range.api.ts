import { apiRequest } from "@/api/request";
import { DashboardRangeApiKey, RANGE_API_CONFIG, RANGE_API_CONFIG_SALES } from "./range.type";


export const getSuperAdminDashboard = async (
  range: DashboardRangeApiKey = "ALL"
) => {
  const config = RANGE_API_CONFIG[range];

  return apiRequest({
    method: "GET",
    url: config.url,
    ...(config.rangeParam
      ? {
          params: {
            range: config.rangeParam,
          },
        }
      : {}),
  });
};

export const getSuperAdminSalesDashboard = async (
  range: DashboardRangeApiKey = "ALL"
) => {
  const config = RANGE_API_CONFIG_SALES[range];

  return apiRequest({
    method: "GET",
    url: config.url,
    ...(config.rangeParam
      ? {
          params: {
            range: config.rangeParam,
          },
        }
      : {}),
  });
};

// Convenience helpers if you want explicit calls
export const getSuperAdminDashboardAll = () => getSuperAdminDashboard("ALL");
export const getSuperAdminDashboardToday = () => getSuperAdminDashboard("Today");
export const getSuperAdminDashboard7Days = () => getSuperAdminDashboard("7_Days");
export const getSuperAdminDashboard30Days = () => getSuperAdminDashboard("30_Days");
export const getSuperAdminDashboard90Days = () => getSuperAdminDashboard("90_Days");

