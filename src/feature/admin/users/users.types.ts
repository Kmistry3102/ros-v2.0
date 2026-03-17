import type { RequestStatus, ErrorTypes } from "@/feature/commonapi.types";


export interface UsersListResponse {
  users?: any[];
  total?: number;
  totalCount?: number;
  todaysCount?: number;
  sourceCountArray?: Array<{ title?: string; totalCount?: number; daysCount?: number }>;
  result?: {
    users?: any[];
    total?: number;
    totalCount?: number;
    todaysCount?: number;
    totalPages?: number;
    sourceCountArray?: Array<{ title?: string; totalCount?: number; daysCount?: number }>;
  };
}

export interface UsersListParams {
  page: number;
  pageSize: number;
  slug?: string;
  source?: string;
}


export interface DirectorySearchParams {
  page: number;
  search: string;
  roleName?: string;
}

export interface UsersState {
  list: any[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  status: RequestStatus;
  slug?: string;
  source?: string;
  platformType?: string;
  emailVerified?: string;
  phoneNumberVerified?: string;
  error: ErrorTypes;  
  counts: any[];
  todaysCount: number;

  user: any;
  userStatus: RequestStatus;
  userError: ErrorTypes;

  role: any;
  roleStatus: RequestStatus;
  roleError: ErrorTypes;

  rolesList: any[];
  rolesListStatus: RequestStatus;
  rolesListError: ErrorTypes;
  rolesListSlug: string;

  directorySearchList: DirectoryUser[];
  directorySearchListStatus: RequestStatus;
  directorySearchListError: ErrorTypes;
  directorySearchListPage: number;
  directorySearchListRoleName: string;

  assignRole: any;
  assignRoleStatus: RequestStatus;
  assignRoleError: ErrorTypes;
  
}

export interface DirectoryUser {
  userId?: string
  _id?: string
  firstName: string
  lastName: string
  phoneNumber?: string
  countryCode?: string
  email?: string
  userRoles: { roleName?: string }[]
}
