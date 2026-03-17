import { takeLatest, put, call } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { DashboardRange } from "../range";
import { getSuperAdminDashboard, getSuperAdminSalesDashboard } from "./range.api";
import {
  fetchDashboardFailure,
  fetchDashboardRequest,
  fetchDashboardSuccess,
  fetchSalesDashboardFailure,
  fetchSalesDashboardRequest,
  fetchSalesDashboardSuccess,
} from "./range.slice";

function* handleFetchDashboardSaga(
  action: PayloadAction<{ range: DashboardRange }>
): Generator<any, void, any> {
  try {
    const response = yield call(getSuperAdminDashboard, action.payload.range);
    const data = response?.result;
    yield put(fetchDashboardSuccess(data));
  } catch (error: any) {
    yield put(
      fetchDashboardFailure(error.message || "Unable to load dashboard data")
    );
  }
}

function* handleFetchSalesDashboardSaga(
  action: PayloadAction<{ range: DashboardRange }>
): Generator<any, void, any> {
  try {
    const response = yield call(getSuperAdminSalesDashboard, action.payload.range);
    const data = response?.result;
    yield put(fetchSalesDashboardSuccess(data));
  } catch (error: any) {
    yield put(
      fetchSalesDashboardFailure(error.message || "Unable to load sales dashboard data")
    );
  }
}

export default function* dashboardSaga() {
  yield takeLatest(fetchDashboardRequest.type, handleFetchDashboardSaga);
  yield takeLatest(fetchSalesDashboardRequest.type, handleFetchSalesDashboardSaga);
}

