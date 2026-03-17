import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { DashboardRange } from "../range";
import { DashboardState } from "./range.type";


const initialState: DashboardState = {
  range: "Today",
  data: null,
  status: "idle",
  error: null,
  salesData: null,
  salesStatus: "idle",
  salesError: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    fetchDashboardRequest(
      state,
      action: PayloadAction<{ range: DashboardRange }>
    ) {
      state.range = action.payload.range;
      state.status = "loading";
      state.error = null;
    },
    fetchDashboardSuccess(state, action: PayloadAction<any>) {
      state.status = "success";
      state.data = action.payload;
      state.error = null;
    },
    fetchDashboardFailure(state, action: PayloadAction<string>) {
      state.status = "failed";
      state.error = action.payload;
    },
    fetchSalesDashboardRequest(state, action: PayloadAction<{ range: DashboardRange }>) {
      state.range = action.payload.range;
      state.salesStatus = "loading";
      state.salesError = null;
    },
    fetchSalesDashboardSuccess(state, action: PayloadAction<any>) {
      state.salesStatus = "success";
      state.salesData = action.payload;
      state.salesError = null;
    },
    fetchSalesDashboardFailure(state, action: PayloadAction<string>) {
      state.salesStatus = "failed";
      state.salesError = action.payload;
    },
  },
});

export const {
  fetchDashboardRequest,
  fetchDashboardSuccess,
  fetchDashboardFailure,
  fetchSalesDashboardRequest,
  fetchSalesDashboardSuccess,
  fetchSalesDashboardFailure,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;

