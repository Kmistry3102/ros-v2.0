import type { DashboardRange } from "../range";
import { ErrorTypes, RequestStatus } from "@/feature/commonapi.types";

export interface DashboardState {
    range: DashboardRange;
    data: any | null;
    status: RequestStatus;
    error: ErrorTypes;

    salesData: any | null;
    salesStatus: RequestStatus;
    salesError: ErrorTypes;
}

export type DashboardRangeApiKey = DashboardRange | "ALL";

export const RANGE_API_CONFIG: Record<DashboardRangeApiKey, { url: string; rangeParam?: string }> = {
    ALL: {
        url: "/users/super-admin/dashboard",
    },
    Today: {
        url: "/users/super-admin/dashboard-new",
        rangeParam: "Today",
    },
    "7_Days": {
        url: "/users/super-admin/dashboard-new",
        rangeParam: "7Days",
    },
    "30_Days": {
        url: "/users/super-admin/dashboard-new",
        rangeParam: "30Days",
    },
    "90_Days": {
        url: "/users/super-admin/dashboard-new",
        rangeParam: "90Days",
    },
};

export const RANGE_API_CONFIG_SALES: Record<DashboardRangeApiKey, { url: string; rangeParam?: string }> = {
    ALL: {
        url: "/projects/super-admin/sales/dashboard",
        rangeParam: "All",
    },
    Today: {
        url: "/projects/super-admin/sales/dashboard",
        rangeParam: "Today",
    },
    "7_Days": {
        url: "/projects/super-admin/sales/dashboard",
        rangeParam: "7Days",
    },
    "30_Days": {
        url: "/projects/super-admin/sales/dashboard",
        rangeParam: "30Days",
    },
    "90_Days": {
        url: "/projects/super-admin/sales/dashboard",
        rangeParam: "90Days",
    },
};