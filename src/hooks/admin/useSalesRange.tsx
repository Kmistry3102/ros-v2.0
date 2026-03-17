import { useEffect, useState } from "react";
import { DashboardRange } from "@/feature/admin/range";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { fetchSalesDashboardRequest } from "@/feature/admin/range/range.slice";

export default function useSalesRange() {
    const dispatch = useAppDispatch();
    const [salesRange, setSalesRange] = useState<DashboardRange>("Today");

    const { salesData, salesStatus, salesError } = useAppSelector((state) => state.dashboard);

    useEffect(() => {
        dispatch(fetchSalesDashboardRequest({ range: salesRange }));
    }, [dispatch, salesRange]);

    return {
        salesRange,
        setSalesRange,
        salesData,
        salesStatus,
        salesError,
    };
}