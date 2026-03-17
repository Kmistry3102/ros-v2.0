import { takeLatest, put, call } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import { addUserApi, assignRoleApi, createRolesApi, getAdminUserList, getRolesList, searchDirectoryUsers } from "./users.api";
import {
  fetchUsersListFailure,
  fetchUsersListRequest,
  fetchUsersListSuccess,
  addUserSuccess,
  addUserFailure,
  addUserRequest,
  createRoleFailure,
  createRoleSuccess,
  createRoleRequest,
  getRolesListFailure,
  getRolesListSuccess,
  getRolesListRequest,
  searchDirectoryUsersFailure,
  searchDirectoryUsersSuccess,
  searchDirectoryUsersRequest,
  assignRoleFailure,
  assignRoleSuccess,
  assignRoleRequest,
} from "./users.slice";
import type { DirectorySearchParams, UsersListResponse } from "./users.types";
import { CommonFormData } from "@/feature/commonapi.types";

// Fetch users list
function* handleFetchUsersListSaga(
  action: PayloadAction<{ page: number; pageSize: number; source?: string; platformType?: string; emailVerified?: string; phoneNumberVerified?: string }>
): Generator<any, void, any> {
  try {
    const response: UsersListResponse = yield call(getAdminUserList, {
      page: action.payload.page,
      pageSize: action.payload.pageSize,
      source: action.payload.source,
      platformType: action.payload.platformType,
      emailVerified: action.payload.emailVerified,
      phoneNumberVerified: action.payload.phoneNumberVerified,
    });

    const res = response as any;
    const list = res?.users ?? res?.result?.users ?? [];
    const total = res?.total ?? res?.totalCount ?? res?.result?.total ?? list.length;
    const todaysCount = res?.todaysCount ?? res?.result?.todaysCount ?? 0;
    const rawCounts = res?.sourceCountArray ?? res?.result?.sourceCountArray ?? [];
    const counts = rawCounts.map((item: any) => ({
      title: item?.title ?? "",
      totalCount: item?.totalCount ?? 0,
      daysCount: item?.daysCount ?? 0,
    }));
    const page = action.payload.page;
    const pageSize = action.payload.pageSize;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    yield put(
      fetchUsersListSuccess({
        list,
        total,
        page,
        pageSize,
        totalPages,
        todaysCount,
        counts,
      })
    );
  } catch (error: any) {
    yield put(
      fetchUsersListFailure(error.message || "Unable to load users list")
    );
  }
}

// Add user
function* handleAddUserSaga(
  action: PayloadAction<CommonFormData>
): Generator<any, void, any> {
  try {
    const response: any = yield call(addUserApi, action.payload);
    yield put(addUserSuccess(response));
  } catch (error: any) {
    yield put(addUserFailure(error.message || "Unable to add user"));
  }
}

// Create role
function* handleCreateRoleSaga(
  action: PayloadAction<{ title: string, slug: string }>
): Generator<any, void, any> {
  try {
    const response: any = yield call(createRolesApi, action.payload);
    yield put(createRoleSuccess(response));
  } catch (error: any) {
    yield put(createRoleFailure(error.message || "Unable to create role"));
  }
}

// Get roles list
function* handleGetRolesListSaga(
  action: PayloadAction<any>
): Generator<any, void, any> {
  try {
    const response: any = yield call(getRolesList, action.payload);
    yield put(getRolesListSuccess(response?.result));
  } catch (error: any) {
    yield put(getRolesListFailure(error.message || "Unable to get roles list"));
  }
}

// Search directory users
function* handleSearchDirectoryUsersSaga(
  action: PayloadAction<DirectorySearchParams>
): Generator<any, void, any> {
  try {
    const response: any = yield call(searchDirectoryUsers, action.payload);
    yield put(searchDirectoryUsersSuccess(response?.result?.users ?? []));
  } catch (error: any) {
    yield put(searchDirectoryUsersFailure(error.message || "Unable to search directory users"));
  } 
} 

// Assign role
function* handleAssignRoleSaga(
  action: PayloadAction<{ role: string, slug: string, userId: string }>
): Generator<any, void, any> {
  try {
    const response: any = yield call(assignRoleApi, action.payload);
    yield put(assignRoleSuccess(response));
  } catch (error: any) {
    yield put(assignRoleFailure(error.message || "Unable to assign role"));
  }
}

export default function* usersSaga() {
  yield takeLatest(fetchUsersListRequest.type, handleFetchUsersListSaga);
  yield takeLatest(addUserRequest.type, handleAddUserSaga);
  yield takeLatest(createRoleRequest.type, handleCreateRoleSaga);
  yield takeLatest(getRolesListRequest.type, handleGetRolesListSaga);
  yield takeLatest(searchDirectoryUsersRequest.type, handleSearchDirectoryUsersSaga);
  yield takeLatest(assignRoleRequest.type, handleAssignRoleSaga);
}
