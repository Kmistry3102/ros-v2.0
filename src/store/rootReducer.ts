import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/feature/auth/auth.slice";
import dashboardReducer from "@/feature/admin/range/range.slice";
import usersReducer from "@/feature/admin/users/users.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  users: usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;