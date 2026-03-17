import { all } from "redux-saga/effects";
import authSaga from "@/feature/auth/auth.saga";
import dashboardSaga from "@/feature/admin/range/range.saga";
import usersSaga from "@/feature/admin/users/users.saga";

export default function* rootSaga() {
  yield all([authSaga(), dashboardSaga(), usersSaga()]);
}