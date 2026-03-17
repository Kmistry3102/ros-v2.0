import { getRolesListRequest } from "@/feature/admin/users/users.slice";
import { useAppSelector } from "../useAppSelector";
import { useCallback, useEffect, useMemo } from "react";
import { useAppDispatch } from "../useAppDispatch";
import { RootState } from "@/store/rootReducer";

export function useGetAllRolesList() {
    const dispatch = useAppDispatch();
    const { rolesList, rolesListStatus, rolesListError, rolesListSlug } = useAppSelector((state: RootState) => state.users);

    useEffect(() => {
        dispatch(getRolesListRequest(rolesListSlug));
    }, [dispatch, rolesListSlug]);

    const rolesListOptions = useMemo(
        () =>
            rolesList.map((role: string) => ({
                label: role,
                value: role,
            })),
        [rolesList]
    );

    return { rolesList, rolesListStatus, rolesListError, rolesListOptions };
}