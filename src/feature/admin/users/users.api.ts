import { apiRequest } from "@/api/request";
import type { DirectorySearchParams, UsersListResponse } from "./users.types";
import { CommonFormData } from "@/feature/commonapi.types";


export interface FetchUsersListParams {
  page: number;
  pageSize: number;
  slug?: string;
  source?: string;
  platformType?: string;
  emailVerified?: string;
  phoneNumberVerified?: string;
}

export async function getAdminUserList(
  params: FetchUsersListParams
): Promise<UsersListResponse> {
  return apiRequest<UsersListResponse>({
    method: "GET",
    url: "/users/admin/list",
    params: {
      page: params.page,
      pageSize: params.pageSize,  
      ...(params.slug ? { slug: params.slug } : {}),
      ...(params.source ? { source: params.source } : {}),
      ...(params.platformType ? { platformType: params.platformType } : {}),
      ...(params.emailVerified ? { emailVerified: params.emailVerified } : {}),
      ...(params.phoneNumberVerified ? { phoneNumberVerified: params.phoneNumberVerified } : {}),
    },
  });
}

export const addUserApi = async (data: CommonFormData) => {
  return await apiRequest({
    method: "POST",
    url: "/users/admin/user-create",
    data,
  });
};

export const createRolesApi = async (data: { title: string, slug: string }) => {
  return await apiRequest({
    method: "POST",
    url: "/users/create-roles",
    data,
  });
};

// Get roles list
export async function getRolesList(
  params: { page: number, pageSize: number, slug: string }
): Promise<any> {
  return apiRequest<any>({
    method: "GET",
    url: "/users/roles-list?page=1&pageSize=12&slug=shivalik_group",
  });
}

export async function searchDirectoryUsers(
  params: DirectorySearchParams
): Promise<any> {
  const { page, search, roleName } = params;
  return apiRequest<any>({
    method: "GET",
    url: "/common/directory/new-list",
    params: {
      page,
      search,
      ...(roleName ? { roleName } : {}),
    },
  });
}

// Assign role
export async function assignRoleApi(
  data: { role: string, slug: string, userId: string }
): Promise<any> {
  return apiRequest<any>({
    method: "POST",
    url: "/users/admin/assign-role",
    data,
  });
}