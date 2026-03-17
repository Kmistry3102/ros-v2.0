import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { DirectorySearchParams, UsersState } from "./users.types";
import { CommonFormData } from "@/feature/commonapi.types";

const initialState: UsersState = {
  list: [],
  total: 0,
  page: 1,
  pageSize: 12,
  totalPages: 0,
  status: "idle",
  counts: [],
  error: null,
  todaysCount: 0,
  source: "",
  slug: "shivalik_group",
  platformType: "",
  emailVerified: "",
  phoneNumberVerified: "",

  user: null,
  userStatus: "idle",
  userError: null,

  role: null,
  roleStatus: "idle",
  roleError: null,

  rolesList: [],
  rolesListStatus: "idle",
  rolesListError: null,
  rolesListSlug: "shivalik_group",

  directorySearchList: [],
  directorySearchListStatus: "idle",
  directorySearchListError: null,
  directorySearchListPage: 1,
  directorySearchListRoleName: "",

  assignRole: null,
  assignRoleStatus: "idle",
  assignRoleError: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUsersListRequest(
      state,
      action: PayloadAction<{ page: number; pageSize: number; slug?: string; source?: string; platformType?: string; emailVerified?: string; phoneNumberVerified?: string }>
    ) {
      state.status = "loading";
      state.error = null;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.slug = action.payload.slug;
      state.source = action.payload.source;
      state.platformType = action.payload.platformType;
      state.emailVerified = action.payload.emailVerified;
      state.phoneNumberVerified = action.payload.phoneNumberVerified;
    },
    fetchUsersListSuccess(
      state,
      action ) {
      state.status = "success";
      state.error = null;
      state.list = action.payload.list;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.totalPages = action.payload.totalPages;
      state.counts = action.payload.counts;
      state.todaysCount = action.payload.todaysCount;
    },
    fetchUsersListFailure(state, action: PayloadAction<string>) {
      state.status = "failed";
      state.error = action.payload;
    },

    // Add user
    addUserRequest(state, action: PayloadAction<CommonFormData>) {
      state.userStatus = "loading";
      state.userError = null;
    },
    addUserSuccess(state, action: PayloadAction<any>) {
      state.userStatus = "success";
      state.userError = null;
      state.user = action.payload;
    },
    addUserFailure(state, action: PayloadAction<string>) {
      state.userStatus = "failed";
      state.userError = action.payload;
    },
    resetAddUser(state){
      state.user = null;
      state.userStatus = "idle";
      state.userError = null;
    },

    // Create role
    createRoleRequest(state, action: PayloadAction<{ title: string, slug: string }>) {
      state.roleStatus = "loading";
      state.roleError = null;
    },
    createRoleSuccess(state, action: PayloadAction<any>) {
      state.roleStatus = "success";
      state.roleError = null;
    },
    createRoleFailure(state, action: PayloadAction<string>) {
      state.roleStatus = "failed";
      state.roleError = action.payload;
    },
    resetCreateRole(state){
      state.role = null;
      state.roleStatus = "idle";
      state.roleError = null;
    },

    // Get roles list
    getRolesListRequest(state , action: PayloadAction<string>) {
      state.rolesListStatus = "loading";
      state.rolesListError = null;
      state.rolesListSlug = action.payload;
    },
    getRolesListSuccess(state, action: PayloadAction<any>) {
      state.rolesListStatus = "success";
      state.rolesListError = null;
      state.rolesList = action.payload;
    },
    getRolesListFailure(state, action: PayloadAction<string>) {
      state.rolesListStatus = "failed";
      state.rolesListError = action.payload;
    },
    resetGetRolesList(state){
      state.rolesList = [];
      state.rolesListStatus = "idle";
      state.rolesListError = null;
    },

    // Search directory users
    searchDirectoryUsersRequest(state, action: PayloadAction<DirectorySearchParams>) {
      state.directorySearchListStatus = "loading";
      state.directorySearchListError = null;
      state.directorySearchListPage = action.payload.page;
      state.directorySearchListRoleName = action.payload.roleName ?? "";
    },
    searchDirectoryUsersSuccess(state, action: PayloadAction<any>) {
      state.directorySearchListStatus = "success";
      state.directorySearchListError = null;
      state.directorySearchList = action.payload;
    },
    searchDirectoryUsersFailure(state, action: PayloadAction<string>) {
      state.directorySearchListStatus = "failed";
      state.directorySearchListError = action.payload;
    },
    resetSearchDirectoryUsers(state){
      state.directorySearchList = [];
      state.directorySearchListStatus = "idle";
      state.directorySearchListError = null;
    },

    // Assign role
    assignRoleRequest(state, action: PayloadAction<{ role: string, slug: string, userId: string }>) {
      state.assignRoleStatus = "loading";
      state.assignRoleError = null;
    },
    assignRoleSuccess(state, action: PayloadAction<any>) {
      state.assignRoleStatus = "success";
      state.assignRoleError = null;
      state.assignRole = action.payload;
    },
    assignRoleFailure(state, action: PayloadAction<string>) {
      state.assignRoleStatus = "failed";
      state.assignRoleError = action.payload;
    },
    resetAssignRole(state){
      state.assignRole = null;
      state.assignRoleStatus = "idle";
      state.assignRoleError = null;
    }
  },
});

export const {
  fetchUsersListRequest,
  fetchUsersListSuccess,
  fetchUsersListFailure,
  addUserRequest,
  addUserSuccess,
  addUserFailure,
  resetAddUser,
  createRoleRequest,
  createRoleSuccess,
  createRoleFailure,
  resetCreateRole,
  getRolesListRequest,
  getRolesListSuccess,
  getRolesListFailure,
  resetGetRolesList,
  searchDirectoryUsersRequest,
  searchDirectoryUsersSuccess,
  searchDirectoryUsersFailure,
  resetSearchDirectoryUsers,
  assignRoleRequest,
  assignRoleSuccess,
  assignRoleFailure,
  resetAssignRole,
} = usersSlice.actions;

export default usersSlice.reducer;
